import React from 'react';
import { getTranslations } from 'next-intl/server';

const Objetivos: React.FC = async () => {
  const t = await getTranslations('objectives');
  const items: { title: string; description: string }[] = t.raw('items');

  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-gold pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="bg-blueti text-white rounded-xl p-6 md:p-8 mb-6">
        <span className="text-gold text-xs font-bold uppercase tracking-widest mb-3 block">
          {t('generalLabel')}
        </span>
        <p className="text-base md:text-lg leading-relaxed">{t('generalText')}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-blueti/30 transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blueti/8 dark:bg-primary/10 rounded-full flex items-center justify-center text-blueti dark:text-primary font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Objetivos;
