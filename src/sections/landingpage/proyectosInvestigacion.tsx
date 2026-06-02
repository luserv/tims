import React from 'react';
import { getTranslations } from 'next-intl/server';

function FlaskIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  );
}

const ProyectosInvestigacion: React.FC = async () => {
  const t = await getTranslations('researchProjects');
  const rows: { label: string; value: string }[] = t.raw('rows');

  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-gold pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">
          {t('title')}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-border bg-muted/40">
          <span className="text-blueti dark:text-primary">
            <FlaskIcon />
          </span>
          <span className="font-semibold text-sm text-foreground">{t('activeResearch')}</span>
        </div>
        <div className="divide-y divide-border">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{row.label}</span>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm md:text-base text-foreground leading-relaxed">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProyectosInvestigacion;
