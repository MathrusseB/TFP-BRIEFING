/* TFP Briefing — Timeline Controller */
const MUSIC_VOLUME = 0.15;
const music = document.getElementById('music');
const startScreen = document.getElementById('start-screen');
const playBtn = document.getElementById('play-btn');

const timeline = [
  { start: 0,   end: 6,   scene: 'act1' },
  { start: 6,   end: 10,  scene: 'card1' },
  { start: 10,  end: 14,  scene: 'card2' },
  { start: 14,  end: 18,  scene: 'card3' },
  { start: 18,  end: 22,  scene: 'card4' },
  { start: 22,  end: 26,  scene: 'card5' },
  { start: 26,  end: 34,  scene: 'proof1' },
  { start: 34,  end: 54,  scene: 'act4' },
  { start: 54,  end: 68,  scene: 'act5' },
];

let activeScene = null;

/* Video preload & play management */
function manageVideos(t) {
  timeline.forEach(entry => {
    const el = document.getElementById(entry.scene);
    const vid = el.querySelector('.bg-video');
    if (!vid) return;
    if (t >= entry.start - 3 && t < entry.end) {
      if (vid.preload === 'none') { vid.preload = 'auto'; vid.load(); }
    }
    if (t >= entry.start && t < entry.end) {
      if (vid.paused) vid.play().catch(() => {});
    } else {
      if (!vid.paused) vid.pause();
    }
  });
}

/* Scene activation */
function activateScene(t) {
  let current = null;
  for (const entry of timeline) {
    if (t >= entry.start && t < entry.end) { current = entry.scene; break; }
  }
  if (current === activeScene) return;
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  if (current) document.getElementById(current).classList.add('active');
  activeScene = current;
}

/* === Act 1 sub-animations === */
function tickAct1(t) {
  if (t < 0 || t >= 6) return;
  const logo = document.querySelector('.act1-logo');
  const line = document.querySelector('.act1-line');
  const name = document.querySelector('.act1-name');
  const tag = document.querySelector('.act1-tagline');
  if (t >= 0.5) logo.classList.add('show');
  if (t >= 2) line.classList.add('show');
  if (t >= 3) { name.classList.add('show'); tag.classList.add('show'); }
}

/* === Act 2 sub-animations === */
function tickAct2(t) {
  if (t < 12 || t >= 52) return;
  const cards = ['card1', 'card2', 'card3', 'card4', 'card5'];
  cards.forEach(id => {
    const content = document.querySelector(`#${id} .card-content`);
    if (document.getElementById(id).classList.contains('active')) {
      content.classList.add('show');
    } else {
      content.classList.remove('show');
    }
  });
}

/* === Act 3 sub-animations === */
function tickAct3(t) {
  if (t < 26 || t >= 34) return;
  const content = document.querySelector('#proof1 .proof-content');
  if (document.getElementById('proof1').classList.contains('active')) {
    content.classList.add('show');
    const items = document.querySelectorAll('.proof-item');
    items.forEach((item, i) => {
      if (t >= 26.5 + i * 0.4) item.classList.add('show');
    });
  }
}

/* === Act 4 sub-animations (Apex Box) === */
function tickAct4(t) {
  if (t < 34 || t >= 54) return;
  const label = document.querySelector('.act4-label');
  const title = document.querySelector('.act4-title');
  const line = document.querySelector('.act4-line');
  const img = document.querySelector('.apex-img');
  const tagline = document.querySelector('.apex-tagline');
  const features = document.querySelectorAll('.apex-feature');
  if (t >= 34) label.classList.add('show');
  if (t >= 34.3) title.classList.add('show');
  if (t >= 34.6) line.classList.add('show');
  if (t >= 36) { img.classList.add('show'); tagline.classList.add('show'); }
  features.forEach((f, i) => {
    if (t >= 38 + i * 2) f.classList.add('show');
  });
}

/* === Act 5 sub-animations (Close) === */
function tickAct5(t) {
  if (t < 54 || t >= 68) return;
  const logo = document.querySelector('.act5-logo');
  const name = document.querySelector('.act5-name');
  const line = document.querySelector('.act5-line');
  const phone = document.querySelector('.act5-phone');
  const url = document.querySelector('.act5-url');
  if (t >= 55) logo.classList.add('show');
  if (t >= 56) { name.classList.add('show'); line.classList.add('show'); }
  if (t >= 57) { phone.classList.add('show'); url.classList.add('show'); }
}

/* Main tick */
function tick() {
  const t = music.currentTime;
  if (t >= 68) { document.body.classList.add('ended'); return; }
  activateScene(t);
  manageVideos(t);
  tickAct1(t);
  tickAct2(t);
  tickAct3(t);
  tickAct4(t);
  tickAct5(t);
  requestAnimationFrame(tick);
}

/* Start */
playBtn.addEventListener('click', () => {
  music.volume = MUSIC_VOLUME;
  music.play();
  startScreen.classList.remove('active');
  startScreen.style.opacity = '0';
  startScreen.style.pointerEvents = 'none';
  requestAnimationFrame(tick);
});
