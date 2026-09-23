import { categories, historyFacts, historyTimeline, news, products, sectors, siteRoutes } from '../lib/site-data';

type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = { status(code: number): ApiResponse; json(data: unknown): void; setHeader(name: string, value: string): void };

function reais(cents: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100); }

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

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  const body = typeof request.body === 'string' ? (() => { try { return JSON.parse(request.body); } catch { return {}; } })() : request.body;
  const message = typeof (body as { message?: unknown } | null)?.message === 'string' ? String((body as { message: string }).message).trim() : '';
  if (!message) return response.status(400).json({ error: 'Digite uma pergunta.' });
  if (message.length > 500) return response.status(400).json({ error: 'A pergunta deve ter no máximo 500 caracteres.' });

  const endpoint = process.env.OLLAMA_API_URL?.trim();
  if (!endpoint) return response.status(503).json({ error: 'A conexão do Bernô IA ainda não foi configurada no servidor.' });
  const url = `${endpoint.replace(/\/+$/, '')}/api/generate`;
  const prompt = `Você é o Bernô IA, uma inteligência artificial especializada no São Bernardo Futebol Clube e neste sistema.\n\nUse somente as informações abaixo como base:\n${systemKnowledge()}\n\nPERGUNTA DO USUÁRIO:\n${message}\n\nINSTRUÇÕES:\n- Responda em português do Brasil.\n- Seja simpático, direto e natural.\n- Responda normalmente em até 3 parágrafos.\n- Diferencie claramente dados demonstrativos do sistema e informações oficiais.\n- Não invente informações. Se não souber, diga que não sabe.\n- Seu nome é Bernô IA.\n- Nunca diga que você é Gemma, Ollama ou ChatGPT.`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' };
  if (process.env.OLLAMA_API_KEY) headers.Authorization = `Bearer ${process.env.OLLAMA_API_KEY}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 115000);
    const aiResponse = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ model: process.env.OLLAMA_MODEL || 'berno', prompt, stream: false, options: { temperature: 0.2, num_predict: 180 } }), signal: controller.signal });
    clearTimeout(timer);
    const result = await aiResponse.json() as { response?: string; error?: string };
    if (!aiResponse.ok) return response.status(502).json({ error: result.error || `Erro ao consultar o Bernô IA (${aiResponse.status}).` });
    const answer = result.response?.trim();
    if (!answer) return response.status(502).json({ error: 'O Bernô IA não retornou nenhuma resposta.' });
    return response.status(200).json({ answer });
  } catch (error) {
    const detail = error instanceof Error && error.name === 'AbortError' ? 'A resposta demorou além do limite.' : 'Não foi possível conectar ao modelo.';
    return response.status(502).json({ error: detail });
  }
}
