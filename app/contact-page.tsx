'use client';

import {useState} from 'react';
import {ArrowUpRight,Check,Mail,MapPin,Send} from 'lucide-react';
import SocialIcon from './social-icon';

export default function ContactPage(){
  const [status,setStatus]=useState('');
  const mapUrl='https://www.google.com/maps/search/?api=1&query=Est%C3%A1dio+Primeiro+de+Maio+Rua+Olavo+Bilac+240+S%C3%A3o+Bernardo+do+Campo';
  return <article className="contact-page">
    <header className="contact-hero"><span className="eyebrow">FALE COM O TIGRE</span><h1>O clube e a cidade,<br/><em>mais perto de você.</em></h1><p>Use os canais oficiais abaixo para entrar em contato ou localizar o Estádio Primeiro de Maio.</p></header>
    <section className="contact-content" aria-labelledby="contact-title">
      <div className="contact-lead"><span className="eyebrow">CONTATO OFICIAL</span><h2 id="contact-title">Entre em contato.</h2><p>Esta página reúne somente os dados publicados pelo São Bernardo Futebol Clube.</p><div className="contact-details">
        <article><MapPin aria-hidden="true"/><div><small>ENDEREÇO E LOCALIZAÇÃO</small><h3>Estádio Primeiro de Maio</h3><address>Rua Olavo Bilac, 240<br/>Jardim Olavo Bilac<br/>São Bernardo do Campo — SP<br/>CEP 09725-570</address><a href={mapUrl} target="_blank" rel="noreferrer">Abrir localização <ArrowUpRight size={16}/></a></div></article>
        <article><Mail aria-hidden="true"/><div><small>E-MAIL</small><h3>Atendimento do clube</h3><a href="mailto:contato@saobernardofutebolclube.com.br">contato@saobernardofutebolclube.com.br</a></div></article>
        <article><SocialIcon network="instagram"/><div><small>INSTAGRAM</small><h3>@saobernardo_fc</h3><a href="https://www.instagram.com/saobernardo_fc/" target="_blank" rel="noreferrer">Acessar perfil oficial <ArrowUpRight size={16}/></a></div></article>
      </div></div>
      <form className="contact-form" onSubmit={event=>{event.preventDefault();setStatus('Mensagem demonstrativa validada. Nenhum dado foi enviado.');event.currentTarget.reset();}}>
        <div><span className="eyebrow">MENSAGEM</span><h2>Fale Conosco.</h2><p>Preencha com dados fictícios para testar o formulário do protótipo.</p></div>
        <label className="field">Nome<input name="name" required minLength={3} maxLength={80} autoComplete="name" placeholder="Seu nome"/></label>
        <label className="field">E-mail<input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="voce@exemplo.com"/></label>
        <label className="field">Assunto<input name="subject" required minLength={3} maxLength={100} placeholder="Como podemos ajudar?"/></label>
        <label className="field">Mensagem<textarea name="message" required minLength={10} maxLength={1000} rows={6} placeholder="Escreva sua mensagem"/></label>
        <button className="button full" type="submit">Enviar mensagem <Send size={18}/></button>
        <p className="contact-demo-note">Formulário de demonstração acadêmica. As informações não são enviadas nem armazenadas.</p>
        <p className="contact-status" role="status">{status&&<><Check size={18}/>{status}</>}</p>
      </form>
    </section>
  </article>;
}
