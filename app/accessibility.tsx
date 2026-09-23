'use client';

import {useEffect, useState} from 'react';
import {Accessibility, Minus, Plus, RotateCcw, X} from 'lucide-react';
import {Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose} from '@/components/ui/dialog';

type Preferences = {color:string;contrast:string;scale:number;spacing:boolean;links:boolean;motion:boolean};
const defaults:Preferences={color:'standard',contrast:'standard',scale:100,spacing:false,links:false,motion:false};
const key = 'sbfc-accessibility-v2';
const legacyKey = 'sbfc-accessibility-v1';
const colors = [['standard','Padrão · preto e amarelo'],['protanopia','Protanopia · azul e amarelo'],['deuteranopia','Deuteranopia · azul e dourado'],['tritanopia','Tritanopia · violeta e branco']];

export default function AccessibilityPanel() {
  const [prefs,setPrefs] = useState(defaults);
  const [ready,setReady] = useState(false);
  const [saved,setSaved] = useState('');
  useEffect(()=>{
    try {
      const p = JSON.parse(localStorage.getItem(key)||localStorage.getItem(legacyKey)||'null');
      if(p) setPrefs({color:colors.some(c=>c[0]===p.color)?p.color:'standard',contrast:['standard','high','soft'].includes(p.contrast)?p.contrast:'standard',scale:[100,110,120,130,140,150].includes(p.scale)?p.scale:100,spacing:p.spacing===true,links:p.links===true,motion:p.motion===true});
    } catch {}
    setReady(true);
  },[]);
  useEffect(()=>{
    if(!ready) return;
    const root = document.documentElement;
    root.dataset.color = prefs.color;
    root.dataset.contrast = prefs.contrast;
    root.dataset.spacing = String(prefs.spacing);
    root.dataset.links = String(prefs.links);
    root.dataset.motion = prefs.motion?'reduced':'device';
    root.dataset.largeText = String(prefs.scale>=130);
    root.style.fontSize = prefs.scale+'%';
    try {
      localStorage.setItem(key,JSON.stringify(prefs));
    } catch {setSaved('Ajustes aplicados. Este navegador não permitiu salvá-los.');}
  },[prefs,ready]);
  const update = <K extends keyof Preferences>(name:K,value:Preferences[K])=>{setPrefs(p=>({...p,[name]:value}));setSaved('Preferências aplicadas.');};
  return <Dialog>
    <DialogTrigger className="access-trigger" aria-label="Acessibilidade"><Accessibility size={20}/><span>Acessibilidade</span></DialogTrigger>
    <DialogContent className="access-panel" showCloseButton={false}>
      <div className="access-heading"><div><span className="eyebrow">DO SEU JEITO</span><DialogTitle>Acessibilidade</DialogTitle></div><DialogClose className="access-close" aria-label="Fechar acessibilidade"><X/></DialogClose></div>
      <DialogDescription>Ajuste sua leitura. As preferências valem para todas as páginas e ficam salvas neste navegador.</DialogDescription>
      <label className="field">Cores da interface<select value={prefs.color} onChange={e=>update('color',e.target.value)}>{colors.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="field">Contraste<select value={prefs.contrast} onChange={e=>update('contrast',e.target.value)}><option value="standard">Padrão</option><option value="high">Alto contraste</option><option value="soft">Contraste suave</option></select></label>
      <p className="access-note">A paleta muda os destaques; o contraste ajusta fundos e textos. Fotografias e escudo mantêm suas cores.</p>
      <fieldset><legend>Tamanho do texto</legend><div className="text-size"><button aria-label="Diminuir texto" disabled={prefs.scale===100} onClick={()=>update('scale',prefs.scale-10)}><Minus/></button><output aria-live="polite">{prefs.scale}%</output><button aria-label="Aumentar texto" disabled={prefs.scale===150} onClick={()=>update('scale',prefs.scale+10)}><Plus/></button></div></fieldset>
      <label className="access-toggle"><span>Ampliar espaçamento<small>Mais espaço entre linhas e letras</small></span><input type="checkbox" checked={prefs.spacing} onChange={e=>update('spacing',e.target.checked)}/></label>
      <label className="access-toggle"><span>Sublinhar links</span><input type="checkbox" checked={prefs.links} onChange={e=>update('links',e.target.checked)}/></label>
      <label className="access-toggle"><span>Reduzir movimento<small>Sem animações ou transições decorativas</small></span><input type="checkbox" checked={prefs.motion} onChange={e=>update('motion',e.target.checked)}/></label>
      <p className="access-note">A preferência de reduzir movimentos do seu dispositivo é sempre respeitada.</p>
      <button className="button secondary" onClick={()=>{setPrefs({...defaults});setSaved('Ajustes de acessibilidade restaurados.');}}><RotateCcw size={17}/> Restaurar padrão</button>
      <p className="access-status" role="status">{saved}</p>
    </DialogContent>
  </Dialog>;
}
