import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. IMPORTANTE: Para leer la URL
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton,
  IonButton, IonIcon, IonFooter, IonSegment, IonSegmentButton, IonLabel,
  IonSkeletonText
} from '@ionic/react';
import { shareOutline, bookmarkOutline, star, locationOutline, logoWhatsapp, cameraOutline } from 'ionicons/icons';
import './ServiceDetail.css';

import Description from '../components/service-detail/Description';
import Amenities from '../components/service-detail/Amenities';
import MapLocation from '../components/service-detail/MapLocation';
import ImageGalleryModal from '../components/service-detail/ImageGalleryModal';
import StarRating from '../components/StarRating';

const ServiceDetail: React.FC = () => {
  
  const { category, id } = useParams<{ category: string; id: string }>();
  const [showGallery, setShowGallery] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'descripcion' | 'amenidades' | 'mapa'>('descripcion');
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadServiceDetails();
  }, [category, id]); // Se recarga si cambia el ID

  const loadServiceDetails = async () => {
    setLoading(true);
    try {
      // 3. CONSTRUIMOS LA URL DE LA API INDIVIDUAL
      const url = `https://api.tudestinomx.com/api/${category}/${id}`;
      console.log(`Cargando detalle: ${url}`);

      const response = await fetch(url);
      const apiData = await response.json();
      let galleryProcessed: string[] = [];

      // 1. Verificamos si existe el campo 'gallery'
      if (apiData.gallery) {
        if (Array.isArray(apiData.gallery)) {
          // CASO A: Es un Array real ( ["url1", "url2"] )
          galleryProcessed = apiData.gallery;
        } else if (typeof apiData.gallery === 'string') {
          // CASO B: Es un texto separado por comas ( "url1,url2,url3" )
          galleryProcessed = apiData.gallery.split(',').map((url: string) => url.trim());
        }
      } 
      // CASO C: Si 'gallery' viene vacío, intentamos usar las imágenes 'adicionales' o la principal
      else if (apiData.images) {
         // Fallback inteligente: Si no hay 'gallery', buscamos en 'adicional' o 'principal'
         const additional = apiData.images.adicional?.map((img: any) => img.url) || [];
         const principal = apiData.images.principal?.[0]?.url;
         galleryProcessed = principal ? [principal, ...additional] : additional;
      }
      
      console.log("Detalle recibido:", apiData);

      // 4. MAPEO DE DATOS (API -> VISTA)
      // Ajusta estos campos según lo que veas en tu console.log real
      const mappedData = {
        id: apiData.id,
        name: apiData.name,
        image: apiData.images?.principal?.[0]?.url || 'https://via.placeholder.com/600x800',
        rating: apiData.reviews || 5,
        location: apiData.destino || (category === 'hotel' ? 'Riviera Maya' : 'Cancún'),
        description: apiData.descripcion || apiData.description || "Sin descripción disponible.",
        amenities: apiData.amenities || [
          "Transporte Incluido", "Guía Bilingüe", "Comida Buffet", "Seguro de Viajero"
        ],
        coords: apiData.google_maps || null,
        gallery: galleryProcessed.length > 0 
          ? galleryProcessed 
          : ['https://via.placeholder.com/600x800?text=Sin+Fotos']
      };

      setServiceData(mappedData);

    } catch (error) {
      console.error("Error cargando detalle:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para renderizar componentes
  const renderContent = () => {
    if (loading) return <div style={{padding:20}}>Cargando información...</div>;

    switch (selectedTab) {
      case 'descripcion':
        return <Description text={serviceData?.description} />;
      case 'amenidades':
        return <Amenities list={serviceData?.amenities} />;
      case 'mapa':
        return <MapLocation
            coords={serviceData?.coords} 
            imageMap={serviceData?.mapUrl}
          />;
      default:
        return <Description text={serviceData?.description} />;
    }
  };

  const galleryImages = serviceData?.gallery || [];
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
           <IonButtons slot="start">
             <IonBackButton defaultHref="/tab1" text="" />
           </IonButtons>
           <IonButtons slot="end">
             <IonButton><IonIcon icon={shareOutline} /></IonButton>
             <IonButton><IonIcon icon={bookmarkOutline} /></IonButton>
           </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        
        {/* HERO SECTION CON SKELETON O IMAGEN REAL */}
        {loading ? (
           <IonSkeletonText animated style={{ width: '100%', height: '60vh' }} />
        ) : (
          <div 
            className="hero-section" 
            style={{backgroundImage: `url('${serviceData?.image}')`}}
            onClick={() => setShowGallery(true)}
            >
            <div className="hero-overlay">
              <div className="hero-content animate-fade-in">
                <h1>{serviceData?.name}</h1>
                <div className="rating" style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                   <StarRating rating={serviceData?.rating || 0} size="20px" />
                </div>
                <div className="location">
                  <IonIcon icon={locationOutline} />
                  <span>{serviceData?.location}</span>
                </div>
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: '20px', right: '20px', 
              background: 'rgba(0,0,0,0.6)', color: 'white', 
              padding: '5px 10px', borderRadius: '15px', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              <IonIcon icon={cameraOutline} /> {/* Importa cameraOutline de ionicons/icons */}
              <span>Ver fotos</span>
            </div>
            
          </div>
        )}

        <div className="detail-content">
          <IonSegment 
            value={selectedTab} 
            onIonChange={(e) => setSelectedTab(e.detail.value as any)}
            mode="ios"
            className="custom-segment"
          >
            <IonSegmentButton value="descripcion"><IonLabel>Descripción</IonLabel></IonSegmentButton>
            <IonSegmentButton value="amenidades"><IonLabel>Amenidades</IonLabel></IonSegmentButton>
            <IonSegmentButton value="mapa"><IonLabel>Mapa</IonLabel></IonSegmentButton>
          </IonSegment>

          <div className="segment-container-wrapper">
            {renderContent()}
          </div>
          
          <div style={{height: '100px'}}></div>
        </div>
      </IonContent>

      <ImageGalleryModal 
        isOpen={showGallery} 
        onClose={() => setShowGallery(false)} 
        images={galleryImages} 
      />
      
      <IonFooter className="ion-no-border detail-footer">
        <IonToolbar>
          <IonButton expand="block" color="whatsapp" className="main-whatsapp-btn">
            <IonIcon slot="start" icon={logoWhatsapp} />
            SOLICITA TU <br/> COTIZACIÓN AHORA
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ServiceDetail;