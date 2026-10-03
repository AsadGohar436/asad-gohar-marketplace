import React, { useState } from 'react';
import { X, Check, Code, ShoppingBag, Terminal, Layers } from 'lucide-react';
import { Product } from '../types/marketplace';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, tier: 'Starter' | 'Pro' | 'Enterprise') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedTier, setSelectedTier] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro');

  if (!product) return null;

  const tiers = [
    {
      name: 'Starter' as const,
      priceMultiplier: 0.8,
      desc: 'Single license, standard source templates.',
    },
    {
      name: 'Pro' as const,
      priceMultiplier: 1.0,
      desc: 'Complete source code, multi-format renders & priority assistance.',
    },
    {
      name: 'Enterprise' as const,
      priceMultiplier: 2.2,
      desc: 'Full team deployment, custom schema architecture & dedicated sprint.',
    },
  ];

  const calculatedPrice = product.isFree
    ? 0
    : Math.round(
        product.price *
          (tiers.find((t) => t.name === selectedTier)?.priceMultiplier || 1.0)
      );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-brand-accent tracking-wider">
              {product.category.replace('-', ' ')}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-text mt-1">
              {product.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-brand-card hover:bg-brand-border text-brand-dim hover:text-brand-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-mono uppercase text-brand-dim mb-2">Overview</h4>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Formats and Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border/60">
              <span className="text-[11px] font-mono text-brand-accent flex items-center space-x-1.5 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Target LinkedIn Canvases</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.formats.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border/60">
              <span className="text-[11px] font-mono text-brand-accent flex items-center space-x-1.5 mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Underlying Stack</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full Deliverables List */}
          <div>
            <h4 className="text-xs font-mono uppercase text-brand-dim mb-3">
              Included Deliverables & Artifacts
            </h4>
            <div className="space-y-2">
              {product.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs text-brand-textSecondary p-2.5 rounded-lg bg-brand-card/60 border border-brand-border/40"
                >
                  <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Props / Schema Sample */}
          {product.propsSample && (
            <div>
              <h4 className="text-xs font-mono uppercase text-brand-dim mb-2 flex items-center space-x-1.5">
                <Code className="w-3.5 h-3.5 text-brand-accent" />
                <span>Sample Specification Payload (JSON)</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border text-brand-textSecondary font-mono text-xs overflow-x-auto">
                <pre>{JSON.stringify(product.propsSample, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Tier Selection */}
          {!product.isFree && (
            <div>
              <h4 className="text-xs font-mono uppercase text-brand-dim mb-3">
                Select Package Tier
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tiers.map((t) => (
                  <div
                    key={t.name}
                    onClick={() => setSelectedTier(t.name)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedTier === t.name
                        ? 'bg-brand-accent/15 border-brand-accent shadow-sm'
                        : 'bg-brand-card border-brand-border hover:border-brand-borderLight'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-brand-text">
                      <span>{t.name}</span>
                      <span>
                        ${Math.round(product.price * t.priceMultiplier)}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-dim mt-1.5 leading-snug">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-brand-border bg-brand-card/50 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-brand-dim uppercase block">
              Total {product.isFree ? 'License' : `(${selectedTier} Tier)`}
            </span>
            <span className="text-2xl font-black text-brand-text">
              {product.isFree ? 'Free & Open Source' : `$${calculatedPrice}`}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-brand-dim hover:text-brand-text transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onAddToCart(product, selectedTier);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg glow-accent hover:opacity-95 transition-opacity"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{product.isFree ? 'Claim Free Asset' : 'Add to Order'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
