import type { Product } from '../data/products';

export default function ProductVisual({
  product,
  compact = false
}: {
  product: Product;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="strip-thumbnail-card">
        <img
          src={product.image}
          alt={product.name}
          className="strip-thumbnail-img"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className="product-visual" aria-label={`${product.name} visual preview`}>
      <img
        src={product.image}
        alt={product.name}
        className="art-full-bleed-img"
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}
