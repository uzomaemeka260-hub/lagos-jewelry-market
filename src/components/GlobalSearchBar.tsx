'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Gem } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  sub_category: string;
  price: number;
  image_url: string;
  vendors: {
    store_name: string;
    stall_number: string;
    whatsapp_number: string;
  };
}

interface GlobalSearchBarProps {
  onSelectProduct: (product: any) => void;
}

export default function GlobalSearchBar({ onSelectProduct }: GlobalSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setShowDropdown(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Fuzzy search failure:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce protection

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center w-full h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 transition focus-within:border-amber-500 focus-within:bg-white">
        <Search className="w-4 h-4 text-neutral-400 shrink-0" />
        <input
          type="text"
          placeholder="Search Xuping, Cubana, Bridal Sets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.trim() && setShowDropdown(true)}
          className="w-full h-full pl-2 pr-6 text-xs bg-transparent focus:outline-none text-neutral-800 font-medium"
        />
        {searchTerm && (
          <button type="button" onClick={() => { setSearchTerm(''); setResults([]); }} className="absolute right-2.5 p-1 border-0 bg-transparent text-neutral-400 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-12 left-0 right-0 max-h-96 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-y-auto z-50 p-2">
          {isLoading ? (
            <div className="p-4 text-center text-xs font-bold text-neutral-400 animate-pulse uppercase">Searching...</div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((product) => (
                <div key={product.id} onClick={() => { onSelectProduct(product); setShowDropdown(false); setSearchTerm(''); }} className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-xl cursor-pointer transition">
                  <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-100 shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-bold text-neutral-800 truncate">{product.name}</h4>
                    <p className="text-[10px] text-neutral-400 font-medium truncate">{product.vendors.store_name} • {product.sub_category}</p>
                  </div>
                  <div className="text-xs font-black text-neutral-900 shrink-0 pr-1">₦{Number(product.price).toLocaleString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Gem className="w-6 h-6 text-neutral-300 mx-auto mb-1" />
              <p className="text-xs font-bold text-neutral-700">No Item Matches Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
