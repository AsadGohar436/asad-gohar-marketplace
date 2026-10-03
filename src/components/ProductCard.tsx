import React from 'react';
import { Sparkles, Video, Layers, Code2, Terminal, Wrench, Check, ArrowUpRight } from 'lucide-react';
import { Product } from '../types/marketplace';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const getCategoryIcon = (category: Product['category']) => {
    switch (category) {
      case 'video-motion':
        return <Video className="w-4 h-4 text-brand-accent" />;
      case 'stills-carousels':
        return <Layers className="w-4 h-4 text-brand-accent" />;
      case 'engineering-web':
        return <Code2 className="w-4 h-4 text-brand-accent" />;
      case 'automation':
        return <Terminal className="w-4 h-4 text-brand-accent" />;
      case 'interactive-tools':
        return <Wrench className="w-4 h-4 text-brand-accent" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-accent" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group hover:border-brand-accent/50 transition-all duration-300">
      
      {/* Top Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-brand-dim uppercase tracking-wider">
            {getCategoryIcon(product.category)}
            <span>{product.category.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            {product.isPopular && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-brand-accent/20 text-brand-accent2 border border-brand-accent/40">
                Popular
              </span>
            )}
            {product.isFree && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Free & Open
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(product)}
          className="text-lg font-bold text-brand-text group-hover:text-brand-accent2 transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span>{product.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs text-brand-dim leading-relaxed">
          {product.description}
        </p>

        {/* Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.stack.map((item) => (
            <span
              key={item}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Deliverables snippet */}
        <div className="mt-5 pt-4 border-t border-brand-border/60 space-y-1.5">
          {product.deliverables.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-brand-textSecondary">
              <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-brand-dim uppercase block">Investment</span>
          <span className="text-xl font-extrabold text-brand-text">
            {product.isFree ? (
              <span className="text-brand-accent2">Free</span>
            ) : (
              `$${product.price}`
            )}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-brand-text text-xs font-medium transition-colors"
          >
            Details
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-1.5 rounded-lg bg-brand-gradient text-brand-bg font-semibold text-xs hover:opacity-95 transition-opacity shadow-sm glow-accent"
          >
            {product.isFree ? 'Get Access' : 'Add to Order'}
          </button>
        </div>
      </div>

    </div>
  );
};
