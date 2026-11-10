'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CakeSlice, ChevronLeft, ChevronRight, Flower2, Heart, MailOpen, Pause, Play, X } from 'lucide-react';

const galleryPhotos = [
  { src: '/images/memory-1.jpeg', caption: 'A day I wish I could replay', date: 'THE LITTLE MOMENTS', detail: 'Hari sederhana terasa istimewa karena kita melewatinya bersama. Momen kecil seperti ini selalu ingin kusimpan lebih lama.' },
  { src: '/images/memory-2.jpeg', caption: 'My favourite kind of view', date: 'YOU & ME', detail: 'Pemandangan indah jadi terasa lebih lengkap karena bisa menikmatinya bersamamu. Aku ingin selalu mengingat suasana ini.' },
  { src: '/images/memory-3.jpeg', caption: 'A memory I keep close', date: 'SOMEWHERE IN TIME', detail: 'Ada hal-hal kecil dari hari ini yang masih membuatku tersenyum. Foto ini jadi pengingat betapa berharganya waktu bersamamu.' },
  { src: '/images/memory-4.jpeg', caption: 'Still my favourite person', date: 'ALWAYS', detail: 'Di antara banyak hal yang berubah, aku tetap bersyukur bisa melewati hari-hari bersamamu.' },
];

const heroPhotos = [
  { src: '/images/hero-1.jpeg', caption: 'A favourite little moment' },
  { src: '/images/hero-2.jpeg', caption: 'A day spent together' },
  { src: '/images/hero-3.jpeg', caption: 'One to remember' },
];

const framePhotos = [
  { src: '/images/frame-1.jpeg', caption: 'A moment from our story' },
  { src: '/images/frame-2.jpeg', caption: 'Another day together' },
  { src: '/images/frame-3.jpeg', caption: 'A memory to keep' },
];


const memories = [
  {
    number: '01',
    date: 'THE BEGINNING',
    title: 'From strangers to something special',
    body: 'Dulu, kita masih malu-malu untuk sekadar saling menyapa. Ada rasa canggung setiap kali berpapasan, sampai akhirnya waktu membawa kita pada satu momen ketika kita mulai berani mengungkapkan apa yang selama ini hanya tersimpan dalam hati. Siapa sangka, dari dua orang yang awalnya hanya saling diam, kita bisa menjadi dua orang yang saling memiliki.'
  },
  {
    number: '02',
    date: 'A FAVOURITE DAY',
    title: 'Little moments, endless memories',
    body: 'Pulang malam berdua, menikmati kopi kenangan sambil bercerita, movie date sederhana, sampai obrolan random yang rasanya tidak pernah ada habisnya. Mungkin bagi orang lain itu hanya kegiatan biasa, tapi bagiku, semuanya terasa istimewa karena ada kamu di sana. Ternyata, tempat dan kegiatan sederhana bisa menjadi kenangan yang begitu berharga ketika dilewati bersama orang yang tepat.'
  },
  {
    number: '03',
    date: 'GROWING TOGETHER',
    title: 'Still choosing each other',
    body: 'Aku tahu, perjalanan kita tidak selalu dipenuhi hal-hal indah. Ada perbedaan, kesalahpahaman, dan masalah yang terkadang membuat keadaan terasa sulit. Tapi aku bersyukur karena kita selalu berusaha menghadapinya bersama. Belajar saling memahami, memaafkan, dan pada akhirnya kembali tertawa setelah melewati hari yang tidak mudah. Bagiku, itulah arti tumbuh bersama: bukan tentang tidak pernah punya masalah, tetapi tentang tetap memilih untuk saling memperbaiki.'
  },
  {
    number: '04',
    date: 'TODAY & ALWAYS',
    title: 'More memories to make with you',
    body: 'Untuk sekarang, harapanku sederhana: semoga kita tetap bersama, terus saling mencintai, dan tidak pernah lelah untuk menjaga satu sama lain. Aku tahu masih banyak perjalanan seru, cerita baru, tempat yang belum kita kunjungi, dan mimpi yang ingin kita wujudkan bersama. Aku tidak tahu bagaimana hari-hari ke depan akan berjalan, tapi aku berharap kita tetap menjadi dua orang yang saling menggenggam, apa pun yang akan kita hadapi. Happy birthday, my favorite person. Here’s to many more chapters with you. ♡'
  },
];

function EnvelopeIntro({ onOpen, onSkip, reduceMotion }: { onOpen: () => void; onSkip: () => void; reduceMotion: boolean }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduceMotion ? 0 : 1550);
  };
  return <motion.div className={`intro-screen ${opening ? 'is-opening' : ''}`} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .8 } }}>
    <div className="intro-grain" aria-hidden="true" />
    <p className="eyebrow intro-eyebrow">A LITTLE SOMETHING, JUST FOR YOU</p>
    <motion.div className="envelope-wrap" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
      <div className="envelope-shadow" />
      <div className="envelope">
        <div className="envelope-back" />
        <motion.div className="letter-peek"><span className="script">To my favourite person</span><Heart size={15} fill="currentColor" /></motion.div>
        <div className="envelope-front" />
        <div className="envelope-flap" />
        <motion.div className="wax-seal"><Heart size={20} fill="currentColor" /></motion.div>
      </div>
    </motion.div>
    <motion.h1 className="intro-title" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>A special delivery,<br /><em>just for you.</em></motion.h1>
    <p className="intro-copy">A small collection of words, memories, and all the love<br className="desktop-only" /> that sometimes is hard to say out loud.</p>
    <button className="open-button" onClick={open} disabled={opening} aria-label="Open the birthday letter">{opening ? 'OPENING YOUR LETTER…' : 'OPEN YOUR LETTER'} <MailOpen size={15} /></button>
    <button className="skip-button" onClick={onSkip} disabled={opening}>SKIP INTRO</button>
    <span className="intro-foot">MADE WITH LOVE · 100% YOURS</span>
  </motion.div>;
}

function VinylPlayer({ audioRef, unavailable }: { audioRef: React.RefObject<HTMLAudioElement | null>; unavailable: boolean }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // The first play event may happen before this component mounts after the envelope opens.
    setPlaying(!audio.paused && !audio.ended);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onPause);
    return () => { audio.removeEventListener('play', onPlay); audio.removeEventListener('pause', onPause); audio.removeEventListener('ended', onPause); };
  }, [audioRef]);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    if (!audio.paused) audio.pause();
    else { try { await audio.play(); } catch { setPlaying(false); } }
  };
  return <div className="vinyl-player">
    <div className={`vinyl-disc ${playing ? 'is-playing' : ''}`} aria-hidden="true"><div className="vinyl-label"><span>FOR YOU</span><i /></div></div>
    <div className="vinyl-info"><span className="vinyl-kicker">{playing ? <><i className="music-bars" /> NOW PLAYING</> : 'A LITTLE SOUNDTRACK'}</span><strong>A song for you</strong><span className="vinyl-sub">{unavailable ? 'Add our-song.mp3 to begin' : playing ? 'playing just for you' : 'tap to listen'}</span></div>
    <button className="vinyl-toggle" onClick={toggle} disabled={unavailable} aria-label={playing ? 'Pause music' : 'Play music'} title={unavailable ? 'Add your song at public/music/our-song.mp3' : undefined}>{playing ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button>
  </div>;
}

function PhotoImage({ src, caption, className = '' }: { src: string; caption: string; className?: string }) {
  return <img className={`photo-asset ${className}`} src={src} alt={caption} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />;
}

export default function BirthdayExperience() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [wishStarted, setWishStarted] = useState(false);
  const [wished, setWished] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();

  const startExperience = useCallback(async () => {
    setOpened(true);
    try { await audioRef.current?.play(); } catch { /* The player remains available for a deliberate tap. */ }
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowRight') setActivePhoto(index => index === null ? null : (index + 1) % galleryPhotos.length);
      if (event.key === 'ArrowLeft') setActivePhoto(index => index === null ? null : (index + galleryPhotos.length - 1) % galleryPhotos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePhoto]);

  const reveal: Variants = reduceMotion ? { hidden: {}, visible: {} } : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: 'easeOut' } } };
  const makeWish = () => {
    if (wishStarted) return;
    setWishStarted(true);
    window.setTimeout(() => setWished(true), reduceMotion ? 0 : 2700);
  };

  return <main>
    <audio ref={audioRef} src="/music/our-song.mp3" loop preload="none" onError={() => setAudioUnavailable(true)} />
    <AnimatePresence>{!opened && <EnvelopeIntro onOpen={startExperience} onSkip={startExperience} reduceMotion={Boolean(reduceMotion)} />}</AnimatePresence>
    {opened && <>
      <div className="page-noise" aria-hidden="true" />
      <div className="ambient-petals" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="topbar"><a href="#home" className="wordmark">for you<span>♡</span></a><span className="topbar-note">A DIGITAL LOVE LETTER</span><a className="topbar-link" href="#memories">OUR STORY <ArrowUpRight size={13} /></a></header>

      <section className="hero section-shell" id="home">
        <div className="hero-left">
          <div className="scribble-bg" aria-hidden="true">flowers for you<br />flowers for you<br />flowers for you<br />flowers for you<br />flowers for you</div>
          <div className="photo-stack">
            <div className="tape" />
            <div className="polaroid polaroid-main"><div className="photo-placeholder photo-one"><PhotoImage src={heroPhotos[0].src} caption={heroPhotos[0].caption} /></div><p>the little things ♡</p></div>
            <div className="polaroid polaroid-small"><div className="photo-placeholder photo-two"><PhotoImage src={heroPhotos[1].src} caption={heroPhotos[1].caption} /></div><p>i love you ♡</p></div>
            <div className="polaroid polaroid-bottom"><div className="photo-placeholder photo-three"><PhotoImage src={heroPhotos[2].src} caption={heroPhotos[2].caption} /></div><p>favorite person ♡</p></div>
            <span className="hand-note">/ all my love,<br /> always</span>
          </div>
          <span className="hero-index">FIG. 01 — A COLLECTION OF US</span>
        </div>
        <div className="hero-right">
          <span className="eyebrow"><span className="eyebrow-line" /> TODAY IS ALL ABOUT YOU</span>
          <h1>Happy Birthday,<br /><em>My Love</em><span className="title-heart">♥</span></h1>
          <div className="hero-rule" />
          <p className="hero-message">To my birthday girl, wishing you the happiest day.<br />I hope this new chapter brings you all the beautiful things you deserve.</p>
          <p className="hero-message second">I'm always proud of you, and I'll keep cheering for you in every little thing, in every big dream. Thank you for making my world a little softer just by being in it.</p>
          <p className="script hero-sign">With all my love, always.</p>
          <div className="hero-bottom"><span>MADE ESPECIALLY FOR YOU</span><CakeSlice size={26} strokeWidth={1} /><span>EST. WITH LOVE</span></div>
        </div>
        <a href="#letter" className="scroll-cue"><span>SCROLL TO UNWRAP</span><ArrowDown size={14} /></a>
      </section>

      <section className="letter-section section-shell" id="letter">
        <div className="section-label"><span>01 / A NOTE FROM ME</span><span>PLEASE READ SLOWLY</span></div>
        <motion.div className={`letter-card ${letterOpen ? 'letter-card-open' : ''}`} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }}>
          {!letterOpen ? <>
            <div className="letter-stamp">SEALED<br />WITH LOVE</div>
            <span className="script letter-pretitle">A little note for you</span>
            <h2>Some things are<br /><em>better written.</em></h2>
            <p className="letter-teaser">I've written something for you... Ada banyak hal yang ingin aku bilang, dan mungkin nggak semuanya bisa tersampaikan setiap hari. Jadi, aku tuliskan sedikit di sini khusus untuk kamu.</p>
            <button className="text-link" onClick={() => setLetterOpen(true)}>OPEN YOUR LETTER <ArrowUpRight size={15} /></button>
          </> : <motion.div className="letter-reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <button className="letter-close" onClick={() => setLetterOpen(false)} aria-label="Fold the letter"><X size={16} /></button>
            <span className="script letter-pretitle">To the one I adore,</span>
            <h2>Happy birthday, <em>sayang.</em></h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>Selamat ulang tahun untuk seseorang yang kehadirannya selalu berhasil membuat hari-hariku terasa lebih baik.</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>Thank you for being exactly who you are. Aku bangga sama semua hal yang sudah kamu lewati, semua usaha yang mungkin nggak selalu orang lain lihat, dan semua versi dirimu yang terus bertumbuh.</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>Semoga di umur yang baru ini, kamu dikelilingi hal-hal baik, diberi banyak alasan untuk tersenyum, dan selalu punya keberanian untuk mengejar apa pun yang kamu impikan.</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}>Kalau suatu hari dunia terasa berat, I hope you remember that you don't have to figure everything out at once. I'll be right here, cheering for you.</motion.p>
            <motion.p className="script letter-signature" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>I love you, endlessly. ♡</motion.p>
          </motion.div>}
        </motion.div>
      </section>

      <section className="gallery-section section-shell" id="memories">
        <div className="section-label"><span>02 / THE LITTLE MOMENTS</span><span>OUR PHOTO ALBUM</span></div>
        <div className="section-heading-row"><div><span className="script">A few frames of forever</span><h2>Our little <em>memories.</em></h2></div><p>Some moments pass. Some stay with us.<br />These are a few I keep close.</p></div>
        <div className="gallery-grid">{galleryPhotos.map((photo, i) => <motion.button className={`gallery-polaroid gallery-${i + 1}`} key={photo.src} onClick={() => setActivePhoto(i)} initial={reduceMotion ? false : { opacity: 0, y: 32, rotate: (i % 2 ? 4 : -4) }} whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -3 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .75, delay: i * .12 }} aria-label={`View photo: ${photo.caption}`}><div className={`gallery-image gallery-image-${i + 1}`}><PhotoImage src={photo.src} caption={photo.caption} /><span className="image-number">0{i + 1}</span></div><div className="gallery-caption"><span>{photo.date}</span><p>{photo.caption}</p></div></motion.button>)}</div>
        <p className="gallery-footnote">A LITTLE REMINDER THAT LIFE IS BEAUTIFUL WITH YOU IN IT. ♡</p>
      </section>

      <motion.div className="film-transition section-shell" initial={reduceMotion ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} aria-label="A strip of our memories">
        <div className="film-holes" aria-hidden="true" />
        <div className="film-frames">{framePhotos.map((photo, i) => <div className="film-frame" key={photo.src}><PhotoImage src={photo.src} caption={photo.caption} /><span>FRAME 0{i + 1}</span></div>)}</div>
        <div className="film-holes" aria-hidden="true" />
      </motion.div>

      <section className="timeline-section section-shell" id="timeline">
        <div className="section-label"><span>03 / CHAPTERS OF US</span><span>THEN, NOW & ALWAYS</span></div>
        <div className="timeline-intro"><span className="script">Every love has its little chapters</span><h2>Our story, <em>so far.</em></h2><p>Not every moment is captured in a photo. Some live quietly in the heart.</p></div>
        <div className="timeline-list">{memories.map((item, i) => <motion.article className="timeline-item" key={item.number} initial={reduceMotion ? false : { opacity: 0, x: i % 2 ? 18 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .5 }}><div className="timeline-number">{item.number}</div><div className="timeline-content"><span>{item.date}</span><h3>{item.title}</h3><p>{item.body}</p></div><div className="timeline-mark" aria-hidden="true"><Flower2 size={19} strokeWidth={1.25} /></div></motion.article>)}</div>
      </section>

      <section className={`birthday-section section-shell ${wishStarted ? 'birthday-wished' : ''}`}>
        <div className="birthday-inner">
          {!wished ? <>
            <span className="script">one last little surprise...</span>
            <div className="cake-scene" aria-label="A birthday cake with one candle"><span className="candle-flame" /><span className="candle-smoke" /><span className="candle" /><div className="cake-top" /><div className="cake-body"><i /><i /><i /></div><div className="cake-plate" /></div>
            <h2>Before you go,<br /><em>make a wish...</em></h2>
            <button className="wish-button" onClick={makeWish} disabled={wishStarted}>{wishStarted ? 'YOUR WISH IS ON ITS WAY' : 'MAKE A WISH'} <Heart size={14} /></button>
            <span className="birthday-bottom">YOU DESERVE ALL THE GOOD THINGS.</span>
          </> : <motion.div className="wish-ending" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .75, delayChildren: .65 } } }}>
            <span className="wish-burst" aria-hidden="true"><i /><i /><i /></span>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>If I could choose again,</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}><em>I'd still choose you.</em></motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>Happy Birthday,<br /><em>My Love ♡</em></motion.h2>
            <motion.span className="script" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>A little website, with a whole lot of love.</motion.span>
          </motion.div>}
        </div>
      </section>

      <footer className="footer section-shell"><span className="script">I'd choose you, in every lifetime.</span><div className="footer-line" /><div><span>MADE WITH LOVE, JUST FOR YOU</span><span>© OUR LITTLE CORNER OF THE WORLD</span></div></footer>
      <VinylPlayer audioRef={audioRef} unavailable={audioUnavailable} />
    </>}

    <AnimatePresence>{activePhoto !== null && <motion.div className="modal-backdrop photo-backdrop" role="dialog" aria-modal="true" aria-label="Photo album" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}><button className="modal-close photo-close" onClick={() => setActivePhoto(null)} aria-label="Close photo"><X size={20} /></button><button className="photo-nav prev" onClick={e => { e.stopPropagation(); setActivePhoto((activePhoto + galleryPhotos.length - 1) % galleryPhotos.length); }} aria-label="Previous photo"><ChevronLeft /></button><div className="photo-detail-layout" onClick={e => e.stopPropagation()}><div className="lightbox-polaroid"><div className={`gallery-image gallery-image-${activePhoto + 1}`}><PhotoImage src={galleryPhotos[activePhoto].src} caption={galleryPhotos[activePhoto].caption} /></div><p>{galleryPhotos[activePhoto].caption}</p></div><aside className="photo-story"><span className="photo-story-kicker">MEMORY 0{activePhoto + 1} <i /> {galleryPhotos[activePhoto].date}</span><h2>{galleryPhotos[activePhoto].caption}</h2><p>{galleryPhotos[activePhoto].detail}</p><span className="script photo-story-sign">A moment to keep close.</span></aside></div><button className="photo-nav next" onClick={e => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % galleryPhotos.length); }} aria-label="Next photo"><ChevronRight /></button></motion.div>}</AnimatePresence>
  </main>;
}
