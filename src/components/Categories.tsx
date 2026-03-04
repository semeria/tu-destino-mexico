import React from 'react';
import { IonIcon } from '@ionic/react';
import { 
  ticketOutline, 
  bedOutline, 
  mapOutline, 
  airplaneOutline, 
  busOutline,
  cameraOutline,
  restaurantOutline,
  boatOutline
} from 'ionicons/icons';
import './Categories.css';

const Categories: React.FC = () => {
  
  // Lista extendida para probar el scroll
  const categories = [
    { name: 'Ofertas', icon: ticketOutline },
    { name: 'Hoteles', icon: bedOutline },
    { name: 'Tours', icon: mapOutline },
    { name: 'Destinos', icon: airplaneOutline },
    { name: 'XoloRuta', icon: busOutline },
  ];

  return (
    <div className="categories-wrapper">
      <div className="categories-scroll">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <div className="cat-icon-circle">
              <IonIcon icon={cat.icon} />
            </div>
            <span className="cat-label">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;