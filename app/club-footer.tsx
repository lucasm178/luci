import {ArrowUpRight,Mail,MapPin} from 'lucide-react';
import SocialIcon,{socials} from './social-icon';

export default function ClubFooter({navigate}:{navigate:(path:string)=>void}){
  const internal=(href:string,label:string)=><a href={href} onClick={event=>{event.preventDefault();navigate(href);}}>{label}</a>;
  return <footer className="club-footer">
    <div className="footer-grid">
      <section className="footer-about" aria-labelledby="footer-about-title"><img src="/assets/crest.png" alt="Escudo do São Bernardo Futebol Clube" width="84" height="98"/><div><h2 id="footer-about-title">São Bernardo FC</h2><p>O Tigre do ABC, fundado em 2004 para representar São Bernardo do Campo dentro e fora de campo.</p></div></section>
      <nav aria-label="Links do clube"><h2>Clube</h2>{internal('/historia','História do Clube')}{internal('/perfil','Meu perfil')}{internal('/pedidos','Meus pedidos')}</nav>
      <nav aria-label="Links de conteúdo"><h2>Conteúdo</h2>{internal('/noticias','Notícias')}{internal('/ingressos','Jogos e ingressos')}{internal('/loja','Loja do Tigre')}</nav>
      <section className="footer-contact" aria-labelledby="footer-contact-title"><h2 id="footer-contact-title">Contato</h2><address><MapPin aria-hidden="true"/><span>Estádio Primeiro de Maio — Rua Olavo Bilac, 240<br/>Jardim Olavo Bilac, São Bernardo do Campo — SP<br/>CEP 09725-570</span></address><a href="mailto:contato@saobernardofutebolclube.com.br"><Mail aria-hidden="true"/> contato@saobernardofutebolclube.com.br</a><a className="footer-contact-button" href="/contato" onClick={event=>{event.preventDefault();navigate('/contato');}}>Fale Conosco <ArrowUpRight size={17}/></a></section>
    </div>
    <div className="footer-socials"><span>Siga o Tigre</span>{socials.map(social=><a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} oficial do São Bernardo FC`}><SocialIcon network={social.network}/><span>{social.label}</span></a>)}</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} São Bernardo Futebol Clube · Protótipo acadêmico independente.</span><span>Sem vínculo comercial oficial.</span></div>
  </footer>;
}
