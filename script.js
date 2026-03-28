/* TFP Briefing — Timeline Controller */
const MUSIC_VOLUME = 0.15;
const music = document.getElementById('music');
const startScreen = document.getElementById('start-screen');
const playBtn = document.getElementById('play-btn');

const timeline = [
  { start: 0,   end: 12,  scene: 'act1' },
  { start: 12,  end: 20,  scene: 'card1' },
  { start: 20,  end: 28,  scene: 'card2' },
  { start: 28,  end: 36,  scene: 'card3' },
  { start: 36,  end: 44,  scene: 'card4' },
  { start: 44,  end: 52,  scene: 'card5' },
  { start: 52,  end: 59,  scene: 'proof1' },
  { start: 59,  end: 66,  scene: 'proof2' },
  { start: 66,  end: 73,  scene: 'proof3' },
  { start: 73,  end: 80,  scene: 'proof4' },
  { start: 80,  end: 115, scene: 'act4' },
  { start: 115, end: 128, scene: 'act5' },
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
  if (t < 0 || t >= 12) return;
  const logo = document.querySelector('.act1-logo');
  const line = document.querySelector('.act1-line');
  const name = document.querySelector('.act1-name');
  const tag = document.querySelector('.act1-tagline');
  if (t >= 3) logo.classList.add('show');
  if (t >= 6) line.classList.add('show');
  if (t >= 8) { name.classList.add('show'); tag.classList.add('show'); }
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

/* Volume fade at end */
function fadeVolume(t) {
  if (t >= 120) {
    const fade = Math.max(0, 1 - (t - 120) / 8);
    music.volume = MUSIC_VOLUME * fade;
  }
}

/* Main tick */
function tick() {
  const t = music.currentTime;
  if (t >= 128) { document.body.classList.add('ended'); return; }
  activateScene(t);
  manageVideos(t);
  tickAct1(t);
  tickAct2(t);
  fadeVolume(t);
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
