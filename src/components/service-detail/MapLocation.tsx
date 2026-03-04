import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { mapOutline } from 'ionicons/icons';

interface MapProps {
  coords?: number[]; 
  imageMap?: string;
}

const MapLocation: React.FC<MapProps> = ({ coords, imageMap }) => {
  
  // Validamos si vienen las coordenadas [lat, lng]
  const hasCoordinates = coords && coords.length === 2;
  const lat = hasCoordinates ? coords![0] : 0;
  const lng = hasCoordinates ? coords![1] : 0;


  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=15&output=embed&iwloc=near`;

  // 2. URL PARA ABRIR LA APP NATIVA
  const appUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="tab-content animate-fade-in">
      <h3 className="tab-title">Ubicación</h3>
      
      <div className="map-container">
        {hasCoordinates ? (
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={embedUrl}
            style={{ border: 0, minHeight: '300px', display: 'block' }} 
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          /* Fallback si no hay coordenadas */
          <img 
            src={imageMap || "https://via.placeholder.com/600x400.png?text=Ubicacion+No+Disponible"} 
            alt="Mapa Estático" 
            className="map-image"
          />
        )}
      </div>

      {/* Botón para abrir la App Externa */}
      {hasCoordinates && (
        <IonButton 
          href={appUrl} 
          target="_blank" 
          expand="block" 
          fill="outline" 
          color="secondary"
          className="btn-ver-mapa"
          style={{ marginTop: '20px' }}
        >
          <IonIcon slot="start" icon={mapOutline} />
          Ver ubicación en App
        </IonButton>
      )}
    </div>
  );
};

export default MapLocation;