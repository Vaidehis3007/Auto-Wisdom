'use client';

import { useEffect, useRef } from 'react';

interface CarViewerProps {
  modelId: string;
}

export default function CarViewer({modelId}: CarViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.title = "Ford Mustang Dark Horse 2024";
    iframe.allow = " fullscreen; xr-spatial-tracking";
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

    // let viewer: any;
    
    // window.addEventListener('load', () => {
    //   // @ts-ignore
    //   if (window.Sketchfab) {
    //     // @ts-ignore
    //     viewer = new window.Sketchfab(iframe);
    //     viewer.init('5f4e3965f79540a9888b5d05acea5943', {
    //       autostart: 1,
    //       ui_controls: 1,
    //       ui_infos: 1,
    //       ui_inspector: 0,
    //       ui_stop: 0,
    //       ui_watermark: 1,
    //       ui_fullscreen: 1,
    //     });
    //   }
    // });

    return () => {
      if (containerRef.current && containerRef.current.contains(iframe)) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [modelId]);

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}

