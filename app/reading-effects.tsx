'use client';
import {useEffect, useRef, useState} from 'react';
import {ArrowUp} from 'lucide-react';
import HomeEnhancements from './home-enhancements';

export default function ReadingEffects({path}:{path:string}) {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{
    let frame = 0;
    const timeline = document.querySelector<HTMLElement>('.history-track');
    const header = document.querySelector<HTMLElement>('.club-header');
    const update = ()=>{
      frame = 0;
      const range = document.documentElement.scrollHeight-window.innerHeight;
      const progress = range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
      if(bar.current){bar.current.style.setProperty('--read',String(progress));bar.current.setAttribute('aria-valuenow',String(Math.round(progress*100)));}
      if(header) document.documentElement.style.setProperty('--header-height',header.offsetHeight+'px');
      if(timeline){const r=timeline.getBoundingClientRect();const p=Math.max(0,Math.min(1,(window.innerHeight*.68-r.top)/r.height));timeline.style.setProperty('--timeline-progress',String(p));}
      setShowTop(window.scrollY>480);
    };
    const schedule = ()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
    const resize = new ResizeObserver(schedule);resize.observe(document.body);if(header)resize.observe(header);
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[path]);
  return <><div ref={bar} className="reading-progress" role="progressbar" aria-label="Progresso de leitura da página" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span/></div><HomeEnhancements path={path}/><button className={'back-to-top '+(showTop?'is-visible':'')} aria-label="Voltar ao início da página" tabIndex={showTop?0:-1} onClick={()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='reduced';window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});}}><ArrowUp/></button></>;
}
