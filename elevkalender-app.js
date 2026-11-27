/* Undervisningstavle 2.0 – Elevkalender. Fælles opslag via Firestore.
   Kun lærer-konti med teachers/{uid} kan skrive (sikres af firestore.rules).
   Lokale filer, lærernoter og gruppe-/fraværsdata publiceres aldrig automatisk. */
import { firebaseConfig } from './elevkalender-config.js';

const DEMO_STORE='utElevCalendarDemoEntriesV1';
const demoEntries=()=>{try{return JSON.parse(localStorage.getItem(DEMO_STORE)||'[]')}catch{return []}};
const saveDemoEntry=e=>{const es=demoEntries().filter(x=>x.id!==e.id);es.push(e);localStorage.setItem(DEMO_STORE,JSON.stringify(es))};
const ready = Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId && firebaseConfig?.appId && firebaseConfig?.authDomain);
let sdkPromise;
async function services() {
  if (!ready) throw new Error('Elevkalenderens fælles lagring er endnu ikke sat op.');
  if (!sdkPromise) sdkPromise = Promise.all([
    import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')
  ]).then(([app, authSdk, dbSdk]) => {
    const application = app.getApps().length ? app.getApp() : app.initializeApp(firebaseConfig);
    return { auth:authSdk.getAuth(application), db:dbSdk.getFirestore(application), authSdk, dbSdk };
  });
  return sdkPromise;
}
const $ = (root, sel) => root.querySelector(sel);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = html => {const e=document.createElement('div');e.innerHTML=String(html??'');return(e.innerText||e.textContent||'').trim()};
const url = value => { try {const u=new URL(String(value));return ['https:','http:'].includes(u.protocol)?u.href:''}catch {return ''} };
const slidesInfo = value => { try { const u=new URL(String(value||'')); if(u.hostname!=='docs.google.com')return null; const m=u.pathname.match(/^\/presentation\/d\/([A-Za-z0-9_-]+)/); return m?{id:m[1],url:u}:null }catch{return null} };
// Teacher board uses /preview for embedding; students should open the regular Slides page.
// A numeric preview slide index cannot reliably be translated into a Slides slide ID.
const studentMaterial = attachment => {
 const source=url(attachment?.url||''); if(!source)return null;
 const info=slidesInfo(source);
 if(!info)return {name:String(attachment?.displayName||attachment?.name||attachment?.fileName||'Materiale'),url:source};
 const destination=new URL(`https://docs.google.com/presentation/d/${info.id}/edit`);
 const slideId=info.url.hash.match(/(?:^#|[&#])slide=id\.([A-Za-z0-9_-]+)/);
 if(slideId)destination.hash=`slide=id.${slideId[1]}`;
 const start=Math.floor(Number(attachment?.slideStart)||Number(info.url.searchParams.get('slide'))||0);
 const base=String(attachment?.displayName||attachment?.name||attachment?.fileName||'Google Slides');
 const named=start>0&&!/\bdias\s*\d+/i.test(base)?`${base} (dias ${start})`:base;
 return {name:named,url:destination.href};
};
const dateString = value => /^\d{4}-\d{2}-\d{2}$/.test(String(value||'')) ? String(value) : '';
const formatDate = str => str && dateString(str) ? new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(str+'T12:00:00Z')) : (str || 'Uden dato');
const yearOf = iso => {const y=Number(iso.slice(0,4)),m=Number(iso.slice(5,7));return `${m>=8?y:y-1}/${String((m>=8?y:y-1)+1).slice(-2)}`};
const classKey = (name,iso) => `${yearOf(iso)} · ${String(name||'').trim().toLowerCase().replace(/\s+/g,' ')}`;
const label = (name,iso) => `${String(name||'').trim()} · ${yearOf(iso)}`;
const uidSafe = str => String(str||'').replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,160);
function noteMessage(err) { return ({'auth/invalid-credential':'Ugyldig mail eller adgangskode.','auth/invalid-email':'Ugyldig mailadresse.','permission-denied':'Du har ikke læreradgang til at offentliggøre.','auth/too-many-requests':'For mange forsøg. Prøv senere.'})[err?.code] || err?.message || String(err) }

function baseStyle(){if(document.getElementById('elevcal-teacher-style'))return; const css=document.createElement('style');css.id='elevcal-teacher-style';css.textContent=`
.elevcal-backdrop{position:fixed;inset:0;z-index:30000;background:#15231cb0;display:grid;place-items:center;padding:12px}
.elevcal-editor{font:15px Arial,sans-serif;background:#fff;color:#23372b;width:min(760px,100%);max-height:95vh;overflow-y:auto;border-radius:16px;padding:22px;box-shadow:0 12px 50px #12241d70}
.elevcal-editor h2{margin:0 0 6px;font-size:23px}.elevcal-editor .muted{color:#617568;font-size:13px;line-height:1.55}.elevcal-editor label.field{display:block;font-weight:650;margin-top:15px}
.elevcal-editor textarea,.elevcal-editor input:not([type=checkbox]){width:100%;margin-top:5px;border:1px solid #becdc3;border-radius:8px;padding:10px;font:inherit;color:#223429;background:#fff}
.elevcal-editor textarea{min-height:110px;resize:vertical}.elevcal-editor .choose{display:flex;align-items:flex-start;gap:9px;padding:7px 0;border-bottom:1px solid #e8eee8}.elevcal-editor .choose input{margin-top:4px}
.elevcal-editor .row-buttons{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.elevcal-editor .info{background:#edf5ee;border-radius:8px;padding:10px;margin:9px 0}.elevcal-editor .error{background:#fff0eb;color:#793b2b;border-radius:8px;padding:10px;margin:9px 0}
.elevcal-editor .checklist{border:1px solid #e3e9e3;border-radius:9px;max-height:220px;overflow:auto;padding:6px 12px}.elevcal-editor .linkline{display:grid;grid-template-columns:1fr 2fr auto;gap:8px;align-items:end;margin:8px 0}
@media(max-width:600px){.elevcal-editor{padding:14px}.elevcal-editor .linkline{grid-template-columns:1fr}.elevcal-editor .row-buttons button{width:100%}}
`;document.head.append(css)}

export async function openTeacherCalendar(){
 baseStyle();const context=typeof window.utElevCalendarContext==='function'?window.utElevCalendarContext():null;const b=context?.board;
 if(!b){alert('Åbn en tavle først.');return}
 const demo=!ready;
 const cls=context?.classes?.find(c=>c.id===b.classId);
 const className=String(cls?.name||'').trim();const date=dateString(b.date);
 const overlay=document.createElement('div');overlay.className='elevcal-backdrop';const d=document.createElement('div');d.className='elevcal-editor';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');overlay.append(d);document.body.append(overlay);
 let selected=new Set(), links=[], current=null, servicesRef=null, account=null, authValidated=false;
 const close=()=>overlay.remove();overlay.onclick=e=>{if(e.target===overlay)close()};
 function header(){return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><h2>📅 Til elevkalender</h2><button class="btn" id="ec-close">✕ Luk</button></div><div class="muted">${esc(className||'Klasse mangler')} · ${esc(b.subject||'Fag')} · ${esc(formatDate(date))}</div>`}
 function error(message){const el=$ (d,'#ec-message');if(el){el.className='error';el.textContent=message}else alert(message)}
 function status(message){const el=$(d,'#ec-message');if(el){el.className='info';el.textContent=message}}
 function wireClose(){$(d,'#ec-close').onclick=close}
 if(!className||!date){d.innerHTML=header()+'<div class="error">Tavlen skal have klasse og en gyldig dato, før den kan offentliggøres.</div>';wireClose();return}
 let auth,db,authSdk,dbSdk;
 if(demo){account={uid:'demo'};authValidated=true}
 else{
 d.innerHTML=header()+'<div id="ec-message" class="info">Forbinder til elevkalenderen …</div>';wireClose();
 try{servicesRef=await services()}catch(e){error('Forbindelsen kunne ikke åbnes: '+noteMessage(e));return}
 ({auth,db,authSdk,dbSdk}=servicesRef);
 }
 function authScreen(){d.innerHTML=header()+`<p class="muted">Log ind som lærer for at offentliggøre. Dette er ikke skolens Google-login. Der oprettes kun konti til godkendte lærere.</p><form id="ec-login"><label class="field">Mailadresse<input type="email" id="ec-mail" autocomplete="username" required></label><label class="field">Adgangskode<input type="password" id="ec-password" autocomplete="current-password" required></label><div id="ec-message"></div><div class="row-buttons"><button type="submit" class="btn primary">Log ind og fortsæt</button></div></form>`;wireClose();$(d,'#ec-login').onsubmit=async ev=>{ev.preventDefault();try{status('Logger ind …');await authSdk.signInWithEmailAndPassword(auth,$(d,'#ec-mail').value,$(d,'#ec-password').value);await verify()}catch(e){error(noteMessage(e))}}}
 async function verify(){account=auth.currentUser;if(!account){authScreen();return}try{const doc=await dbSdk.getDoc(dbSdk.doc(db,'teachers',account.uid));if(!doc.exists()||doc.data().active!==true){authValidated=false;d.innerHTML=header()+`<div class="error">Din konto er ikke godkendt som lærer i elevkalenderen.</div><div class="row-buttons"><button class="btn" id="ec-logout">Log ud</button></div>`;wireClose();$(d,'#ec-logout').onclick=async()=>{await authSdk.signOut(auth);authScreen()};return}authValidated=true;await editor()}catch(e){error(noteMessage(e))}}
 const items=(b.items||[]).filter(x=>x&&x.type!=='pause');
 const texts=items.map(x=>({id:String(x.id),title:String(x.title||'Uden overskrift'),text:plain(x.desc||'')}));
 const originalAttachments=items.flatMap(item=>{
  const data=context?.attachmentList?.(item)||(item.attachments||[]);
  return data.map(a=>studentMaterial({...a,name:a.displayName||a.name||a.fileName||item.title||'Materiale'})).filter(Boolean);
 }).filter((x,i,arr)=>arr.findIndex(y=>y.url===x.url)===i);
 function composeText(ids){return texts.filter(x=>ids.has(x.id)).map(x=>x.title+(x.text?' – '+x.text:'')).join('\n')}
 async function editor(){
   const key=uidSafe(account.uid+'_'+b.id);
   try{if(demo){current=demoEntries().find(x=>x.id===key)||null}else{const doc=await dbSdk.getDoc(dbSdk.doc(db,'calendarEntries',key));current=doc.exists()?doc.data():null;const draft=localStorage.getItem('utElevDraft:'+key);if(draft)current=JSON.parse(draft)}}catch(e){error(noteMessage(e));return}
   selected=new Set(current?.selectedItemIds??texts.map(x=>x.id));links=(current?.materials||[]).map(x=>({...x}));
   // Reuse links only when they were saved; otherwise suggest board materials.
   if(!current)links=originalAttachments.map(x=>({...x}));
   else if(!current.slidesSuggested) {
     // Suggest slides once for entries saved before this update; afterwards teacher removals persist.
     const existingSlides=new Set(links.map(l=>slidesInfo(l.url)?.id).filter(Boolean));
     for(const a of originalAttachments){const info=slidesInfo(a.url);if(info&&!existingSlides.has(info.id)){links.push({...a});existingSlides.add(info.id)}}
   }
   d.innerHTML=header()+`${demo?'<div class="info">🧪 Prøvevisning: Opslagene gemmes kun i denne browser. De er ikke offentlige og kan ikke ses på andre enheder endnu.</div>':''}<div class="muted">Gennemse og ret teksten. Du bestemmer, hvad der vises for eleverne. Faste grupper, fravær og lærernoter overføres ikke.</div><label class="field">Hentet fra dagsordenen</label><div class="checklist" id="ec-items"></div><label class="field" for="ec-text">Indhold til eleverne</label><textarea id="ec-text"></textarea><label class="field">Materialer og links</label><div class="checklist" id="ec-links"></div><button class="btn" type="button" id="ec-addlink" style="margin-top:8px">+ Tilføj link</button><label class="field" for="ec-homework">Lektier (valgfrit)</label><textarea id="ec-homework" style="min-height:70px" placeholder="Fx Læs side 12–18"></textarea><label class="field" for="ec-due">Lektier til dato</label><input id="ec-due" type="date"><div class="muted" style="margin-top:12px">Lektien vises både på dagen, den bliver givet, og på datoen, den er til. Lokale filer kan ikke overføres automatisk; indsæt et link, som eleverne må åbne.</div><div id="ec-message"></div><div class="row-buttons"><button class="btn primary" id="ec-publish">${demo?'Gem i prøvekalender':current?'Opdater elevopslag':'Offentliggør'}</button>${demo?'': '<button class="btn" id="ec-draft">Gem kladde</button>'}<button class="btn" id="ec-preview">👁 Vis for klassen</button>${demo?'':'<button class="btn" id="ec-logout">Log ud</button>'}</div>`;
   wireClose();const field=$(d,'#ec-text');field.value=current?.text??composeText(selected);$(d,'#ec-homework').value=current?.homework||'';$(d,'#ec-due').value=current?.dueDate||'';
   const list=$(d,'#ec-items');for(const it of texts){const lab=document.createElement('label');lab.className='choose';const ch=document.createElement('input');ch.type='checkbox';ch.checked=selected.has(it.id);lab.append(ch,document.createTextNode(it.title));list.append(lab);ch.onchange=()=>{const before=composeText(selected);if(ch.checked)selected.add(it.id);else selected.delete(it.id);if(!field.value.trim()||field.value.trim()===before)field.value=composeText(selected)}}
   function redrawLinks(){const host=$(d,'#ec-links');host.replaceChildren();if(!links.length){host.textContent='Ingen links endnu.';return}links.forEach((l,i)=>{const row=document.createElement('div');row.className='linkline';const name=document.createElement('input');name.placeholder='Navn på materiale';name.value=l.name||'';const input=document.createElement('input');input.type='url';input.placeholder='https://…';input.value=l.url||'';const del=document.createElement('button');del.className='btn';del.type='button';del.textContent='Fjern';name.oninput=()=>{l.name=name.value};input.oninput=()=>{l.url=input.value};del.onclick=()=>{links.splice(i,1);redrawLinks()};row.append(name,input,del);host.append(row)})}
   $(d,'#ec-addlink').onclick=()=>{links.push({name:'',url:''});redrawLinks()};redrawLinks();
   async function save(published){
     if(!demo&&(!authValidated||!auth.currentUser))return error('Log ind som godkendt lærer først.');
     const hw=$(d,'#ec-homework').value.trim(),due=$(d,'#ec-due').value;
     if(hw&&!dateString(due))return error('Vælg en dato, som lektierne skal være lavet til.');
     const attachments=[];for(const link of links){if(!link.name&&!link.url)continue;const safe=url(link.url);if(!safe||!/^https:/.test(safe))return error('Materialelinks skal være gyldige https-adresser.');attachments.push({name:String(link.name||'Materiale').trim().slice(0,150),url:safe})}
     const entry={id:key,ownerUid:account.uid,classKey:classKey(className,date),className,schoolYear:yearOf(date),subject:String(b.subject||'Fag'),date,boardId:String(b.id),text:field.value.trim(),materials:attachments,homework:hw,dueDate:hw?due:'',selectedItemIds:[...selected],slidesSuggested:true,published:true,updatedAt:demo?new Date().toISOString():dbSdk.serverTimestamp()};
     try{
       if(demo){saveDemoEntry(entry);current={...entry};status('Gemt i prøvekalenderen på denne computer. Tryk »Vis for klassen« for at kontrollere visningen.');return}
       if(!published){const local={...entry,updatedAt:null};localStorage.setItem('utElevDraft:'+key,JSON.stringify(local));current=local;status('Kladde gemt på denne computer. Kun du kan se den her.');return}
       status('Offentliggør …');await dbSdk.setDoc(dbSdk.doc(db,'calendarEntries',key),entry);localStorage.removeItem('utElevDraft:'+key);current={...entry};status('Offentliggjort! Eleverne kan nu se opslaget på elevsiden.')
     }catch(e){error('Kunne ikke gemme: '+noteMessage(e))}
   }
   $(d,'#ec-publish').onclick=()=>save(true);if(!demo)$(d,'#ec-draft').onclick=()=>save(false);
   $(d,'#ec-preview').onclick=async()=>{if(demo){await save(true);if(!current)return;window.open('./elevkalender.html?preview=1&klasse='+encodeURIComponent(classKey(className,date)),'_blank')}else window.open('./elevkalender.html?klasse='+encodeURIComponent(classKey(className,date)),'_blank','noopener')};
   if(!demo)$(d,'#ec-logout').onclick=async()=>{await authSdk.signOut(auth);authScreen()};
 }
 if(demo)await editor();else if(auth.currentUser)await verify();else authScreen();
}

export async function studentCalendar(){
 const root=document.getElementById('studentApp');if(!root)return;
 const state={entries:[],classKey:'',onlyHomework:false,month:'',classes:[]};
 const now=new Date(),today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 const qs=new URLSearchParams(location.search);const demo=qs.get('preview')==='1';const requested=qs.get('klasse')||'';
 const existingClass=(()=>{try{return localStorage.getItem('elevkalender.sidsteKlasse')||''}catch{return ''}})();
 function showError(msg){root.innerHTML=`<div class="notice">${esc(msg)}</div>`}
 if(!demo&&!ready){showError('Elevkalenderen er endnu ikke tilsluttet skolens fælles opslag. Åbn prøvevisningen fra Undervisningstavlen via »Vis for klassen«.');return}
 if(demo){state.entries=demoEntries().filter(x=>x.published===true&&dateString(x.date))}else{
 const {db,dbSdk}=await services().catch(e=>{showError(noteMessage(e));return {}});if(!db)return;
 let snap;try{snap=await dbSdk.getDocs(dbSdk.collection(db,'calendarEntries'))}catch(e){showError('Kunne ikke hente elevkalenderen: '+noteMessage(e));return}
 state.entries=snap.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.published===true&&dateString(x.date));}
 const classes=new Map();for(const e of state.entries){if(!classes.has(e.classKey))classes.set(e.classKey,label(e.className,e.date))}
 state.classes=[...classes.entries()].sort((a,b)=>a[1].localeCompare(b[1],'da'));
 state.classKey=state.classes.find(([k])=>k===requested)?.[0]||state.classes.find(([k])=>k===existingClass)?.[0]||state.classes[0]?.[0]||'';
 function subjectColors(subject){const palette=[['#dce9fb','#234d7d'],['#ede3f8','#64418d'],['#f5e8d5','#795628'],['#def0e8','#285c4b'],['#f6dfdf','#853a42'],['#e3eaee','#425c69']];let hash=0;for(const c of String(subject))hash=(hash*31+c.charCodeAt(0))>>>0;return palette[hash%palette.length]}
 function badge(subject){const [bg,ink]=subjectColors(subject);return `<span class="subject" style="background:${bg};color:${ink}">${esc(subject)}</span>`}
 function matLinks(e){return (e.materials||[]).map(studentMaterial).filter(Boolean).map(m=>`<a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer" class="material">${slidesInfo(m.url)?'🎞️':'📄'} ${esc(m.name||'Materiale')}</a>`).join('')}
 function card(e,context){let content='';if(context==='due')content=`<div class="homework"><strong>Lektier til i dag:</strong> ${esc(e.homework)}</div>`;else{if(e.text)content+=`<div class="bodytext">${esc(e.text)}</div>`;if(matLinks(e))content+=`<div class="materials">${matLinks(e)}</div>`;if(e.homework)content+=`<div class="homework"><strong>Lektier til ${esc(formatDate(e.dueDate))}:</strong> ${esc(e.homework)}</div>`}return `<article class="entry">${badge(e.subject)}${content}</article>`}
 function group(entries,filter){const days=new Map();for(const e of entries){const date=e.displayDate;if(filter&&date!==filter)continue;if(!days.has(date))days.set(date,[]);days.get(date).push(e)}return [...days].sort((a,b)=>b[0].localeCompare(a[0]))}
 function current(){return state.entries.filter(x=>x.classKey===state.classKey)}
 function render(){
  const published=current();const lessons=published.map(e=>({...e,displayDate:e.date,kind:'lesson'}));const homeworks=published.filter(e=>e.homework&&dateString(e.dueDate));const due=homeworks.map(e=>({...e,displayDate:e.dueDate,kind:'due'}));
  const all=state.onlyHomework ? due : [...lessons,...due.filter(d=>d.dueDate!==d.date)];
  const display=all;
  const classOptions=state.classes.map(([k,n])=>`<option value="${esc(k)}" ${k===state.classKey?'selected':''}>${esc(n)}</option>`).join('');
  const groups=group(display);
  const upcomingHomeworkCount=new Set(homeworks.filter(e=>e.dueDate>=today).map(e=>e.id||`${e.classKey}|${e.subject}|${e.date}|${e.dueDate}|${e.homework}`)).size;
  const homeworkHint=upcomingHomeworkCount?`<span class="homework-hint">Du har ${upcomingHomeworkCount} kommende ${upcomingHomeworkCount===1?'lektie':'lektier'}</span>`:'';
  root.innerHTML=`${demo?'<div class="notice" style="margin:0 0 16px;background:#fff8e9;border-color:#e4d4ad">🧪 <strong>Prøvevisning</strong> – kun opslag gemt i denne browser. Dette er ikke offentliggjort til eleverne.</div>':''}<header><div><h1>Klassens kalender</h1><p>Undervisning · Materialer · Lektier</p></div><span class="cal-icon">📅</span></header><div class="filters"><label>Klasse<select id="classSelect">${classOptions}</select></label><div class="tabs"><button id="tabAll" class="${state.onlyHomework?'':'active'}">Kalender</button><button id="tabHw" class="${state.onlyHomework?'active':''}">Kun lektier${homeworkHint}</button></div></div><div id="timeline">${groups.length?groups.map(([day,items])=>`<section class="day${state.onlyHomework&&day<today?' past-due':''}" data-day="${esc(day)}"><h2>${esc(formatDate(day))}</h2><div class="day-entries">${items.map(e=>card(e,e.kind==='due'?'due':'lesson')).join('')}</div></section>`).join(''):'<div class="notice">Ingen opslag i denne visning endnu.</div>'}</div><footer>Opslagene opdateres af klassens lærere. Lektier vises på datoen, de skal være lavet til.</footer>`;
  $(root,'#classSelect').onchange=e=>{state.classKey=e.target.value;try{localStorage.setItem('elevkalender.sidsteKlasse',state.classKey)}catch{};render()};
  $(root,'#tabAll').onclick=()=>{state.onlyHomework=false;render()};
  $(root,'#tabHw').onclick=()=>{state.onlyHomework=true;render()};

 }
 render();
}
