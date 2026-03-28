import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { events2026 } from './data/events';
import type { Event } from './types';
import './App.css';

const categoryColors: Record<string, string> = {
  conference: '#FF4438',
  expo: '#F5C542',
  meetup: '#34C759',
  workshop: '#5E5CE6',
  hackathon: '#FF9F0A',
  exhibition: '#30D5C8',
  other: '#8E8E93',
};

const categoryLabels: Record<string, string> = {
  conference: '컨퍼런스',
  expo: '엑스포',
  meetup: '밋업',
  workshop: '워크숍',
  hackathon: '해커톤',
  exhibition: '전시회',
  other: '기타',
};

function App() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal');
            if (id) {
              setRevealed((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sortedEvents = [...events2026].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  const now = new Date();

  const formatDateRange = (event: Event) => {
    const start = format(event.startDate, 'M.d(EEE)', { locale: ko });
    const end = format(event.endDate, 'M.d(EEE)', { locale: ko });
    return `${start} — ${end}`;
  };

  return (
    <div className="app">
      {/* ═══ Hero ═══ */}
      <section className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
        </div>
        <div className="grain" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line line-1">대한민국의</span>
            <span className="hero-line line-2">모든 테크 행사를</span>
            <span className="hero-line line-3">응원합니다.</span>
          </h1>
          <p className="hero-sub">We cheer for every tech event in Korea</p>
        </div>
        <div className="scroll-cue">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══ Manifesto ═══ */}
      <section className="manifesto" data-reveal="manifesto">
        <div className={`section-inner ${revealed.has('manifesto') ? 'revealed' : ''}`}>
          <blockquote className="quote">
            "기술은 사람을 모을 때<br />
            비로소 빛납니다."
          </blockquote>
          <p className="quote-body">
            개발자, 디자이너, 기획자가 한자리에 모여<br />
            서로의 경험을 나누고, 영감을 주고받는<br />
            그 순간들을 우리는 응원합니다.
          </p>
          <div className="manifesto-accent" />
        </div>
      </section>

      {/* ═══ Values ═══ */}
      <section className="values" data-reveal="values">
        <div className={`section-inner ${revealed.has('values') ? 'revealed' : ''}`}>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-number">01</span>
              <h3 className="value-title">연결</h3>
              <p className="value-desc">
                같은 관심사를 가진 사람들이 만나<br />
                새로운 가능성을 발견합니다.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <h3 className="value-title">성장</h3>
              <p className="value-desc">
                최신 기술과 경험을 공유하며<br />
                함께 성장해 나갑니다.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <h3 className="value-title">영감</h3>
              <p className="value-desc">
                누군가의 이야기가<br />
                또 다른 도전의 시작이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Events ═══ */}
      <section className="events" data-reveal="events">
        <div className={`section-inner ${revealed.has('events') ? 'revealed' : ''}`}>
          <div className="section-header">
            <span className="section-label">EVENTS</span>
            <h2 className="section-title">2026 테크 행사</h2>
          </div>
          <div className="events-grid">
            {sortedEvents.map((event, i) => {
              const isPast = event.endDate < now;
              const color = categoryColors[event.category] || categoryColors.other;
              return (
                <a
                  key={event.id}
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`event-card ${isPast ? 'past' : ''}`}
                  style={{ '--delay': `${i * 0.07}s`, '--card-accent': color } as React.CSSProperties}
                >
                  <div className="card-accent-bar" />
                  <div className="card-date">
                    <span className="card-month">{event.startDate.getMonth() + 1}월</span>
                    <span className="card-day">{event.startDate.getDate()}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span className="card-category" style={{ color }}>
                        {categoryLabels[event.category] || event.category}
                      </span>
                      <span className="card-range">{formatDateRange(event)}</span>
                      {isPast && <span className="card-past-badge">종료</span>}
                    </div>
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-location">{event.location}</p>
                    <p className="card-desc">{event.description}</p>
                    {event.tags && event.tags.length > 0 && (
                      <div className="card-tags">
                        {event.tags.map((tag) => (
                          <span key={tag} className="card-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="card-arrow">→</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta" data-reveal="cta">
        <div className={`section-inner ${revealed.has('cta') ? 'revealed' : ''}`}>
          <div className="cta-shapes">
            <div className="cta-ring ring-1" />
            <div className="cta-ring ring-2" />
          </div>
          <h2 className="cta-title">행사를 알려주세요</h2>
          <p className="cta-body">
            여러분이 아는 테크 행사가 있다면<br />
            공유해 주세요. 함께 응원하겠습니다.
          </p>
          <a
            href="https://github.com/Seo-yul/techsummit/issues/new?template=new-event-registration.md"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            <span>행사 제보하기</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-cheer">대한민국 테크 행사를 응원합니다</p>
          <p className="footer-brand">TechSummit Asia</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
