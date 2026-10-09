(()=>{
const $=id=>document.getElementById(id);
const KM='lwsm.memos',KC='lwsm.cur';
const ed=$('ed'),pv=$('pv'),sw=$('sw'),bg=$('bg'),bar=$('bar'),box=$('content');
const dF=$('dFind'),kw=$('kw'),rp=$('rp'),all=$('all'),cs=$('cs'),st=$('st');
const dS=$('dSet'),fsr=$('fs');
const dD=$('dData'),dG=$('dTags'),gc=$('gc'),gs=$('gs'),gi=$('gi'),dM=$('dMng'),mg=$('mg'),dR=$('dRest'),tl=$('tl');
const dT=$('dTitle'),ti=$('ti'),tt=$('ttl');
const dL=$('dList'),fl=$('fl'),ul=$('ul');
let ly=0,memos=[],cur,tagSel=new Set(),rest=null,preview=true,timer,sel=0,view=[];
try{memos=JSON.parse(localStorage.getItem(KM)||'[]')}catch(e){}

const newMemo=()=>({id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),text:'',bg:'',updated:Date.now()});
const strip=l=>l.replace(/<[^>]*>/g,'').replace(/^[\s#>*\-+`_~|=]+/,'').trim();
const title=t=>{for(const l of t.split('\n')){const s=strip(l);if(s)return s.slice(0,80)}return''};
const ttl=m=>m.name||title(m.text);
const BASE='Light Weight Simple Memo';
const setTitle=()=>{const t=cur&&ttl(cur);document.title=t?t+' - '+BASE:BASE;const h=$('ttl');h.textContent=t||'Untitled';h.title=t?t+'\n(Double-click or Alt+R to rename)':'';h.style.opacity=t?'':'.5';
  const g=$('tgs'),tg=(cur&&cur.tags)||[];g.textContent=tg.map(x=>'#'+x).join(' ');g.title=tg.length?'Tags: '+tg.join(', ')+' (click to edit)':''};
const isHtml=t=>/^\s*<(!doctype|html|head|body|[a-z][\w-]*)[\s>\/]/i.test(t);
const fg=c=>{const n=parseInt(c.slice(1),16);return((n>>16)*299+(n>>8&255)*587+(n&255)*114)/1000>150?'#111':'#f2f2f2'};
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

const persist=()=>{try{localStorage.setItem(KM,JSON.stringify(memos));localStorage.setItem(KC,cur.id)}catch(e){alert('Storage is full or unavailable.')}};
const save=()=>{clearTimeout(timer);if(!title(cur.text))return false;cur.updated=Date.now();if(!memos.includes(cur)){const i=memos.findIndex(m=>m.id===cur.id);i<0?memos.push(cur):memos[i]=cur}persist();return true};
const changed=()=>{cur.text=ed.value;setTitle();clearTimeout(timer);timer=setTimeout(save,400)};

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
const load=(m,p)=>{cur=m;setTitle();ed.value=m.text;applyBg();ed.hidden=pv.hidden=false;ed.scrollTop=pv.scrollTop=0;ly=0;setMode(p);try{localStorage.setItem(KC,m.id)}catch(e){}};
const rotate=d=>{save();if(!memos.length)return;const i=memos.findIndex(m=>m.id===cur.id);
  const n=memos[i<0?(d>0?0:memos.length-1):(i+d+memos.length)%memos.length];
  if(n.id===cur.id)return;n.updated=Date.now();load(n,preview);persist()};
const doNew=()=>{save();load(newMemo(),false);ed.focus()};

/* import / export */
const fi=document.createElement('input');fi.type='file';fi.accept='.md,.markdown,.txt,.html,.htm,.json,text/*';
fi.multiple=true;
const importFile=async f=>{
  if(/\.json$/i.test(f.name)){const p=parseBackup(await f.text());if(!p){alert('This is not a valid LWSM backup file: '+f.name);return}startRestore(p);return}
  if(!/\.(md|markdown|txt|html?)$/i.test(f.name)&&!(f.type||'').startsWith('text/')){alert('Only Markdown, HTML, and text files can be opened: '+f.name);return}
  const t=await f.text();
  if(!title(t)){alert('This file has no visible text, so it was not imported: '+f.name);return}
  save();const m=newMemo();m.text=t;m.name=f.name.replace(/\.[^.]+$/,'');cur=m;save();load(m,true)};
fi.onchange=async()=>{const fs=[...fi.files];fi.value='';for(const f of fs)await importFile(f)};
const doImport=()=>fi.click();
const doExport=()=>{if(!title(cur.text)){alert('Add some text before exporting.');return}save();
  const h=isHtml(cur.text),a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([cur.text],{type:h?'text/html':'text/markdown'}));
  a.download=ttl(cur).replace(/[\\/:*?"<>|]/g,'_').slice(0,50)+(h?'.html':'.md');a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};

/* find & replace */
const stat=t=>st.textContent=t;
const openFind=()=>{if(!preview){const s=ed.value.slice(ed.selectionStart,ed.selectionEnd);if(s&&!s.includes('\n'))kw.value=s}
  if(!dF.open)dF.show();kw.focus();kw.select()};
/* y position of a character offset inside the textarea (accounts for soft wraps) */
const yOf=i=>{const cs=getComputedStyle(ed),m=document.createElement('div');
  m.style.cssText='position:absolute;visibility:hidden;top:0;left:0;box-sizing:border-box;white-space:pre-wrap;overflow-wrap:break-word;width:'+ed.clientWidth+'px';
  ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','paddingLeft','paddingRight','tabSize'].forEach(p=>m.style[p]=cs[p]);
  m.textContent=ed.value.slice(0,i);const s=document.createElement('span');s.textContent='|';m.append(s);document.body.append(m);
  const y=s.offsetTop+(parseFloat(cs.paddingTop)||0);m.remove();return y};
/* select the hit in the editor so it is highlighted, keep the dialog open, scroll the hit below the dialog */
const showHit=(i,len)=>{
  if(matchMedia('(pointer:coarse)').matches)ed.readOnly=true;  /* no soft keyboard while searching */
  ed.focus({preventScroll:true});ed.setSelectionRange(i,i+len);
  const db=dF.open?dF.getBoundingClientRect().bottom-ed.getBoundingClientRect().top:0;
  const want=Math.min(Math.max(db+28,ed.clientHeight*.4),ed.clientHeight-120);
  ed.scrollTop=Math.max(0,yOf(i)-want)};
const find=()=>{const k=kw.value;if(!k)return false;if(preview)setMode(false);
  const t=cs.checked?ed.value:ed.value.toLowerCase(),q=cs.checked?k:k.toLowerCase();let i=t.indexOf(q,ed.selectionEnd);if(i<0)i=t.indexOf(q);
  if(i<0){stat('Not found');return false}
  showHit(i,k.length);stat('Found');return true};
const replace=()=>{const k=kw.value;if(!k)return;if(preview)setMode(false);const r=rp.value;
  if(all.checked){let n=0;ed.value=ed.value.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),cs.checked?'g':'gi'),()=>(n++,r));stat(n+' replaced');changed();return}
  const a=ed.selectionStart,b=ed.selectionEnd;
  if(a!==b&&(cs.checked?ed.value.slice(a,b)===k:ed.value.slice(a,b).toLowerCase()===k.toLowerCase())){ed.setRangeText(r,a,b,'end');changed()}
  find()};

/* list */
const drawList=()=>{const q=fl.value.trim().toLowerCase();drawTagBar();
  view=memos.slice().sort((a,b)=>b.updated-a.updated).filter(m=>(!q||ttl(m).toLowerCase().includes(q)||m.text.toLowerCase().includes(q))&&[...tagSel].every(k=>hasTag(m,k)));
  sel=Math.max(0,Math.min(sel,view.length-1));ul.innerHTML='';
  view.forEach((m,i)=>{const li=document.createElement('li');if(i===sel)li.className='on';
    li.innerHTML='<span><b></b><i></i></span><button tabindex="-1" aria-label="Delete memo">×</button>';
    li.firstChild.firstChild.textContent=ttl(m);li.firstChild.lastChild.textContent=(m.tags||[]).map(t=>'#'+t).join(' ');li.onclick=()=>openMemo(m);
    li.lastChild.onclick=e=>{e.stopPropagation();del(m)};ul.append(li)});
  const on=ul.querySelector('.on');if(on)on.scrollIntoView({block:'nearest'})};
const openList=()=>{save();fl.value='';sel=0;drawList();if(!dL.open)dL.showModal();fl.focus()};
const openMemo=m=>{save();m.updated=Date.now();load(m,true);persist();dL.close()};
const del=m=>{if(!confirm('Delete "'+(ttl(m)||'this memo')+'"?'))return;
  memos=memos.filter(x=>x.id!==m.id);
  if(cur.id===m.id){const n=memos.slice().sort((a,b)=>b.updated-a.updated)[0];n?load(n,true):load(newMemo(),false)}
  persist();drawList()};
const doDelete=()=>{if(!cur.text&&!memos.some(m=>m.id===cur.id))return;del(cur)};
const delAll=()=>{if(!memos.length||!confirm('Delete all '+memos.length+' memos?'))return;memos=[];load(newMemo(),false);persist();dL.close();ed.focus()};

/* events */
ed.addEventListener('input',changed);
ed.addEventListener('focus',()=>{if(!ed.readOnly)document.body.classList.add('editing')});
ed.addEventListener('blur',()=>{ed.readOnly=false;document.body.classList.remove('editing')});
ed.addEventListener('pointerdown',()=>{if(ed.readOnly){ed.readOnly=false;ed.blur()}});
$('done').onclick=()=>ed.blur();
sw.addEventListener('change',()=>setMode(sw.checked,true));
bg.addEventListener('input',()=>{cur.bg=bg.value;applyBg();changed()});
$('bRst').onclick=()=>{cur.bg='';applyBg();changed()};
$('bNew').onclick=doNew;$('bImp').onclick=doImport;$('bExp').onclick=doExport;$('bDel').onclick=doDelete;$('bPrev').onclick=()=>rotate(-1);$('bNext').onclick=()=>rotate(1);$('bFind').onclick=openFind;$('bList').onclick=openList;
$('xF').onclick=()=>dF.close();$('xL').onclick=()=>dL.close();
$('bDoFind').onclick=find;$('bDoRep').onclick=replace;$('bDelAll').onclick=delAll;
kw.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();find()}});
rp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();replace()}});
fl.addEventListener('input',()=>{sel=0;drawList()});
dL.addEventListener('close',()=>{if(!preview)ed.focus()});
dL.addEventListener('keydown',e=>{if(e.isComposing)return;
  if(e.altKey&&/^Digit[0-9]$/.test(e.code)){e.preventDefault();const d=+e.code.slice(5);if(d===0)tagSel.clear();else{const t=allTags()[d-1];if(t)toggleTag(t.t)}sel=0;drawList();return}const k=e.key,inF=document.activeElement===fl;
  const mv=d=>{e.preventDefault();if(view.length){sel=(sel+d+view.length)%view.length;drawList()}};
  if(e.ctrlKey&&k==='n'||k==='ArrowDown')mv(1);
  else if(e.ctrlKey&&k==='p'||k==='ArrowUp')mv(-1);
  else if(k==='Delete'&&(!inF||fl.selectionStart===fl.value.length)){e.preventDefault();if(view[sel])del(view[sel])}
  else if((k===' '&&(!inF||!fl.value))||k==='Enter'){e.preventDefault();if(view[sel])openMemo(view[sel])}});
/* bracket keys differ by keyboard layout and Option on macOS, so map by layout */
const kc={'[':'BracketLeft',']':'BracketRight'};
if(navigator.keyboard&&navigator.keyboard.getLayoutMap)navigator.keyboard.getLayoutMap().then(m=>{for(const[c,v]of m)if(v==='['||v===']')kc[v]=c}).catch(()=>{});
document.addEventListener('keydown',e=>{if(dL.open||dT.open||dG.open||dM.open||dR.open||dD.open)return;const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();
  if(e.altKey&&!c&&(e.code==='Comma'||e.code==='Period')){e.preventDefault();fsStep(e.code==='Comma'?-1:1);return}
  if(dS.open){if(e.key==='Escape'){e.preventDefault();dS.close()}return}
  if(dF.open){if(e.key==='F9'){e.preventDefault();kw.focus();kw.select()}else if(e.key==='Escape'){e.preventDefault();dF.close()}return}
  const run=f=>{e.preventDefault();f()},al=e.altKey&&!c,ak=x=>al&&e.code===x,kb=x=>e.key===x||e.code===kc[x];
  if(e.key==='F11')run(doNew);else if(c&&k==='o')run(doImport);else if(c&&k==='s')run(doExport);else if(e.key==='F9')run(openFind);
  else if(al&&kb(']'))run(()=>rotate(1));else if(al&&kb('['))run(()=>rotate(-1));else if(al&&e.key==='Delete')run(doDelete);else if(al&&(k==='r'||e.code==='KeyR'))run(openTitle);else if(ak('KeyT'))run(openTags);else if(ak('KeyM'))run(openMng);else if(ak('KeyB'))run(doBackup);else if(ak('KeyO'))run(openRestore);else if(ak('KeyD'))run(openData);else if(e.key==='F10')run(openList);else if(e.key==='F2')run(()=>setMode(!preview,true))});
pv.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||(a.getAttribute('href')||'').startsWith('#'))return;
  e.preventDefault();window.open(a.href,'_blank','noopener,noreferrer')});
const onScroll=e=>{const y=e.target.scrollTop;if(y>ly+8&&y>60)bar.classList.add('hide');else if(y<ly-8||y<=0)bar.classList.remove('hide');ly=y};
ed.addEventListener('scroll',onScroll);pv.addEventListener('scroll',onScroll);
const flush=()=>{if(cur&&!ed.hidden)cur.text=ed.value;if(cur)save()};
addEventListener('pagehide',flush);document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
new ResizeObserver(()=>box.style.setProperty('--hh',bar.offsetHeight+'px')).observe(bar);

/* drag & drop files */
let dc=0;const hasF=e=>e.dataTransfer&&[...e.dataTransfer.types].includes('Files');
addEventListener('dragenter',e=>{if(!hasF(e))return;e.preventDefault();dc++;document.body.classList.add('drop')});
addEventListener('dragover',e=>{if(hasF(e)){e.preventDefault();e.dataTransfer.dropEffect='copy'}});
addEventListener('dragleave',e=>{if(hasF(e)&&--dc<=0){dc=0;document.body.classList.remove('drop')}});
addEventListener('drop',async e=>{if(!hasF(e))return;e.preventDefault();dc=0;document.body.classList.remove('drop');
  const fs=[...e.dataTransfer.files];if(dL.open)dL.close();if(dF.open)dF.close();for(const f of fs)await importFile(f)});

/* ---- tags ---- */
const norm=t=>t.trim().replace(/\s+/g,' ').slice(0,30);
const hasTag=(m,t)=>(m.tags||[]).some(x=>x.toLowerCase()===t.toLowerCase());
const allTags=()=>{const c=new Map();for(const m of memos)for(const t of m.tags||[]){const k=t.toLowerCase(),e=c.get(k);e?e.n++:c.set(k,{t,n:1})}return[...c.values()].sort((a,b)=>a.t.localeCompare(b.t))};
const chip=(label,cls,fn)=>{const b=document.createElement('button');b.type='button';b.className='chip'+(cls?' '+cls:'');b.textContent=label;b.onclick=fn;return b};
const toggleTag=t=>{const k=t.toLowerCase();tagSel.has(k)?tagSel.delete(k):tagSel.add(k)};
const drawTagBar=()=>{const ts=allTags();for(const k of [...tagSel])if(!ts.some(x=>x.t.toLowerCase()===k))tagSel.delete(k);tl.innerHTML='';
  ts.forEach((x,i)=>{const on=tagSel.has(x.t.toLowerCase());const b=chip((i<9?(i+1)+' ':'')+x.t,on?'on':'',()=>{toggleTag(x.t);sel=0;drawList()});
    b.tabIndex=-1;b.setAttribute('aria-pressed',on);if(i<9)b.title='Alt+'+(i+1);tl.append(b)})};
const drawTags=()=>{setTitle();gc.innerHTML='';gs.innerHTML='';
  (cur.tags||[]).forEach(t=>gc.append(chip('#'+t+' ✕','on',()=>{cur.tags=cur.tags.filter(x=>x!==t);if(!cur.tags.length)delete cur.tags;save();drawTags();gi.focus()})));
  allTags().filter(x=>!hasTag(cur,x.t)).forEach(x=>gs.append(chip('+ '+x.t,'',()=>addTag(x.t))))};
const addTag=raw=>{const cand=raw.split(/[,、，]/).map(norm).filter(Boolean);
  if(cand.length){cur.tags=cur.tags||[];const ex=allTags();
    for(const c of cand){if(cur.tags.length>=20)break;if(hasTag(cur,c))continue;const f=ex.find(x=>x.t.toLowerCase()===c.toLowerCase());cur.tags.push(f?f.t:c)}
    save()}
  gi.value='';drawTags();gi.focus()};
const openTags=()=>{if(dG.open)return;if(!title(cur.text)){alert('Type some text first, then add tags.');return}
  save();gi.value='';drawTags();dG.showModal();gi.focus()};
const drawMng=()=>{const ts=allTags();mg.innerHTML='';
  if(!ts.length){const p=document.createElement('p');p.className='hint';p.textContent='No tags yet.';mg.append(p);return}
  ts.forEach(({t,n})=>{const r=document.createElement('div');r.className='mrow';const s=document.createElement('span');s.textContent='#'+t+' ('+n+')';
    const rb=document.createElement('button'),db=document.createElement('button');rb.textContent='Rename';db.textContent='Delete';
    rb.onclick=()=>renameTag(t);db.onclick=()=>deleteTag(t,n);r.append(s,rb,db);mg.append(r)})};
const renameTag=old=>{let v=prompt('New name for tag "'+old+'"',old);if(v===null)return;v=norm(v);if(!v||v===old)return;
  const ex=allTags().find(x=>x.t.toLowerCase()===v.toLowerCase()&&x.t.toLowerCase()!==old.toLowerCase());
  if(ex){v=ex.t;if(!confirm('Tag "'+v+'" already exists. Merge "'+old+'" into it?'))return}
  for(const m of memos){if(!hasTag(m,old))continue;const out=[];
    for(const x of m.tags){const y=x.toLowerCase()===old.toLowerCase()?v:x;if(!out.some(z=>z.toLowerCase()===y.toLowerCase()))out.push(y)}m.tags=out}
  tagSel.delete(old.toLowerCase());persist();setTitle();drawMng();drawList()};
const deleteTag=(name,n)=>{if(!confirm('Remove tag "'+name+'" from '+n+' memo'+(n>1?'s':'')+'?'))return;
  for(const m of memos)if(m.tags){m.tags=m.tags.filter(x=>x.toLowerCase()!==name.toLowerCase());if(!m.tags.length)delete m.tags}
  tagSel.delete(name.toLowerCase());persist();setTitle();drawMng();drawList()};
const openMng=()=>{if(dM.open)return;save();drawMng();dM.showModal()};

/* ---- backup / restore ---- */
const stamp=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds())};
const doBackup=()=>{save();const data={app:'lwsm',version:1,exported:new Date().toISOString(),settings:{fontLevel:fsLv},memos};
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,1)],{type:'application/json'}));
  a.download='lwsm-backup-'+stamp()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);say('Backup saved ('+memos.length+' memos)',2000)};
const parseBackup=t=>{let d;try{d=JSON.parse(t)}catch(e){return null}
  if(!d||d.app!=='lwsm'||!Array.isArray(d.memos))return null;const ms=[];
  for(const m of d.memos){if(!m||typeof m.id!=='string'||typeof m.text!=='string')continue;
    const o={id:m.id.slice(0,80),text:m.text,bg:/^#[0-9a-f]{6}$/i.test(m.bg)?m.bg:'',updated:Number.isFinite(m.updated)?m.updated:Date.now()};
    if(typeof m.name==='string'&&m.name.trim())o.name=m.name.trim().slice(0,80);
    if(Array.isArray(m.tags)){const tg=[];for(const x of m.tags){if(typeof x!=='string')continue;const n=norm(x);if(n&&!tg.some(z=>z.toLowerCase()===n.toLowerCase()))tg.push(n)}if(tg.length)o.tags=tg}
    if(title(o.text))ms.push(o)}
  return{memos:ms,fontLevel:d.settings&&d.settings.fontLevel,exported:d.exported}};
const startRestore=p=>{if(!p.memos.length){alert('This backup has no memos.');return}rest=p;
  const dt=new Date(p.exported),n=p.memos.length;
  $('rs').textContent=n+' memo'+(n>1?'s':'')+' in this backup'+(isNaN(dt)?'':' (made '+dt.toLocaleString()+')')+'. You have '+memos.length+' now.';
  if(dD.open)dD.close();if(!dR.open)dR.showModal()};
const doMerge=()=>{if(!rest)return;save();let a=0,u=0;
  for(const m of rest.memos){const i=memos.findIndex(x=>x.id===m.id);if(i<0){memos.push(m);a++}else if(m.updated>memos[i].updated){memos[i]=m;u++}}
  const keep=memos.find(x=>x.id===cur.id)||memos.slice().sort((x,y)=>y.updated-x.updated)[0];
  load(keep,true);persist();rest=null;dR.close();say('Merged: '+a+' added, '+u+' updated',2500)};
const doReplace=()=>{if(!rest)return;
  if(!confirm('Replace ALL current memos ('+memos.length+') with the backup ('+rest.memos.length+')?\nA backup of the current memos is downloaded first.'))return;
  if(memos.length)doBackup();
  memos=rest.memos;const n=memos.length;if(Number.isInteger(rest.fontLevel)&&rest.fontLevel>=1&&rest.fontLevel<=5){fsLv=rest.fontLevel;applyFs(true)}
  tagSel.clear();load(memos.slice().sort((x,y)=>y.updated-x.updated)[0],true);persist();rest=null;dR.close();say('Restored '+n+' memos',2500)};
const ri=document.createElement('input');ri.type='file';ri.accept='.json,application/json';
ri.onchange=async()=>{const f=ri.files[0];ri.value='';if(!f)return;const p=parseBackup(await f.text());if(!p){alert('This is not a valid LWSM backup file.');return}startRestore(p)};
const openRestore=()=>ri.click();
const openData=()=>{if(dD.open)return;save();const n=memos.length;$('dn').textContent=n+' memo'+(n===1?'':'s')+' saved on this device.';dD.showModal()};
$('bTag').onclick=openTags;$('tgs').addEventListener('click',openTags);$('bGear').onclick=openData;$('xD').onclick=()=>dD.close();$('xG').onclick=()=>dG.close();$('bGa').onclick=()=>addTag(gi.value);
gi.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();addTag(gi.value)}});
$('xM').onclick=()=>dM.close();$('xR').onclick=()=>dR.close();
$('bTagM').onclick=openMng;$('bBk').onclick=doBackup;$('bRs').onclick=openRestore;
$('bMerge').onclick=doMerge;$('bRepl').onclick=doReplace;

/* rename: double-click / double-tap the title */
const openTitle=()=>{if(dT.open)return;if(!title(cur.text)){alert('Type some text first, then rename the memo.');return}ti.value=ttl(cur);dT.showModal();ti.focus();ti.select()};
const saveTitle=()=>{const v=ti.value.trim().replace(/\s+/g,' ').slice(0,80);if(v)cur.name=v;else delete cur.name;setTitle();save();dT.close()};
tt.addEventListener('dblclick',openTitle);
let tapT=0,tapX=0,tapY=0;
tt.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;const n=Date.now();
  if(n-tapT<350&&Math.abs(e.clientX-tapX)<30&&Math.abs(e.clientY-tapY)<30){tapT=0;openTitle()}else{tapT=n;tapX=e.clientX;tapY=e.clientY}});
$('bTi').onclick=saveTitle;$('xT').onclick=()=>dT.close();
ti.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();saveTitle()}});

/* swipe left/right in preview (touch only): next / previous memo */
let sx=0,sy=0,dx=0,sm=null;
const inHScroll=el=>{for(;el&&el!==pv;el=el.parentElement)if(el.scrollWidth>el.clientWidth+1&&/auto|scroll/.test(getComputedStyle(el).overflowX))return true;return false};
const back=()=>{pv.style.transition='transform .18s';pv.style.transform=''};
pv.addEventListener('touchstart',e=>{dx=0;sm=null;const t=e.touches[0];
  if(!preview||memos.length<2||e.touches.length!==1||t.clientX<24||t.clientX>innerWidth-24||pv.scrollWidth>pv.clientWidth+1||inHScroll(e.target)){sm='x';return}
  sx=t.clientX;sy=t.clientY},{passive:true});
pv.addEventListener('touchmove',e=>{if(sm==='x'||sm==='v')return;const t=e.touches[0];dx=t.clientX-sx;const dy=t.clientY-sy;
  if(!sm){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;sm=Math.abs(dx)>Math.abs(dy)*1.5?'h':'v';if(sm==='h')pv.style.transition='none'}
  if(sm==='h'){e.preventDefault();pv.style.transform='translateX('+dx+'px)'}},{passive:false});
pv.addEventListener('touchend',()=>{const h=sm==='h';sm=null;if(!h)return;
  const w=pv.clientWidth;if(Math.abs(dx)<Math.min(110,w*.25)){back();return}
  const d=dx<0?1:-1;pv.style.transition='transform .14s ease-in';pv.style.transform='translateX('+(-d*w)+'px)';
  setTimeout(()=>{rotate(d);pv.style.transition='none';pv.style.transform='translateX('+(d*w)+'px)';void pv.offsetWidth;
    pv.style.transition='transform .18s ease-out';pv.style.transform=''},150)});
pv.addEventListener('touchcancel',()=>{if(sm==='h')back();sm=null});

/* settings: memo text size (5 levels, remembered) */
const FS=[12,14,16,20,24],FN=['Extra small','Small','Medium','Large','Extra large'],KF='lwsm.fs';
let fsLv=3;try{const v=+localStorage.getItem(KF);if(v>=1&&v<=5)fsLv=v}catch(e){}
const applyFs=(keep)=>{document.documentElement.style.setProperty('--fs',FS[fsLv-1]+'px');fsr.value=fsLv;$('fo').textContent=FN[fsLv-1]+' ('+FS[fsLv-1]+'px)';
  if(keep)try{localStorage.setItem(KF,fsLv)}catch(e){}};
const openSet=()=>{if(!dS.open)dS.show();fsr.focus()};
fsr.addEventListener('input',()=>{fsLv=+fsr.value;applyFs(true)});
$('bFsR').onclick=()=>{fsLv=3;applyFs(true)};
$('bSet').onclick=openSet;$('xS').onclick=()=>dS.close();
const toast=$('toast');let toastT;
const say=(t,ms)=>{toast.textContent=t;toast.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toast.classList.remove('on'),ms||1200)};
const fsStep=d=>{const n=Math.max(1,Math.min(5,fsLv+d));fsLv=n;applyFs(true);say('Text size: '+FN[n-1]+' ('+FS[n-1]+'px)')};
applyFs();

/* start: last used memo, in preview */
const last=memos.find(m=>m.id===localStorage.getItem(KC))||memos.slice().sort((a,b)=>b.updated-a.updated)[0];
if(last)load(last,true);else{load(newMemo(),false);ed.focus()}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
