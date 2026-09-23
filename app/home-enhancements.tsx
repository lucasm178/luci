'use client';

import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {ArrowLeft,ArrowRight} from 'lucide-react';

export default function HomeEnhancements({path}:{path:string}){
  const [grid,setGrid]=useState<HTMLElement|null>(null);
  const [main,setMain]=useState<HTMLElement|null>(null);
  const [canPrev,setCanPrev]=useState(false);
  const [canNext,setCanNext]=useState(false);
  useEffect(()=>{if(path!=='/'){setGrid(null);setMain(null);return}setGrid(document.querySelector<HTMLElement>('.squad-grid'));setMain(document.querySelector<HTMLElement>('#main-content'));},[path]);
  useEffect(()=>{if(!grid)return;const update=()=>{setCanPrev(grid.scrollLeft>4);setCanNext(grid.scrollLeft+grid.clientWidth<grid.scrollWidth-4)};update();grid.addEventListener('scroll',update,{passive:true});const resize=new ResizeObserver(update);resize.observe(grid);return()=>{grid.removeEventListener('scroll',update);resize.disconnect();};},[grid]);
  const move=(direction:number)=>{if(!grid)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='reduced';grid.scrollBy({left:direction*Math.max(250,grid.clientWidth*.72),behavior:reduced?'auto':'smooth'});};
  if(path!=='/'||!grid||!main)return null;
  return <>{createPortal(<div className="squad-controls" aria-label="Navegação do elenco"><button onClick={()=>move(-1)} disabled={!canPrev} aria-label="Ver jogadores anteriores"><ArrowLeft/></button><span>Deslize para conhecer o elenco</span><button onClick={()=>move(1)} disabled={!canNext} aria-label="Ver próximos jogadores"><ArrowRight/></button></div>,grid.parentElement!)}{createPortal(<section className="home-stadium-numbers" aria-labelledby="home-stadium-title"><div><span className="eyebrow">PRIMEIRO DE MAIO</span><h2 id="home-stadium-title">Nossa casa em números.</h2></div><dl><div><dt>12.578</dt><dd>Capacidade liberada</dd></div><div><dt>15.759</dt><dd>Capacidade estrutural</dd></div><div><dt>1968</dt><dd>Inauguração</dd></div></dl></section>,main)}</>;
}
