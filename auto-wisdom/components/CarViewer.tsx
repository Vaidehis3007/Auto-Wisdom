'use client';

import { useEffect, useRef } from 'react';

interface CarViewerProps {
  modelId: string;
}

export default function CarViewer({modelId}: CarViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.title = "Ford Mustang Dark Horse 2024";
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking; vr";
    iframe.src = `https://sketchfab.com/models/${modelId}/embed`;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    // Set iframe attributes
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("xr-spatial-tracking", "");
    iframe.setAttribute("execution-while-out-of-viewport", "");
    iframe.setAttribute("execution-while-not-rendered", "");
    iframe.setAttribute("web-share", "");

    containerRef.current.appendChild(iframe);


    return () => {
      if (containerRef.current && containerRef.current.contains(iframe)) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [modelId]);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}

