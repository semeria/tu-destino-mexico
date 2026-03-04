import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';

interface AmenitiesProps {
  list?: string[]; // Array de strings
}

const Amenities: React.FC<AmenitiesProps> = ({ list }) => {
  // Datos default por si falla la API
  const defaultList = ["Transporte", "Comida Buffet", "Chaleco", "Snorkel", "Casilleros"];
  
  const itemsToShow = list && list.length > 0 ? list : defaultList;

  return (
    <div className="tab-content animate-fade-in">
      <h3 className="tab-title">¿Qué incluye?</h3>
      
      <ul className="amenities-list">
        {itemsToShow.map((item, index) => (
          <li key={index}>
            <IonIcon icon={checkmarkCircleOutline} color="success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* 🚧 ZONA API: Si tu API devuelve "No incluye", podrías agregar otra lista aquí */}
    </div>
  );
};

export default Amenities;