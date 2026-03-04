import React, { useState, useEffect } from 'react';
import { IonIcon, IonButton, IonSkeletonText } from '@ionic/react';
import { star, logoWhatsapp } from 'ionicons/icons';
import './SectionCards.css';

interface CardItem {
  id: number;
  title: string;
  location: string;
  rating: number;
  img: string;
}

interface SectionProps {
  title: string;
  category: 'tour' | 'hotel';
  type?: 'Actividad' | 'Alojamiento'; 
}

const SectionCards: React.FC<SectionProps> = ({ title, category, type }) => {
  
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [category]);

  const loadData = async () => {
    setLoading(true);
    try {
      const url = `https://api.tudestinomx.com/api/${category}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const apiData = await response.json();

      const limitedData = apiData.slice(0, 5);

      const mappedItems: CardItem[] = limitedData.map((item: any) => ({
        id: item.id,
        title: item.name, 
        img: item.principal || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
        location: item.destino || (category === 'hotel' ? 'Riviera Maya' : 'Cancún / Riviera'),
        rating: 5,
        type: type  
      }));

      setItems(mappedItems);

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <span className="see-all">Ver todos</span>
      </div>

      <div className="horizontal-scroll">
        
        {/* Skeleton Loading */}
        {loading && (
          [1, 2, 3].map((_, i) => (
            <div key={i} className="travel-card" style={{minWidth: '240px'}}>
              <IonSkeletonText animated style={{ width: '100%', height: '130px' }} />
              <div style={{ padding: '10px' }}>
                <IonSkeletonText animated style={{ width: '60%', marginBottom: '5px' }} />
                <IonSkeletonText animated style={{ width: '40%' }} />
              </div>
            </div>
          ))
        )}

        {/* Lista Real Limitada a 5 */}
        {!loading && items.map((item) => (
          <div key={item.id} className="travel-card">
            <div className="card-image" style={{ backgroundImage: `url(${item.img})` }}>
               <div className="card-overlay"></div>
            </div>
            <div className="card-details">
              <span className="subtitle">{type}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <IonIcon key={i} icon={star} color={i < item.rating ? "warning" : "medium"} />
                ))}
              </div>
              
              <h4>{item.title}</h4>
              <p className="location-text">{item.location}</p>
              
              <IonButton 
                expand="block" 
                color="whatsapp" 
                className="whatsapp-btn"
                routerLink={`/service-detail/${category}/${item.id}`}
              >
                <IonIcon slot="start" icon={logoWhatsapp} />
                COTIZAR
              </IonButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionCards;