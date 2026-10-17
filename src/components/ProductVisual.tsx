import { Droplets, ShieldCheck } from 'lucide-react';
import type { Product } from '../data/products';

export default function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={`product-visual ${compact ? 'product-visual--compact' : ''}`} aria-label={`${product.name} visual preview`}>
      <div className="visual-glow" />
      <div className="product-photo-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-photo-img"
          loading={compact ? 'lazy' : 'eager'}
          onError={(e) => {
            // graceful fallback if image fails to load
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add('photo-fallback');
            }
          }}
        />
        {!compact && (
          <div className="photo-badge">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>AUTHENTIC SYSTEM</span>
          </div>
        )}
      </div>
      {!compact && <div className="visual-ground" />}
    </div>
  );
}
