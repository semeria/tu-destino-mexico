import React from 'react';
import { IonToolbar, IonAvatar } from '@ionic/react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="header-scroll">
      <IonToolbar className="custom-toolbar">
        {/* Logo a la izquierda */}
        <div slot="start" className="header-logo">
           <img 
             src="https://storage.googleapis.com/tudestinomx_bucket/logos/tdmx%20_logo_transparente.svg" 
             alt="Logo" 
             style={{borderRadius: '50%'}} 
           />
        </div>
        
        {/* Avatar a la derecha */}
        <IonAvatar slot="end" className="header-avatar">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
        </IonAvatar>
      </IonToolbar>
    </div>
  );
};

export default Header;