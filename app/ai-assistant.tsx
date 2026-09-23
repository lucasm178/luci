'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import './ai-assistant.css';

type Message = { id: number; role: 'user' | 'assistant'; text: string };

const suggestions = ['Quais produtos estão disponíveis?', 'Quanto custam os ingressos?', 'Como funciona a meia-entrada?'];

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'assistant', text: 'Olá! Sou o Bernô IA. Posso ajudar com o clube, a loja, os ingressos e a navegação deste site. 🐯' }]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  async function send(question: string) {
    const text = question.trim();
    if (!text || loading) return;
    setMessages(current => [...current, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      const raw = await response.text();
      let data: { answer?: string; error?: string };
      try { data = JSON.parse(raw); } catch { throw new Error('A função da IA retornou uma resposta inválida.'); }
      if (!response.ok || !data.answer) throw new Error(data.error || 'O Bernô IA não retornou uma resposta.');
      setMessages(current => [...current, { id: Date.now() + 1, role: 'assistant', text: data.answer! }]);
    } catch (error) {
      setMessages(current => [...current, { id: Date.now() + 1, role: 'assistant', text: `Não consegui responder agora. ${error instanceof Error ? error.message : 'Tente novamente.'}` }]);
    } finally { setLoading(false); }
  }

  function submit(event: { preventDefault(): void }) { event.preventDefault(); void send(input); }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(input); } }

  return <div className="berno-assistant">
    {open && <section className="berno-panel" role="dialog" aria-modal="false" aria-labelledby="berno-title">
      <header className="berno-header"><div className="berno-avatar" aria-hidden="true"/><div><strong id="berno-title">BERNÔ IA</strong><span><i /> Assistente do Tigre</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Fechar Bernô IA"><X /></button></header>
      <div className="berno-messages" ref={scrollRef} aria-live="polite">
        {messages.map(message => <div className={`berno-message ${message.role}`} key={message.id}><span>{message.role === 'user' ? 'VOCÊ' : 'BERNÔ IA'}</span><p>{message.text}</p></div>)}
        {loading && <div className="berno-message assistant"><span>BERNÔ IA</span><p className="berno-thinking"><i/><i/><i/><b className="sr-only">Pensando...</b></p></div>}
      </div>
      {messages.length === 1 && <div className="berno-suggestions">{suggestions.map(question => <button type="button" key={question} onClick={() => void send(question)}>{question}</button>)}</div>}
      <form className="berno-form" onSubmit={submit}><label className="sr-only" htmlFor="berno-question">Pergunte ao Bernô IA</label><input ref={inputRef} id="berno-question" value={input} onChange={event => setInput(event.target.value)} onKeyDown={keyDown} disabled={loading} maxLength={500} placeholder="Pergunte sobre o Tigre..."/><button type="submit" disabled={loading || !input.trim()} aria-label="Enviar pergunta"><Send /></button></form>
      <small className="berno-disclaimer">IA acadêmica · respostas podem conter imprecisões</small>
    </section>}
    <button className="berno-trigger" type="button" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-label={open ? 'Fechar Bernô IA' : 'Abrir Bernô IA'}>{open ? <X /> : <><Bot /><span>BERNÔ IA</span></>}</button>
  </div>;
}
