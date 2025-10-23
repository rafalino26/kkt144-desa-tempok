'use client'; 

// Hapus import 'react-leaflet' dan 'leaflet.css' karena akan dimuat dari CDN
import React, { useEffect, useRef } from 'react';

// --- Koordinat Anda ---
const position: [number, number] = [1.1856009958901508, 124.8087975420268]; // Desa Tempok
const googleMapsUrl = "https://maps.app.goo.gl/5W1uYcjAhGPSMng47"; 
// -------------------------

// Deklarasikan 'L' dari window agar TypeScript tidak error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let L: any; 

export default function MapComponent() {
  // Gunakan useRef untuk menargetkan div peta dan menyimpan instance peta
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Pastikan kode ini only berjalan di client
    if (typeof window === 'undefined' || !mapContainerRef.current) {
      return;
    }

    let mapScript: HTMLScriptElement | null = null;
    let cssLink: HTMLLinkElement | null = null;
    const mapDiv = mapContainerRef.current; // Simpan referensi

    // --- 1. Muat Leaflet CSS dari CDN ---
    // Cek dulu agar tidak duplikat
    if (!document.querySelector('link[href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]')) {
      cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);
    }

    const initializeMap = () => {
      // Cek jika div target ada dan peta belum diinisialisasi
      if (mapDiv && !mapInstanceRef.current) {
        
        // --- 3. PERBAIKAN IKON (Versi CDN) ---
        // Ini adalah perbaikan untuk pin yang hilang
        try {
          delete L.Icon.Default.prototype._getIconUrl;
          // Set path baru ke gambar ikon dari CDN
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        } catch (e) {
          console.error("Gagal mengatur ikon default Leaflet:", e);
        }

        // --- 4. Inisialisasi Peta ---
        // Gunakan L biasa (dari window)
        const map = L.map(mapDiv).setView(position, 14);
        mapInstanceRef.current = map; // Simpan instance peta

        // --- 5. Tambah Tile Layer ---
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        // --- 6. Tambah Marker ---
        const marker = L.marker(position).addTo(map);
        marker.bindPopup(
          `Desa Tempok, Tompaso. <br /> 
           <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
             Buka di Google Maps
           </a>`
        );
      }
    };

    // --- 2. Muat Leaflet JS dari CDN ---
    // Cek jika script sudah ada (dari window.L)
    if (typeof L === 'undefined') {
      mapScript = document.createElement('script');
      mapScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      mapScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      mapScript.crossOrigin = '';
      mapScript.async = true;
      mapScript.onload = initializeMap; // Inisialisasi peta SETELAH script dimuat
      document.body.appendChild(mapScript);
    } else {
      // Jika L sudah ada, langsung inisialisasi
      initializeMap();
    }

    // Fungsi cleanup saat komponen di-unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // Hapus map instance
        mapInstanceRef.current = null;
      }
    };
  }, []); // useEffect hanya berjalan sekali saat komponen mount

  // Render div target untuk peta
  return (
    <div 
      ref={mapContainerRef} 
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }} 
    />
  );
}

