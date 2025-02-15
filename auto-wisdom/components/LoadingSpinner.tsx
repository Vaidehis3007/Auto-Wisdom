'use client';

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
    </div>
  );
}