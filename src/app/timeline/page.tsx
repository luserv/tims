'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/sections/header/Header';
import { Badge } from '@/components/ui/badge';

interface News {
  id: string;
  title: string;
  content: string;
  publishedAt: string | null;
  createdAt: string;
  author?: { name: string; email: string };
}

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  createdAt: string;
}

type TimelineItem =
  | (News & { type: 'news'; date: string })
  | (Event & { type: 'event'; date: string });

function SkeletonCard() {
  return (
    <div className="flex gap-4 animate-pulse">
      <div className="flex flex-col items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-muted mt-1.5 flex-shrink-0" />
        <div className="w-px flex-1 bg-muted" />
      </div>
      <div className="flex-1 bg-card border border-border rounded-xl p-5 mb-6">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-muted rounded-full" />
          <div className="h-5 w-24 bg-muted rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-muted rounded mb-2" />
        <div className="h-4 w-full bg-muted rounded mb-1" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function TimelinePage() {
  const t = useTranslations('timeline');
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'news' | 'event'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([fetch('/api/news'), fetch('/api/events')]);
        if (newsRes.ok) setNews(await newsRes.json());
        if (eventsRes.ok) setEvents(await eventsRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const timelineItems: TimelineItem[] = [
    ...news.map((item) => ({ ...item, type: 'news' as const, date: item.publishedAt || item.createdAt })),
    ...events.map((item) => ({ ...item, type: 'event' as const, date: item.eventDate })),
  ]
    .filter((item) => filter === 'all' || item.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filters = [
    { key: 'all' as const, label: t('filterAll') },
    { key: 'news' as const, label: t('filterNews') },
    { key: 'event' as const, label: t('filterEvents') },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="bg-blueti text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-blue-200 text-sm">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                filter === key
                  ? 'bg-blueti text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-blueti/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-0">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : timelineItems.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
            </svg>
            {t('empty')}
          </div>
        ) : (
          <div>
            {timelineItems.map((item, index) => (
              <div key={`${item.type}-${item.id}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-5 ${item.type === 'news' ? 'bg-blueti' : 'bg-gold'}`} />
                  {index < timelineItems.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>

                <div className="flex-1 bg-card border border-border rounded-xl p-5 mb-4 hover:border-blueti/30 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge
                      variant={item.type === 'news' ? 'default' : 'secondary'}
                      className={
                        item.type === 'news'
                          ? 'bg-blueti hover:bg-blueti/90'
                          : 'bg-gold/15 text-gold hover:bg-gold/20 border-0'
                      }
                    >
                      {item.type === 'news' ? t('typeNews') : t('typeEvent')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(item.date, 'es')}</span>
                  </div>

                  <h2 className="font-semibold text-base md:text-lg text-foreground mb-2">{item.title}</h2>

                  {item.type === 'news' ? (
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.content}</p>
                      {item.author && (
                        <p className="text-xs text-muted-foreground">{t('by')} {item.author.name || item.author.email}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.description}</p>
                      {item.location && (
                        <p className="text-xs text-muted-foreground">
                          <LocationIcon />
                          {item.location}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
