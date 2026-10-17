import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplet,
  ExternalLink,
  Home,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
  X
} from 'lucide-react';
import { categories, products, type Product } from './data/products';
import ProductVisual from './components/ProductVisual';
import Modal, { type ModalKind } from './components/Modal';

const INACTIVITY_MS = 120_000;

export default function App() {
  const [splash, setSplash] = useState(true);
  const [activeId, setActiveId] = useState(products[0].id);
  const [category, setCategory] = useState<string>('All Products');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<ModalKind>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [lastInput, setLastInput] = useState(Date.now());
  const [showIdle, setShowIdle] = useState(false);

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === 'All Products' || p.category === category) &&
          `${p.name} ${p.description} ${p.category} ${p.shortName}`
            .toLowerCase()
            .includes(query.toLowerCase().trim())
      ),
    [category, query]
  );

  const active = visibleProducts.find((p) => p.id === activeId) ?? visibleProducts[0] ?? products[0];

  useEffect(() => {
    const t = window.setTimeout(() => setSplash(false), 1600);
    return () => window.clearTimeout(t);
  }, []);

  const resetIdle = useCallback(() => {
    setLastInput(Date.now());
    setShowIdle(false);
  }, []);

  useEffect(() => {
    const onInput = () => resetIdle();
    ['pointerdown', 'touchstart', 'keydown', 'mousemove'].forEach((e) =>
      window.addEventListener(e, onInput, { passive: true })
    );
    return () =>
      ['pointerdown', 'touchstart', 'keydown', 'mousemove'].forEach((e) =>
        window.removeEventListener(e, onInput)
      );
  }, [resetIdle]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!splash && Date.now() - lastInput > INACTIVITY_MS) {
        setShowIdle(true);
        setModal(null);
        setShowFilters(false);
      }
    }, 1500);
    return () => window.clearInterval(timer);
  }, [lastInput, splash]);

  const selectProduct = (p: Product) => {
    setActiveId(p.id);
    setModal(null);
    resetIdle();
  };

  const step = (delta: number) => {
    if (!visibleProducts.length) return;
    const idx = visibleProducts.findIndex((p) => p.id === active.id);
    selectProduct(visibleProducts[(idx + delta + visibleProducts.length) % visibleProducts.length]);
  };

  useEffect(() => {
    if (visibleProducts.length && !visibleProducts.some((p) => p.id === activeId)) {
      setActiveId(visibleProducts[0].id);
    }
  }, [visibleProducts, activeId]);

  return (
    <main className="app-shell">
      {/* Splash Screen */}
      <AnimatePresence>
        {splash && (
          <motion.div
            className="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div
              className="splash-mark"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65 }}
            >
              <span className="logo-drop">
                <Droplet size={38} fill="currentColor" />
              </span>
              <div className="logo-text-group">
                <span className="logo-wordmark">
                  LIFE<b>FILTRATION</b>
                </span>
                <span className="logo-tagline">RETAIL SHOWROOM EXPERIENCE</span>
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              Precision engineered pure water for modern living.
            </motion.p>
            <div className="splash-progress">
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3, ease: 'easeInOut' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tablet Top Navigation Bar */}
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            setQuery('');
            setCategory('All Products');
            selectProduct(products[0]);
          }}
          aria-label="Life Filtration Home"
        >
          <span className="brand-icon">
            <Droplet fill="currentColor" size={28} />
          </span>
          <span className="brand-name">
            LIFE <b>FILTRATION</b>
            <small>TOUCHSCREEN SHOWROOM</small>
          </span>
        </button>

        {/* Categories Bar in Header for Tablet Ergonomics */}
        <div className="header-categories">
          {categories.map((c) => (
            <button
              key={c}
              className={`header-cat-pill ${category === c ? 'is-selected' : ''}`}
              onClick={() => {
                setCategory(c);
                resetIdle();
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="topbar-actions">
          <label className="header-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search systems..."
              aria-label="Search systems"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </label>
          <button
            className="home-button"
            onClick={() => {
              setQuery('');
              setCategory('All Products');
              selectProduct(products[0]);
            }}
            title="Reset to home"
          >
            <Home size={18} />
            <span>Home</span>
          </button>
        </div>
      </header>

      {/* Main Accordion Stage */}
      <section className="catalogue-stage" aria-label="Interactive Product Showcase">
        <div className="gallery-frame">
          {/* Left Arrow */}
          <button
            className="gallery-arrow arrow-left"
            onClick={() => step(-1)}
            aria-label="Previous product"
            disabled={visibleProducts.length < 2}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Horizontal Expanding Gallery */}
          <div className="accordion-gallery">
            {visibleProducts.length ? (
              visibleProducts.map((p, index) => {
                const selected = p.id === active.id;
                return (
                  <motion.div
                    layout
                    key={p.id}
                    className={`product-panel ${selected ? 'is-active' : 'is-collapsed'}`}
                    onClick={() => {
                      if (!selected) selectProduct(p);
                    }}
                    role={selected ? undefined : 'button'}
                    tabIndex={selected ? undefined : 0}
                    onKeyDown={(e) => {
                      if (!selected && (e.key === 'Enter' || e.key === ' ')) selectProduct(p);
                    }}
                    aria-expanded={selected}
                    aria-label={`Explore ${p.name}`}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  >
                    {selected ? (
                      /* EXPANDED PANEL CONTENT */
                      <motion.div
                        className="expanded-content"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Left Column: Product Information & In-Card Feature Buttons */}
                        <div className="active-product-copy">
                          <div className="product-meta-header">
                            <span className="product-index-badge">
                              SYSTEM 0{products.findIndex((x) => x.id === p.id) + 1}
                            </span>
                            <span className="product-category-tag">{p.category.toUpperCase()}</span>
                          </div>

                          <p className="product-eyebrow">{p.eyebrow}</p>
                          <h2 className="product-title">{p.name}</h2>
                          <p className="product-description">{p.description}</p>

                          {/* Key Feature List */}
                          <div className="feature-grid">
                            {p.features.map((f) => (
                              <div key={f} className="feature-item">
                                <span className="feature-check">
                                  <Check size={14} />
                                </span>
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>

                          {/* Carousel Action Buttons directly inside the product card */}
                          <div className="card-action-bar">
                            <button
                              className="button button-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('details');
                              }}
                            >
                              <span>Learn More About This Product</span>
                              <ArrowRight size={17} />
                            </button>

                            <button
                              className="button button-card-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('video');
                              }}
                              title="Watch product video"
                            >
                              <Play size={16} fill="currentColor" />
                              <span>Watch Video</span>
                            </button>

                            <button
                              className="button button-card-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('certifications');
                              }}
                              title="View certifications and ratings"
                            >
                              <ShieldCheck size={17} />
                              <span>Certifications & Ratings</span>
                            </button>
                          </div>

                          <div className="panel-footer-note">
                            <span className="note-item">
                              <Sparkles size={14} /> CERTIFIED WATER TECHNOLOGY
                            </span>
                            <span className="note-item">TOUCHSCREEN EXPLORER</span>
                          </div>
                        </div>

                        {/* Right Column: Authentic Product Photography Showcase */}
                        <div className="active-product-art">
                          <div className="art-header-overlay">
                            <span className="art-label-text">OFFICIAL PRODUCT PHOTOGRAPHY</span>
                            <span className="art-live-pulse" />
                          </div>

                          <ProductVisual product={p} />

                          <div className="art-specs-quickview">
                            {p.specs.slice(0, 2).map((s) => (
                              <div key={s.label} className="quick-spec-pill">
                                <strong>{s.label}:</strong> {s.value}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* COLLAPSED PANEL STRIP */
                      <div className="collapsed-content">
                        <span className="strip-index">
                          0{products.findIndex((x) => x.id === p.id) + 1}
                        </span>

                        <div className="strip-photo-container">
                          <ProductVisual product={p} compact />
                        </div>

                        <span className="strip-name">{p.shortName}</span>
                        <span className="strip-category">{p.category}</span>

                        <span className="strip-chevron">
                          <ChevronRight size={20} />
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="no-results">
                <Search size={36} />
                <strong>No matching systems found</strong>
                <p>Try searching for RO, Softener, or Filter, or clear the search filter.</p>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setQuery('');
                    setCategory('All Products');
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Reset filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Arrow */}
          <button
            className="gallery-arrow arrow-right"
            onClick={() => step(1)}
            aria-label="Next product"
            disabled={visibleProducts.length < 2}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Gallery Tablet Pagination / Status Bar */}
        <div className="gallery-tablet-footer">
          <div className="tablet-hint">
            <span className="hint-icon">
              <ArrowLeft size={16} />
              <ArrowRight size={16} />
            </span>
            <span>Tap any vertical panel or use arrows to expand a system</span>
          </div>

          <div className="gallery-pills">
            {visibleProducts.map((p) => (
              <button
                key={p.id}
                aria-label={`Select ${p.shortName}`}
                className={`pill-indicator ${p.id === active.id ? 'is-active' : ''}`}
                onClick={() => selectProduct(p)}
              >
                <span>{p.shortName}</span>
              </button>
            ))}
          </div>

          <div className="gallery-counter">
            <strong>0{Math.max(1, visibleProducts.findIndex((p) => p.id === active.id) + 1)}</strong>
            <i>/</i>
            <span>0{visibleProducts.length}</span>
          </div>
        </div>
      </section>

      {/* Persistent Bottom Tablet Bar */}
      <footer className="tablet-footer">
        <div className="footer-left-info">
          <div className="footer-icon-bubble">
            <Droplet size={18} fill="currentColor" />
          </div>
          <div>
            <strong>Life Filtration™ Showroom Display</strong>
            <small>Tap any product to compare specifications & ratings</small>
          </div>
        </div>

        <div className="footer-right-actions">
          <a
            href={active.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-link-btn"
          >
            <span>Visit lifefiltration.com</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </footer>

      {/* Modals for Details, Video, and Certifications */}
      <Modal kind={modal} product={active} onClose={() => setModal(null)} />

      {/* Inactivity Screen Saver for Tablet Kiosk */}
      <AnimatePresence>
        {showIdle && (
          <motion.div
            className="idle-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="idle-card"
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="idle-drop">
                <Droplet size={40} fill="currentColor" />
              </div>
              <p className="eyebrow">LIFE FILTRATION RETAIL</p>
              <h2>Explore Pure Water</h2>
              <p>Touch anywhere to return to the interactive product showroom.</p>
              <button
                className="button button-primary button-large"
                onClick={() => {
                  setShowIdle(false);
                  resetIdle();
                  setQuery('');
                  setCategory('All Products');
                  selectProduct(products[0]);
                }}
              >
                <span>Start Exploring</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
