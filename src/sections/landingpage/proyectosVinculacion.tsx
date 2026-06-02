import React from 'react';
import { getTranslations } from 'next-intl/server';

function LinkIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

const ProyectosVinculacion: React.FC = async () => {
  const t = await getTranslations('outreachProjects');
  const items: string[] = t.raw('items');

  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-blueti pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">
          {t('title')}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-blueti/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0 text-gold mt-0.5">
              <LinkIcon />
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosVinculacion;
