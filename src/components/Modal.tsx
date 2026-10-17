import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, PlayCircle, FileText, CheckCircle2, Award } from 'lucide-react';
import type { Product } from '../data/products';

export type ModalKind = 'details' | 'video' | 'certifications' | null;

export default function Modal({
  kind,
  product,
  onClose
}: {
  kind: ModalKind;
  product: Product;
  onClose: () => void;
}) {
  // Close on Escape key press for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (kind) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [kind, onClose]);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.section
            className="modal-panel apple-center-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 320,
              mass: 0.85
            }}
          >
            <header className="modal-header">
              <div className="modal-heading-icon">
                {kind === 'video' ? (
                  <PlayCircle size={22} className="text-apple-blue" />
                ) : kind === 'certifications' ? (
                  <ShieldCheck size={22} className="text-apple-teal" />
                ) : (
                  <FileText size={22} className="text-apple-blue" />
                )}
              </div>
              <div className="modal-title-group">
                <p className="eyebrow">LIFE FILTRATION · TOUCHSCREEN GUIDE</p>
                <h2 id="modal-title">
                  {kind === 'video'
                    ? `${product.shortName} Video Showcase`
                    : kind === 'certifications'
                    ? `${product.shortName} Certifications & Ratings`
                    : `${product.name} Specifications`}
                </h2>
              </div>
              <motion.button
                className="icon-close-button"
                onClick={onClose}
                aria-label="Close modal"
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </header>

            <div className="modal-content">
              {/* VIDEO MODAL */}
              {kind === 'video' ? (
                <div className="video-container-box">
                  {product.videoUrl ? (
                    <video
                      className="product-video"
                      controls
                      autoPlay
                      playsInline
                      src={product.videoUrl}
                      aria-label={`${product.name} Product Video`}
                    >
                      Your browser does not support HTML video.
                    </video>
                  ) : (
                    <div className="video-interactive-preview">
                      <div className="video-visual-poster">
                        <img src={product.image} alt={product.name} className="poster-img" />
                        <div className="poster-glass-overlay">
                          <motion.div
                            className="play-button-pulsing"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <PlayCircle size={52} className="play-icon-glow" />
                          </motion.div>
                          <strong>Interactive Showcase & Walkthrough</strong>
                          <span>HD 1080p · Touchscreen Video Demonstrator</span>
                        </div>
                      </div>

                      <div className="video-card-info">
                        <h3>About {product.shortName}</h3>
                        <p>{product.description}</p>
                        <div className="video-modal-actions">
                          <motion.a
                            className="button button-primary"
                            href={product.officialUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileTap={{ scale: 0.96 }}
                          >
                            <span>Watch Online at Life Filtration</span>
                            <ExternalLink size={15} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : kind === 'certifications' ? (
                /* CERTIFICATIONS MODAL */
                <div className="certifications-view">
                  <div className="cert-hero-banner">
                    <img
                      src="/assets/products/certifications-badge.jpeg"
                      alt="Life Filtration Certifications"
                      className="cert-banner-img"
                    />
                    <div className="cert-banner-text">
                      <div className="badge-pill">
                        <Award size={14} />
                        <span>THIRD-PARTY TESTED & CERTIFIED</span>
                      </div>
                      <h3>Engineered Quality & Rigorous Standards</h3>
                      <p>
                        Life Filtration products and filtration media are tested against stringent national drinking water standards for heavy metals, micro-plastics, chlorine, and sediment reduction.
                      </p>
                    </div>
                  </div>

                  <div className="cert-cards-list">
                    {product.certifications.length ? (
                      product.certifications.map((c, i) => (
                        <div className="cert-item-card" key={i}>
                          <div className="cert-item-icon">
                            <CheckCircle2 size={20} className="text-apple-teal" />
                          </div>
                          <div className="cert-item-content">
                            <h4>{c.title}</h4>
                            <p>{c.note}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="cert-item-card">
                        <div className="cert-item-icon">
                          <ShieldCheck size={20} className="text-apple-teal" />
                        </div>
                        <div className="cert-item-content">
                          <h4>Comprehensive Factory Tested Standard</h4>
                          <p>
                            Tested to exceed standard operating pressures (30–100 PSI) with lead-free plumbing components and verified food-grade filtration media.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="cert-footer-action">
                    <motion.a
                      className="button button-primary"
                      href={product.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>Verify on Official Life Filtration Website</span>
                      <ExternalLink size={15} />
                    </motion.a>
                  </div>
                </div>
              ) : (
                /* PRODUCT SPECIFICATIONS MODAL */
                <div className="details-view">
                  <div className="details-top-summary">
                    <div className="details-image-container">
                      <img src={product.image} alt={product.name} className="details-thumb" />
                    </div>
                    <div className="details-intro-copy">
                      <span className="details-cat-label">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                  </div>

                  <h4 className="section-title">Technical Specifications</h4>
                  <div className="specs-table-grid">
                    {product.specs.map((s) => (
                      <div className="spec-tile" key={s.label}>
                        <span className="spec-label">{s.label}</span>
                        <strong className="spec-val">{s.value}</strong>
                      </div>
                    ))}
                  </div>

                  <h4 className="section-title">Features & Advantages</h4>
                  <div className="feature-bullets-grid">
                    {product.features.map((f) => (
                      <div className="bullet-row" key={f}>
                        <CheckCircle2 size={16} className="bullet-icon text-apple-teal" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="details-action-row">
                    <motion.a
                      className="button button-primary"
                      href={product.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>Explore on Official Product Webpage</span>
                      <ExternalLink size={15} />
                    </motion.a>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
