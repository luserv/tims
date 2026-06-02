import React from 'react';
import { getTranslations } from 'next-intl/server';

function CalendarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function FreeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

interface InfoBannerProps {
  approvalInitial?: string;
  approvalUpdated?: string;
  coordinator?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = async ({
  approvalInitial = 'RPC-SO-30-No.544-2016',
  approvalUpdated = '650612A01-P-1401',
  coordinator = 'Ing. Paul Machado',
}) => {
  const t = await getTranslations('infoBanner');

  const stats = [
    { icon: <CalendarIcon />, label: t('duration'), value: t('durationValue') },
    { icon: <BuildingIcon />, label: t('modality'), value: t('modalityValue') },
    { icon: <FreeIcon />, label: t('cost'), value: t('costValue') },
    { icon: <UserIcon />, label: t('coordinator'), value: coordinator },
  ];

  return (
    <section className="w-full my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground mb-3">{t('title')}</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 md:p-6 text-center hover:border-blueti/30 hover:shadow-md transition-all duration-200 cursor-default"
          >
            <div className="flex justify-center mb-3 text-blueti dark:text-primary">{stat.icon}</div>
            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
            <div className="font-semibold text-foreground text-sm md:text-base">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('approvalInitial')}</span>
          <p className="text-foreground mt-1 font-mono text-sm">{approvalInitial}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('approvalUpdated')}</span>
          <p className="text-foreground mt-1 font-mono text-sm">{approvalUpdated}</p>
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;
