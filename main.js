(()=>{
const d=document,root=d.documentElement;root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$=(s,c=d)=>[...c.querySelectorAll(s)];

/* theme */
const tb=d.getElementById('theme');
const sysDark=()=>matchMedia('(prefers-color-scheme: dark)').matches;
const cur=()=>root.dataset.theme||(sysDark()?'dark':'light');
const label=()=>tb.setAttribute('aria-label',cur()==='dark'?'Switch to light theme':'Switch to dark theme');
label();
tb.addEventListener('click',()=>{const n=cur()==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}label()});

/* words */
$$('.reveal-words').forEach(p=>{p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span>').join(' ')});
const words=$$('.reveal-words .w');

/* heatmap */
const heat=d.getElementById('heat');
if(heat){const lv=heat.dataset.levels,start=new Date(heat.dataset.start+'T00:00:00Z');let h='';for(let i=0;i<start.getUTCDay();i++)h+='<i style="visibility:hidden"></i>';
for(let i=0;i<lv.length;i++)h+='<i data-l="'+lv[i]+'"></i>';heat.innerHTML=h;heat.scrollLeft=heat.scrollWidth}

/* counters */
const fmt=n=>n.toLocaleString('en-US');
const count=el=>{const to=+el.dataset.to;if(RM){el.textContent=fmt(to);return}const t0=performance.now(),dur=1400;
const f=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(Math.round(to*e));if(k<1)requestAnimationFrame(f)};el.textContent='0';requestAnimationFrame(f)};

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');$$('.count',t).forEach(count);if(t.classList.contains('count'))count(t);io.unobserve(t)}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.reveal').forEach(el=>io.observe(el));
$$('.count').filter(c=>!c.closest('.reveal')).forEach(c=>io.observe(c));

/* chat */
const bubbles=$$('.chat .b');let bi=0,timer=null;
const showUpTo=n=>bubbles.forEach((b,i)=>{b.classList.toggle('show',i<=n);if(i<=n)requestAnimationFrame(()=>b.classList.add('vis'));else b.classList.remove('vis')});
const play=()=>{if(timer)return;timer=setInterval(()=>{bi++;if(bi>=bubbles.length+2){bi=0}showUpTo(Math.min(bi,bubbles.length-1));if(bi===0)bubbles.forEach((b,i)=>{if(i>0)b.classList.remove('show','vis')})},1500)};
const stop=()=>{clearInterval(timer);timer=null};
const phone=d.querySelector('.sticky-phone');
if(phone&&!RM){showUpTo(0);new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?play():stop()),{threshold:.3}).observe(phone)}

/* uwb tag */
const tag=d.querySelector('.tag'),rays=$$('.ray');
if(tag&&!RM){let vis=false;new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)requestAnimationFrame(mv)}).observe(tag.closest('svg'));
 const t0=performance.now();const mv=t=>{if(!vis)return;const k=(t-t0)/1000;const x=200+120*Math.sin(k*.7)+30*Math.sin(k*1.9),y=130+70*Math.sin(k*1.1+1);
 tag.setAttribute('cx',x.toFixed(1));tag.setAttribute('cy',y.toFixed(1));rays.forEach(r=>{r.setAttribute('x2',x.toFixed(1));r.setAttribute('y2',y.toFixed(1))});requestAnimationFrame(mv)}}

/* nav active */
const links=$$('.island ul a');const secs=links.map(a=>d.querySelector(a.getAttribute('href')));
const steps=$$('.step');

/* scroll loop */
let ticking=false;
const onScroll=()=>{ticking=false;const vh=innerHeight;
  if(!RM){
    words.forEach(w=>{const r=w.getBoundingClientRect();w.classList.toggle('lit',r.top<vh*.62)});
    $$('.chapter').forEach(c=>{const r=c.getBoundingClientRect();const p=Math.max(0,Math.min(1,1-(r.top+r.height/2)/(vh+r.height/2)));const t=c.firstElementChild;
      const s=.6+Math.min(p*2,1)*.4;t.style.setProperty('--s',s.toFixed(3));t.style.setProperty('--o',Math.min(1,p*3).toFixed(2))});
    steps.forEach(s=>{const r=s.getBoundingClientRect();s.classList.toggle('on',r.top<vh*.6&&r.bottom>vh*.35)});
  }
  let act=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<vh*.4)act=i});
  // a section counts until the next chapter begins
  links.forEach((a,i)=>{a.classList.toggle('on',i===act);if(i===act)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
};
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
addEventListener('resize',onScroll);onScroll();
})();
