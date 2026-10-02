(()=>{
const $=id=>document.getElementById(id);
const KM='lwsm.memos',KC='lwsm.cur';
const ed=$('ed'),pv=$('pv'),sw=$('sw'),bg=$('bg'),bar=$('bar'),box=$('content');
const dF=$('dFind'),kw=$('kw'),rp=$('rp'),all=$('all'),st=$('st');
const dL=$('dList'),fl=$('fl'),ul=$('ul');
let memos=[],cur,preview=true,timer,sel=0,view=[];
try{memos=JSON.parse(localStorage.getItem(KM)||'[]')}catch(e){}

const newMemo=()=>({id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),text:'',bg:'',updated:Date.now()});
const strip=l=>l.replace(/<[^>]*>/g,'').replace(/^[\s#>*\-+`_~|=]+/,'').trim();
const title=t=>{for(const l of t.split('\n')){const s=strip(l);if(s)return s.slice(0,80)}return''};
const isHtml=t=>/^\s*<(!doctype|html|head|body|[a-z][\w-]*)[\s>\/]/i.test(t);
const fg=c=>{const n=parseInt(c.slice(1),16);return((n>>16)*299+(n>>8&255)*587+(n&255)*114)/1000>150?'#111':'#f2f2f2'};
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

const persist=()=>{try{localStorage.setItem(KM,JSON.stringify(memos));localStorage.setItem(KC,cur.id)}catch(e){alert('Storage is full or unavailable.')}};
const save=()=>{clearTimeout(timer);if(!title(cur.text))return false;cur.updated=Date.now();if(!memos.includes(cur)){const i=memos.findIndex(m=>m.id===cur.id);i<0?memos.push(cur):memos[i]=cur}persist();return true};
const changed=()=>{cur.text=ed.value;clearTimeout(timer);timer=setTimeout(save,400)};

const clean=h=>{const d=new DOMParser().parseFromString(h,'text/html');
  d.querySelectorAll('script,style,iframe,object,embed,link,meta,base,form').forEach(e=>e.remove());
  d.body.querySelectorAll('*').forEach(e=>{[...e.attributes].forEach(a=>{const n=a.name.toLowerCase();
    if(n.startsWith('on')||(/^(href|src|xlink:href|action|formaction)$/.test(n)&&/^\s*(javascript:|data:text\/html)/i.test(a.value)))e.removeAttribute(a.name)});
    if(e.tagName==='A'&&!(e.getAttribute('href')||'').startsWith('#')){e.target='_blank';e.rel='noopener noreferrer'}});
  return d.body.innerHTML};
const render=t=>clean(isHtml(t)?t:(window.marked?marked.parse(t,{gfm:true,breaks:true}):'<pre>'+esc(t)+'</pre>'));

const applyBg=()=>{const c=cur.bg;box.style.background=c;box.style.color=c?fg(c):'';box.style.setProperty('--link',c?fg(c):'');
  bg.value=c||(matchMedia('(prefers-color-scheme:dark)').matches?'#171d1a':'#ffffff')};
const setMode=(p,focus)=>{preview=p;if(p)pv.innerHTML=render(cur.text);sw.checked=p;ed.hidden=p;pv.hidden=!p;bar.classList.remove('hide');if(!p&&focus)ed.focus()};
const load=(m,p)=>{cur=m;ed.value=m.text;applyBg();setMode(p);try{localStorage.setItem(KC,m.id)}catch(e){}};
const doNew=()=>{save();load(newMemo(),false);ed.focus()};

/* import / export */
const fi=document.createElement('input');fi.type='file';fi.accept='.md,.markdown,.txt,.html,.htm,text/*';
fi.onchange=async()=>{const f=fi.files[0];fi.value='';if(!f)return;const t=await f.text();
  if(!title(t)){alert('This file has no visible text, so it was not imported.');return}
  save();const m=newMemo();m.text=t;cur=m;save();load(m,true)};
const doImport=()=>fi.click();
const doExport=()=>{if(!title(cur.text)){alert('Add some text before exporting.');return}save();
  const h=isHtml(cur.text),a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([cur.text],{type:h?'text/html':'text/markdown'}));
  a.download=title(cur.text).replace(/[\\/:*?"<>|]/g,'_').slice(0,50)+(h?'.html':'.md');a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};

/* find & replace */
const stat=t=>st.textContent=t;
const openFind=()=>{if(!preview){const s=ed.value.slice(ed.selectionStart,ed.selectionEnd);if(s&&!s.includes('\n'))kw.value=s}
  if(!dF.open)dF.showModal();kw.focus();kw.select()};
const find=()=>{const k=kw.value;if(!k)return false;if(preview)setMode(false);
  const t=ed.value.toLowerCase(),q=k.toLowerCase();let i=t.indexOf(q,ed.selectionEnd);if(i<0)i=t.indexOf(q);
  if(i<0){stat('Not found');return false}
  ed.setSelectionRange(i,i+k.length);const ln=ed.value.slice(0,i).split('\n').length-1;
  ed.scrollTop=Math.max(0,ln*parseFloat(getComputedStyle(ed).lineHeight)-ed.clientHeight/2);stat('Found');return true};
const replace=()=>{const k=kw.value;if(!k)return;if(preview)setMode(false);const r=rp.value;
  if(all.checked){let n=0;ed.value=ed.value.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),()=>(n++,r));stat(n+' replaced');changed();return}
  const a=ed.selectionStart,b=ed.selectionEnd;
  if(a!==b&&ed.value.slice(a,b).toLowerCase()===k.toLowerCase()){ed.setRangeText(r,a,b,'end');changed()}
  find()};

/* list */
const drawList=()=>{const q=fl.value.trim().toLowerCase();
  view=memos.slice().sort((a,b)=>b.updated-a.updated).filter(m=>!q||m.text.toLowerCase().includes(q));
  sel=Math.max(0,Math.min(sel,view.length-1));ul.innerHTML='';
  view.forEach((m,i)=>{const li=document.createElement('li');if(i===sel)li.className='on';
    li.innerHTML='<span></span><button tabindex="-1" aria-label="Delete memo">×</button>';
    li.firstChild.textContent=title(m.text);li.onclick=()=>openMemo(m);
    li.lastChild.onclick=e=>{e.stopPropagation();del(m)};ul.append(li)});
  const on=ul.querySelector('.on');if(on)on.scrollIntoView({block:'nearest'})};
const openList=()=>{save();fl.value='';sel=0;drawList();if(!dL.open)dL.showModal();fl.focus()};
const openMemo=m=>{save();m.updated=Date.now();load(m,true);persist();dL.close()};
const del=m=>{if(!confirm('Delete "'+title(m.text)+'"?'))return;
  memos=memos.filter(x=>x.id!==m.id);
  if(cur.id===m.id){const n=memos.slice().sort((a,b)=>b.updated-a.updated)[0];n?load(n,true):load(newMemo(),false)}
  persist();drawList()};
const delAll=()=>{if(!memos.length||!confirm('Delete all '+memos.length+' memos?'))return;memos=[];load(newMemo(),false);persist();dL.close();ed.focus()};

/* events */
ed.addEventListener('input',changed);
sw.addEventListener('change',()=>setMode(sw.checked,true));
bg.addEventListener('input',()=>{cur.bg=bg.value;applyBg();changed()});
$('bRst').onclick=()=>{cur.bg='';applyBg();changed()};
$('bNew').onclick=doNew;$('bImp').onclick=doImport;$('bExp').onclick=doExport;$('bFind').onclick=openFind;$('bList').onclick=openList;
$('xF').onclick=()=>dF.close();$('xL').onclick=()=>dL.close();
$('bDoFind').onclick=find;$('bDoRep').onclick=replace;$('bDelAll').onclick=delAll;
kw.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();find()}});
rp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();replace()}});
fl.addEventListener('input',()=>{sel=0;drawList()});
dL.addEventListener('close',()=>{if(!preview)ed.focus()});
dL.addEventListener('keydown',e=>{if(e.isComposing)return;const k=e.key,inF=document.activeElement===fl;
  const mv=d=>{e.preventDefault();if(view.length){sel=(sel+d+view.length)%view.length;drawList()}};
  if(e.ctrlKey&&k==='n'||k==='ArrowDown')mv(1);
  else if(e.ctrlKey&&k==='p'||k==='ArrowUp')mv(-1);
  else if(k==='Delete'&&(!inF||fl.selectionStart===fl.value.length)){e.preventDefault();if(view[sel])del(view[sel])}
  else if((k===' '&&(!inF||!fl.value))||k==='Enter'){e.preventDefault();if(view[sel])openMemo(view[sel])}});
document.addEventListener('keydown',e=>{if(dL.open)return;const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();
  if(dF.open){if(c&&k==='f'){e.preventDefault();kw.focus();kw.select()}return}
  const run=f=>{e.preventDefault();f()};
  if(c&&k==='n')run(doNew);else if(c&&k==='o')run(doImport);else if(c&&k==='e')run(doExport);else if(c&&k==='f')run(openFind);
  else if(e.key==='F10')run(openList);else if(e.key==='F2')run(()=>setMode(!preview,true))});
pv.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||(a.getAttribute('href')||'').startsWith('#'))return;
  e.preventDefault();window.open(a.href,'_blank','noopener,noreferrer')});
let ly=0;const onScroll=e=>{const y=e.target.scrollTop;if(y>ly+8&&y>60)bar.classList.add('hide');else if(y<ly-8||y<=0)bar.classList.remove('hide');ly=y};
ed.addEventListener('scroll',onScroll);pv.addEventListener('scroll',onScroll);
const flush=()=>{if(cur&&!ed.hidden)cur.text=ed.value;if(cur)save()};
addEventListener('pagehide',flush);document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
new ResizeObserver(()=>box.style.setProperty('--hh',bar.offsetHeight+'px')).observe(bar);

/* start: last used memo, in preview */
const last=memos.find(m=>m.id===localStorage.getItem(KC))||memos.slice().sort((a,b)=>b.updated-a.updated)[0];
if(last)load(last,true);else{load(newMemo(),false);ed.focus()}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
