'use client';
import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Plus, Minus, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    sub_category: string;
    price: number | string;
    image_url: string;
    vendors: {
      store_name: string;
      stall_number: string;
      whatsapp_number: string;
    };
  };
  onImageClick?: () => void;
}

export default function ProductCard({ item, onImageClick }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [checkoutMode, setCheckoutMode] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [address, setAddress] = useState<string>('');


  const unitPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
  const totalPrice = unitPrice * quantity;

  const handleWhatsAppCheckoutRedirect = (e: React.FormEvent) => {
    e.preventDefault();

    // Builds the text template and appends the Supabase image link at the bottom to trigger a photo card preview
    const orderMessage =
      `🇳🇬 *LAGOS JEWELRY MARKET - NEW ORDER*

Hello *${item.vendors.store_name}*, I want to purchase an item from your stall directory:

📍 *Stall Number:* ${item.vendors.stall_number}
💎 *Jewelry Item:* ${item.name}
📦 *Classification:* ${item.sub_category}
🔢 *Quantity Selected:* ${quantity} pcs
💰 *Unit Price:* ₦${unitPrice.toLocaleString()}
──────────────────
💵 *TOTAL AMOUNT:* ₦${totalPrice.toLocaleString()}

👤 *Customer Name:* ${customerName}
🚚 *Delivery Address:* ${address}

📷 *Product Reference Photo:*
${item.image_url}

_Please confirm availability and send your bank account details for final payment transfer._`;

    const encodedText = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${item.vendors.whatsapp_number}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setCheckoutMode(false);
    setQuantity(1);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between p-4 min-h-[420px]">
      {!checkoutMode ? (
        <>
          <div className="relative aspect-square w-full bg-neutral-100 rounded-xl overflow-hidden cursor-zoom-in" onClick={onImageClick}>
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" loading="lazy" />
            <span className="absolute top-2 left-2 bg-neutral-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {item.sub_category}
            </span>
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">🔍 Tap to zoom</span>
          </div>

          <div className="mt-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-neutral-800 line-clamp-1">{item.name}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Stall: {item.vendors.stall_number} ({item.vendors.store_name})</p>
            </div>

            <div>
              <div className="mt-2 text-base font-black text-neutral-900">₦{unitPrice.toLocaleString()}</div>
              <div className="mt-3 flex items-center justify-between border border-neutral-200 p-1.5 rounded-xl bg-neutral-50">
                <span className="text-[11px] font-bold text-neutral-500 uppercase ml-2">Qty</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 bg-white border border-neutral-200 rounded-md flex items-center justify-center hover:bg-neutral-100 cursor-pointer">
                    <Minus className="w-3 h-3 text-neutral-600" />
                  </button>
                  <span className="text-xs font-bold text-neutral-800 w-4 text-center">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 bg-white border border-neutral-200 rounded-md flex items-center justify-center hover:bg-neutral-100 cursor-pointer">
                    <Plus className="w-3 h-3 text-neutral-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => setCheckoutMode(true)} className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5" /> Checkout • ₦{totalPrice.toLocaleString()}
          </button>
        </>
      ) : (
        <form onSubmit={handleWhatsAppCheckoutRedirect} className="space-y-3 text-left h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-xs text-neutral-700 uppercase tracking-wider">Order Hand-Off</h4>
              <button type="button" onClick={() => setCheckoutMode(false)} className="text-xs text-red-500 font-bold flex items-center gap-0.5 cursor-pointer border-0 bg-transparent">
                <ArrowLeft className="w-3 h-3" /> Cancel
              </button>
            </div>
            <p className="text-[11px] font-semibold text-neutral-600 bg-neutral-50 border border-neutral-200 p-2 rounded-lg mb-2">
              Order Subtotal: {quantity}x {item.name} (₦{totalPrice.toLocaleString()})
            </p>
            <div className="space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Your Name</label>
                <input type="text" placeholder="e.g. Blessing Okon" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-neutral-50 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Delivery Address</label>
                <textarea placeholder="Provide full address details..." required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-neutral-50 focus:outline-none focus:border-amber-500 resize-none" />
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100">
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
              <MessageSquare className="w-4 h-4" /> Send Order to Vendor WhatsApp
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
