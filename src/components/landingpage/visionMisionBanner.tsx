import React from 'react';
import Image from 'next/image';

interface VisionMisionProps {
  visionTitle?: string;
  visionText?: string;
  visionImageSrc?: string;
  missionTitle?: string;
  missionText?: string;
  missionImageSrc?: string;
}

const VisionMisionBanner: React.FC<VisionMisionProps> = ({
  visionTitle = 'Visión',
  visionText = 'Ser una institución de educación superior líder, pertinente y de excelencia en academia, en investigación y vinculación que promueva el enriquecimiento de la cultura a través de la transferencia nacional e internacional de saberes y conocimientos, para la construcción de soluciones que aporten al desarrollo de la sociedad en armonía con los derechos de la naturaleza',
  visionImageSrc = '/globe.svg',
  missionTitle = 'Misión',
  missionText = 'Formar profesionales e investigadores integrales, humanistas, científicos y competentes, capaces de contribuir al desarrollo sostenible de la sociedad, el bienestar de la región y país.',
  missionImageSrc = '/window.svg',
}) => {
  return (
    <section className="relative mt-30 w-full px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta Visión */}
        <div className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-4 p-6">
            <div className="flex-shrink-0">
              <Image
                src={visionImageSrc}
                alt="Ilustración de la Visión"
                width={128}
                height={128}
                className="rounded-md object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{visionTitle}</h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{visionText}</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Misión */}
        <div className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center gap-4 p-6">
            <div className="flex-shrink-0">
              <Image
                src={missionImageSrc}
                alt="Ilustración de la Misión"
                width={128}
                height={128}
                className="rounded-md object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{missionTitle}</h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{missionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMisionBanner;