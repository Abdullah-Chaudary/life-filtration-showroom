export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: 'Drinking Water' | 'Whole Home' | 'Replacement Filters';
  eyebrow: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
  officialUrl: string;
  image: string;
  videoUrl?: string;
  certifications: { title: string; note: string }[];
};

export const products: Product[] = [
  {
    id: 'ro-5-stage',
    name: '5-Stage Reverse Osmosis Drinking Water System + Alkaline',
    shortName: '5-Stage RO System',
    category: 'Drinking Water',
    eyebrow: 'PURE WATER, RIGHT AT THE TAP',
    description: 'A premium under-sink reverse osmosis system designed to eliminate heavy metals, fluoride, and contaminants while re-mineralizing water for optimal pH balance.',
    features: [
      'Five-stage high-efficiency purification',
      'High-capacity NSF-certified RO membrane',
      'Alkaline re-mineralization cartridge',
      'Dedicated lead-free brushed steel designer faucet'
    ],
    specs: [
      { label: 'Filtration Stages', value: '5-Stage with Alkaline Remineralization' },
      { label: 'Flow Rate', value: '0.5 GPM' },
      { label: 'Operating Pressure', value: '30–100 PSI' },
      { label: 'Filter Replacement', value: 'Every 6–12 months' },
      { label: 'Installation', value: 'Compact Under-Sink' }
    ],
    benefits: [
      'Removes up to 99% of dissolved solids and chlorine',
      'Alkaline stage raises pH for crisp, smooth hydration',
      'Compact footprint fits neatly under standard kitchen cabinets'
    ],
    officialUrl: 'https://www.lifefiltration.com/reverse-osmosis/',
    image: '/assets/products/ro-5-stage.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'NSF-Certified RO Membrane',
        note: 'High-rejection semi-permeable membrane tested and certified against NSF/ANSI standards for contaminant reduction.'
      },
      {
        title: 'Lead-Free Component Standard',
        note: 'Fittings, tubing, and dispensing faucet conform to lead-free plumbing regulations.'
      }
    ]
  },
  {
    id: 'tankless-ro',
    name: 'Tankless Reverse Osmosis Drinking Water System + Alkaline',
    shortName: 'Tankless RO',
    category: 'Drinking Water',
    eyebrow: 'SMART PURIFICATION, SLEEK DESIGN',
    description: 'A modern, ultra-slim tankless system featuring real-time digital TDS monitoring, high-speed flow, and an automatic leak-stop safety mechanism.',
    features: [
      'Direct-flow tankless architecture (no stagnant water)',
      'Real-time inlet and outlet TDS digital display',
      'Automatic water cut-off and child safety lock',
      'Smart color-coded filter replacement reminders'
    ],
    specs: [
      { label: 'Filtration Type', value: 'Multi-stage direct flow' },
      { label: 'Published Flow Rate', value: '600–800 GPD (Fast fill)' },
      { label: 'Operating Pressure', value: '40–100 PSI' },
      { label: 'Filter Lifespan', value: '6–12 months, digital indicator' },
      { label: 'Drain Ratio', value: '1.5:1 low-waste ratio' }
    ],
    benefits: [
      'Fresh pure water on demand with zero tank storage',
      'Saves over 70% under-sink cabinet space',
      'Live TDS readout gives real-time water quality feedback'
    ],
    officialUrl: 'https://www.lifefiltration.com/tankless-reverse-osmosis/',
    image: '/assets/products/tankless-ro.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'Smart Water Quality Assurance',
        note: 'Integrated dual TDS sensor circuit tested for accurate parts-per-million purity detection.'
      }
    ]
  },
  {
    id: 'water-softener',
    name: 'Whole-House Water Softener',
    shortName: 'Water Softener',
    category: 'Whole Home',
    eyebrow: 'SOFTER WATER. SMARTER USE.',
    description: 'An advanced digital metered water softening system engineered to eliminate hard water minerals, prevent scale damage, and protect appliances.',
    features: [
      'Digital metered control valve for demand regeneration',
      'Premium high-capacity ion exchange resin',
      'Durable corrosion-resistant composite fiberglass tank',
      'Optimized salt and water efficiency programming'
    ],
    specs: [
      { label: 'Flow Rate', value: 'Up to 42 GPM peak service' },
      { label: 'Grain Capacity', value: '60,000–250,000 grains' },
      { label: 'Resin Volume', value: '1.5–6 cu ft capacity' },
      { label: 'Electrical', value: '120 VAC / 60 Hz' },
      { label: 'Valve Type', value: 'Full digital smart meter' }
    ],
    benefits: [
      'Eliminates scale buildup in water heaters and pipes',
      'Leaves hair and skin noticeably softer after showers',
      'Reduces detergent and soap usage by up to 50%'
    ],
    officialUrl: 'https://www.lifefiltration.com/water-softener/',
    image: '/assets/products/water-softener.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'WQA Certified Resin Medium',
        note: 'Utilizes high-purity premium grade ion exchange resin verified for potable water treatment.'
      }
    ]
  },
  {
    id: 'carbon-filtration',
    name: 'Whole-House Carbon Filtration System',
    shortName: 'Carbon Filtration',
    category: 'Whole Home',
    eyebrow: 'WHOLE-HOME WATER COMFORT',
    description: 'A heavy-duty residential catalytic carbon filtration system designed to strip chlorine, chloramines, chemical odors, and volatile organic compounds.',
    features: [
      'High-capacity catalytic virgin coconut shell carbon',
      'Full point-of-entry coverage for every faucet and shower',
      'Neutralizes chemical smells and disinfection by-products',
      'No wastewater production or electrical drain required'
    ],
    specs: [
      { label: 'Media Type', value: 'Catalytic virgin coconut carbon' },
      { label: 'Max Flow Rate', value: '15–25 GPM' },
      { label: 'Operating Temp', value: '40°F – 110°F' },
      { label: 'Vessel Construction', value: 'Reinforced composite tank' }
    ],
    benefits: [
      'Prevents inhaling chlorine vapors during hot showers',
      'Protects household clothing and skin from harsh oxidizers',
      'Spring-quality fresh water from every tap in the home'
    ],
    officialUrl: 'https://www.lifefiltration.com/carbon-filter/',
    image: '/assets/products/carbon-filtration.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'NSF Standard 42 Carbon Media',
        note: 'Activated carbon media conforms to taste, odor, and chlorine reduction testing protocols.'
      }
    ]
  },
  {
    id: 'ultrafilter',
    name: 'Whole Home Ultra Filtration',
    shortName: 'Ultrafilter',
    category: 'Whole Home',
    eyebrow: 'ADVANCED FILTRATION FOR EVERY TAP',
    description: 'A state-of-the-art hollow-fiber ultrafiltration setup that removes sub-micron sediment, particulates, and colloidal matter while retaining beneficial minerals.',
    features: [
      '0.02 micron hollow-fiber membrane barrier',
      'Salt-free and chemical-free operation',
      'Integrated metered automated backwash cycle',
      'Multi-stage pre-sediment and carbon integration'
    ],
    specs: [
      { label: 'Model', value: 'LFUF-21' },
      { label: 'Flow Rate', value: 'Up to 28 GPM' },
      { label: 'Pore Size', value: '0.02 Micron ultra-membrane' },
      { label: 'Operation', value: 'Saltless conditioning' }
    ],
    benefits: [
      'Microbiological barrier without UV power requirements',
      'Zero wastewater discharge during normal service',
      'Protects expensive fixtures and tankless water heaters'
    ],
    officialUrl: 'https://www.lifefiltration.com/ultrafiltration/',
    image: '/assets/products/ultrafilter.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'Sub-Micron Particulate Removal',
        note: 'Hollow fiber structure physical retention threshold validated to 0.02 microns.'
      }
    ]
  },
  {
    id: 'salt-free-carbon',
    name: 'Whole-House Salt-Free Water Conditioner & Carbon Filtration System',
    shortName: 'Salt-Free + Carbon',
    category: 'Whole Home',
    eyebrow: 'SCALE CONTROL WITHOUT SALT',
    description: 'An eco-friendly dual-stage system integrating ScaleSolver template-assisted crystallization scale control with high-grade carbon chemical filtration.',
    features: [
      'Template-Assisted Crystallization (TAC) scale prevention',
      'High-capacity activated carbon filtration stage',
      'No salt bags to carry, zero electrical consumption',
      'Preserves beneficial calcium and magnesium minerals'
    ],
    specs: [
      { label: 'Technology', value: 'TAC Anti-Scale + Catalytic Carbon' },
      { label: 'Maintenance', value: 'Zero salt or potassium required' },
      { label: 'Service Life', value: 'Multi-year media longevity' },
      { label: 'Eco Profile', value: '100% zero brine wastewater' }
    ],
    benefits: [
      'Ideal for areas with brine discharge restrictions',
      'Protects plumbing from mineral crystallization',
      'Zero electrical outlets or drain line needed'
    ],
    officialUrl: 'https://www.lifefiltration.com/life-filtration%EF%B8%8F-whole-house-salt-free-water-conditioner-carbon-filtration-system/',
    image: '/assets/products/salt-free-carbon.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'German DVGW TAC Standard Compliant',
        note: 'Employs Template-Assisted Crystallization media tested under W-512 standard guidelines.'
      }
    ]
  },
  {
    id: 'pureguard',
    name: 'PureGuard Sediment Filter',
    shortName: 'PureGuard',
    category: 'Replacement Filters',
    eyebrow: 'FIRST-STAGE PARTICLE PROTECTION',
    description: 'High-density multi-gradient depth sediment cartridge engineered to trap rust, silt, pipe scale, and sand before downstream treatment.',
    features: [
      'Multi-layer gradient density for maximum dirt-holding capacity',
      '100% pure virgin polypropylene fibers',
      'Thermal-bonded construction with no binders or resins',
      'High structural rigidity withstands pressure spikes'
    ],
    specs: [
      { label: 'Micron Rating', value: '5 Micron nominal' },
      { label: 'Material', value: '100% Virgin Melt-Blown Polypropylene' },
      { label: 'Service Interval', value: '3–6 Months depending on turbidity' }
    ],
    benefits: [
      'Extends life of carbon and RO membrane cartridges',
      'Eliminates visible particulates, cloudiness, and pipe rust',
      'Clean twist-lock or drop-in replacement design'
    ],
    officialUrl: 'https://www.lifefiltration.com/life-filtration%EF%B8%8F-pureguard-sediment-filter/',
    image: '/assets/products/pureguard.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'FDA Food-Grade Compliance',
        note: 'Manufactured with FDA-compliant polypropylene resin for safe drinking water contact.'
      }
    ]
  },
  {
    id: 'carbonshield',
    name: 'CarbonShield Filter',
    shortName: 'CarbonShield',
    category: 'Replacement Filters',
    eyebrow: 'EVERYDAY CHEMICAL REDUCTION',
    description: 'Extruded high-density carbon block cartridge providing powerful adsorption of chlorine, chloramine, pesticides, and industrial chemical residues.',
    features: [
      'High-grade acid-washed coconut shell carbon block',
      'Uniform pore size avoids channeling and particle bleed',
      'Exceptional chlorine taste and chemical odor elimination',
      'Protects downstream RO membranes from oxidative damage'
    ],
    specs: [
      { label: 'Type', value: 'Extruded Carbon Block' },
      { label: 'Capacity', value: 'Up to 15,000 Gallons' },
      { label: 'Micron Rating', value: '1 Micron nominal' }
    ],
    benefits: [
      'Restores crisp clean aroma and taste to city water',
      'Provides defense against organic contaminants and chloramines',
      'Essential preventative stage for high-purity water'
    ],
    officialUrl: 'https://www.lifefiltration.com/life-filtration%EF%B8%8F-carbonshield-filter/',
    image: '/assets/products/carbonshield.jpg',
    videoUrl: '',
    certifications: [
      {
        title: 'NSF/ANSI 42 Extraction Compliance',
        note: 'Carbon block material tested for material safety and chemical extraction.'
      }
    ]
  },
  {
    id: 'deepclean',
    name: 'DeepClean Carbon Filter',
    shortName: 'DeepClean Carbon',
    category: 'Replacement Filters',
    eyebrow: 'THE FINAL POLISH',
    description: 'Extended-contact granular activated carbon polishing filter engineered as the final stage of water perfection for refreshing taste and clarity.',
    features: [
      'Extended bed contact time for complete polish',
      'Premium washed microporous coconut carbon',
      'Internal sediment diffusion screens prevent fines migration',
      'Delivers clear, crisp, refreshing tap water'
    ],
    specs: [
      { label: 'Media', value: 'Ultra-Pure Coconut GAC' },
      { label: 'Inlet/Outlet', value: 'Quick-connect push fittings' },
      { label: 'Service Life', value: '6–12 Months' }
    ],
    benefits: [
      'Eliminates lingering tastes from storage or piping',
      'Final polishing stage ensures crisp premium bottled-quality taste',
      'Quick swap design allows 60-second replacement'
    ],
    officialUrl: 'https://www.lifefiltration.com/life-filtration%EF%B8%8F-deepclean-carbon-filter/',
    image: '/assets/products/deepclean.jpeg',
    videoUrl: '',
    certifications: [
      {
        title: 'Polishing Quality Standard',
        note: 'Final contact media verified for zero leaching and neutral, crisp taste finish.'
      }
    ]
  }
];

export const categories = ['All Products', 'Drinking Water', 'Whole Home', 'Replacement Filters'] as const;
