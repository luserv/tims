import React from 'react';
import { getTranslations } from 'next-intl/server';

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const OccupationalField: React.FC = async () => {
  const t = await getTranslations('occupationalField');
  const items: string[] = t.raw('items');

  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-blueti pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 bg-card border border-border rounded-xl p-5 hover:border-blueti/30 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-blueti dark:text-primary mt-0.5">
              <CheckCircleIcon />
            </span>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OccupationalField;
