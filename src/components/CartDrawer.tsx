import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CheckCircle2, ShoppingBag, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/marketplace';
import { submitOrder, isSupabaseConfigured } from '../lib/supabase';
import { BRAND_PROFILE } from '../brand';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLinkedin, setCustomerLinkedin] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const calculateItemPrice = (item: CartItem) => {
    if (item.product.isFree) return 0;
    const multiplier =
      item.tier === 'Starter' ? 0.8 : item.tier === 'Enterprise' ? 2.2 : 1.0;
    return Math.round(item.product.price * multiplier) * item.quantity;
  };

  const totalAmount = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Primary item details
      const primaryItem = cart[0];
      const summaryNotes = `Cart items: ${cart.map(c => `${c.product.title} (${c.tier} x${c.quantity})`).join(', ')}. Customer notes: ${notes}`;

      const res = await submitOrder({
        productSlug: primaryItem?.product.slug || 'custom-bundle',
        productTitle: cart.length > 1 ? `Bundle of ${cart.length} items` : primaryItem?.product.title || 'Order',
        tier: primaryItem?.tier || 'Standard',
        customerName,
        customerEmail,
        customerLinkedin,
        amount: totalAmount,
        notes: summaryNotes,
      });

      if (res.success) {
        setOrderComplete(res.id || 'CONFIRMED');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669', '#ffffff'],
        });
        onClearCart();
      } else {
        setErrorMessage(res.error || 'Failed to place order.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-brand-surface border-l border-brand-border h-full flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-brand-accent" />
            <h3 className="text-lg font-bold text-brand-text">Your Order Drawer</h3>
            <span className="text-xs font-mono text-brand-dim">
              ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-brand-card hover:bg-brand-border text-brand-dim hover:text-brand-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderComplete ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent/50 text-brand-accent flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-brand-text">Order Received!</h4>
              <p className="text-xs text-brand-dim max-w-xs mx-auto leading-relaxed">
                Thank you! Your order ID is <span className="font-mono text-brand-accent2">{orderComplete}</span>.
                Asad Gohar will review your requirements and reach out via email / LinkedIn within 24 hours.
              </p>
              <div className="p-4 rounded-xl bg-brand-card border border-brand-border text-xs font-mono text-left text-brand-textSecondary space-y-1">
                <div>Client: {customerName}</div>
                <div>Email: {customerEmail}</div>
                <div>Status: Queued in PostgreSQL schema</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOrderComplete(null);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-xs shadow-md glow-accent"
              >
                Close Drawer
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-brand-dim/50 mx-auto" />
              <p className="text-sm text-brand-dim">Your order drawer is currently empty.</p>
              <p className="text-xs text-brand-dim/70">
                Explore the catalog and select Remotion motion kits, still studios, or full-stack engineering packages.
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.tier}-${index}`}
                    className="p-3.5 rounded-xl bg-brand-card border border-brand-border flex items-start justify-between space-x-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="text-xs font-bold text-brand-text line-clamp-1">
                          {item.product.title}
                        </h5>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-accent2">
                          {item.tier}
                        </span>
                        <span className="text-xs font-mono text-brand-dim">
                          {item.product.isFree
                            ? 'Free'
                            : `$${calculateItemPrice(item)}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(index, Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-12 px-2 py-1 text-xs rounded bg-brand-surface border border-brand-border text-center text-brand-text font-mono"
                      />
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-1.5 text-brand-dim hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmitOrder} className="pt-4 border-t border-brand-border space-y-3">
                <h4 className="text-xs font-mono uppercase text-brand-dim">
                  Client & Delivery Details
                </h4>

                <div>
                  <label className="block text-[11px] font-mono text-brand-dim mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                    placeholder="e.g. Alex Miller"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-brand-dim mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                    placeholder="alex@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-brand-dim mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={customerLinkedin}
                    onChange={(e) => setCustomerLinkedin(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent font-mono"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-brand-dim mb-1">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                    placeholder="Briefly state your timeline or special requirements..."
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-400 font-mono">{errorMessage}</p>
                )}

                <div className="pt-2 text-[11px] font-mono text-brand-dim flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  <span>
                    Backend: {isSupabaseConfigured ? 'Supabase Live Connected' : 'Supabase Demo Storage Mode'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg glow-accent hover:opacity-95 transition-opacity disabled:opacity-50 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Recording Order...' : `Confirm Order ($${totalAmount})`}
                  </span>
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-brand-border bg-brand-card/60 text-center text-[11px] font-mono text-brand-dim">
          <span>{BRAND_PROFILE.name} · {BRAND_PROFILE.footerRight}</span>
        </div>

      </div>
    </div>
  );
};
