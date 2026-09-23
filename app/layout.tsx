import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';
export const metadata: Metadata = {title:'São Bernardo FC | A nossa garra',description:'Protótipo acadêmico privado do São Bernardo FC. Notícias, Loja do Tigre e ingressos com compra simulada.',robots:{index:false,follow:false},icons:{icon:'/assets/crest.png'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="pt-BR"><body>{children}</body></html>;}

