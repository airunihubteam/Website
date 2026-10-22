// Draws the brand star field behind an element. Deterministic (seeded) so re-renders match.
// Usage: starfield(document.body, {density: 1, seed: 42})
function starfield(el,{density=1,seed=42}={}){
  const r=el.getBoundingClientRect(),d=3,c=document.createElement('canvas');
  c.width=r.width*d;c.height=r.height*d;
  c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
  const x=c.getContext('2d');let s=seed;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
  const n=Math.round(r.width*r.height/3000*density);
  for(let i=0;i<n;i++){x.globalAlpha=.15+rnd()*.45;x.fillStyle='#fff';x.beginPath();
    x.arc(rnd()*c.width,rnd()*c.height,(rnd()*1.1+.35)*d,0,6.29);x.fill()}
  if(getComputedStyle(el).position==='static')el.style.position='relative';
  el.prepend(c);
}
