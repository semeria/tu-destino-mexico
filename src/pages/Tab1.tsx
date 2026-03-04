import {
  IonContent,
  IonPage,
} from '@ionic/react';
import './Tab1.css';
import Header from '../components/Header';
import PromoSlider from '../components/PromoSlider';
import Categories from '../components/Categories';
import SectionCards from '../components/SectionCards';

const Tab1: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding-bottom">
        {/* Header */}
        <Header />
        
        {/* Barra de Categorías */}
        <Categories />

        {/* Slider Promocional */}
        <PromoSlider />

        {/* 1. Sección Tours */}
        <SectionCards 
          title="Los mejores tours" 
          category="tour"
          type='Actividad'
        />

        {/* 2. Sección Hoteles */}
        <SectionCards 
          title="Los mejores hoteles" 
          category="hotel"
          type='Alojamiento' 
        />

        {/* Espacio extra al final para que no tape el TabBar flotante */}
        <div style={{ height: '100px' }}></div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;