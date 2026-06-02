'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import IconFb from '@/components/icons/social-netwoks/icon-fb.svg';
import IconInsta from '@/components/icons/social-netwoks/icon-instagram.svg';

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

const navLinks = [
  { labelKey: 'home' as const, href: '/' },
  { labelKey: 'timeline' as const, href: '/timeline' },
  { labelKey: 'club' as const, href: '/club' },
  { labelKey: 'studentCouncil' as const, href: '/consejo-estudiantil' },
];

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="w-full bg-blueti text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xl font-bold tracking-tight">TIMS</span>
              <span className="text-gold text-xs font-semibold ml-2 uppercase tracking-widest">ESPOCH</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">{t('description')}</p>
            <div className="flex gap-3 mt-1">
              <a
                href="https://www.facebook.com/TIespochMorona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <IconFb className="w-4 h-4 fill-white" />
              </a>
              <a
                href="https://www.instagram.com/tiespochmorona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <IconInsta className="w-4 h-4 fill-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">{t('navTitle')}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">{t('contactTitle')}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+593978764482"
                className="flex items-start gap-2 text-blue-200 hover:text-white text-sm transition-colors duration-200"
              >
                <PhoneIcon />
                +593 978 764 482
              </a>
              <a
                href="mailto:informaciontecnologias2020@gmail.com"
                className="flex items-start gap-2 text-blue-200 hover:text-white text-sm transition-colors duration-200 break-all"
              >
                <EmailIcon />
                informaciontecnologias2020@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-300 text-xs">
            © {new Date().getFullYear()} ESPOCH Sede Morona Santiago. {t('rights')}
          </p>
          <p className="text-blue-400 text-xs">{t('role')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
