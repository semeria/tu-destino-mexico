import React from 'react';
import '../../pages/ServiceDetail.css' ; // Usaremos un CSS compartido o el del padre

interface DescriptionProps {
  text?: string; // Opcional, por si la API tarda en cargar
}

const Description: React.FC<DescriptionProps> = ({ text }) => {
  return (
    <div className="tab-content animate-fade-in">
      <h3 className="tab-title">Sobre la experiencia</h3>
      <p className="description-text">
        {/* Si hay texto (API) lo usa, si no, usa el default */}
        {text || "Cargando descripción..."}
      </p>
      
      {/* 🚧 ZONA API FUTURA: 
         Aquí podrías agregar más datos que vengan en el objeto de descripción,
         como "Horarios", "Duración", etc.
      */}
    </div>
  );
};

export default Description;