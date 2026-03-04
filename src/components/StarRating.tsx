import React from 'react';
import { IonIcon } from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';

interface StarRatingProps {
  rating: number; // El número decimal (ej: 4.5, 3.2, 5)
  size?: string;  // Opcional: 'small', 'large' o tamaño en px
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = '18px' }) => {
  
  // Función para decidir qué icono mostrar en cada posición (1, 2, 3, 4, 5)
  const getIcon = (starPosition: number) => {
    // Caso 1: El rating es mayor o igual a la posición actual -> Estrella Llena
    // Ej: Rating 4.5, Posición 4 -> 4.5 >= 4 -> Llena
    if (rating >= starPosition) {
      return star;
    }
    
    // Caso 2: El rating está justo en medio -> Estrella Media
    // Ej: Rating 4.5, Posición 5 -> 4.5 > 4 (5-1) && 4.5 < 5 -> Media
    if (rating > starPosition - 1 && rating < starPosition) {
      return starHalf;
    }

    // Caso 3: El resto -> Estrella Vacía (Outline)
    return starOutline;
  };

  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((position) => (
        <IonIcon
          key={position}
          icon={getIcon(position)}
          color="warning" // Color amarillo/dorado de Ionic
          style={{ fontSize: size }}
        />
      ))}
      
      {/* Opcional: Mostrar el número al lado (4.5) */}
      <span style={{ 
        marginLeft: '5px', 
        fontSize: '12px', 
        color: '#fff', 
        fontWeight: '600' 
      }}>
        {rating}
      </span>
    </div>
  );
};

export default StarRating;