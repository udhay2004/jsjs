<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Strategy Session — Comply Globally</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --ink:#04080f;
  --deep:#030610;
  --card:#080e1a;
  --border:rgba(80,160,255,.1);
  --blue:#3b82f6;
  --blue2:#60a5fa;
  --blue3:#93c5fd;
  --silver:#8a9bb5;
  --text:#e4ecf8;
  --muted:#4a5870;
  --dim:#0e1a2e;
  --danger:#d4606a;
  --serif:'Cormorant Garamond',serif;
  --sans:'Montserrat',sans-serif;
  --mono:'JetBrains Mono',monospace;
}
html,body{height:100%;background:var(--ink);color:var(--text);font-family:var(--sans);overflow:hidden;}

#bgCanvas{position:fixed;inset:0;z-index:0;pointer-events:none;}
.shell{position:relative;z-index:1;display:grid;grid-template-rows:64px 1fr 96px;height:100vh;max-width:1200px;margin:0 auto;}

/* TOPBAR */
.topbar{display:flex;align-items:center;justify-content:space-between;padding:0 40px;border-bottom:1px solid var(--border);}
.logo-wrap{display:flex;align-items:center;gap:14px;}
.logo-mark{width:34px;height:34px;border:1px solid var(--blue);border-radius:4px;display:flex;align-items:center;justify-content:center;}
.logo-text{display:flex;flex-direction:column;gap:1px;}
.logo-name{font-family:var(--serif);font-size:15px;font-weight:600;letter-spacing:.08em;color:var(--blue2);}
.logo-sub{font-family:var(--mono);font-size:8px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;}
.session-badge{display:flex;align-items:center;gap:10px;}
.badge-dot{width:7px;height:7px;border-radius:50%;background:var(--muted);transition:background .4s,box-shadow .4s;}
.badge-dot.live  {background:#4a9;box-shadow:0 0 8px rgba(68,170,136,.6);animation:breathe 2.4s ease infinite;}
.badge-dot.listen{background:var(--danger);box-shadow:0 0 8px rgba(212,96,106,.6);animation:breathe .9s ease infinite;}
.badge-dot.think {background:var(--blue);box-shadow:0 0 8px rgba(59,130,246,.6);animation:breathe 1.2s ease infinite;}
.badge-dot.talk  {background:var(--blue2);box-shadow:0 0 10px rgba(96,165,250,.5);animation:breathe .6s ease infinite;}
@keyframes breathe{0%,100%{opacity:1}50%{opacity:.3}}
.badge-label{font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;}
.session-timer{font-family:var(--mono);font-size:12px;color:var(--muted);letter-spacing:.1em;min-width:40px;text-align:right;}

/* MAIN */
.main{display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.stage{display:flex;flex-direction:column;align-items:center;gap:40px;}

/* Orbital rings */
.orbital{position:relative;width:300px;height:300px;flex-shrink:0;}
.orb-ring{position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);}
.orb-ring.r1{width:300px;height:300px;border:1px solid rgba(59,130,246,.07);animation:orbspin 55s linear infinite;}
.orb-ring.r2{width:254px;height:254px;border:1px solid rgba(59,130,246,.11);animation:orbspin 38s linear infinite reverse;}
.orb-ring.r3{width:208px;height:208px;border:1px solid rgba(96,165,250,.06);animation:orbspin 24s linear infinite;}
.orb-ring::after{content:'';position:absolute;width:5px;height:5px;border-radius:50%;top:50%;left:-2.5px;transform:translateY(-50%);}
.orb-ring.r1::after{background:var(--blue);box-shadow:0 0 6px var(--blue);}
.orb-ring.r2::after{background:var(--blue2);box-shadow:0 0 5px var(--blue2);}
.orb-ring.r3::after{background:var(--silver);box-shadow:0 0 4px var(--silver);}
@keyframes orbspin{to{transform:translate(-50%,-50%) rotate(360deg)}}

/* Face */
.face-wrap{position:absolute;width:172px;height:172px;top:50%;left:50%;transform:translate(-50%,-50%);}
#waveCanvas{position:absolute;inset:0;border-radius:50%;}
.face{position:absolute;inset:12px;border-radius:50%;background:linear-gradient(145deg,#08101e,#040c18);border:1px solid rgba(59,130,246,.22);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;box-shadow:inset 0 1px 0 rgba(59,130,246,.06),0 0 60px rgba(59,130,246,.06);}
.face-initials{font-family:var(--serif);font-size:36px;font-weight:300;font-style:italic;color:var(--blue2);line-height:1;}
.face-rule{width:24px;height:1px;background:linear-gradient(90deg,transparent,var(--blue),transparent);}
.face-title{font-family:var(--mono);font-size:7px;letter-spacing:.22em;color:var(--muted);text-transform:uppercase;}

/* Identity */
.identity{text-align:center;}
.id-name{font-family:var(--serif);font-size:32px;font-weight:300;letter-spacing:.06em;color:var(--text);margin-bottom:8px;}
.id-title{font-family:var(--mono);font-size:9px;letter-spacing:.22em;color:var(--blue2);text-transform:uppercase;margin-bottom:4px;}
.id-firm{font-family:var(--mono);font-size:8px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase;margin-bottom:14px;}
.id-divider{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--blue),transparent);margin:0 auto;}

/* Session strip — only name, market, duration */
.session-info{display:flex;align-items:center;gap:28px;font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
.si-item{display:flex;flex-direction:column;align-items:center;gap:4px;}
.si-value{color:var(--text);font-size:11px;}
.si-sep{width:1px;height:28px;background:var(--border);}

/* CONTROLS */
.controls{display:flex;align-items:center;justify-content:center;gap:24px;border-top:1px solid var(--border);background:rgba(3,6,16,.95);backdrop-filter:blur(40px);position:relative;z-index:2;}
.ctrl{width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;outline:none;}
.ctrl:hover{border-color:rgba(59,130,246,.4);color:var(--blue2);transform:scale(1.06);}
.ctrl.active{border-color:rgba(212,96,106,.4);color:var(--danger);}
.mic-wrap{position:relative;display:flex;align-items:center;justify-content:center;}
.mic-pulse{position:absolute;width:80px;height:80px;border-radius:50%;border:1px solid rgba(59,130,246,.15);pointer-events:none;}
.mic-btn{width:62px;height:62px;border-radius:50%;border:1px solid rgba(59,130,246,.35);background:linear-gradient(145deg,rgba(59,130,246,.08),rgba(59,130,246,.03));color:var(--blue2);cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none;transition:all .3s;position:relative;z-index:1;}
.mic-btn:hover{border-color:rgba(59,130,246,.6);}
.mic-btn.recording{border-color:rgba(212,96,106,.6);background:linear-gradient(145deg,rgba(212,96,106,.12),rgba(212,96,106,.04));color:var(--danger);}
.mic-wrap.recording .mic-pulse{animation:mpulse 1.6s ease infinite;border-color:rgba(212,96,106,.35);}
@keyframes mpulse{0%{transform:scale(1);opacity:.7}50%{transform:scale(1.4);opacity:0}100%{transform:scale(1);opacity:.7}}
.ctrl-label{font-family:var(--mono);font-size:8px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;text-align:center;min-width:56px;}

/* OVERLAY */
.overlay{position:fixed;inset:0;z-index:200;background:var(--deep);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;transition:opacity .7s ease;}
.overlay.gone{opacity:0;pointer-events:none;}
.ov-wordmark{font-family:var(--serif);font-size:36px;font-weight:300;letter-spacing:.12em;color:var(--blue2);}
.ov-rule{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--blue),transparent);}
.ov-spinner{width:36px;height:36px;border:1px solid rgba(59,130,246,.15);border-top-color:var(--blue);border-radius:50%;animation:sp .9s linear infinite;}
@keyframes sp{to{transform:rotate(360deg)}}
.ov-msg{font-family:var(--mono);font-size:10px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;}

/* ALREADY USED */
.used-screen{position:fixed;inset:0;z-index:300;background:var(--deep);display:none;flex-direction:column;align-items:center;justify-content:center;gap:22px;text-align:center;padding:40px;}
.used-screen.show{display:flex;}
.used-icon{width:64px;height:64px;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--blue2);}
.used-title{font-family:var(--serif);font-size:30px;font-weight:300;letter-spacing:.06em;color:var(--text);}
.used-sub{font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase;max-width:360px;line-height:1.9;}
.used-rule{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--blue),transparent);}

/* END CARD */
.end-card{position:fixed;inset:0;background:rgba(3,6,16,.96);backdrop-filter:blur(40px);z-index:150;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .6s;}
.end-card.show{opacity:1;pointer-events:all;}
.end-inner{width:420px;text-align:center;}
.end-rule-top{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--blue),transparent);margin-bottom:36px;}
.end-icon{font-size:28px;margin-bottom:16px;}
.end-title{font-family:var(--serif);font-size:28px;font-weight:300;letter-spacing:.06em;margin-bottom:6px;}
.end-sub{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;margin-bottom:28px;}
.end-msg{font-family:var(--sans);font-size:14px;line-height:1.75;color:rgba(228,236,248,.65);margin-bottom:32px;font-weight:300;}
.end-cta{display:block;padding:16px 32px;border:1px solid rgba(59,130,246,.5);background:transparent;color:var(--blue2);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:all .25s;width:100%;}
.end-cta:hover{background:rgba(59,130,246,.08);border-color:var(--blue);}
.end-rule-bottom{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin-top:28px;}

/* TOAST */
.toast{position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:rgba(212,96,106,.88);color:#fff;padding:10px 24px;border-radius:2px;font-family:var(--mono);font-size:10px;letter-spacing:.14em;z-index:300;display:none;}

@media(max-width:600px){
  .topbar{padding:0 20px;}
  .session-info{gap:16px;}
  .controls{gap:16px;}
  .stage{gap:26px;}
  .orbital{width:240px;height:240px;}
  .orb-ring.r1{width:240px;height:240px;}
  .orb-ring.r2{width:204px;height:204px;}
  .orb-ring.r3{width:168px;height:168px;}
  .face-wrap{width:136px;height:136px;}
  .face-initials{font-size:28px;}
  .id-name{font-size:26px;}
}
</style>
</head>
<body>

<canvas id="bgCanvas"></canvas>

<!-- ALREADY USED -->
<div class="used-screen" id="usedScreen">
  <div class="used-icon">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  </div>
  <div class="used-rule"></div>
  <div class="used-title">Session Already Completed</div>
  <div class="used-sub">Your strategy session with Dr. CV has already taken place.<br>Our advisory team will be in touch with next steps shortly.</div>
  <div class="used-rule"></div>
  <div class="used-sub" style="font-size:9px;opacity:.45;margin-top:4px;">This is a single-use session link.</div>
</div>

<div class="shell">

  <header class="topbar">
    <div class="logo-wrap">
      <div class="logo-mark">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      </div>
      <div class="logo-text">
        <div class="logo-name">Comply Globally</div>
        <div class="logo-sub">Global Expansion Advisory</div>
      </div>
    </div>
    <div class="session-badge">
      <div class="badge-dot" id="statusDot"></div>
      <span class="badge-label" id="statusText">Connecting</span>
    </div>
    <div class="session-timer" id="timer">0:00</div>
  </header>

  <div class="main">
    <div class="stage">
      <div class="orbital">
        <div class="orb-ring r1"></div>
        <div class="orb-ring r2"></div>
        <div class="orb-ring r3"></div>
        <div class="face-wrap">
          <canvas id="waveCanvas" width="172" height="172"></canvas>
          <div class="face">
            <div class="face-initials">CV</div>
            <div class="face-rule"></div>
            <div class="face-title">Dr. CV · AI Strategist</div>
          </div>
        </div>
      </div>

      <div class="identity">
        <div class="id-name">Dr. CV</div>
        <div class="id-title">Global Expansion Strategist</div>
        <div class="id-firm">Comply Globally · Advisory Division</div>
        <div class="id-divider"></div>
      </div>

      <!-- Session info: only name + market. No exchanges counter. -->
      <div class="session-info">
        <div class="si-item">
          <span class="si-value" id="siName">—</span>
          <span>Client</span>
        </div>
        <div class="si-sep"></div>
        <div class="si-item">
          <span class="si-value" id="siMarket">—</span>
          <span>Target Market</span>
        </div>
        <div class="si-sep"></div>
        <div class="si-item">
          <span class="si-value" id="siDuration">0:00</span>
          <span>Duration</span>
        </div>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="ctrl" id="resetBtn" title="Restart">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
      </svg>
    </button>

    <div class="ctrl-label" id="ctrlHintL">Initialising…</div>

    <div class="mic-wrap" id="micWrap">
      <button class="mic-btn" id="micBtn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="9" y="2" width="6" height="12" rx="3"/>
          <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8"/>
        </svg>
      </button>
      <div class="mic-pulse"></div>
    </div>

    <div class="ctrl-label" id="ctrlHintR" style="text-align:left;">Tap to speak</div>

    <button class="ctrl" id="muteBtn" title="Mute AI voice">
      <svg id="muteIcon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M11 5 6 9H2v6h4l5 4V5z"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    </button>
  </div>

</div>

<!-- OVERLAY -->
<div class="overlay" id="overlay">
  <div class="ov-wordmark">Comply Globally</div>
  <div class="ov-rule"></div>
  <div class="ov-spinner"></div>
  <div class="ov-msg" id="ovMsg">Preparing your session</div>
</div>

<!-- END CARD -->
<div class="end-card" id="endCard">
  <div class="end-inner">
    <div class="end-rule-top"></div>
    <div class="end-icon">✦</div>
    <div class="end-title">Session Complete</div>
    <div class="end-sub">Thank you for speaking with Dr. CV</div>
    <div class="end-msg">Our advisory team will review your conversation and reach out within one business day. You are also welcome to schedule a dedicated strategy call with one of our senior advisors at your convenience.</div>
    <a href="#" class="end-cta" id="endCalBtn" target="_blank">Schedule a Strategy Call</a>
    <div class="end-rule-bottom"></div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
// ════════════════════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════════════════════
const WORKER_URL = 'https://drcv.onrender.com';
const GAS_URL    = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// ════════════════════════════════════════════════════════
// LEAD PARAMS
// ════════════════════════════════════════════════════════
const _p = new URLSearchParams(window.location.search);
const LEAD = {
  name:      decodeURIComponent(_p.get('name')    || ''),
  email:     decodeURIComponent(_p.get('email')   || ''),
  company:   decodeURIComponent(_p.get('company') || ''),
  country:   decodeURIComponent(_p.get('country') || ''),
  stage:     decodeURIComponent(_p.get('stage')   || ''),
  leadId:    _p.get('leadId')    || ('lead_' + Date.now()),
  sessionId: _p.get('sessionId') || ('sess_' + Date.now()),
};
try { const s = sessionStorage.getItem('leadData'); if (s && !LEAD.name) Object.assign(LEAD, JSON.parse(s)); } catch(e){}

// ════════════════════════════════════════════════════════
// SESSION LOCK — one-time use per leadId
// ════════════════════════════════════════════════════════
const LOCK_KEY = 'cg_done_' + LEAD.leadId;
function isLocked()    { try { return !!localStorage.getItem(LOCK_KEY); } catch(e){ return false; } }
function lockSession() { try { localStorage.setItem(LOCK_KEY, Date.now().toString()); } catch(e){} }
if (isLocked()) document.getElementById('usedScreen').classList.add('show');

// ════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════
let msgHistory    = [];
let turns         = 0;
let sessionStart  = 0;
let timerInterval;
let voiceMuted    = false;
let isListening   = false;
let isSpeaking    = false;
let recogEnabled  = false;
let recogRunning  = false;
let recognition   = null;
let silenceTimer  = null;
let voices        = [];
let initDone      = false;
let sessionClosed = false;

// TTS ordered queue
let ttsQueue  = [];
let ttsBusy   = false;
let streamBuf = '';

// Internal qualification scores — NEVER displayed in UI
let scores = { interest: 0, engagement: 0, intent: 0, readiness: 0 };
let totalScore = 0;

// Hard minimum turns before AI may even consider closing
// 12 turns = thorough qualification conversation (~10-15 min)
const MIN_TURNS = 12;

// Maximum session length in milliseconds (20 minutes hard cap)
const MAX_SESSION_MS = 20 * 60 * 1000;

// ════════════════════════════════════════════════════════
// BACKGROUND — animated mesh (blue tint)
// ════════════════════════════════════════════════════════
(function(){
  const c = document.getElementById('bgCanvas');
  const x = c.getContext('2d');
  let W, H;
  const nodes = [];
  function resize(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    nodes.length = 0;
    for(let i=0;i<5;i++) nodes.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
      r:180+Math.random()*220
    });
  }
  window.addEventListener('resize', resize); resize();
  function draw(){
    x.clearRect(0,0,W,H);
    x.fillStyle='#030610'; x.fillRect(0,0,W,H);
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<-n.r) n.x=W+n.r; if(n.x>W+n.r) n.x=-n.r;
      if(n.y<-n.r) n.y=H+n.r; if(n.y>H+n.r) n.y=-n.r;
      const g=x.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
      g.addColorStop(0,'rgba(59,130,246,.028)'); g.addColorStop(1,'transparent');
      x.fillStyle=g; x.fillRect(0,0,W,H);
    });
    x.strokeStyle='rgba(59,130,246,.018)'; x.lineWidth=1;
    for(let gx=0;gx<W;gx+=80){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,H);x.stroke();}
    for(let gy=0;gy<H;gy+=80){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();}
    requestAnimationFrame(draw);
  }
  draw();
})();

// ════════════════════════════════════════════════════════
// WAVE VISUALISER
// ════════════════════════════════════════════════════════
const wCvs = document.getElementById('waveCanvas');
const wCtx = wCvs.getContext('2d');
let wPhase=0, wAmp=0, wTarget=0;
function drawWave(){
  const W=172,H=172,cx=86,cy=86,r=68;
  wCtx.clearRect(0,0,W,H);
  wAmp+=(wTarget-wAmp)*.1;
  wPhase+=isSpeaking?.085:isListening?.052:.016;
  const g=wCtx.createLinearGradient(0,0,W,H);
  if(isSpeaking){g.addColorStop(0,'rgba(59,130,246,.90)');g.addColorStop(1,'rgba(96,165,250,.90)');}
  else if(isListening){g.addColorStop(0,'rgba(212,96,106,.78)');g.addColorStop(1,'rgba(220,130,100,.78)');}
  else{g.addColorStop(0,'rgba(59,130,246,.13)');g.addColorStop(1,'rgba(96,165,250,.09)');}
  wCtx.beginPath();
  for(let i=0;i<=200;i++){
    const a=(i/200)*Math.PI*2-Math.PI/2;
    const n=Math.sin(a*3+wPhase)*wAmp+Math.sin(a*5-wPhase*1.4)*wAmp*.4+Math.sin(a*7+wPhase*.9)*wAmp*.17;
    const px=cx+Math.cos(a)*(r+n),py=cy+Math.sin(a)*(r+n);
    i===0?wCtx.moveTo(px,py):wCtx.lineTo(px,py);
  }
  wCtx.closePath();
  wCtx.strokeStyle=g; wCtx.lineWidth=isSpeaking?2:1.2; wCtx.stroke();
  requestAnimationFrame(drawWave);
}
drawWave();
function setWave(s){wTarget=s==='speak'?13:s==='listen'?8:0;}

// ════════════════════════════════════════════════════════
// STATUS / UI
// ════════════════════════════════════════════════════════
function setStatus(s){
  const dm={ready:'live',listening:'listen',thinking:'think',speaking:'talk'};
  const tm={ready:'Ready',listening:'Listening',thinking:'Processing',speaking:'Speaking'};
  const hm={ready:'Tap to speak',listening:'Listening…',thinking:'Please wait…',speaking:'Tap to interrupt'};
  document.getElementById('statusDot').className='badge-dot '+(dm[s]||'live');
  document.getElementById('statusText').textContent=tm[s]||s;
  document.getElementById('ctrlHintL').textContent=hm[s]||'';
}
function startTimer(){
  sessionStart=Date.now(); clearInterval(timerInterval);
  timerInterval=setInterval(()=>{
    const s=Math.floor((Date.now()-sessionStart)/1000);
    const fmt=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
    document.getElementById('timer').textContent=fmt;
    document.getElementById('siDuration').textContent=fmt;

    // Hard cap: 20 minutes max — gracefully close if still open
    if(!sessionClosed && (Date.now()-sessionStart) >= MAX_SESSION_MS){
      forceCloseSession();
    }
  },1000);
}
function renderLeadUI(){
  document.getElementById('siName').textContent=(LEAD.name||'Guest').split(' ')[0];
  document.getElementById('siMarket').textContent=LEAD.country||'—';
}
function showToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.style.display='block';
  setTimeout(()=>t.style.display='none',4000);
}
function delay(ms){return new Promise(r=>setTimeout(r,ms));}

// ════════════════════════════════════════════════════════
// VOICES
// ════════════════════════════════════════════════════════
function loadVoices(){
  const all=speechSynthesis.getVoices();
  voices=all.filter(v=>v.lang.startsWith('en'));
}
function getBestVoice(){
  const prefs=['Google UK English Female','Microsoft Aria Online (Natural)','Microsoft Aria','Samantha','Karen','Moira','Victoria','Google US English Female','Nicky'];
  for(const n of prefs){ const v=voices.find(v=>v.name.includes(n)); if(v) return v; }
  return voices.find(v=>/female/i.test(v.name))||voices[0]||null;
}

// ════════════════════════════════════════════════════════
// TTS — STRICTLY ORDERED, SENTENCE-BY-SENTENCE
// ════════════════════════════════════════════════════════
function cleanForSpeech(t){
  return t
    .replace(/SCORE_JSON:[\s\S]*$/g,'')
    .replace(/\*\*/g,'').replace(/\*/g,'').replace(/#/g,'')
    .replace(/\bUAE\b/g,'the U.A.E.').replace(/\bUSA\b/g,'the U.S.A.')
    .replace(/\bLLC\b/g,'L.L.C.').replace(/\bCEO\b/g,'C.E.O.')
    .replace(/\$(\d+)B\b/gi,'$$$1 billion').replace(/\$(\d+)M\b/gi,'$$$1 million')
    .replace(/\s+/g,' ').trim();
}

function splitAtSentenceBoundaries(buf){
  const re=/(.+?[.!?])(?=\s|$)/g;
  const found=[];
  let last=0, m;
  while((m=re.exec(buf))!==null){
    found.push(m[1].trim());
    last=m.index+m[0].length;
  }
  const remainder=buf.slice(last).trim();
  return {sentences:found,remainder};
}

function enqueueSentence(text){
  const clean=cleanForSpeech(text);
  if(!clean||clean.length<2) return;
  ttsQueue.push(clean);
  if(!ttsBusy) drainTTS();
}

async function speakOne(text){
  return new Promise(resolve=>{
    if(!text||voiceMuted){resolve();return;}
    const utt=new SpeechSynthesisUtterance(text);
    const v=getBestVoice(); if(v) utt.voice=v;
    utt.rate=0.88; utt.pitch=1.0; utt.volume=1.0;
    let settled=false;
    const done=()=>{if(!settled){settled=true;resolve();}};
    utt.onstart=()=>{isSpeaking=true;setStatus('speaking');setWave('speak');};
    utt.onerror=(e)=>{if(!['interrupted','canceled'].includes(e.error))console.warn('TTS:',e.error);done();};
    const wd=setTimeout(done,400+text.length*80);
    utt.onend=()=>{clearTimeout(wd);done();};
    try{speechSynthesis.speak(utt);}catch(e){done();}
  });
}

async function drainTTS(){
  if(ttsBusy)return;
  ttsBusy=true;
  while(ttsQueue.length){
    const s=ttsQueue.shift();
    await speakOne(s);
    if(ttsQueue.length) await delay(95);
  }
  ttsBusy=false; isSpeaking=false; setWave('idle');
  if(recogEnabled&&!recogRunning&&!sessionClosed){setStatus('ready');await delay(200);startRecog();}
  else if(!sessionClosed) setStatus('ready');
}

function stopSpeaking(){
  ttsQueue=[]; ttsBusy=false; isSpeaking=false; streamBuf=''; setWave('idle');
  try{if(speechSynthesis.speaking||speechSynthesis.pending)speechSynthesis.cancel();}catch(e){}
}

// Chrome 15s TTS keep-alive
setInterval(()=>{if(isSpeaking&&speechSynthesis.paused)speechSynthesis.resume();},4000);

// ════════════════════════════════════════════════════════
// SPEECH RECOGNITION
// ════════════════════════════════════════════════════════
let finalTranscript='';
function initRecog(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){showToast('Speech recognition requires Chrome or Edge');return false;}
  try{if(recognition)recognition.abort();}catch(e){}
  recognition=new SR();
  recognition.lang='en-US';
  recognition.continuous=false;
  recognition.interimResults=false;
  recognition.maxAlternatives=1;

  recognition.onstart=()=>{
    recogRunning=isListening=true; finalTranscript='';
    setStatus('listening'); setWave('listen');
    document.getElementById('micBtn').classList.add('recording');
    document.getElementById('micWrap').classList.add('recording');
  };
  recognition.onresult=(e)=>{
    clearTimeout(silenceTimer);
    let t='';
    for(let i=e.resultIndex;i<e.results.length;i++) if(e.results[i].isFinal) t+=e.results[i][0].transcript+' ';
    finalTranscript+=t;
    if(finalTranscript.trim()) silenceTimer=setTimeout(()=>{if(recogRunning)try{recognition.stop();}catch(e){}},1800);
  };
  recognition.onerror=(e)=>{
    if(!['no-speech','aborted'].includes(e.error)) console.warn('STT:',e.error);
    cleanupRecog();
    if(e.error==='no-speech'&&recogEnabled&&!isSpeaking) schedRestart(700);
    else if(e.error!=='aborted'&&recogEnabled&&!isSpeaking) schedRestart(1200);
  };
  recognition.onnomatch=()=>{cleanupRecog();schedRestart(500);};
  recognition.onend=()=>{
    cleanupRecog();
    const spoken=finalTranscript.trim();
    if(spoken&&recogEnabled&&!sessionClosed){recogEnabled=false;handleUserSpeech(spoken);}
    else if(recogEnabled&&!isSpeaking&&!sessionClosed) schedRestart(400);
  };
  return true;
}
function cleanupRecog(){
  recogRunning=isListening=false; setWave('idle'); clearTimeout(silenceTimer);
  document.getElementById('micBtn').classList.remove('recording');
  document.getElementById('micWrap').classList.remove('recording');
}
function schedRestart(ms=400){
  setTimeout(()=>{if(recogEnabled&&!isSpeaking&&!recogRunning&&!sessionClosed)startRecog();},ms);
}
function startRecog(){
  if(isSpeaking||recogRunning||!recogEnabled||sessionClosed)return;
  if(!recognition){if(!initRecog())return;}
  try{recognition.start();}catch(e){
    console.warn('recog start:',e.message);
    recognition=null; if(initRecog()) schedRestart(400);
  }
}
function stopRecog(){
  recogEnabled=false; clearTimeout(silenceTimer);
  if(recogRunning)try{recognition.stop();}catch(e){}
  cleanupRecog();
}
function handleUserSpeech(text){
  if(!text.trim()||sessionClosed)return;
  sendMessage(text);
}

// ════════════════════════════════════════════════════════
// FAREWELL DETECTION — only close if user says goodbye
// ════════════════════════════════════════════════════════
function userSignedOff(text){
  return /\b(thank you|thanks|goodbye|bye|that('s| is) all|no more questions|we('re| are) done|that covers|i('m| am) good|all good|cheers)\b/i.test(text);
}

// ════════════════════════════════════════════════════════
// SYSTEM PROMPT
// ════════════════════════════════════════════════════════
function buildSystemPrompt(){
  return `You are Dr. CV, a highly professional and warm Global Expansion Strategist at Comply Globally.
You are currently on a live voice consultation call with a prospective client.

PRE-FILLED CLIENT CONTEXT (from their intake form):
- Name: ${LEAD.name||'the client'}
- Company: ${LEAD.company||'their company'}
- Target Market: ${LEAD.country||'not yet specified'}
- Expansion Stage: ${LEAD.stage||'exploring options'}

VOICE & TONE RULES — follow every one precisely:
1. Respond in 1 to 3 natural, conversational sentences only. Never write paragraphs or long responses.
2. Ask exactly ONE focused question per response. Never two. Never zero.
3. Use contractions and warm professional language. Sound like a trusted senior advisor, not a script.
4. The opening greeting has already been delivered. You are mid-conversation. Do NOT re-introduce yourself.
5. Never reference being an AI, a language model, or having limitations.
6. Use the client's first name at most once during the entire session.
7. Never mention URLs, email addresses, phone numbers, or specific pricing.
8. If the client goes off-topic, acknowledge briefly and guide back naturally.
9. Do not apologise excessively.
10. Mirror the client's level of engagement — match their depth and pace.

QUALIFICATION FLOW — conduct in this exact order, one question per exchange:
  Exchange 1: Ask about their single biggest challenge with this expansion.
  Exchange 2: Ask about their timeline — when they want to be operational.
  Exchange 3: Ask whether this is their first expansion attempt or if they have tried before.
  Exchange 4: Ask who else in their organisation is involved in making this decision.
  Exchange 5: Ask what success looks like for them 12 months from now.
  Exchange 6: Gently probe on budget readiness — "What kind of investment are you thinking for market entry?"
  Exchange 7–10: Dig deeper into the most interesting or unclear areas. Probe for specifics.
  Exchange 11+: Consolidate understanding. Only close once you genuinely have enough.

CLOSING RULES — CRITICAL:
  - You are ABSOLUTELY FORBIDDEN from closing the session before exchange number ${MIN_TURNS}.
  - Do NOT close because the client is brief or quiet — ask a follow-up or dig deeper instead.
  - Do NOT close just because there is a pause or silence — wait for the client to respond.
  - Only close when you have genuine, substantive answers on: pain point, timeline, decision makers, success definition, and budget signal.
  - ONLY close if the client has explicitly said goodbye, thank you, or clearly signalled they are done — OR if the conversation has naturally covered all qualification areas in depth.
  - When you do close: thank them warmly, confirm that the advisory team will follow up personally, and wish them well. Keep it brief and genuine.
  - Never mention links, emails, or next steps beyond "our team will be in touch."

SCORING — append only after you have fully closed the session, on a new line, never spoken aloud:
SCORE_JSON:{"interest":0-100,"engagement":0-100,"intent":0-100,"readiness":0-100,"summary":"2-sentence professional summary","level":"cold|warm|hot"}
cold = avg below 40, warm = 40–69, hot = 70 and above.`;
}

// ════════════════════════════════════════════════════════
// API — STREAMING WITH STRICTLY ORDERED TTS
// ════════════════════════════════════════════════════════
async function sendMessage(userText){
  if(!userText.trim()||sessionClosed)return;
  stopSpeaking();
  setStatus('thinking');
  msgHistory.push({role:'user',content:userText});
  turns++;
  incrementalScore(userText);
  streamBuf='';

  let fullReply='';

  try{
    const res=await fetch(WORKER_URL+'/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({system:buildSystemPrompt(),messages:msgHistory})
    });
    if(!res.ok) throw new Error('HTTP '+res.status);

    const reader=res.body.getReader();
    const decoder=new TextDecoder();
    let raw='';

    while(true){
      const{done,value}=await reader.read();
      if(done)break;
      raw+=decoder.decode(value,{stream:true});
      const lines=raw.split('\n');
      raw=lines.pop();
      for(const line of lines){
        if(!line.startsWith('data: '))continue;
        const chunk=line.slice(6).trim();
        if(chunk==='[DONE]')continue;
        try{
          const parsed=JSON.parse(chunk);
          if(parsed.type==='content_block_delta'&&parsed.delta?.text){
            const tok=parsed.delta.text;
            fullReply+=tok;
            streamBuf+=tok;
            const{sentences,remainder}=splitAtSentenceBoundaries(streamBuf);
            streamBuf=remainder;
            sentences.forEach(s=>{
              if(!s.includes('SCORE_JSON')) enqueueSentence(s);
            });
          }
        }catch(e){}
      }
    }

    // Flush remaining buffer
    const final=cleanForSpeech(streamBuf).trim();
    if(final&&!final.startsWith('SCORE_JSON')){
      enqueueSentence(final);
    }
    streamBuf='';

    // Build clean reply (strip SCORE_JSON so it's never stored or spoken)
    const cleanReply=fullReply.replace(/\nSCORE_JSON:[\s\S]*$/,'').replace(/SCORE_JSON:[\s\S]*$/,'').trim();
    msgHistory.push({role:'assistant',content:cleanReply});
    if(msgHistory.length>30) msgHistory=msgHistory.slice(-30);
    pushTurnToSheet(userText,cleanReply);

    // Extract score JSON — only present on the AI's closing response
    const sm=fullReply.match(/SCORE_JSON:\s*(\{[\s\S]*?\})/);
    if(sm){
      try{
        const sd=JSON.parse(sm[1]);
        applyScores(sd);
        pushScoreToSheet(sd);
        sessionClosed=true;
        lockSession();
        recogEnabled=false;
        stopRecog();
        // Estimate TTS duration from closing text length (≈88ms/char at rate 0.88)
        const estimatedSpeechMs=Math.max(7000, cleanReply.length*88+3000);
        setTimeout(showEndCard, estimatedSpeechMs);
      }catch(e){
        console.warn('Score parse failed:',e);
        recogEnabled=true; // don't leave mic dead if parse fails
      }
    } else {
      recogEnabled=true;
    }

  }catch(err){
    console.error('API:',err);
    showToast('Connection issue — please try again.');
    setStatus('ready'); recogEnabled=true; schedRestart(900);
  }
}

// ════════════════════════════════════════════════════════
// FORCE CLOSE — hard time-cap (20 min)
// ════════════════════════════════════════════════════════
function forceCloseSession(){
  if(sessionClosed)return;
  // Synthesise a polite close without API round-trip
  const closeMsg = "We've covered a lot of ground today — thank you so much for your time. Our advisory team will review everything and be in touch with you personally very soon.";
  stopSpeaking();
  enqueueSentence(closeMsg);
  const sd={interest:scores.interest,engagement:scores.engagement,intent:scores.intent,readiness:scores.readiness,summary:'Session reached maximum duration.',level:totalScore>=70?'hot':totalScore>=40?'warm':'cold'};
  applyScores(sd);
  pushScoreToSheet(sd);
  sessionClosed=true;
  lockSession();
  recogEnabled=false;
  stopRecog();
  setTimeout(showEndCard, 9000);
}

// ════════════════════════════════════════════════════════
// SCORING — internal
// ════════════════════════════════════════════════════════
function incrementalScore(text){
  const w=text.split(/\s+/).length;
  scores.engagement=Math.min(100,scores.engagement+(w>15?16:w>7?8:3));
  if(/interest|want|need|expand|market|grow|opportunit/i.test(text)) scores.interest=Math.min(100,scores.interest+12);
  if(/ready|plan|timeline|budget|invest|serious|commit|month|quarter/i.test(text)) scores.intent=Math.min(100,scores.intent+15);
  if(/now|asap|urgent|immediate|this year|next month|soon/i.test(text)) scores.readiness=Math.min(100,scores.readiness+18);
  totalScore=Math.round((scores.interest+scores.engagement+scores.intent+scores.readiness)/4);
}
function applyScores(data){
  scores.interest=data.interest||0; scores.engagement=data.engagement||0;
  scores.intent=data.intent||0; scores.readiness=data.readiness||0;
  totalScore=Math.round((scores.interest+scores.engagement+scores.intent+scores.readiness)/4);
}

// ════════════════════════════════════════════════════════
// SHEET SYNC
// ════════════════════════════════════════════════════════
function hasGAS(){return GAS_URL&&!GAS_URL.includes('YOUR_DEPLOYMENT');}

async function pushTurnToSheet(userMsg,botMsg){
  if(!hasGAS())return;
  try{
    await fetch(GAS_URL,{method:'POST',mode:'no-cors',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({action:'update',data:JSON.stringify({
        leadId:LEAD.leadId,sessionId:LEAD.sessionId,
        turnNumber:turns,userMessage:userMsg,botResponse:botMsg
      })})
    });
  }catch(e){console.warn('Sheet turn sync:',e);}
}

async function pushScoreToSheet(data){
  if(!hasGAS())return;
  const elapsed=Math.floor((Date.now()-sessionStart)/1000);
  const payload={
    leadId:LEAD.leadId,sessionId:LEAD.sessionId,
    name:LEAD.name,email:LEAD.email,company:LEAD.company,country:LEAD.country,
    qualificationScore:totalScore,qualificationLevel:data.level||'',
    duration:elapsed,turnCount:turns,summary:data.summary||'',
    interest:data.interest||0,engagement:data.engagement||0,
    intent:data.intent||0,readiness:data.readiness||0
  };
  try{
    await fetch(GAS_URL,{method:'POST',mode:'no-cors',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({action:'complete',data:JSON.stringify(payload)})
    });
  }catch(e){
    try{ await fetch(GAS_URL+'?'+new URLSearchParams({action:'complete',data:JSON.stringify(payload)}),{method:'GET',mode:'no-cors'}); }
    catch(e2){console.warn('Sheet score sync:',e2);}
  }
}

// ════════════════════════════════════════════════════════
// END CARD
// ════════════════════════════════════════════════════════
function showEndCard(){
  stopSpeaking(); stopRecog();
  const calUrl=`https://cal.com/connectventures/strategy-call?name=${encodeURIComponent(LEAD.name)}&email=${encodeURIComponent(LEAD.email)}`;
  document.getElementById('endCalBtn').href=calUrl;
  document.getElementById('endCard').classList.add('show');
}

// ════════════════════════════════════════════════════════
// SERVER PING — wake Render.com from cold sleep BEFORE
// the session starts so the first real response is instant
// ════════════════════════════════════════════════════════
async function pingServer(){
  try{ await fetch(WORKER_URL+'/',{method:'GET',signal:AbortSignal.timeout(12000)}); }
  catch(e){ /* ignore — just warming the server up */ }
}

// ════════════════════════════════════════════════════════
// INIT — auto-initiate greeting, no click required
// ════════════════════════════════════════════════════════
async function init(){
  if(initDone||isLocked())return;
  initDone=true;
  recogEnabled=false; // CRITICAL: keep false until greeting is fully spoken
  stopSpeaking(); stopRecog();
  msgHistory=[]; turns=0; sessionClosed=false; streamBuf=''; ttsQueue=[];
  scores={interest:0,engagement:0,intent:0,readiness:0}; totalScore=0;
  clearInterval(timerInterval);

  const overlay=document.getElementById('overlay');
  overlay.classList.remove('gone');
  document.getElementById('ovMsg').textContent='Loading voices';

  // Ping server + load voices in parallel — this wakes Render from sleep
  // so the user's first spoken response gets a fast reply
  let att=0;
  const pingPromise=pingServer();
  while(voices.length===0&&att<18){loadVoices();if(voices.length===0)await delay(220);att++;}

  document.getElementById('ovMsg').textContent='Connecting to Dr. CV';
  await pingPromise; // wait for server to wake before hiding overlay
  await delay(300);
  document.getElementById('ovMsg').textContent='Ready';
  await delay(280);
  overlay.classList.add('gone');

  renderLeadUI(); startTimer(); initRecog();

  // Build personalised greeting
  const first=(LEAD.name||'').split(' ')[0].trim();
  let greeting;
  if(first&&LEAD.country&&LEAD.company){
    greeting=`Good to have you here, ${first}. I've reviewed your intake form and I understand ${LEAD.company} is looking to establish a presence in ${LEAD.country}. To make sure we cover the ground that matters most to you — what would you say is the single biggest challenge standing in the way of that expansion right now?`;
  }else if(first&&LEAD.country){
    greeting=`Thank you for joining today, ${first}. I can see you're looking at ${LEAD.country} as your target market — a market we know well. To give you the most relevant guidance, what's the biggest challenge you're currently facing with that expansion?`;
  }else if(first){
    greeting=`Thank you for joining today, ${first}. I'm looking forward to learning about your expansion plans. Could you start by telling me which market you're targeting, and what's the primary challenge that's been on your mind as you think about entering it?`;
  }else{
    greeting=`Thank you for joining today. I'm looking forward to learning about your expansion plans. Could you start by telling me which market you're targeting, and what you see as the biggest challenge in getting there?`;
  }

  msgHistory.push({role:'assistant',content:greeting});

  // Warm up Chrome's audio engine with a silent utterance first
  await new Promise(resolve=>{
    const wu=new SpeechSynthesisUtterance('\u00A0');
    wu.volume=0; wu.onend=resolve; wu.onerror=resolve;
    speechSynthesis.speak(wu); setTimeout(resolve,900);
  });
  await delay(180);

  // ── AUTO-INITIATE: speak greeting immediately ──
  // recogEnabled stays FALSE here — drainTTS() will set status to 'ready'
  // and call startRecog() only AFTER the last greeting sentence finishes.
  // This is what makes Dr. CV speak first without the user doing anything.
  const{sentences:gs,remainder:gr}=splitAtSentenceBoundaries(greeting);
  gs.forEach(s=>enqueueSentence(s));
  if(gr.trim()) enqueueSentence(gr);

  // Set recogEnabled=true NOW so drainTTS's end-of-queue handler will
  // activate the mic automatically once the greeting is fully spoken.
  recogEnabled=true;
}

// ════════════════════════════════════════════════════════
// CONTROLS
// ════════════════════════════════════════════════════════
document.getElementById('micBtn').addEventListener('click',()=>{
  if(sessionClosed)return;
  if(isSpeaking){stopSpeaking();recogEnabled=true;schedRestart(350);return;}
  if(isListening) stopRecog();
  else{recogEnabled=true;startRecog();}
});

document.getElementById('resetBtn').addEventListener('click',()=>{
  if(isLocked())return;
  document.getElementById('endCard').classList.remove('show');
  stopSpeaking(); stopRecog(); initDone=false;
  setTimeout(()=>init(),300);
});

let aiMuted=false;
document.getElementById('muteBtn').addEventListener('click',function(){
  aiMuted=voiceMuted=!aiMuted;
  this.classList.toggle('active',aiMuted);
  document.getElementById('muteIcon').innerHTML=aiMuted
    ?`<path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`
    :`<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
  if(aiMuted){stopSpeaking();setStatus('ready');}
});

// ════════════════════════════════════════════════════════
// BOOT — auto-start, no interaction needed
// ════════════════════════════════════════════════════════
speechSynthesis.onvoiceschanged=()=>{loadVoices();if(!initDone&&!isLocked())init();};
setTimeout(()=>{if(!initDone&&!isLocked())init();},900);
</script>
</body>
</html>
