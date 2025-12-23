import React from 'react';

interface InfoBannerProps {
  title?: string;
  duration?: string;
  modality?: string;
  cost?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({
  title = 'Ingeniero/a en Tecnologías de la Información',
  duration = '4 años',
  modality = 'Presencial', 
  cost = 'Gratuito'
}) => {
  return (
    <div className="bg-primary-900 text-white p-6 rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Informacion General</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Titulo</h3>
            <p>{title}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Duracion</h3>
            <p>{duration}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Modalidad</h3>
            <p>{modality}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Costo</h3>
            <p>{cost}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
