'use client'; 

import React, { useEffect, useRef } from 'react';

const position: [number, number] = [1.1856009958901508, 124.8087975420268];
const googleMapsUrl = "https://maps.app.goo.gl/5W1uYcjAhGPSMng47"; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let L: any; 

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) {
      return;
    }

    let mapScript: HTMLScriptElement | null = null;
    let cssLink: HTMLLinkElement | null = null;
    const mapDiv = mapContainerRef.current;


    if (!document.querySelector('link[href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]')) {
      cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);
    }

    const initializeMap = () => {
      if (mapDiv && !mapInstanceRef.current) {
        
        try {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        } catch (e) {
          console.error("Gagal mengatur ikon default Leaflet:", e);
        }

        const map = L.map(mapDiv).setView(position, 14);
        mapInstanceRef.current = map; // Simpan instance peta

      
        // Peta Satelit (Esri)
        // const tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        // const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        //
        // Peta Hitam Putih (Stamen Toner)
        // const tileUrl = 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png';
        // const attribution = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';
        //
        // Peta OpenStreetMap (Standar) - YANG AKTIF SEKARANG
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        
        L.tileLayer(tileUrl, { 
          attribution: attribution, 
          maxZoom: 19
        }).addTo(map);


        const marker = L.marker(position).addTo(map);
        marker.bindPopup(
          `Desa Tempok, Tompaso. <br /> 
           <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
             Buka di Google Maps
           </a>`
        );
      }
    };

    if (typeof L === 'undefined') {
      mapScript = document.createElement('script');
      mapScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      mapScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      mapScript.crossOrigin = '';
      mapScript.async = true;
      mapScript.onload = initializeMap;
      document.body.appendChild(mapScript);
    } else {

      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); 

  return (
    <div 
      ref={mapContainerRef} 
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }} 
    />
  );
}


