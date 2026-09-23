# Bernô IA

A implementação original foi preservada: modelo `berno` no Ollama, prompt especializado, temperatura `0.2`, limite de `180` tokens e resposta JSON no formato `{ "answer": "..." }`. A antiga interface HTML/JavaScript virou o componente React `app/ai-assistant.tsx`; o `api.php`/endpoint Netlify virou a função Vercel `api/chat.ts`.

## Configuração

1. No computador que executa o Ollama, crie o modelo com o `Modelfile` preservado do projeto antigo: `ollama create berno -f ollama/Modelfile`.
2. Exponha o Ollama por um túnel HTTPS protegido.
3. Copie `.env.example` para `.env.local` no desenvolvimento e configure `OLLAMA_API_URL`.
4. Na Vercel, cadastre as mesmas variáveis em Project Settings > Environment Variables. Nunca use uma chave com prefixo `VITE_`, pois ela iria para o navegador.

## Comandos

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm run build
pnpm run build:vercel
pnpm run dev
```

A função `/api/chat` precisa de ambiente serverless (Vercel ou `vercel dev`). O servidor Vite estático não executa sozinho as funções da pasta `api`.
