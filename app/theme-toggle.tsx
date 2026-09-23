'use client';

import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';

type Theme='dark'|'light';
const themeKey='sbfc-theme-v1';
const legacyKey='sbfc-accessibility-v1';

export default function ThemeToggle(){
  const [theme,setTheme]=useState<Theme>('dark');
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    let next:Theme='dark';
    try{
      const saved=localStorage.getItem(themeKey);
      const legacy=JSON.parse(localStorage.getItem(legacyKey)||'null');
      if(saved==='dark'||saved==='light')next=saved;
      else if(legacy?.appearance==='dark'||legacy?.appearance==='light')next=legacy.appearance;
      else if(window.matchMedia?.('(prefers-color-scheme: light)').matches)next='light';
    }catch{}
    setTheme(next);setReady(true);
  },[]);
  useEffect(()=>{if(!ready)return;document.documentElement.dataset.theme=theme;document.documentElement.dataset.appearance=theme;try{localStorage.setItem(themeKey,theme)}catch{}},[theme,ready]);
  const next=theme==='dark'?'light':'dark';
  const label=`Ativar modo ${next==='dark'?'escuro':'claro'}`;
  return <button className="theme-toggle" type="button" aria-label={label} title={label} onClick={()=>setTheme(next)}>{theme==='dark'?<Sun aria-hidden="true"/>:<Moon aria-hidden="true"/>}</button>;
}
