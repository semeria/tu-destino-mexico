import React from 'react';
import './PromoSlider.css';

const PromoSlider: React.FC = () => {
  
  // Datos simulados para las promociones
  const promos = [
    { id: 1, title: 'Promo Verano', color: '#ff9f43', img: 'https://picsum.photos/600/300?random=10' },
    { id: 2, title: 'Descuento 50%', color: '#ee5253', img: 'https://picsum.photos/600/300?random=11' },
    { id: 3, title: 'Viaja Gratis', color: '#0abde3', img: 'https://picsum.photos/600/300?random=12' },
  ];

  return (
    <div className="promo-slider-wrapper">
      <div className="slider-container">
        {promos.map((promo) => (
          <div 
            key={promo.id} 
            className="slider-item"
            style={{ backgroundImage: `url(${promo.img})` }}
          >
            <div className="slider-content">
              <h3>{promo.title}</h3>
              <button>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;