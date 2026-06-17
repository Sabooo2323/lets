/* ============================================================
   QAZAQ DÜNIESI — application logic
   ============================================================ */

/* ---------- tiny storage shim (works offline & in sandboxes) ---------- */
const Store = (() => {
  let mem = {};
  const ok = (() => { try { localStorage.setItem("_t","1"); localStorage.removeItem("_t"); return true; } catch(e){ return false; } })();
  return {
    get(k){ try { return ok ? JSON.parse(localStorage.getItem(k)) : mem[k] ?? null; } catch(e){ return mem[k] ?? null; } },
    set(k,v){ if(ok){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ mem[k]=v; } } else mem[k]=v; }
  };
})();

/* ---------- app state ---------- */
const ORDER = ["m0","tanysu","jol","tamaq","densaulyq","kundelikti"];
let state = Store.get("qd_state") || { name:"", gender:"m", done:[] };
const save = () => Store.set("qd_state", state);

/* ---------- gif pools ---------- */
const RIGHT_GIFS = ["r1_kutty_bolsyn_white","r2_kutty_bolsyn","r3_keremet","r4_dal_solay","r5_happy","r6_demalys"]
  .map(n => `assets/right/${n}.gif`);
const WRONG_GIFS = ["w1_mee","w2_tea","w3_oibu","w4_sad"].map(n => `assets/wrong/${n}.gif`);
const rand = arr => arr[Math.floor(Math.random()*arr.length)];

/* ---------- helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; };
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

function show(id){
  $$(".screen").forEach(s => s.classList.remove("active"));
  const t = $("#"+id); t.classList.add("active");
  t.scrollTop = 0; const sc = t.querySelector(".scroll"); if(sc) sc.scrollTop = 0;
}
function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(t._tm); t._tm=setTimeout(()=>t.classList.remove("show"),2200);
}

/* ---------- audio: short blips via WebAudio + speech ---------- */
let AC;
function blip(good){
  try{
    AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const t=AC.currentTime;
    const notes = good ? [523.25,659.25,783.99] : [311.13,233.08];
    notes.forEach((f,i)=>{
      const o=AC.createOscillator(), g=AC.createGain();
      o.type = good ? "triangle" : "sine"; o.frequency.value=f;
      o.connect(g); g.connect(AC.destination);
      const s=t+i*0.09; g.gain.setValueAtTime(0.0001,s);
      g.gain.exponentialRampToValueAtTime(0.18,s+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001,s+0.22);
      o.start(s); o.stop(s+0.24);
    });
  }catch(e){}
}
function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  const vs=speechSynthesis.getVoices();
  const v = vs.find(x=>/kk/i.test(x.lang)) || vs.find(x=>/ru/i.test(x.lang)) || null;
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang="ru-RU";
  u.rate=0.85; speechSynthesis.speak(u);
}
if("speechSynthesis" in window){ speechSynthesis.onvoiceschanged = ()=>{}; }

/* ---------- titles ---------- */
function titleFor(count){
  const i = Math.min(count, TITLES.length-1);
  const t = TITLES[i];
  const suf = state.gender==="f" ? t.f : t.m;
  return { full:`${state.name||"Qazaq"} ${suf}`, gloss:t.gloss };
}

/* ============================================================
   HERO
   ============================================================ */
$("#startBtn").onclick = () => {
  if(state.name){ buildHome(); show("home"); }
  else startChat();
};

/* ============================================================
   CHAT ONBOARDING  (WhatsApp-style, branching)
   ============================================================ */
const log = $("#chatLog"), inputArea = $("#chatInput");

function sulu(html, delay=700){
  return new Promise(res=>{
    const typing = el("div","typing","<span></span><span></span><span></span>");
    log.appendChild(typing); log.scrollTop=log.scrollHeight;
    setTimeout(()=>{
      typing.remove();
      const b = el("div","bubble sulu",html);
      log.appendChild(b); log.scrollTop=log.scrollHeight; res();
    }, delay);
  });
}
function me(text){
  const b = el("div","bubble me",text);
  log.appendChild(b); log.scrollTop=log.scrollHeight;
}
function clearInput(){ inputArea.innerHTML=""; }

async function startChat(){
  show("chat"); log.innerHTML=""; clearInput();
  await sulu("Сәлеметсіз бе! 👋", 500);
  await sulu("First, let's get to know each other.<br>Менің атым <span class='kk'>Сұлу</span>. Ал, сенің атың кім?", 900);
  askName();
}

function askName(){
  clearInput();
  const row = el("div","row");
  const inp = el("input","field"); inp.placeholder="Type your name…"; inp.maxLength=18;
  const go  = el("button","btn btn-sky btn-sm","Send");
  go.style.flex="none";
  const submit = ()=>{
    const v=inp.value.trim(); if(!v) return;
    state.name=v; me(v); clearInput(); askGender();
  };
  go.onclick=submit;
  inp.addEventListener("keydown",e=>{ if(e.key==="Enter") submit(); });
  row.append(inp,go); inputArea.appendChild(row); inp.focus();
}

function askGender(){
  clearInput();
  const wrap=el("div","choice");
  [["girl / woman","f"],["boy / man","m"]].forEach(([lab,g])=>{
    const c=el("button","chip",lab);
    c.onclick=async()=>{
      state.gender=g; me(lab); clearInput(); save();
      await goalTalk();
    };
    wrap.appendChild(c);
  });
  inputArea.appendChild(wrap);
}

async function goalTalk(){
  const start = titleFor(0).full;
  const end   = titleFor(TITLES.length-1).full;
  await sulu(`Қош келдің, <b>${state.name}</b>! 🌟`, 800);
  await sulu(`You'll walk an exciting path. Today you start simply as <span class='kk'>${start}</span>…`, 1100);
  await sulu(`…but one day, people will call you <span class='kk'>${end}</span>! 🎶`, 1100);
  clearInput();
  const wrap=el("div","choice");
  const c1=el("button","chip","Wait — will I go grey by then? 😅");
  c1.onclick=async()=>{
    me("Wait — will I go grey by then? 😅"); clearInput();
    await sulu("You noticed correctly! 😄 The lessons really aren't the easiest.", 900);
    await sulu("We'll work the basic structures of Kazakh until you use them on autopilot. Бірге — together!", 1100);
    finalChoice();
  };
  wrap.appendChild(c1);
  inputArea.appendChild(wrap);
}

function finalChoice(){
  clearInput();
  const wrap=el("div","choice");
  const c=el("button","chip","That's exactly what I need ✨");
  c.style.minWidth="100%";
  c.onclick=()=>{
    me("That's exactly what I need ✨");
    save();
    setTimeout(()=>{ buildHome(); show("home"); toast(`Account saved — welcome, ${state.name}!`); }, 600);
  };
  wrap.appendChild(c); inputArea.appendChild(wrap);
}

/* ============================================================
   HOME / MAP
   ============================================================ */
function moduleByKey(key){
  if(key==="m0") return null;
  return MODULES.find(m=>m.key===key);
}
function isUnlocked(idx){
  if(idx===0) return true;
  return state.done.includes(ORDER[idx-1]);
}

function buildHome(){
  const count = state.done.length;
  const t = titleFor(count);
  $("#homeRank").textContent = t.full;
  $("#homeRankSub").textContent = t.gloss;
  const pct = Math.round(count/ORDER.length*100);
  $("#homeSpark").textContent = `★ ${pct}%`;
  $("#progPct").textContent = `${pct}%`;
  setTimeout(()=>{ $("#progFill").style.width = pct+"%"; }, 120);

  const nextIdx = ORDER.findIndex((k,i)=>!state.done.includes(k));
  $("#bannerMsg").textContent = count===0
    ? "Your path across the steppe begins now."
    : count===ORDER.length
      ? "You've crossed the whole steppe. You are a legend! 🎉"
      : `Қош келдің back, ${state.name}! Next stop awaits.`;

  const path=$("#path"); path.innerHTML="";
  ORDER.forEach((key,idx)=>{
    const unlocked=isUnlocked(idx), done=state.done.includes(key);
    const node=el("div","node"+(done?" done":"")+(!unlocked?" locked":"")+(key==="m0"?" m0":""));
    let ic,t1,t2,kk;
    if(key==="m0"){ ic="🔤"; t1="Sound Check"; t2="The 9 tricky letters"; kk="Дыбыстар"; }
    else { const m=moduleByKey(key); ic=m.icon; t1=m.titleEn; t2=m.theme; kk=m.titleKk; }
    node.innerHTML =
      `<div class="ic">${ic}</div>
       <div class="meta">
         <div class="kk">${kk}</div>
         <div class="t">${t1}</div>
         <div class="s">${t2}</div>
       </div>
       <div class="end"></div>`;
    if(unlocked) node.onclick=()=>openLesson(key);
    else node.onclick=()=>toast("Finish the previous step to unlock this 🔒");
    path.appendChild(node);
  });
}

/* ============================================================
   LESSON ROUTER
   ============================================================ */
let session = null;

function openLesson(key){
  if(key==="m0"){ startSoundcheck(); }
  else startModule(moduleByKey(key));
}
$("#lessonBack").onclick = ()=>{ stopMusicIfAny(); buildHome(); show("home"); };

function setMini(p){ $("#miniFill").style.width = Math.round(p*100)+"%"; }

/* ----------------- MODULE 0 : SOUND CHECK ----------------- */
function startSoundcheck(){
  show("lesson");
  $("#lessonTitle").textContent="Sound Check · Дыбыстар";
  const seen=new Set();
  const body=$("#lessonBody"); body.innerHTML="";
  setMini(0);

  const intro=el("div","pad");
  intro.innerHTML=`<p class="muted" style="font-weight:700;text-align:center;margin-bottom:4px">
    Tap each tile to hear it and learn a trick. Explore all 9 to continue.</p>`;
  body.appendChild(intro);

  const grid=el("div"); grid.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:4px 22px";
  SOUNDCHECK.forEach((s,i)=>{
    const tile=el("button");
    tile.style.cssText="aspect-ratio:1;border:2px solid var(--line);border-radius:18px;background:#fff;cursor:pointer;font-family:'Nunito';font-weight:900;font-size:1.6rem;color:var(--ink);box-shadow:var(--shadow-sm);transition:.15s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px";
    tile.innerHTML=`<span>${s.cyr.split(" ")[0]}</span><span style="font-family:'ZeroCool';font-size:.8rem;color:var(--sky-deep)">${s.lat}</span>`;
    tile.onclick=()=>{
      seen.add(i); speak(s.say);
      tile.style.background="var(--holo-soft)"; tile.style.borderColor="var(--sky)";
      tile.style.transform="scale(1.04)"; setTimeout(()=>tile.style.transform="",150);
      showLetter(s);
      setMini(seen.size/SOUNDCHECK.length);
      if(seen.size===SOUNDCHECK.length){ doneBtn.disabled=false; doneBtn.classList.remove("btn-ghost"); doneBtn.classList.add("btn-holo"); }
    };
    grid.appendChild(tile);
  });
  body.appendChild(grid);

  const detail=el("div"); detail.id="letterDetail";
  detail.style.cssText="margin:14px 22px 8px;min-height:96px";
  detail.innerHTML=`<div style="text-align:center;color:#b3a583;font-weight:700;padding-top:24px">👆 pick a sound above</div>`;
  body.appendChild(detail);

  const navWrap=el("div","cardNav");
  const doneBtn=el("button","btn btn-ghost","Explore all 9 to finish");
  doneBtn.disabled=true;
  doneBtn.onclick=()=>completeModule("m0");
  navWrap.appendChild(doneBtn);
  body.appendChild(navWrap);

  function showLetter(s){
    detail.innerHTML=
      `<div style="background:#fff;border:2px solid var(--line);border-radius:18px;padding:16px 18px;box-shadow:var(--shadow-sm)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-family:'Nunito';font-weight:900;font-size:2.2rem">${s.cyr}</div>
          <button class="iconbtn" style="margin-left:auto" aria-label="play">🔊</button>
        </div>
        <div style="font-weight:800;color:var(--sky-deep);margin-top:2px">${s.hack}</div>
        <div class="muted" style="font-weight:700;margin-top:6px">💪 ${s.trick}</div>
        <div style="margin-top:8px;font-weight:800">e.g. <span style="color:var(--clay)">${s.word}</span> — ${s.en}</div>
      </div>`;
    detail.querySelector(".iconbtn").onclick=()=>speak(s.say);
  }
}

/* ----------------- MODULES 1–5 : FLASHCARDS → QUIZ ----------------- */
function startModule(m){
  session={ m, phase:"cards", i:0 };
  show("lesson");
  $("#lessonTitle").textContent=`${m.titleEn} · ${m.titleKk}`;
  renderCard();
}

function renderCard(){
  const {m,i}=session;
  setMini(i/m.cards.length);
  const c=m.cards[i];
  const body=$("#lessonBody"); body.innerHTML="";

  const stage=el("div","cardStage");
  const flip=el("div","flip");
  flip.innerHTML=
    `<div class="face front">
        <button class="speak" aria-label="Pronounce">🔊</button>
        <div class="kk">${c.kk}</div>
        <div class="lat">${c.lat}</div>
        <div class="pron">${c.pron}</div>
        <div class="hint">tap card to flip ↻</div>
     </div>
     <div class="face back">
        <div class="en">${c.en}</div>
        <div class="row2">${c.pron}</div>
        <div class="note"><b>Sulu:</b> ${c.note}</div>
     </div>`;
  flip.onclick=e=>{ if(e.target.closest(".speak"))return; flip.classList.toggle("flipped"); };
  flip.querySelector(".speak").onclick=e=>{ e.stopPropagation(); speak(c.kk); };
  stage.appendChild(flip); body.appendChild(stage);

  const nav=el("div","cardNav");
  const prev=el("button","btn btn-ghost","← Back"); prev.disabled=i===0;
  prev.onclick=()=>{ session.i--; renderCard(); };
  const next=el("button", i===m.cards.length-1 ? "btn btn-holo":"btn btn-sky",
                i===m.cards.length-1 ? "Start quiz →":"Next →");
  next.onclick=()=>{
    if(i===m.cards.length-1) startQuiz();
    else { session.i++; renderCard(); }
  };
  nav.append(prev,next); body.appendChild(nav);
}

/* ---------- quiz ---------- */
function buildQuiz(m){
  return shuffle(m.cards).map((card,idx)=>{
    const askKk = idx % 2 === 0;                 // alternate direction
    const others = shuffle(m.cards.filter(x=>x!==card)).slice(0,3);
    const opts = shuffle([card, ...others]).map(x => ({
      label: askKk ? x.en : x.kk,
      correct: x===card
    }));
    return {
      ask: askKk ? "What does this mean?" : "Which phrase is this?",
      prompt: askKk ? card.kk : card.en,
      promptEn: !askKk,
      opts
    };
  });
}

function startQuiz(){
  session.phase="quiz";
  session.quiz=buildQuiz(session.m);
  session.qi=0; session.wrong=0;
  renderQuestion();
}

function renderQuestion(){
  const {quiz,qi,m}=session;
  setMini(qi/quiz.length);
  const q=quiz[qi];
  const body=$("#lessonBody"); body.innerHTML="";

  const stage=el("div","qStage");
  stage.appendChild(el("div","qCount",`Question ${qi+1} of ${quiz.length}`));

  const prompt=el("div","qPrompt");
  prompt.innerHTML=`<div class="ask">${q.ask}</div><div class="big ${q.promptEn?'en':''}">${q.prompt}</div>`;
  stage.appendChild(prompt);

  const opts=el("div","qOpts");
  q.opts.forEach(o=>{
    const b=el("button","opt",o.label);
    b.onclick=()=>answer(b,o,q,opts);
    opts.appendChild(b);
  });
  stage.appendChild(opts);
  body.appendChild(stage);
}

function answer(btn,opt,q,optsWrap){
  $$(".opt").forEach(b=>b.disabled=true);
  const correctLabel = q.opts.find(o=>o.correct).label;
  if(opt.correct){
    btn.classList.add("right"); blip(true);
    showFeedback(true, correctLabel);
  } else {
    btn.classList.add("wrong"); blip(false);
    $$(".opt").forEach(b=>{ if(b.textContent===correctLabel) b.classList.add("right"); });
    session.wrong++;
    showFeedback(false, correctLabel);
  }
}

function showFeedback(good, correctLabel){
  const fb=$("#feedback"), sheet=$("#fbSheet");
  if(good){
    sheet.innerHTML=
      `<img class="gif" src="${rand(RIGHT_GIFS)}" alt="correct">
       <h3 class="ok">Дұрыс! Correct</h3>
       <button class="btn btn-holo" id="fbNext">Keep going →</button>`;
  } else {
    const w=rand(WISDOM_MIRROR);
    sheet.innerHTML=
      `<img class="gif" src="${rand(WRONG_GIFS)}" alt="not quite">
       <h3 class="no">Almost!</h3>
       <div class="correct">The answer is <b>${correctLabel}</b></div>
       <div class="mirror">
         <div class="pv">${w.kk}</div>
         <div class="pvEn">${w.en}</div>
       </div>
       <button class="btn btn-gold" id="fbNext" style="margin-top:14px">Try the next one →</button>`;
  }
  fb.classList.add("show");
  $("#fbNext").onclick=()=>{
    fb.classList.remove("show");
    session.qi++;
    if(session.qi >= session.quiz.length) finishModule();
    else renderQuestion();
  };
}

function finishModule(){
  setMini(1);
  completeModule(session.m.key);
}

/* ============================================================
   COMPLETE MODULE → CELEBRATION
   ============================================================ */
function completeModule(key){
  const already = state.done.includes(key);
  if(!already){ state.done.push(key); save(); }
  const count = state.done.length;
  const t = titleFor(count);

  // celebration screen
  $("#celebGif").src = rand([RIGHT_GIFS[0],RIGHT_GIFS[1],RIGHT_GIFS[2]]); // kutty bolsyn / keremet
  $("#celebTitle").textContent = t.full;
  $("#celebTip").textContent = rand(SUYUNSHI_TIPS);
  show("celebrate");
  launchConfetti();
  startMusic();
}

/* ----- celebration controls ----- */
const audio=$("#celebAudio"), player=$("#player"), playBtn=$("#playBtn");
function startMusic(){
  audio.currentTime=0;
  const p=audio.play();
  if(p&&p.then) p.then(()=>{ playBtn.textContent="❚❚"; player.classList.add("playing"); })
                 .catch(()=>{ playBtn.textContent="▶"; player.classList.remove("playing"); });
}
function stopMusicIfAny(){ if(!audio.paused){ audio.pause(); } playBtn.textContent="▶"; player.classList.remove("playing"); }
playBtn.onclick=()=>{
  if(audio.paused){ audio.play(); playBtn.textContent="❚❚"; player.classList.add("playing"); }
  else { audio.pause(); playBtn.textContent="▶"; player.classList.remove("playing"); }
};
$("#celebNext").onclick=()=>{ stopMusicIfAny(); buildHome(); show("home"); };
$("#shareBtn").onclick=async()=>{
  const t=titleFor(state.done.length);
  const text=`Súiinşi! 🎉 I just earned the title "${t.full}" learning Kazakh on Qazaq Dünиesi!`;
  try{
    if(navigator.share){ await navigator.share({title:"Qazaq Dünиesi", text}); }
    else { await navigator.clipboard.writeText(text); toast("Copied! Share your good news 📣"); }
  }catch(e){ toast("Súiinşi! 🎉"); }
};

function launchConfetti(){
  const colors=["#79E0FF","#FF93D6","#FFC23D","#C49BFF","#16B6D8"];
  const host=$("#celebrate");
  for(let i=0;i<46;i++){
    const c=el("div","confetti");
    c.style.left=Math.random()*100+"%";
    c.style.background=colors[i%colors.length];
    c.style.animationDuration=(2.4+Math.random()*1.8)+"s";
    c.style.animationDelay=(Math.random()*0.6)+"s";
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    host.appendChild(c);
    setTimeout(()=>c.remove(),4800);
  }
}

/* ============================================================
   BOOT
   ============================================================ */
(function boot(){
  // returning user goes straight in (optional: keep hero as welcome)
  if(state.name){
    $("#startBtn").textContent = `Continue, ${state.name} →`;
  }
})();
