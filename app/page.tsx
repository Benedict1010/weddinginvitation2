'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  CalendarDays,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Quote,
  Sparkles,
  X,
} from 'lucide-react'

const wedding = {
  bride: 'Dr. Praise Jose',
  groom: 'Dr. Lithiya Scaria',
  date: '30 November 2026',
  shortDate: '30.11.2026',
  isoDate: '2026-11-30T10:30:00+05:30',
  location: 'Our Lady of Lourdes Basilica, Chemperi',
  message: 'Together with their families, they joyfully invite you to celebrate the beginning of their forever.',
}

const photos = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85', alt: 'Couple walking together outdoors', caption: 'A quiet beginning' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85', alt: 'Wedding bouquet and rings', caption: 'The little details' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85', alt: 'Bride and groom embracing', caption: 'Always, in all ways' },
  { src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85', alt: 'Couple beside a lake', caption: 'Where we feel at home' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85', alt: 'Wedding tables with flowers', caption: 'Gathered with love' },
  { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85', alt: 'Bride holding a bouquet', caption: 'A day to remember' },
]

const story = [
  ['How we met', 'A serendipitous hello became the first page of a story we never want to stop writing.'],
  ['Our first memories', 'From long conversations to small adventures, every ordinary day started feeling extraordinary.'],
  ['The beginning of forever', 'Somewhere between laughter and quiet moments, we knew we had found something lasting.'],
  ['The proposal', 'With full hearts and a little bit of magic, we said yes to every tomorrow together.'],
]

const events = [
  { name: 'Wedding Ceremony', date: 'Monday, 30 November 2026', time: '10:30 AM', place: 'Our Lady of Lourdes Basilica', address: 'Chemperi, Kerala', icon: Sparkles },
  { name: 'Reception', date: 'Monday, 30 November 2026', time: '12:30 PM onwards', place: 'Thundaparambil House', address: 'Chemperi, Kerala', icon: Heart },
]

function Countdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const values = useMemo(() => {
    const difference = Math.max(0, new Date(wedding.isoDate).getTime() - now)
    return [Math.floor(difference / 86400000), Math.floor(difference / 3600000) % 24, Math.floor(difference / 60000) % 60, Math.floor(difference / 1000) % 60]
  }, [now])
  return <div className="countdown" aria-label="Countdown to the wedding"><span><b>{values[0]}</b><small>days</small></span><i>:</i><span><b>{String(values[1]).padStart(2, '0')}</b><small>hours</small></span><i>:</i><span><b>{String(values[2]).padStart(2, '0')}</b><small>minutes</small></span><i>:</i><span><b>{String(values[3]).padStart(2, '0')}</b><small>seconds</small></span></div>
}

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!opened) return

    const pixelsPerTick = 0.23
    const autoScroll = window.setInterval(() => {
      const scrollRoot = document.scrollingElement || document.documentElement
      const atEnd = window.innerHeight + scrollRoot.scrollTop >= scrollRoot.scrollHeight - 1
      if (atEnd) {
        window.clearInterval(autoScroll)
        return
      }
      scrollRoot.scrollTop += pixelsPerTick
    }, 16)

    return () => window.clearInterval(autoScroll)
  }, [opened])

  if (!opened) return <Opening onOpen={() => setOpened(true)} />

  return (
    <main className="wedding-site">
      <header className="site-nav">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}><span>P</span><Heart size={12} fill="currentColor" /><span>L</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['home', 'story', 'events', 'venue'].map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item === 'story' ? 'Our Story' : item === 'events' ? 'Wedding Details' : item[0].toUpperCase() + item.slice(1)}</a>)}
        </nav>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-botanical botanical-one" aria-hidden="true">❧</div><div className="hero-botanical botanical-two" aria-hidden="true">❧</div>
        <div className="hero-copy"><p className="eyebrow">With the blessings of our beloved parents</p><div className="monogram">P <Heart size={18} fill="currentColor" /> L</div><p className="script">Together with their families</p><h1>{wedding.bride}<em>&amp;</em>{wedding.groom}</h1><p className="hero-message">{wedding.message}</p><div className="hero-date"><span>{wedding.shortDate}</span><span>•</span><span>{wedding.location}</span></div><a className="scroll-cue" href="#story"><ArrowDown /> Explore our story</a></div>
        <div className="hero-image"><img src={photos[0].src} alt={photos[0].alt} /><div className="image-frame" /></div>
      </section>

      <section className="countdown-band"><p>Counting down to our day</p><Countdown /></section>

      <section id="story" className="story section-shell"><div className="section-heading"><p className="eyebrow">A little bit of forever</p><h2>Our Story</h2><p>Every love story is beautiful, but ours is our favorite.</p></div><div className="story-intro"><div className="story-photo"><img src={photos[2].src} alt={photos[2].alt} /></div><div><Quote className="quote-icon" /><p>We met in the most unexpected way and instantly felt a connection. Now, we’re so excited to celebrate our love with you.</p><span className="signature">Praise &amp; Lithiya</span></div></div><div className="timeline">{story.map(([title, text], index) => <article key={title} className="timeline-item"><span className="timeline-number">0{index + 1}</span><div><p className="eyebrow">Chapter {index + 1}</p><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section id="events" className="events section-shell"><div className="section-heading"><p className="eyebrow">Join us as we celebrate</p><h2>Wedding Details</h2><p>Two moments, one beautiful beginning.</p></div><div className="event-grid">{events.map((event) => { const Icon = event.icon; return <article className="event-card" key={event.name}><Icon className="event-icon" /><p className="eyebrow">{event.name}</p><h3>{event.date}</h3><div className="event-meta"><span><Clock3 />{event.time}</span><span><MapPin />{event.place}</span></div><p>{event.address}</p><a href="#venue">View venue details <ChevronRight /></a></article> })}</div></section>

      <section id="venue" className="venue section-shell"><div className="venue-copy"><p className="eyebrow">Where we say “I do”</p><h2>Our Lady of Lourdes Basilica</h2><p className="venue-place">Chemperi, Kerala</p><p>Our ceremony will be held at this beautiful, beloved place. We would be honored to have you share this sacred moment with us.</p><a className="gold-button" href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Lourdes+Basilica+Chemperi" target="_blank" rel="noreferrer"><MapPin /> Get directions</a></div><div className="venue-image"><img src={photos[4].src} alt="Floral wedding tables prepared for a celebration" /></div></section>

      <footer><div className="footer-mark">P <Heart size={14} fill="currentColor" /> L</div><p>With love, Praise &amp; Lithiya</p><small>30 November 2026 · Chemperi</small></footer>

    </main>
  )
}

function Opening({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    if (isOpening) return
    setIsOpening(true)
    onOpen()
  }

  return <main className="opening"><div className="opening-flower flower-left">❧</div><div className="opening-flower flower-right">❧</div><div className="invitation-card"><p className="eyebrow">The wedding celebration of</p><div className="opening-monogram">P <Heart size={18} fill="currentColor" /> L</div><h1>Praise <em>&amp;</em> Lithiya</h1><div className="ornament">◇</div><p className="opening-date">30 · 11 · 2026</p><p className="opening-location">Our Lady of Lourdes Basilica<br />Chemperi</p><button className="open-button" onClick={handleOpen} disabled={isOpening} aria-busy={isOpening}>{isOpening ? 'Opening invitation' : 'Open invitation'} <ArrowDown /></button></div></main>
}
