import { categories, historyFacts, historyTimeline, news, products, sectors, siteRoutes } from '../lib/site-data';

function reais(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

function systemKnowledge() {
  return `INFORMAÇÕES DO SISTEMA SÃO BERNARDO FC (protótipo acadêmico):
Clube: ${historyFacts.map(([key, value]) => `${key}: ${value}`).join('; ')}.
História: ${historyTimeline.map(item => `${item.year}: ${item.title} — ${item.text}`).join(' | ')}.
Produtos: ${products.map(item => `${item.name}, ${reais(item.price)}, tamanhos ${item.sizes.join(', ')}, descrição: ${item.description}`).join(' | ')}.
Ingressos: partida demonstrativa São Bernardo × Visitante, no Primeiro de Maio, data a definir. Categorias: ${categories.map(item => `${item.name}: ${reais(item.price)} (${item.note})`).join(' | ')}. Limite de 6 ingressos por compra. A regra infantil vale de 0 a 12 anos. PCD e estudante devem confirmar documento comprobatório.
Setores: ${sectors.map(item => `${item.name}: ${item.capacity ? `${item.capacity} lugares na disponibilidade demonstrativa` : 'esgotado'}`).join(' | ')}. O mapa e a disponibilidade não representam a venda oficial.
Notícias: ${news.map(item => `${item.title}: ${item.body.join(' ')}`).join(' | ')}.
Navegação: ${siteRoutes.map(([name, path]) => `${name} em ${path}`).join('; ')}.
Carrinho: produtos e ingressos podem ser reunidos; fica salvo apenas no navegador. Login e cadastro são simulados, válidos nesta aba. Perfil e pedidos ficam somente nesta sessão. Finalização e pagamento são simulações, sem cobrança, envio ou ingresso válido.`;
}

const responseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: responseHeaders });
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405);

    let body: { message?: unknown } = {};
    try {
      body = await request.json() as { message?: unknown };
    } catch {
      return json({ error: 'Corpo da requisição inválido.' }, 400);
    }

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) return json({ error: 'Digite uma pergunta.' }, 400);
    if (message.length > 500) return json({ error: 'A pergunta deve ter no máximo 500 caracteres.' }, 400);

    const endpoint = process.env.OLLAMA_API_URL?.trim();
    if (!endpoint) return json({ error: 'A conexão do Bernô IA ainda não foi configurada no servidor.' }, 503);

    const url = `${endpoint.replace(/\/+$/, '')}/api/generate`;
    const prompt = `Você é o Bernô IA, uma inteligência artificial especializada no São Bernardo Futebol Clube e neste sistema.\n\nUse somente as informações abaixo como base:\n${systemKnowledge()}\n\nPERGUNTA DO USUÁRIO:\n${message}\n\nINSTRUÇÕES:\n- Responda em português do Brasil.\n- Seja simpático, direto e natural.\n- Responda normalmente em até 3 parágrafos.\n- Diferencie claramente dados demonstrativos do sistema e informações oficiais.\n- Não invente informações. Se não souber, diga que não sabe.\n- Seu nome é Bernô IA.\n- Nunca diga que você é Gemma, Ollama ou ChatGPT.`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.OLLAMA_API_KEY) headers.Authorization = `Bearer ${process.env.OLLAMA_API_KEY}`;

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 115000);
      const aiResponse = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'berno',
          prompt,
          stream: false,
          options: { temperature: 0.2, num_predict: 180 },
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const result = await aiResponse.json() as { response?: string; error?: string };
      if (!aiResponse.ok) return json({ error: result.error || `Erro ao consultar o Bernô IA (${aiResponse.status}).` }, 502);

      const answer = result.response?.trim();
      if (!answer) return json({ error: 'O Bernô IA não retornou nenhuma resposta.' }, 502);
      return json({ answer });
    } catch (error) {
      const detail = error instanceof Error && error.name === 'AbortError'
        ? 'A resposta demorou além do limite.'
        : 'Não foi possível conectar ao modelo.';
      return json({ error: detail }, 502);
    }
  },
};
