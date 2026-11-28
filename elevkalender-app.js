/* Undervisningstavle 2.0 – Elevkalender. Fælles opslag via Firestore.
   Kun lærer-konti med teachers/{uid} kan skrive (sikres af firestore.rules).
   Lokale filer, lærernoter og gruppe-/fraværsdata publiceres aldrig automatisk. */
import { firebaseConfig } from './elevkalender-config.js';

const DEMO_STORE='utElevCalendarDemoEntriesV1';
const demoEntries=()=>{try{return JSON.parse(localStorage.getItem(DEMO_STORE)||'[]')}catch{return []}};
const saveDemoEntry=e=>{const es=demoEntries().filter(x=>x.id!==e.id);es.push(e);localStorage.setItem(DEMO_STORE,JSON.stringify(es))};
const deleteDemoEntry=id=>localStorage.setItem(DEMO_STORE,JSON.stringify(demoEntries().filter(x=>x.id!==id)));
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
// Use ordinary Google Slides viewing. A numeric start slide is not a stable
// Google Slides object ID, so never guess the fragment from its position.
// A real #slide=id.OBJECT_ID fragment, when supplied, can be preserved.
const studentMaterial = attachment => {
 const source=url(attachment?.url||''); if(!source)return null;
 const info=slidesInfo(source);
 if(!info)return {name:String(attachment?.displayName||attachment?.name||attachment?.fileName||'Materiale'),url:source};
 const explicit=Math.floor(Number(attachment?.slideStart)||0);
 const fromUrl=Math.floor(Number(info.url.searchParams.get('slide'))||0);
 const start=explicit>0?explicit:fromUrl>0?fromUrl:0;
 const destination=new URL(`https://docs.google.com/presentation/d/${info.id}/edit`);
 const slideId=info.url.hash.match(/(?:^#|[&#])slide=id\.([A-Za-z0-9_-]+)/);
 if(slideId)destination.hash=`slide=id.${slideId[1]}`;
 const base=String(attachment?.displayName||attachment?.name||attachment?.fileName||'Google Slides');
 const named=start>0&&!/\bdias\s*\d+/i.test(base)?`${base} (dias ${start})`:base;
 return {name:named,url:destination.href,...(start?{slideStart:start}:{})};
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
.elevcal-editor .ec-homework-materials{margin-top:16px;border-top:1px solid #e3e9e3;padding-top:3px}.elevcal-editor .ec-choose-material{display:flex;align-items:end;gap:8px;margin:9px 0}.elevcal-editor .ec-choose-material select{min-width:0;flex:1;padding:10px;border:1px solid #becdc3;border-radius:8px;background:#fff;color:#223429;font:inherit}.elevcal-editor .ec-choose-material button{flex-shrink:0}@media(max-width:600px){.elevcal-editor .ec-choose-material{flex-wrap:wrap}.elevcal-editor .ec-choose-material select{flex-basis:100%}}
.elevcal-editor .ec-delete{margin-left:auto;border:1px solid #dcb4b4;background:#fff7f7;color:#9b3030;font-weight:600}.elevcal-editor .ec-delete:hover{background:#ffeded}
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
 let selected=new Set(), links=[], homeworkLinks=[], current=null, serverPublished=false, servicesRef=null, account=null, authValidated=false;
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
   try{if(demo){current=demoEntries().find(x=>x.id===key)||null;serverPublished=Boolean(current)}else{const doc=await dbSdk.getDoc(dbSdk.doc(db,'calendarEntries',key));serverPublished=doc.exists();current=serverPublished?doc.data():null;const draft=localStorage.getItem('utElevDraft:'+key);if(draft)current=JSON.parse(draft)}}catch(e){error(noteMessage(e));return}
   selected=new Set(current?.selectedItemIds??texts.map(x=>x.id));links=(current?.materials||[]).map(x=>{const normalized=studentMaterial(x);return normalized?{...x,...normalized}:{...x}});homeworkLinks=(current?.homeworkMaterials||[]).map(x=>{const normalized=studentMaterial(x);return normalized?{...x,...normalized}:{...x}});
   // Upgrade an existing saved Slides material using the board's start slide;
   // do not add back materials which the teacher deliberately removed.
   for(const link of links){
     const id=slidesInfo(link.url)?.id;
     if(!id)continue;
     const source=originalAttachments.find(a=>slidesInfo(a.url)?.id===id && a.slideStart>0);
     if(source && !link.slideStart && !Number(slidesInfo(link.url)?.url.searchParams.get('slide'))){
       link.slideStart=source.slideStart;
       link.url=studentMaterial({...link,slideStart:source.slideStart}).url;
     }
   }
   // Reuse links only when they were saved; otherwise suggest board materials.
   if(!current)links=originalAttachments.map(x=>({...x}));
   else if(!current.slidesSuggested) {
     // Suggest slides once for entries saved before this update; afterwards teacher removals persist.
     const existingSlides=new Set(links.map(l=>slidesInfo(l.url)?.id).filter(Boolean));
     for(const a of originalAttachments){const info=slidesInfo(a.url);if(info&&!existingSlides.has(info.id)){links.push({...a});existingSlides.add(info.id)}}
   }
   d.innerHTML=header()+`${demo?'<div class="info">🧪 Prøvevisning: Opslagene gemmes kun i denne browser. De er ikke offentlige og kan ikke ses på andre enheder endnu.</div>':''}<div class="muted">Gennemse og ret teksten. Du bestemmer, hvad der vises for eleverne. Faste grupper, fravær og lærernoter overføres ikke.</div><label class="field">Hentet fra dagsordenen</label><div class="checklist" id="ec-items"></div><label class="field" for="ec-text">Indhold til eleverne</label><textarea id="ec-text"></textarea><label class="field">Materialer og links</label><div class="checklist" id="ec-links"></div><button class="btn" type="button" id="ec-addlink" style="margin-top:8px">+ Tilføj link</button><label class="field" for="ec-homework">Lektier (valgfrit)</label><textarea id="ec-homework" style="min-height:70px" placeholder="Fx Læs side 12–18"></textarea><label class="field" for="ec-due">Lektier til dato</label><input id="ec-due" type="date"><div class="ec-homework-materials"><label class="field">Materialer til lektien (valgfrit)</label><div class="muted">Vælg et materiale fra tavlen, eller indsæt et andet link. De følger kun lektien, ikke undervisningens materialeliste.</div><div class="ec-choose-material"><select id="ec-hw-from-board" aria-label="Vælg materiale fra tavlen"></select><button class="btn" type="button" id="ec-hw-add-board">Tilføj valgt</button></div><div id="ec-homework-links"></div><button class="btn" type="button" id="ec-hw-addlink">+ Tilføj andet link</button></div><div class="muted" style="margin-top:12px">I kalenderen vises lektien på dagen, den gives. Under »Kun lektier« vises den på datoen, den skal være lavet til. Lokale filer kan ikke overføres automatisk; indsæt et link, som eleverne må åbne.</div><div id="ec-message"></div><div class="row-buttons"><button class="btn primary" id="ec-publish">${demo?'Gem i prøvekalender':current?'Opdater elevopslag':'Offentliggør'}</button>${demo?'': '<button class="btn" id="ec-draft">Gem kladde</button>'}<button class="btn" id="ec-preview">👁 Vis for klassen</button>${serverPublished?'<button class="btn ec-delete" type="button" id="ec-delete">Slet fra elevkalender</button>':''}${demo?'':'<button class="btn" id="ec-logout">Log ud</button>'}</div>`;
   wireClose();const field=$(d,'#ec-text');field.value=current?.text??composeText(selected);$(d,'#ec-homework').value=current?.homework||'';$(d,'#ec-due').value=current?.dueDate||'';
   const list=$(d,'#ec-items');for(const it of texts){const lab=document.createElement('label');lab.className='choose';const ch=document.createElement('input');ch.type='checkbox';ch.checked=selected.has(it.id);lab.append(ch,document.createTextNode(it.title));list.append(lab);ch.onchange=()=>{const before=composeText(selected);if(ch.checked)selected.add(it.id);else selected.delete(it.id);if(!field.value.trim()||field.value.trim()===before)field.value=composeText(selected)}}
   function redrawLinks(){const host=$(d,'#ec-links');host.replaceChildren();if(!links.length){host.textContent='Ingen links endnu.';return}links.forEach((l,i)=>{const row=document.createElement('div');row.className='linkline';const name=document.createElement('input');name.placeholder='Navn på materiale';name.value=l.name||'';const input=document.createElement('input');input.type='url';input.placeholder='https://…';input.value=l.url||'';const del=document.createElement('button');del.className='btn';del.type='button';del.textContent='Fjern';name.oninput=()=>{l.name=name.value};input.oninput=()=>{l.url=input.value};del.onclick=()=>{links.splice(i,1);redrawLinks()};row.append(name,input,del);host.append(row)})}
   $(d,'#ec-addlink').onclick=()=>{links.push({name:'',url:''});redrawLinks()};redrawLinks();
   // Homework materials are deliberately independent of the lesson's material list.
   const fromBoard=$(d,'#ec-hw-from-board');
   const boardChoices=[...originalAttachments];
   fromBoard.replaceChildren();
   for(const a of boardChoices){const opt=document.createElement('option');opt.value=a.url;opt.textContent=a.name||'Materiale';fromBoard.append(opt)}
   if(!boardChoices.length){const opt=document.createElement('option');opt.textContent='Ingen materialer på tavlen';fromBoard.append(opt);fromBoard.disabled=true;$(d,'#ec-hw-add-board').disabled=true}
   function redrawHomeworkLinks(){
     const host=$(d,'#ec-homework-links');host.replaceChildren();
     homeworkLinks.forEach((l,i)=>{const row=document.createElement('div');row.className='linkline';
       const name=document.createElement('input');name.placeholder='Navn på materiale';name.setAttribute('aria-label','Navn på lektiemateriale');name.value=l.name||'';
       const address=document.createElement('input');address.type='url';address.placeholder='https://…';address.setAttribute('aria-label','Link til lektiemateriale');address.value=l.url||'';
       const del=document.createElement('button');del.className='btn';del.type='button';del.textContent='Fjern';
       name.oninput=()=>{l.name=name.value};address.oninput=()=>{l.url=address.value};
       del.onclick=()=>{homeworkLinks.splice(i,1);redrawHomeworkLinks()};row.append(name,address,del);host.append(row)
     });
   }
   $(d,'#ec-hw-add-board').onclick=()=>{
     const chosen=boardChoices.find(a=>a.url===fromBoard.value);if(!chosen)return;
     if(homeworkLinks.some(a=>a.url===chosen.url))return status('Dette materiale er allerede tilføjet til lektien.');
     homeworkLinks.push({...chosen});redrawHomeworkLinks();
   };
   $(d,'#ec-hw-addlink').onclick=()=>{homeworkLinks.push({name:'',url:''});redrawHomeworkLinks()};
   redrawHomeworkLinks();
   async function save(published){
     if(!demo&&(!authValidated||!auth.currentUser))return error('Log ind som godkendt lærer først.');
     const hw=$(d,'#ec-homework').value.trim(),due=$(d,'#ec-due').value;
     if(hw&&!dateString(due))return error('Vælg en dato, som lektierne skal være lavet til.');
     const attachments=[];for(const link of links){if(!link.name&&!link.url)continue;const safe=url(link.url);if(!safe||!/^https:/.test(safe))return error('Materialelinks skal være gyldige https-adresser.');attachments.push({name:String(link.name||'Materiale').trim().slice(0,150),url:safe,...(link.slideStart>0&&slidesInfo(safe)?{slideStart:Math.floor(Number(link.slideStart))}:{})})}
     const homeworkAttachments=[];
     if(hw){for(const link of homeworkLinks){if(!link.name&&!link.url)continue;const safe=url(link.url);if(!safe||!/^https:/.test(safe))return error('Links til lektiematerialer skal være gyldige https-adresser.');homeworkAttachments.push({name:String(link.name||'Materiale').trim().slice(0,150),url:safe,...(link.slideStart>0&&slidesInfo(safe)?{slideStart:Math.floor(Number(link.slideStart))}:{})})}}
     if(attachments.length>30||homeworkAttachments.length>30)return error('Du kan højst tilføje 30 materialer i hver kategori.');
     const entry={id:key,ownerUid:account.uid,classKey:classKey(className,date),className,schoolYear:yearOf(date),subject:String(b.subject||'Fag'),date,boardId:String(b.id),text:field.value.trim(),materials:attachments,homework:hw,dueDate:hw?due:'',homeworkMaterials:homeworkAttachments,selectedItemIds:[...selected],slidesSuggested:true,published:true,updatedAt:demo?new Date().toISOString():dbSdk.serverTimestamp()};
     try{
       if(demo){saveDemoEntry(entry);current={...entry};serverPublished=true;status('Gemt i prøvekalenderen på denne computer. Tryk »Vis for klassen« for at kontrollere visningen.');return}
       if(!published){const local={...entry,updatedAt:null};localStorage.setItem('utElevDraft:'+key,JSON.stringify(local));current=local;status('Kladde gemt på denne computer. Kun du kan se den her.');return}
       status('Offentliggør …');await dbSdk.setDoc(dbSdk.doc(db,'calendarEntries',key),entry);localStorage.removeItem('utElevDraft:'+key);current={...entry};serverPublished=true;status('Offentliggjort! Eleverne kan nu se opslaget på elevsiden.')
     }catch(e){error('Kunne ikke gemme: '+noteMessage(e))}
   }
   $(d,'#ec-publish').onclick=()=>save(true);if(!demo)$(d,'#ec-draft').onclick=()=>save(false);
   // Delete only the published calendar entry for this specific board, never the teaching board.
   const deleteButton=$(d,'#ec-delete');
   if(deleteButton)deleteButton.onclick=async()=>{
     if(!window.confirm('Vil du slette dette opslag fra elevkalenderen? Lektien fjernes også fra lektieoversigten. Dagsordenen på Undervisningstavlen ændres ikke. Sletningen kan ikke fortrydes.'))return;
     deleteButton.disabled=true;
     status('Sletter fra elevkalenderen …');
     try{
       if(demo)deleteDemoEntry(key);
       else{
         if(!authValidated||!auth.currentUser)throw new Error('Du skal være logget ind som lærer.');
         await dbSdk.deleteDoc(dbSdk.doc(db,'calendarEntries',key));
         localStorage.removeItem('utElevDraft:'+key);
       }
       current=null;serverPublished=false;
       d.innerHTML=header()+'<div class="info">Opslaget er slettet fra elevkalenderen. Lektier fra opslaget er også fjernet. Din oprindelige dagsorden er uændret.</div><div class="row-buttons"><button type="button" class="btn primary" id="ec-done">Luk</button></div>';
       wireClose();$(d,'#ec-done').onclick=close;
     }catch(e){deleteButton.disabled=false;error('Kunne ikke slette: '+noteMessage(e))}
   };
   $(d,'#ec-preview').onclick=async()=>{if(demo){await save(true);if(!current)return;window.open('./elevkalender.html?preview=1&klasse='+encodeURIComponent(classKey(className,date)),'_blank')}else window.open('./elevkalender.html?klasse='+encodeURIComponent(classKey(className,date)),'_blank','noopener')};
   if(!demo)$(d,'#ec-logout').onclick=async()=>{await authSdk.signOut(auth);authScreen()};
 }
 if(demo)await editor();else if(auth.currentUser)await verify();else authScreen();
}

export async function studentCalendar(){
 const root=document.getElementById('studentApp');if(!root)return;
 const state={entries:[],classKey:'',subject:'',onlyHomework:false,month:'',classes:[]};
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
 // The same subject always gets the same color, regardless of which classes have posts.
 const familiarSubjects={
  'dansk':['#dce9fb','#28598f'], 'engelsk':['#eee3fa','#69408d'],
  'historie':['#f8e9d8','#80562a'], 'matematik':['#d9eee4','#28614e'],
  'samfundsfag':['#f8dfe2','#8a3743'], 'kristendom':['#e6e5fa','#514b93'],
  'fysik/kemi':['#d9ecf0','#27616d'], 'biologi':['#e2efcf','#4c6a2a'],
  'geografi':['#e7e3d8','#69573c'], 'idræt':['#f6dfd6','#884e33'],
  'tysk':['#f7e5cd','#81541b'], 'fransk':['#f5e1ef','#864d72']
 };
 function subjectColors(subject){const normalized=String(subject||'').trim().toLocaleLowerCase('da-DK');if(familiarSubjects[normalized])return familiarSubjects[normalized];const palette=[['#dce9fb','#28598f'],['#ede3f8','#64418d'],['#f5e8d5','#795628'],['#def0e8','#285c4b'],['#f6dfdf','#853a42'],['#e3eaee','#425c69']];let hash=0;for(const c of normalized)hash=(hash*31+c.charCodeAt(0))>>>0;return palette[hash%palette.length]}
 function badge(subject){const [bg,ink]=subjectColors(subject);return `<span class="subject" style="background:${bg};color:${ink}">${esc(subject)}</span>`}
 function matLinks(e,homeworkOnly=false){return (homeworkOnly?(e.homeworkMaterials||[]):(e.materials||[])).map(studentMaterial).filter(Boolean).map(m=>`<a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer" class="material">${slidesInfo(m.url)?'🎞️':'📄'} ${esc(m.name||'Materiale')}</a>`).join('')}
 function card(e,context){let content='';if(context==='due'){content=`<div class="homework"><strong>Lektier til i dag:</strong> ${esc(e.homework)}</div>`;if(matLinks(e,true))content+=`<div class="materials">${matLinks(e,true)}</div>`}else{if(e.text)content+=`<div class="bodytext">${esc(e.text)}</div>`;if(matLinks(e))content+=`<div class="materials">${matLinks(e)}</div>`;if(e.homework)content+=`<div class="homework"><strong>Lektier til ${esc(formatDate(e.dueDate))}:</strong> ${esc(e.homework)}</div>`}const [bg,ink]=subjectColors(e.subject);return `<article class="entry" style="--subject-bg:${bg};--subject-color:${ink}">${badge(e.subject)}${content}</article>`}
 function group(entries,filter){const days=new Map();for(const e of entries){const date=e.displayDate;if(filter&&date!==filter)continue;if(!days.has(date))days.set(date,[]);days.get(date).push(e)}return [...days].sort((a,b)=>b[0].localeCompare(a[0]))}
 function current(){return state.entries.filter(x=>x.classKey===state.classKey)}
 function render(){
  const published=current();
  const subjects=[...new Set(published.map(e=>String(e.subject||'Fag').trim()))].sort((a,b)=>a.localeCompare(b,'da'));
  if(state.subject&&!subjects.includes(state.subject))state.subject='';
  const filtered=published.filter(e=>!state.subject||String(e.subject||'Fag').trim()===state.subject);
  const lessons=filtered.map(e=>({...e,displayDate:e.date,kind:'lesson'}));
  const homeworks=filtered.filter(e=>e.homework&&dateString(e.dueDate));
  const due=homeworks.map(e=>({...e,displayDate:e.dueDate,kind:'due'}));
  // Calendar: only posts on their teaching date. Homework tab: only homework on its due date.
  const all=state.onlyHomework ? due : lessons;
  const classOptions=state.classes.map(([k,n])=>`<option value="${esc(k)}" ${k===state.classKey?'selected':''}>${esc(n)}</option>`).join('');
  const subjectOptions=`<option value="">Alle fag</option>`+subjects.map(subject=>`<option value="${esc(subject)}" ${subject===state.subject?'selected':''}>${esc(subject)}</option>`).join('');
  const groups=group(all);
  const upcomingHomeworkCount=new Set(homeworks.filter(e=>e.dueDate>=today).map(e=>e.id||`${e.classKey}|${e.subject}|${e.date}|${e.dueDate}|${e.homework}`)).size;
  const homeworkHint=upcomingHomeworkCount?`<span class="homework-hint">Du har ${upcomingHomeworkCount} kommende ${upcomingHomeworkCount===1?'lektie':'lektier'}</span>`:'';
  root.innerHTML=`${demo?'<div class="notice" style="margin:0 0 16px;background:#fff8e9;border-color:#e4d4ad">🧪 <strong>Prøvevisning</strong> – kun opslag gemt i denne browser. Dette er ikke offentliggjort til eleverne.</div>':''}<header><div><h1>Klassens kalender</h1><p>Undervisning · Materialer · Lektier</p></div><span class="cal-icon">📅</span></header><div class="filters"><label>Klasse<select id="classSelect">${classOptions}</select></label><label>Fag<select id="subjectSelect">${subjectOptions}</select></label><div class="tabs"><button id="tabAll" class="${state.onlyHomework?'':'active'}">Kalender</button><button id="tabHw" class="${state.onlyHomework?'active':''}">Kun lektier${homeworkHint}</button></div></div><div id="timeline">${groups.length?groups.map(([day,items])=>`<section class="day${state.onlyHomework&&day<today?' past-due':''}" data-day="${esc(day)}"><h2>${esc(formatDate(day))}</h2><div class="day-entries">${items.map(e=>card(e,e.kind==='due'?'due':'lesson')).join('')}</div></section>`).join(''):'<div class="notice">Ingen opslag i denne visning endnu.</div>'}</div><footer>Opslagene opdateres af klassens lærere. I »Kun lektier« vises lektier på datoen, de skal være lavet til.</footer>`;
  $(root,'#classSelect').onchange=e=>{state.classKey=e.target.value;state.subject='';try{localStorage.setItem('elevkalender.sidsteKlasse',state.classKey)}catch{};render()};
  $(root,'#subjectSelect').onchange=e=>{state.subject=e.target.value;render()};
  $(root,'#tabAll').onclick=()=>{state.onlyHomework=false;render()};
  $(root,'#tabHw').onclick=()=>{state.onlyHomework=true;render()};

 }
 render();
}
