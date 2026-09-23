'use client';

import {useEffect, useRef, useState} from 'react';
import {LogOut, Menu, ShoppingBag, User, X} from 'lucide-react';
import AccessibilityPanel from './accessibility';
import ReadingEffects from './reading-effects';
import SocialIcon, {socials} from './social-icon';
import ThemeToggle from './theme-toggle';

const links = [['/', 'Início'], ['/historia', 'História do Clube'], ['/noticias', 'Notícias'], ['/ingressos', 'Ingressos'], ['/loja', 'Loja do Tigre'], ['/contato', 'Fale Conosco']];
type Props = {path:string;count:number;signed:boolean;name:string;email:string;navigate:(path:string)=>void;logout:()=>void};

export default function ClubHeader({path,count,signed,name,email,navigate,logout}:Props){
  const [open,setOpen]=useState(false);
  const menuButton=useRef<HTMLButtonElement>(null);
  const account=useRef<HTMLDetailsElement>(null);
  useEffect(()=>{setOpen(false);if(account.current)account.current.open=false;},[path]);
  const navLink=(href:string,label:React.ReactNode,className='')=>{const active=href==='/'?path==='/':path===href||path.startsWith(href+'/');return <a href={href} className={className} aria-label={href==='/carrinho'?`Carrinho com ${count} ${count===1?'item':'itens'}`:undefined} aria-current={active?'page':undefined} onClick={event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();setOpen(false);if(account.current)account.current.open=false;navigate(href);}}>{label}</a>};
  const socialLinks=(compact=false)=><div className={'club-socials'+(compact?' compact':'')} aria-label="Redes sociais oficiais">{socials.map(social=><a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} oficial do São Bernardo FC`}><SocialIcon network={social.network}/><span className="social-label">{social.label}</span></a>)}</div>;
  return <>
    <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
    <div className="academic-note">PROJETO ACADÊMICO · TCC <span>São Bernardo Futebol Clube</span></div>
    <header className="club-header" onKeyDown={event=>{if(event.key!=='Escape')return;if(open){setOpen(false);menuButton.current?.focus();}else if(account.current?.open){account.current.open=false;account.current.querySelector('summary')?.focus();}}}>
      <div className="club-utility"><div className="utility-left"><AccessibilityPanel/>{socialLinks()}</div><div className="utility-right"><ThemeToggle/>{navLink('/carrinho',<><ShoppingBag size={18}/><span>Carrinho</span><b>{count}</b></>,'club-cart')}<div className="club-account"><details ref={account}><summary aria-label="Abrir menu da conta" onClick={()=>setOpen(false)}><User size={20}/><span>{signed?name.split(' ')[0]:'Entrar / Cadastrar'}</span></summary><div className="club-account-popup"><strong>{signed?name:'Área do torcedor'}</strong>{signed?<><small>{email}</small>{navLink('/perfil','Minha conta')}{navLink('/pedidos','Meus pedidos')}<button onClick={()=>{if(account.current)account.current.open=false;logout();}}><LogOut size={16}/> Sair</button></>:<>{navLink('/login','Entrar')}{navLink('/cadastro','Cadastrar')}</>}</div></details></div></div></div>
      {navLink('/',<img src="/assets/crest.png" alt="São Bernardo Futebol Clube · início" width="110" height="130"/>,'club-crest')}
      <div className="club-navigation-row">
        <button ref={menuButton} className="club-menu-toggle" onClick={()=>{setOpen(!open);if(account.current)account.current.open=false;}} aria-label={open?'Fechar menu':'Abrir menu'} aria-controls="club-navigation" aria-expanded={open}>{open?<X/>:<Menu/>}<span>Menu</span></button>
        <nav className={'club-navigation '+(open?'is-open':'')} id="club-navigation" aria-label="Navegação principal"><div className="club-nav-left">{links.slice(0,3).map(([href,label])=><span key={href}>{navLink(href,label)}</span>)}</div><div className="club-nav-right">{links.slice(3).map(([href,label])=><span key={href}>{navLink(href,label)}</span>)}</div><div className="drawer-extras">{socialLinks(true)}</div></nav>
      </div>
      <ReadingEffects path={path}/>
    </header>
  </>;
}
