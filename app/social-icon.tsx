export type SocialNetwork='instagram'|'facebook'|'x';
export const socials:{network:SocialNetwork;label:string;href:string}[]=[
  {network:'instagram',label:'Instagram',href:'https://www.instagram.com/saobernardo_fc/'},
  {network:'facebook',label:'Facebook',href:'https://www.facebook.com/saobernardofutebolclube'},
  {network:'x',label:'X',href:'https://x.com/saobernardofc'},
];
const paths:Record<SocialNetwork,string>={instagram:'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 1.5a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',facebook:'M13.6 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8h1.9V2.4a25 25 0 0 0-2.8-.2c-2.8 0-4.8 1.7-4.8 4.9v2.4H6.5V13h3.2v9h3.9Z',x:'M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.3L3.2 2h6.3l4.3 5.7L18.9 2Zm-1.1 17.9h1.7L8.6 4H6.8l11 15.9Z'};
export default function SocialIcon({network}:{network:SocialNetwork}){return <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={paths[network]}/></svg>}
