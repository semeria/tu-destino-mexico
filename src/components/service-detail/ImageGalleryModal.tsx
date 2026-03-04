import React, { useState } from 'react';
import { IonModal, IonContent, IonButton, IonIcon } from '@ionic/react';
import { closeOutline, chevronBack, chevronForward } from 'ionicons/icons';
import './ImageGalleryModal.css';

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const ImageGalleryModal: React.FC<GalleryProps> = ({ isOpen, onClose, images }) => {
  
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="gallery-modal">
      <IonContent className="gallery-content">
        
        {/* Botón Cerrar (Top Right) */}
        <div className="gallery-header">
          <IonButton fill="clear" onClick={onClose} className="close-btn">
            <IonIcon icon={closeOutline} slot="icon-only" />
          </IonButton>
        </div>

        {/* Contenedor con Scroll Horizontal (Snap) */}
        <div className="gallery-slider">
          {images.map((img, index) => (
            <div key={index} className="gallery-slide">
              <img src={img} alt={`Galeria ${index}`} />
            </div>
          ))}
        </div>

        {/* Indicador de número de fotos */}
        <div className="gallery-footer">
          <span>Desliza para ver más ({images.length} fotos)</span>
        </div>

      </IonContent>
    </IonModal>
  );
};

export default ImageGalleryModal;