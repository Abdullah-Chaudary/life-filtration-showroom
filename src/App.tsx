import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
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
    const t = window.setTimeout(() => setSplash(false), 1400);
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
      }
    }, 2000);
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

  // Keyboard navigation (ArrowLeft, ArrowRight) for desktop / tablet keyboards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modal) return;
      if (e.key === 'ArrowLeft') {
        step(-1);
      } else if (e.key === 'ArrowRight') {
        step(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal, active.id, visibleProducts]);

  useEffect(() => {
    if (visibleProducts.length && !visibleProducts.some((p) => p.id === activeId)) {
      setActiveId(visibleProducts[0].id);
    }
  }, [visibleProducts, activeId]);

  // Handle horizontal swipe / drag gesture across the showcase with velocity handoff
  const handleStageSwipe = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -240) {
      step(1);
    } else if (info.offset.x > 70 || info.velocity.x > 240) {
      step(-1);
    }
  };

  return (
    <main className={`app-shell ${modal ? 'has-modal-open' : ''}`}>
      {/* Splash Screen */}
      <AnimatePresence>
        {splash && (
          <motion.div
            className="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <motion.div
              className="splash-mark"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            >
              <span className="logo-drop">
                <Droplet size={36} fill="currentColor" />
              </span>
              <div className="logo-text-group">
                <span className="logo-wordmark">
                  LIFE<b>FILTRATION</b>
                </span>
                <span className="logo-tagline">RETAIL SHOWROOM EXPERIENCE</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              Precision engineered pure water for modern living.
            </motion.p>
            <div className="splash-progress">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple-style Translucent Floating Navigation Bar */}
      <header className="topbar apple-chrome">
        <motion.button
          className="brand"
          onClick={() => {
            setQuery('');
            setCategory('All Products');
            selectProduct(products[0]);
          }}
          whileTap={{ scale: 0.96 }}
          aria-label="Life Filtration Home"
        >
          <span className="brand-icon">
            <Droplet fill="currentColor" size={24} />
          </span>
          <span className="brand-name">
            LIFE <b>FILTRATION</b>
            <small>TOUCHSCREEN SHOWROOM</small>
          </span>
        </motion.button>

        {/* Apple Segmented Control for Categories */}
        <nav className="apple-segmented-control" aria-label="Product categories">
          {categories.map((c) => {
            const isSelected = category === c;
            return (
              <button
                key={c}
                className={`segmented-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  setCategory(c);
                  resetIdle();
                }}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="segmented-pill-bg"
                    transition={{ type: 'spring', damping: 32, stiffness: 420 }}
                  />
                )}
                <span className="segmented-label">{c}</span>
              </button>
            );
          })}
        </nav>

        <div className="topbar-actions">
          <label className="header-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search systems..."
              aria-label="Search systems"
            />
            {query && (
              <motion.button
                aria-label="Clear search"
                onClick={() => setQuery('')}
                whileTap={{ scale: 0.85 }}
              >
                <X size={13} />
              </motion.button>
            )}
          </label>
          <motion.button
            className="home-button"
            onClick={() => {
              setQuery('');
              setCategory('All Products');
              selectProduct(products[0]);
            }}
            whileTap={{ scale: 0.94 }}
            title="Reset to home"
          >
            <Home size={16} />
            <span>Home</span>
          </motion.button>
        </div>
      </header>

      {/* Main Accordion Stage with Fluid CSS Flex Transitions */}
      <section className="catalogue-stage" aria-label="Interactive Product Showcase">
        <div className="gallery-frame">
          {/* Left Arrow with spring touch */}
          <motion.button
            className="gallery-arrow arrow-left"
            onClick={() => step(-1)}
            aria-label="Previous product"
            disabled={visibleProducts.length < 2}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Horizontal Expanding Gallery */}
          <div className="accordion-gallery">
            {visibleProducts.length ? (
              visibleProducts.map((p) => {
                const selected = p.id === active.id;
                return (
                  <div
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
                  >
                    {selected ? (
                      /* EXPANDED PANEL CONTENT with Fast, Crisp Apple Reveal */
                      <motion.div
                        key={`expanded-${p.id}`}
                        className="expanded-content"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.12}
                        onDragEnd={handleStageSwipe}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
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
                                  <Check size={12} />
                                </span>
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>

                          {/* Carousel Action Buttons with Apple spring press feedback */}
                          <div className="card-action-bar">
                            <motion.button
                              className="button button-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('details');
                              }}
                              whileTap={{ scale: 0.96 }}
                            >
                              <span>Learn More About This Product</span>
                              <ArrowRight size={15} />
                            </motion.button>

                            <motion.button
                              className="button button-card-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('video');
                              }}
                              title="Watch product video"
                              whileTap={{ scale: 0.96 }}
                            >
                              <Play size={15} fill="currentColor" />
                              <span>Watch Video</span>
                            </motion.button>

                            <motion.button
                              className="button button-card-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal('certifications');
                              }}
                              title="View certifications and ratings"
                              whileTap={{ scale: 0.96 }}
                            >
                              <ShieldCheck size={16} />
                              <span>Certifications</span>
                            </motion.button>
                          </div>

                          <div className="panel-footer-note">
                            <span className="note-item">
                              <Sparkles size={13} className="text-apple-blue" /> CERTIFIED WATER TECHNOLOGY
                            </span>
                            <span className="note-item swipe-hint">SWIPE OR TAP TO NAVIGATE</span>
                          </div>
                        </div>

                        {/* Right Column: Authentic Product Photography Showcase (Full Bleed Image with Floating Cards Above) */}
                        <div className="active-product-art">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="art-full-bleed-img"
                            loading="eager"
                          />

                          <div className="art-ambient-vignette" />

                          {/* Top Floating Glass Badges */}
                          <div className="art-header-overlay">
                            <div className="art-label-capsule">
                              <span className="art-label-text">OFFICIAL PHOTOGRAPHY</span>
                              <span className="art-live-pulse" />
                            </div>
                            <div className="art-original-capsule">
                              <ShieldCheck size={13} className="text-apple-teal" />
                              <span>ORIGINAL SYSTEM</span>
                            </div>
                          </div>

                          {/* Bottom Floating Specs Cards Above Image */}
                          <div className="art-specs-quickview">
                            {p.specs.slice(0, 2).map((s) => (
                              <div key={s.label} className="quick-spec-pill">
                                <span className="quick-spec-label">{s.label}</span>
                                <strong className="quick-spec-val">{s.value}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* COLLAPSED PANEL STRIP - Strictly aligned thumbnails */
                      <div className="collapsed-content">
                        <span className="strip-index">
                          0{products.findIndex((x) => x.id === p.id) + 1}
                        </span>

                        <div className="strip-photo-container">
                          <ProductVisual product={p} compact />
                        </div>

                        <span className="strip-name">{p.shortName}</span>

                        <span className="strip-chevron">
                          <ChevronRight size={18} />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="no-results">
                <Search size={32} />
                <strong>No matching systems found</strong>
                <p>Try searching for RO, Softener, or Filter, or clear the search filter.</p>
                <motion.button
                  className="button button-primary"
                  onClick={() => {
                    setQuery('');
                    setCategory('All Products');
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={15} />
                  <span>Reset filters</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Right Arrow with spring touch */}
          <motion.button
            className="gallery-arrow arrow-right"
            onClick={() => step(1)}
            aria-label="Next product"
            disabled={visibleProducts.length < 2}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Gallery Tablet Pagination / Status Bar */}
        <div className="gallery-tablet-footer">
          <div className="tablet-hint">
            <span className="hint-icon">
              <ArrowLeft size={14} />
              <ArrowRight size={14} />
            </span>
            <span>Tap any strip or swipe across the card to explore systems</span>
          </div>

          <div className="gallery-pills">
            {visibleProducts.map((p) => {
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  aria-label={`Select ${p.shortName}`}
                  className={`pill-indicator ${isActive ? 'is-active' : ''}`}
                  onClick={() => selectProduct(p)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePillDot"
                      className="active-pill-tracker"
                      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                    />
                  )}
                  <span>{p.shortName}</span>
                </button>
              );
            })}
          </div>

          <div className="gallery-counter">
            <strong>0{Math.max(1, visibleProducts.findIndex((p) => p.id === active.id) + 1)}</strong>
            <i>/</i>
            <span>0{visibleProducts.length}</span>
          </div>
        </div>
      </section>

      {/* Persistent Bottom Apple-style Translucent Bar */}
      <footer className="tablet-footer apple-chrome">
        <div className="footer-left-info">
          <div className="footer-icon-bubble">
            <Droplet size={16} fill="currentColor" />
          </div>
          <div>
            <strong>Life Filtration™ Showroom Display</strong>
            <small>Tap any product to compare specifications & ratings</small>
          </div>
        </div>

        <div className="footer-right-actions">
          <motion.a
            href={active.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-link-btn"
            whileTap={{ scale: 0.95 }}
          >
            <span>Visit lifefiltration.com</span>
            <ExternalLink size={13} />
          </motion.a>
        </div>
      </footer>

      {/* Modals for Details, Video, and Certifications - Centered on Screen */}
      <Modal kind={modal} product={active} onClose={() => setModal(null)} />

      {/* Inactivity Ambient Screen Saver */}
      <AnimatePresence>
        {showIdle && (
          <motion.div
            className="idle-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={() => {
              setShowIdle(false);
              resetIdle();
            }}
          >
            <motion.div
              className="idle-card apple-glass-card"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            >
              <div className="idle-drop">
                <Droplet size={38} fill="currentColor" />
              </div>
              <p className="eyebrow">LIFE FILTRATION · SHOWROOM</p>
              <h2>Pure Water, Refined</h2>
              <p>Touch anywhere on the display to resume the interactive product showroom.</p>
              <motion.button
                className="button button-primary button-large"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIdle(false);
                  resetIdle();
                  setQuery('');
                  setCategory('All Products');
                  selectProduct(products[0]);
                }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Start Exploring</span>
                <ArrowRight size={17} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
