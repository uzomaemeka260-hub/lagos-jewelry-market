'use client';
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Sparkles } from 'lucide-react';

interface CompressorProps {
  onCompressionComplete: (file: File) => void;
}

export default function ImageCompressor({ onCompressionComplete }: CompressorProps) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setLoading(true);
    const options = {
      maxSizeMB: 0.08, // Strict 80KB limit to optimize image storage
      maxWidthOrHeight: 1000,
      useWebWorker: true,
      fileType: 'image/webp', // Highly optimized format for jewelry details
    };

    try {
      const compressed = await imageCompression(rawFile, options);
      const readyFile = new File([compressed], `${Date.now()}.webp`, { type: 'image/webp' });
      onCompressionComplete(readyFile);
    } catch (error) {
      console.error('Image compression pipeline failure:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-100/50 transition">
      <Upload className="w-8 h-8 text-neutral-400 mb-2" />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
      />
      {loading && (
        <p className="text-xs text-amber-600 font-bold mt-3 flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Compressing jewelry image...
        </p>
      )}
    </div>
  );
}
