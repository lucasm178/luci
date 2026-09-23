type Milestone={period:string;year:string;title:string;text:string};
type Period={id:string;label:string};
export default function HistoryTimeline({items,periods}:{items:Milestone[];periods:Period[]}){
  const pairs=Array.from({length:Math.ceil(items.length/2)},(_,i)=>items.slice(i*2,i*2+2));
  return <section className="history-journey" aria-labelledby="journey-title"><div className="journey-heading" data-reveal="up"><div><span className="eyebrow">CADA PASSO, UM NOVO CAPÍTULO</span><h2 id="journey-title">Do ABC.<br/><em>Para o Brasil.</em></h2></div><div><p>Acompanhe os acessos, as conquistas e os momentos que construíram o caminho do Tigre.</p><nav aria-label="Períodos da história" className="journey-periods">{periods.map(p=><a key={p.id} href={'#'+p.id}>{p.label} <span aria-hidden="true">↓</span></a>)}</nav></div></div>
    <div className="history-track"><span className="track-line" aria-hidden="true"><i/></span>{pairs.map((pair,index)=><section className={'history-pair '+(index%2?'reverse tone-dark':'tone-light')} key={pair[0].year} aria-label={'Marcos de '+pair.map(m=>m.year).join(' e ')}>
      <div className="pair-copy">{pair.map(item=><article className="history-milestone" key={item.year} id={items.find(i=>i.period===item.period)===item?item.period:undefined} data-reveal={index%2?'right':'left'}><time dateTime={item.year}>{item.year}</time><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      <figure className={'pair-image '+(index%2?'identity-image':'')} data-reveal="image"><img src={index%2?'/assets/crest.png':'/assets/stadium.jpg'} alt={index%2?'Escudo do São Bernardo FC':'Campo e arquibancadas do Estádio Primeiro de Maio'} loading="lazy" width="700" height="550"/><figcaption>{index%2?'O símbolo que nos representa.':'Primeiro de Maio. A casa do Tigre.'}<span>Imagem de referência atual · não é registro da época</span></figcaption></figure>
    </section>)}</div>
  </section>;
}
