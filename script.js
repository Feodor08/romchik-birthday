const friends = [
  { name: 'Диман', videos: ['videos/Диман/video_2026-11-02_14-44-06 (4).mp4', 'videos/Диман/video_2026-11-02_14-44-06 (5).mp4', 'videos/Диман/video_2026-11-02_14-44-06 (6).mp4', 'videos/Диман/video_2026-11-02_14-44-06 (7).mp4'], note: '4 видео · показания свидетеля' },
  { name: 'Денчик', videos: ['videos/Денчик/S1610001.MP4', 'videos/Денчик/S1610002.MP4'], note: '2 видео · показания свидетеля' },
  { name: 'Данич', videos: ['videos/Данич/video_2026-11-02_14-44-06.mp4', 'videos/Данич/video_2026-11-02_14-44-06 (2).mp4', 'videos/Данич/video_2026-11-02_14-44-06 (3).mp4'], note: '3 видео · показания свидетеля' },
  { name: 'Олег', videos: ['videos/Олег/VID_20231112_161814_123450.mp4', 'videos/Олег/VID_20231112_213935_021023.mp4', 'videos/Олег/VID_20241119_092826.mp4', 'videos/Олег/VID_20260106_193239.mp4'], note: '4 видео · показания свидетеля' },
  { name: 'Федя', videos: ['videos/Федя/2021-10-26-000750447.mp4', 'videos/Федя/2022-10-19-200619440 (1).mp4', 'videos/Федя/VID_20210831_213828.mp4', 'videos/Федя/VID_20210919_170011.mp4', 'videos/Федя/VID_20211101_204516.mp4', 'videos/Федя/VID_20211127_225318.mp4', 'videos/Федя/VID_20250117_190430.mp4'], note: '7 видео · показания свидетеля' },
  { name: 'Котенков', videos: ['videos/Котенков/video_2026-11-05_14-40-30.mp4'], note: '1 видео · показания свидетеля' },
  { name: 'Лунный каблук', videos: ['videos/Лунный каблук/video_2026-11-05_14-38-34.mp4', 'videos/Лунный каблук/video_2026-11-05_14-38-39.mp4', 'videos/Лунный каблук/video_2026-11-05_14-38-58.mp4'], note: '3 видео · показания свидетеля' },
  { name: 'Рамон', videos: ['videos/Рамон/video_2026-11-05_14-36-48.mp4', 'videos/Рамон/video_2026-11-05_14-36-48 (2).mp4', 'videos/Рамон/video_2026-11-05_14-36-48 (3).mp4', 'videos/Рамон/video_2026-11-05_14-36-48 (4).mp4'], note: '4 видео · показания свидетеля' },
  { name: 'Шиян Лера', videos: ['videos/Шиян Лера/video_2026-11-05_14-39-45.mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (2).mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (3).mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (4).mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (5).mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (6).mp4', 'videos/Шиян Лера/video_2026-11-05_14-39-45 (7).mp4'], note: '7 видео · показания свидетеля' },
];

const cards = document.querySelector('#cards');
const modal = document.querySelector('#modal');
const videoSlot = document.querySelector('#video-slot');
let previousFocus;

friends.forEach((friend, index) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'friend-card reveal';
  card.setAttribute('aria-label', `Открыть поздравление: ${friend.name}`);
  card.innerHTML = `<span class="card-index">ПОКАЗАНИЯ 0${index + 1}</span><span class="card-arrow">↗</span><div class="card-icon" aria-hidden="true">◈</div><h3>${friend.name}</h3><p>${friend.note}</p>`;
  card.addEventListener('click', () => openGreeting(friend, index));
  cards.append(card);
});

const secretCard = document.createElement('button');
secretCard.type = 'button';
secretCard.className = 'friend-card secret-card reveal';
secretCard.setAttribute('aria-label', 'Открыть секретное дело');
secretCard.innerHTML = '<span class="card-index">ДОСТУП ОГРАНИЧЕН</span><span class="card-arrow">⌑</span><div class="card-icon" aria-hidden="true">▣</div><h3>СОВЕРШЕННО СЕКРЕТНО</h3><p>Сначала докажи, что знаешь пароль</p>';
secretCard.addEventListener('click', openSecret);
cards.append(secretCard);

function openGreeting(friend, index) {
  previousFocus = document.activeElement;
  document.querySelector('#modal-kicker').textContent = `ПОКАЗАНИЯ СВИДЕТЕЛЯ 0${index + 1}`;
  document.querySelector('#modal-title').textContent = `Слово ${friend.name}`;
  videoSlot.replaceChildren();
  const videoList = document.createElement('div');
  videoList.className = 'video-list';
  friend.videos.forEach((source, videoIndex) => {
    const item = document.createElement('figure');
    item.className = 'video-item';
    const video = document.createElement('video');
    video.className = 'greeting-video';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', `Видео ${videoIndex + 1} от ${friend.name}`);
    const videoSource = document.createElement('source');
    videoSource.src = encodeURI(source);
    videoSource.type = 'video/mp4';
    video.append(videoSource);
    const caption = document.createElement('figcaption');
    caption.textContent = `ВИДЕО ${String(videoIndex + 1).padStart(2, '0')} · ${friend.name.toUpperCase()}`;
    item.append(video, caption);
    videoList.append(item);
  });
  videoSlot.append(videoList);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}

function closeGreeting() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  videoSlot.replaceChildren();
  previousFocus?.focus();
}

modal.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', closeGreeting));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeGreeting();
  if (event.key === 'Escape' && secretModal.classList.contains('is-open')) closeSecret();
});

const secretModal = document.querySelector('#secret-modal');
function openSecret() {
  secretModal.classList.add('is-open');
  secretModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('#secret-answer').focus();
}

function closeSecret() {
  secretModal.classList.remove('is-open');
  secretModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

secretModal.querySelectorAll('[data-secret-close]').forEach((element) => element.addEventListener('click', closeSecret));
document.querySelector('#secret-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = document.querySelector('#secret-answer').value.trim().toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
  const feedback = document.querySelector('#secret-feedback');
  if (answer !== 'стриптиз') {
    feedback.textContent = 'Доступ закрыт. Перечитай подсказку, детектив.';
    return;
  }
  feedback.textContent = 'Код принят. Дело открыто.';
  document.querySelector('#secret-video').innerHTML = '<video class="secret-video-player" controls playsinline preload="metadata"><source src="videos/СЕКРЕТНО.mp4" type="video/mp4">Браузер не поддерживает видео.</video>';
});

const wolfButton = document.querySelector('#wolf-button');
const wolfIntro = document.querySelector('#wolf-intro');
const wolfScare = document.querySelector('#wolf-scare');
const wolfVideo = document.querySelector('#wolf-video');
wolfButton.addEventListener('click', () => {
  wolfButton.disabled = true;
  wolfIntro.classList.add('is-hidden');
  wolfScare.classList.add('is-active');
  window.setTimeout(() => {
    wolfScare.classList.remove('is-active');
    wolfVideo.controls = true;
    wolfVideo.play().catch(() => {
      wolfIntro.classList.remove('is-hidden');
      wolfButton.disabled = false;
    });
  }, 1100);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
observer.observe(secretCard);
