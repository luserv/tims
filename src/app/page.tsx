import { getTranslations } from 'next-intl/server';
import Header from '@/sections/header/Header';
import Footer from '@/sections/footer/Footer';
import InfoBanner from '@/sections/landingpage/InfoBanner';
import OccupationalField from '@/sections/landingpage/occupationalField';
import ProfessionalProfile from '@/sections/landingpage/professionalProfile';
import Objetivos from '@/sections/landingpage/objetivos';
import ProyectosVinculacion from '@/sections/landingpage/proyectosVinculacion';
import ProyectosInvestigacion from '@/sections/landingpage/proyectosInvestigacion';
import PdfReaderWrapper from '@/sections/landingpage/PdfReaderWrapper';
import Video from '@/sections/landingpage/Video';
import Link from 'next/link';

export default async function Home() {
  const t = await getTranslations('hero');

  return (
    <div className="relative w-full font-sans bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="w-full bg-blueti">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
          <span className="inline-block bg-gold/20 text-gold text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {t('badge')}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            {t('title')}
          </h1>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#informacion"
              className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {t('ctaPrimary')}
            </a>
            <Link
              href="/timeline"
              className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
        <div className="pb-12 flex justify-center px-4">
          <Video src="./media/videopr.mp4" title="Video de la carrera" />
        </div>
      </section>

      {/* Main content */}
      <main id="informacion" className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col gap-0">
        <InfoBanner />
        <ProfessionalProfile />
        <OccupationalField />
        <Objetivos />
        <ProyectosVinculacion />
        <ProyectosInvestigacion />
        <PdfReaderWrapper />
      </main>

      <Footer />
    </div>
  );
}
