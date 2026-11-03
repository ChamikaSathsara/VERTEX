/**
 * VERTEX // Minimal Sharp Edge Invoice System
 * Architecture: Vanilla JavaScript, Zero-Radius Design Engine
 * Features: Landing Page Showcase, 4 Layout Archetypes, Accent Color Picker, Enhanced App UI Fonts, PWA Chrome App
 */

(function () {
  'use strict';

  // --- 8 Industry Preset Templates with Assigned Layout Archetypes & Colors ---
  const PRESETS = {
    tech: {
      templateKey: 'tech',
      templateName: 'SOFTWARE & CLOUD ENGINEERING',
      category: 'tech',
      archetype: 'swiss', // Swiss Minimal Grid
      accentColor: '#1d4ed8', // Klein Cobalt Blue
      invNumber: 'INV-2026-0108',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(30),
      paymentTerms: 'Net 30 Days',
      poNumber: 'PO-CLOUD-901',
      currency: 'USD',
      currencySymbol: '$',
      sender: {
        name: 'KONTUR ARCHITECTURAL STUDIOS',
        email: 'finance@kontur-studios.io',
        address: '452 Industrial Parkway, Floor 04\nBerlin, 10115 Germany',
        phone: '+49 30 9948 2010',
        taxId: 'DE-398402910',
        logo: null
      },
      client: {
        name: 'NEO-SYSTEMS CORP.',
        email: 'accounts@neosystems.com',
        address: '780 Silicon Boulevard, Suite 1200\nSan Francisco, CA 94107 USA',
        phone: '+1 (415) 890-4421',
        taxId: 'US-94-332019'
      },
      items: [
        {
          id: 1,
          name: 'Distributed Cloud Architecture Engineering',
          description: 'High-concurrency microservices refactoring & Kubernetes cluster deployment',
          qty: 80,
          rate: 150,
          tax: 10
        },
        {
          id: 2,
          name: 'Security Vulnerability & Zero-Trust Audit',
          description: 'Comprehensive cryptographic assessment, penetration test, and report',
          qty: 1,
          rate: 4500,
          tax: 10
        },
        {
          id: 3,
          name: 'CI/CD Pipeline Automation & Telemetry',
          description: 'Automated test workflows, Prometheus metrics, and Grafana dashboard alerts',
          qty: 24,
          rate: 135,
          tax: 10
        }
      ],
      discountValue: 500,
      discountType: 'fixed',
      taxRate: 10,
      shippingFee: 0,
      amountPaid: 0,
      bankDetails: 'Bank Name: Deutsche Handelsbank AG\nAccount Holder: Kontur Architectural Studios\nIBAN: DE89 3704 0044 0532 0130 00\nSWIFT/BIC: DEUTDEDDXXX',
      invoiceNotes: 'Please quote invoice number INV-2026-0108 on your electronic wire transfer. Remittance advice can be emailed to finance@kontur-studios.io.',
      invoiceTerms: 'Payment due within 30 days of issue. Overdue accounts will incur a 1.5% statutory monthly charge.'
    },

    design: {
      templateKey: 'design',
      templateName: 'DESIGN STUDIO & BRANDING',
      category: 'creative',
      archetype: 'editorial', // Editorial Stark Left
      accentColor: '#6d28d9', // Deep Violet
      invNumber: 'INV-2026-0214',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(14),
      paymentTerms: 'Net 15 Days',
      poNumber: 'DSGN-884',
      currency: 'EUR',
      currencySymbol: '€',
      sender: {
        name: 'ATELIER MONOLITH DESIGN',
        email: 'billing@monolith.design',
        address: '14 Rue de la Typographie\n75003 Paris, France',
        phone: '+33 1 42 68 55 00',
        taxId: 'FR-882390192',
        logo: null
      },
      client: {
        name: 'HELVETICA WATCH COMPANY',
        email: 'accounts@helveticawatch.ch',
        address: 'Bärengasse 29\n8001 Zurich, Switzerland',
        phone: '+41 44 211 40 00',
        taxId: 'CHE-119.820.344'
      },
      items: [
        {
          id: 1,
          name: 'Minimalist Brand Identity & Typography System',
          description: 'Master logotype, grid guidelines, custom glyph set, and brand guidelines manual',
          qty: 1,
          rate: 6800,
          tax: 20
        },
        {
          id: 2,
          name: 'Design System & Figma Component Architecture',
          description: 'Zero-radius UI kit, dark/light theme tokens, and responsive layout specifications',
          qty: 1,
          rate: 4200,
          tax: 20
        },
        {
          id: 3,
          name: 'Print Packaging & Product Box Specifications',
          description: 'Die-cut templates, foil stamping plates, and environmental packaging material guide',
          qty: 1,
          rate: 2100,
          tax: 20
        }
      ],
      discountValue: 5,
      discountType: 'percent',
      taxRate: 20,
      shippingFee: 0,
      amountPaid: 3000,
      bankDetails: 'Bank Name: Banque Nationale de Paris (BNP)\nAccount Holder: Atelier Monolith Design SAS\nIBAN: FR76 3000 4000 0100 2345 6789 012\nSWIFT/BIC: BNPAFRPPXXX',
      invoiceNotes: 'Deposit of €3,000.00 received on milestone kick-off. Remaining balance due as specified above.',
      invoiceTerms: 'All intellectual property rights transfer to client upon settlement of final outstanding balance.'
    },

    photo: {
      templateKey: 'photo',
      templateName: 'PHOTOGRAPHY & MEDIA PRODUCTION',
      category: 'creative',
      archetype: 'band', // Modern Header Band
      accentColor: '#09090b', // Onyx Monolith
      invNumber: 'INV-2026-0302',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(14),
      paymentTerms: 'Net 15 Days',
      poNumber: 'CAM-2026-P9',
      currency: 'USD',
      currencySymbol: '$',
      sender: {
        name: 'LUMEN RAW PRODUCTION STUDIO',
        email: 'production@lumen-studio.com',
        address: '108 Franklin Street, Studio 4B\nNew York, NY 10013 USA',
        phone: '+1 (212) 555-0182',
        taxId: 'US-13-8992011',
        logo: null
      },
      client: {
        name: 'VOGUE LUXURY APPAREL GROUP',
        email: 'billing@vogueluxury.com',
        address: '550 5th Avenue, 18th Floor\nNew York, NY 10036 USA',
        phone: '+1 (212) 555-0199',
        taxId: 'US-13-4491028'
      },
      items: [
        {
          id: 1,
          name: 'On-Location Commercial Editorial Shoot (2 Days)',
          description: 'High-speed medium format capture, lighting crew, studio assistant, and gear package',
          qty: 2,
          rate: 3200,
          tax: 8.875
        },
        {
          id: 2,
          name: 'Digital High-End Retouching & Color Grading',
          description: 'Master grading of 35 hero frames for international print and global digital campaign',
          qty: 35,
          rate: 85,
          tax: 8.875
        },
        {
          id: 3,
          name: 'Global Editorial Licensing (2 Years)',
          description: 'Worldwide digital, print, and out-of-home advertising usage rights',
          qty: 1,
          rate: 4500,
          tax: 0
        }
      ],
      discountValue: 0,
      discountType: 'fixed',
      taxRate: 8.875,
      shippingFee: 0,
      amountPaid: 3500,
      bankDetails: 'Bank Name: Chase Commercial Bank\nAccount Holder: Lumen Raw Production Studio LLC\nRouting: 021000021 | Account: 9940291029\nSWIFT: CHASUS33',
      invoiceNotes: 'High-res TIFF master archives will be delivered via secure cloud link upon receipt of final remittance.',
      invoiceTerms: 'Licensing rights are granted conditioned upon payment in full.'
    },

    construction: {
      templateKey: 'construction',
      templateName: 'ARCHITECTURE & CONSTRUCTION',
      category: 'goods',
      archetype: 'ledger', // Framed Ledger
      accentColor: '#b45309', // Amber Industrial
      invNumber: 'INV-2026-0418',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(30),
      paymentTerms: 'Net 30 Days',
      poNumber: 'CIVIL-B992',
      currency: 'EUR',
      currencySymbol: '€',
      sender: {
        name: 'STRUKTUR CIVIL ARCHITECTS',
        email: 'accounts@struktur-arch.eu',
        address: 'Am Zeughaus 1-2\n10117 Berlin, Germany',
        phone: '+49 30 8829 1000',
        taxId: 'DE-298401928',
        logo: null
      },
      client: {
        name: 'NORDIC REAL ESTATE AS',
        email: 'invoicing@nordicre.no',
        address: 'Dronning Eufemias gate 16\n0191 Oslo, Norway',
        phone: '+47 21 00 00 00',
        taxId: 'NO-982 301 928 MVA'
      },
      items: [
        {
          id: 1,
          name: 'Structural Feasibility & CAD Drafting Phase 2',
          description: 'Reinforced concrete foundation schematics, seismic evaluation & BIM modeling',
          qty: 1,
          rate: 14500,
          tax: 19
        },
        {
          id: 2,
          name: 'On-Site Engineering Oversight & Inspections',
          description: 'Weekly certified architectural progress audits, material verification and logbooks',
          qty: 6,
          rate: 1200,
          tax: 19
        },
        {
          id: 3,
          name: 'Statutory City Planning Permitting Submissions',
          description: 'Documentation compilation, acoustic analysis report, and municipal filings',
          qty: 1,
          rate: 3800,
          tax: 19
        }
      ],
      discountValue: 0,
      discountType: 'fixed',
      taxRate: 19,
      shippingFee: 0,
      amountPaid: 5000,
      bankDetails: 'Bank Name: Commerzbank AG Berlin\nAccount: Struktur Civil Architects GmbH\nIBAN: DE45 1004 0000 0192 8401 00\nBIC: COBADEFFXXX',
      invoiceNotes: 'Statutory 10% retention fee to be released upon final occupancy permit certification.',
      invoiceTerms: 'Services rendered strictly in compliance with DIN 276 construction industry regulations.'
    },

    legal: {
      templateKey: 'legal',
      templateName: 'LEGAL & CORPORATE COUNSEL',
      category: 'corporate',
      archetype: 'ledger', // Framed Ledger
      accentColor: '#334155', // Slate Steel
      invNumber: 'INV-2026-0520',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getTodayDate(),
      paymentTerms: 'Due on Receipt',
      poNumber: 'LEGAL-RETAINER-03',
      currency: 'USD',
      currencySymbol: '$',
      sender: {
        name: 'STERLING & VANCE BARRISTERS LLP',
        email: 'billing@sterlingvance.com',
        address: '700 Louisiana Street, Suite 4100\nHouston, TX 77002 USA',
        phone: '+1 (713) 555-0144',
        taxId: 'US-76-0928192',
        logo: null
      },
      client: {
        name: 'HYPERION ENERGY VENTURES',
        email: 'counsel@hyperionenergy.com',
        address: '1200 Smith St, Suite 2500\nHouston, TX 77002 USA',
        phone: '+1 (713) 555-0188',
        taxId: 'US-74-8829102'
      },
      items: [
        {
          id: 1,
          name: 'Corporate M&A Due Diligence & Contract Negotiation',
          description: 'Senior partner billable advisory hours regarding Series B financing and cap table restructure',
          qty: 18,
          rate: 650,
          tax: 0
        },
        {
          id: 2,
          name: 'Cross-Border Intellectual Property Licensing Agreement',
          description: 'Drafting international patent covenants, indemnification clauses, and arbitration venue',
          qty: 1,
          rate: 4200,
          tax: 0
        },
        {
          id: 3,
          name: 'Regulatory Compliance & Federal SEC Filing Oversight',
          description: 'Form D preparation, accredited investor verification protocols, and Blue Sky compliance',
          qty: 1,
          rate: 2800,
          tax: 0
        }
      ],
      discountValue: 0,
      discountType: 'fixed',
      taxRate: 0,
      shippingFee: 0,
      amountPaid: 0,
      bankDetails: 'Bank: Wells Fargo IOLTA Trust Account\nAccount Name: Sterling & Vance LLP Client Trust\nAccount: 8849-0192-4410 | Routing: 111000025\nSWIFT: WFBICUS6S',
      invoiceNotes: 'Wire transfers must be directed strictly to our verified Client Trust Account as stated above.',
      invoiceTerms: 'Invoiced in accordance with Attorney-Client Representation Agreement executed 04 February 2026.'
    },

    marketing: {
      templateKey: 'marketing',
      templateName: 'MARKETING & SEO STRATEGY',
      category: 'corporate',
      archetype: 'band', // Modern Header Band
      accentColor: '#047857', // Alpine Emerald Green
      invNumber: 'INV-2026-0612',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(15),
      paymentTerms: 'Net 15 Days',
      poNumber: 'MKT-APR-2026',
      currency: 'AUD',
      currencySymbol: 'A$',
      sender: {
        name: 'APEX METRICS DIGITAL AGENCY',
        email: 'finance@apexmetrics.com.au',
        address: 'Level 14, 333 George Street\nSydney, NSW 2000 Australia',
        phone: '+61 2 9123 4567',
        taxId: 'ABN: 48 123 456 789',
        logo: null
      },
      client: {
        name: 'PACIFIC HORIZONS RETAIL',
        email: 'marketing@pacifichorizons.com.au',
        address: '500 Bourke Street, Floor 12\nMelbourne, VIC 3000 Australia',
        phone: '+61 3 9876 5432',
        taxId: 'ABN: 92 987 654 321'
      },
      items: [
        {
          id: 1,
          name: 'Monthly Omni-Channel PPC Campaign Management',
          description: 'Google Search, Meta Ads, LinkedIn B2B bidding optimization, A/B test ad copies',
          qty: 1,
          rate: 3400,
          tax: 10
        },
        {
          id: 2,
          name: 'Enterprise Technical SEO Audit & Core Web Vitals',
          description: 'JavaScript rendering crawl, schema structured data, indexation cleanup & speed tuning',
          qty: 1,
          rate: 2200,
          tax: 10
        },
        {
          id: 3,
          name: 'Conversion Rate Optimization (CRO) & Funnel Analytics',
          description: 'Heatmap behavioral tracking, checkout flow micro-copy refinement, and weekly report',
          qty: 1,
          rate: 1850,
          tax: 10
        }
      ],
      discountValue: 0,
      discountType: 'fixed',
      taxRate: 10,
      shippingFee: 0,
      amountPaid: 0,
      bankDetails: 'Bank: Commonwealth Bank of Australia (CBA)\nAccount: Apex Metrics Pty Ltd\nBSB: 062-000 | Account: 1029 3847\nSWIFT: CTBAAU2S',
      invoiceNotes: 'Monthly performance data and ROI dashboards accessible via client portal: apexmetrics.com.au/portal',
      invoiceTerms: 'GST of 10% applies to Australian domestic entities in accordance with ATO regulations.'
    },

    consulting: {
      templateKey: 'consulting',
      templateName: 'CORPORATE STRATEGIC ADVISORY',
      category: 'corporate',
      archetype: 'swiss', // Swiss Minimal Grid
      accentColor: '#b91c1c', // Stark Carmine Red
      invNumber: 'INV-2026-0349',
      invStatus: 'PENDING',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(30),
      paymentTerms: 'Net 30 Days',
      poNumber: 'CONS-4001',
      currency: 'GBP',
      currencySymbol: '£',
      sender: {
        name: 'VANGUARD STRATEGIC ADVISORS',
        email: 'invoicing@vanguard-advisors.co.uk',
        address: '100 Bishopsgate, Level 22\nLondon, EC2N 4AG United Kingdom',
        phone: '+44 20 7946 0192',
        taxId: 'GB-992 4810 22',
        logo: null
      },
      client: {
        name: 'APEX AEROSPACE HOLDINGS',
        email: 'procurement@apexaero.com',
        address: 'Aero House, Flight Path Way\nBristol, BS34 7PA United Kingdom',
        phone: '+44 117 496 0883',
        taxId: 'GB-810 3920 11'
      },
      items: [
        {
          id: 1,
          name: 'Supply Chain Risk Mitigation & Optimization',
          description: 'Phase 2 evaluation of multi-tier supplier resilience and raw material sourcing',
          qty: 45,
          rate: 220,
          tax: 20
        },
        {
          id: 2,
          name: 'Executive Board Strategy Facilitation',
          description: 'Two-day senior leadership governance and international market positioning workshop',
          qty: 2,
          rate: 3500,
          tax: 20
        }
      ],
      discountValue: 0,
      discountType: 'fixed',
      taxRate: 20,
      shippingFee: 0,
      amountPaid: 0,
      bankDetails: 'Bank Name: Barclays Bank PLC\nAccount Holder: Vanguard Strategic Advisors Ltd\nAccount No: 94820194 | Sort Code: 20-00-00\nIBAN: GB29 BUKB 2000 0094 8201 94\nSWIFT/BIC: BUKBGB22',
      invoiceNotes: 'Wire payments must be executed in GBP. Any international intermediary banking fees are client responsibility.',
      invoiceTerms: 'Invoiced in accordance with Master Advisory Services Agreement dated 12 January 2026.'
    },

    products: {
      templateKey: 'products',
      templateName: 'GOODS & HARDWARE SUPPLY',
      category: 'goods',
      archetype: 'band', // Modern Header Band
      accentColor: '#1d4ed8', // Cobalt
      invNumber: 'INV-2026-0490',
      invStatus: 'PAID',
      invDate: getTodayDate(),
      invDueDate: getOffsetDate(15),
      paymentTerms: 'Due on Receipt',
      poNumber: 'PO-HARDWARE-88',
      currency: 'USD',
      currencySymbol: '$',
      sender: {
        name: 'SYNAPSE INDUSTRIAL FABRICATION',
        email: 'orders@synapse-fab.com',
        address: '900 Automation Way, Bldg 3\nDetroit, MI 48202 USA',
        phone: '+1 (313) 555-0149',
        taxId: 'US-38-9920193',
        logo: null
      },
      client: {
        name: 'QUANTUM ROBOTICS LAB',
        email: 'finance@quantumrobotics.ai',
        address: '50 Memorial Drive\nCambridge, MA 02142 USA',
        phone: '+1 (617) 555-0199',
        taxId: 'US-04-1294829'
      },
      items: [
        {
          id: 1,
          name: 'CNC Milled Anodized Aluminum Chassis (Black)',
          description: 'Aerospace-grade 6061-T6 alloy, precision tolerance ±0.02mm, bead-blasted finish',
          qty: 25,
          rate: 180,
          tax: 8.5
        },
        {
          id: 2,
          name: 'Custom FR4 Multi-Layer Backplane PCBs',
          description: '4-layer ENIG gold plating, impedance controlled, RoHS compliant',
          qty: 50,
          rate: 32,
          tax: 8.5
        },
        {
          id: 3,
          name: 'High-Torque Brushless Actuator Modules',
          description: 'Integrated magnetic absolute encoder, CAN-FD bus communication',
          qty: 12,
          rate: 295,
          tax: 8.5
        }
      ],
      discountValue: 200,
      discountType: 'fixed',
      taxRate: 8.5,
      shippingFee: 145,
      amountPaid: 10108.90,
      bankDetails: 'Bank Name: Silicon Valley Commercial Bank\nAccount Holder: Synapse Industrial Fabrication LLC\nRouting No: 121000358 | Account: 8849201920\nSWIFT/BIC: SVBKUS6S',
      invoiceNotes: 'Items dispatched via Priority Air Freight tracking #9400-1112-9984-0192.',
      invoiceTerms: 'Standard 24-month limited manufacturing warranty on all structural hardware components.'
    }
  };

  // --- Default Visibility & Customization Config ---
  const DEFAULT_CONFIG = {
    colNum: true,
    colSubdesc: true,
    colQty: true,
    colRate: true,
    colTax: true,
    colAmount: true,
    alignQty: 'right',
    alignRate: 'right',
    alignTax: 'right',
    alignAmount: 'right',

    secLogo: true,
    secSenderContacts: true,
    secSenderTax: true,
    secClientContacts: true,
    secClientTax: true,
    secCallout: true,
    secBank: true,
    secNotes: true,
    secTerms: true,
    secBarcode: true,
    secFooter: true,

    archetype: 'swiss',
    accentColor: '#09090b',
    dateFormat: 'YYYY-MM-DD'
  };

  // --- State ---
  let state = JSON.parse(JSON.stringify(PRESETS.tech));
  let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  let activeStep = 1;
  let viewMode = 'stepper';
  let zoomLevel = 1.0;
  let deferredInstallPrompt = null;

  // --- DOM Elements Cache ---
  const el = {
    // Screens
    landingScreen: document.getElementById('landingScreen'),
    workspaceScreen: document.getElementById('workspaceScreen'),
    showcaseGrid: document.getElementById('showcaseGrid'),
    categoryFilterBar: document.getElementById('categoryFilterBar'),
    backToLandingBtn: document.getElementById('backToLandingBtn'),
    landingStartBlankBtn: document.getElementById('landingStartBlankBtn'),
    activeArchetypeLabel: document.getElementById('activeArchetypeLabel'),

    // Top Bar Actions
    viewSplitBtn: document.getElementById('viewSplitBtn'),
    viewEditBtn: document.getElementById('viewEditBtn'),
    viewPreviewBtn: document.getElementById('viewPreviewBtn'),
    appLayout: document.getElementById('appLayout'),
    uiFontNormalBtn: document.getElementById('uiFontNormalBtn'),
    uiFontLargeBtn: document.getElementById('uiFontLargeBtn'),
    landingInstallBtn: document.getElementById('landingInstallBtn'),
    headerInstallBtn: document.getElementById('headerInstallBtn'),
    savedInvoicesBtn: document.getElementById('savedInvoicesBtn'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    saveDraftBtn: document.getElementById('saveDraftBtn'),
    printInvoiceBtn: document.getElementById('printInvoiceBtn'),
    previewPrintBtn: document.getElementById('previewPrintBtn'),
    finishAndPrintBtn: document.getElementById('finishAndPrintBtn'),

    // Stepper
    stepperBar: document.getElementById('stepperBar'),
    toggleAllSectionsBtn: document.getElementById('toggleAllSectionsBtn'),
    editorInner: document.getElementById('editorInner'),
    activeTemplateBadge: document.getElementById('activeTemplateBadge'),
    resetBlankBtn: document.getElementById('resetBlankBtn'),

    // Form inputs: Metadata & Business
    invNumber: document.getElementById('invNumber'),
    regenInvNumberBtn: document.getElementById('regenInvNumberBtn'),
    invStatus: document.getElementById('invStatus'),
    invDate: document.getElementById('invDate'),
    invDueDate: document.getElementById('invDueDate'),
    paymentTerms: document.getElementById('paymentTerms'),
    currencySelect: document.getElementById('currencySelect'),
    poNumber: document.getElementById('poNumber'),
    dateFormatSelect: document.getElementById('dateFormatSelect'),
    dateTodayBtn: document.getElementById('dateTodayBtn'),
    date1stMonthBtn: document.getElementById('date1stMonthBtn'),

    // Sender
    senderName: document.getElementById('senderName'),
    senderEmail: document.getElementById('senderEmail'),
    senderAddress: document.getElementById('senderAddress'),
    senderPhone: document.getElementById('senderPhone'),
    senderTaxId: document.getElementById('senderTaxId'),
    logoUploadInput: document.getElementById('logoUploadInput'),
    removeLogoBtn: document.getElementById('removeLogoBtn'),
    logoConfigBox: document.getElementById('logoConfigBox'),
    logoOrientationSelect: document.getElementById('logoOrientationSelect'),
    logoHeightSelect: document.getElementById('logoHeightSelect'),
    toggleLogoBorder: document.getElementById('toggleLogoBorder'),

    // Client
    clientName: document.getElementById('clientName'),
    clientEmail: document.getElementById('clientEmail'),
    clientAddress: document.getElementById('clientAddress'),
    clientPhone: document.getElementById('clientPhone'),
    clientTaxId: document.getElementById('clientTaxId'),
    clearClientBtn: document.getElementById('clearClientBtn'),

    // Items
    itemsTableBody: document.getElementById('itemsTableBody'),
    addItemBtn: document.getElementById('addItemBtn'),
    addItemTopBtn: document.getElementById('addItemTopBtn'),
    clearAllItemsBtn: document.getElementById('clearAllItemsBtn'),
    itemCountDisplay: document.getElementById('itemCountDisplay'),

    // Adjustments
    discountValue: document.getElementById('discountValue'),
    discountType: document.getElementById('discountType'),
    taxRate: document.getElementById('taxRate'),
    shippingFee: document.getElementById('shippingFee'),
    amountPaid: document.getElementById('amountPaid'),
    bankDetails: document.getElementById('bankDetails'),
    invoiceNotes: document.getElementById('invoiceNotes'),
    invoiceTerms: document.getElementById('invoiceTerms'),

    // Totals display
    subtotalDisplay: document.getElementById('subtotalDisplay'),
    discountTotalDisplay: document.getElementById('discountTotalDisplay'),
    taxTotalDisplay: document.getElementById('taxTotalDisplay'),
    shippingDisplay: document.getElementById('shippingDisplay'),
    grandTotalDisplay: document.getElementById('grandTotalDisplay'),
    amountPaidDisplay: document.getElementById('amountPaidDisplay'),
    balanceDueDisplay: document.getElementById('balanceDueDisplay'),

    // Preview Elements
    invoiceSheet: document.getElementById('invoiceSheet'),
    sheetBandStrip: document.getElementById('sheetBandStrip'),
    bandBrandName: document.getElementById('bandBrandName'),
    pHeaderBlock: document.getElementById('pHeaderBlock'),
    sheetBrandBox: document.getElementById('sheetBrandBox'),
    sheetLogoContainer: document.getElementById('sheetLogoContainer'),
    pSenderName: document.getElementById('pSenderName'),
    pSenderAddress: document.getElementById('pSenderAddress'),
    pSenderContacts: document.getElementById('pSenderContacts'),
    pSenderTaxId: document.getElementById('pSenderTaxId'),
    pMetaHeadline: document.getElementById('pMetaHeadline'),
    pStatusBadge: document.getElementById('pStatusBadge'),
    pInvNumber: document.getElementById('pInvNumber'),
    pIssueDateRow: document.getElementById('pIssueDateRow'),
    pInvDate: document.getElementById('pInvDate'),
    pDueDateRow: document.getElementById('pDueDateRow'),
    pInvDueDate: document.getElementById('pInvDueDate'),
    pTermsRow: document.getElementById('pTermsRow'),
    pPaymentTerms: document.getElementById('pPaymentTerms'),
    pPoRow: document.getElementById('pPoRow'),
    pPoNumber: document.getElementById('pPoNumber'),
    pBillToSection: document.getElementById('pBillToSection'),
    pClientName: document.getElementById('pClientName'),
    pClientAddress: document.getElementById('pClientAddress'),
    pClientContact: document.getElementById('pClientContact'),
    pClientTaxId: document.getElementById('pClientTaxId'),
    pCalloutBlock: document.getElementById('pCalloutBlock'),
    pBalanceCallout: document.getElementById('pBalanceCallout'),
    pDueDateNotice: document.getElementById('pDueDateNotice'),
    pItemsTableBody: document.getElementById('pItemsTableBody'),
    pBankBlock: document.getElementById('pBankBlock'),
    pBankDetails: document.getElementById('pBankDetails'),
    pNotesBlock: document.getElementById('pNotesBlock'),
    pInvoiceNotes: document.getElementById('pInvoiceNotes'),
    pTermsBlock: document.getElementById('pTermsBlock'),
    pInvoiceTerms: document.getElementById('pInvoiceTerms'),
    pSubtotal: document.getElementById('pSubtotal'),
    pDiscountRow: document.getElementById('pDiscountRow'),
    pDiscount: document.getElementById('pDiscount'),
    pTaxRow: document.getElementById('pTaxRow'),
    pTaxPercent: document.getElementById('pTaxPercent'),
    pTax: document.getElementById('pTax'),
    pShippingRow: document.getElementById('pShippingRow'),
    pShipping: document.getElementById('pShipping'),
    pGrandTotal: document.getElementById('pGrandTotal'),
    pPaidRow: document.getElementById('pPaidRow'),
    pAmountPaid: document.getElementById('pAmountPaid'),
    pBalanceDue: document.getElementById('pBalanceDue'),
    pBarcodeBlock: document.getElementById('pBarcodeBlock'),
    pSheetFooter: document.getElementById('pSheetFooter'),
    pFooterTimestamp: document.getElementById('pFooterTimestamp'),

    // Zoom
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomResetBtn: document.getElementById('zoomResetBtn'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomLevelDisplay: document.getElementById('zoomLevelDisplay'),

    // Style & Toggles (Step 5 & Quick Bar)
    customColorInput: document.getElementById('customColorInput'),
    quickCustomColorInput: document.getElementById('quickCustomColorInput'),
    toggleColNum: document.getElementById('toggleColNum'),
    toggleColSubdesc: document.getElementById('toggleColSubdesc'),
    toggleColQty: document.getElementById('toggleColQty'),
    toggleColRate: document.getElementById('toggleColRate'),
    toggleColTax: document.getElementById('toggleColTax'),
    toggleColAmount: document.getElementById('toggleColAmount'),
    alignColQty: document.getElementById('alignColQty'),
    alignColRate: document.getElementById('alignColRate'),
    alignColTax: document.getElementById('alignColTax'),
    alignColAmount: document.getElementById('alignColAmount'),
    toggleSecLogo: document.getElementById('toggleSecLogo'),
    toggleSecSenderContacts: document.getElementById('toggleSecSenderContacts'),
    toggleSecSenderTax: document.getElementById('toggleSecSenderTax'),
    toggleSecClientContacts: document.getElementById('toggleSecClientContacts'),
    toggleSecClientTax: document.getElementById('toggleSecClientTax'),
    toggleSecCallout: document.getElementById('toggleSecCallout'),
    toggleSecBank: document.getElementById('toggleSecBank'),
    toggleSecNotes: document.getElementById('toggleSecNotes'),
    toggleSecTerms: document.getElementById('toggleSecTerms'),
    toggleSecBarcode: document.getElementById('toggleSecBarcode'),
    toggleSecFooter: document.getElementById('toggleSecFooter'),
    resetVisibilityBtn: document.getElementById('resetVisibilityBtn'),

    // Modals
    savedModalBackdrop: document.getElementById('savedModalBackdrop'),
    closeSavedModalBtn: document.getElementById('closeSavedModalBtn'),
    savedTableBody: document.getElementById('savedTableBody'),
    savedEmptyState: document.getElementById('savedEmptyState'),
    searchSavedInput: document.getElementById('searchSavedInput'),
    exportAllJsonBtn: document.getElementById('exportAllJsonBtn'),
    importJsonInput: document.getElementById('importJsonInput'),
    installGuideModalBackdrop: document.getElementById('installGuideModalBackdrop'),
    closeInstallGuideBtn: document.getElementById('closeInstallGuideBtn'),

    // Toast
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Date Formatting Helpers ---
  function getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }

  function getOffsetDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + Number(days));
    return d.toISOString().split('T')[0];
  }

  function formatDateString(isoString, formatType) {
    if (!isoString) return '-';
    const parts = isoString.split('-');
    if (parts.length !== 3) return isoString;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = parseInt(month, 10) - 1;

    switch (formatType) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD MMM YYYY':
        return `${day} ${monthsShort[monthIndex] || month} ${year}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`;
    }
  }

  function formatMoney(amount, currencySymbol) {
    const sym = currencySymbol || state.currencySymbol || '$';
    const num = isNaN(amount) ? 0 : Number(amount);
    return sym + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}-${rand}`;
  }

  function getMonogram(name) {
    if (!name) return 'VT';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="symbol-sharp">■</span> <span>${message}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // --- Calculations ---
  function computeTotals() {
    let subtotal = 0;
    state.items.forEach(item => {
      const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);
      subtotal += lineTotal;
    });

    let discount = 0;
    const dVal = Number(state.discountValue) || 0;
    if (state.discountType === 'percent') {
      discount = subtotal * (dVal / 100);
    } else {
      discount = dVal;
    }
    if (discount > subtotal) discount = subtotal;

    const taxableAmount = Math.max(0, subtotal - discount);
    const taxTotal = taxableAmount * ((Number(state.taxRate) || 0) / 100);
    const shipping = Number(state.shippingFee) || 0;
    const grandTotal = Math.max(0, taxableAmount + taxTotal + shipping);
    const paid = Number(state.amountPaid) || 0;
    const balanceDue = Math.max(0, grandTotal - paid);

    return { subtotal, discount, taxTotal, shipping, grandTotal, paid, balanceDue };
  }

  // --- Screen Navigation: Landing Showcase vs. Workspace ---
  function showLandingScreen() {
    el.landingScreen.style.display = 'flex';
    el.workspaceScreen.style.display = 'none';
    window.scrollTo(0, 0);
  }

  function showWorkspaceScreen() {
    el.landingScreen.style.display = 'none';
    el.workspaceScreen.style.display = 'block';
    window.scrollTo(0, 0);
  }

  // --- Render Landing Showcase Cards ---
  function renderLandingShowcase(categoryFilter = 'all') {
    el.showcaseGrid.innerHTML = '';

    Object.keys(PRESETS).forEach(key => {
      const p = PRESETS[key];
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return;

      const card = document.createElement('div');
      card.className = 'showcase-card';

      // Layout Archetype display name
      const archLabels = {
        swiss: 'SWISS MINIMAL GRID',
        band: 'MODERN HEADER BAND',
        editorial: 'EDITORIAL STARK LEFT',
        ledger: 'FRAMED LEDGER'
      };

      const archName = archLabels[p.archetype] || 'SWISS GRID';

      card.innerHTML = `
        <div class="sc-header">
          <span class="sc-badge-layout">${archName}</span>
          <span class="sc-color-pill" style="background-color: ${p.accentColor};" title="Accent Color"></span>
        </div>
        <div class="sc-body">
          <div class="sc-mini-mockup">
            ${p.archetype === 'band' ? `<div style="height:14px;background:${p.accentColor};margin:-8px -8px 6px -8px;"></div>` : ''}
            ${p.archetype === 'editorial' ? `<div style="border-left:3px solid ${p.accentColor};height:100%;margin-left:-4px;padding-left:6px;">` : '<div>'}
            <div style="font-size:7px;font-weight:800;letter-spacing:0.1em;color:#000;">${p.sender.name.substring(0, 26)}</div>
            <div style="height:2px;background:#e5e7eb;margin:4px 0;"></div>
            <div style="display:flex;justify-content:space-between;font-size:6px;color:#6b7280;">
              <span>${p.items[0] ? p.items[0].name.substring(0, 22) : 'Service'}</span>
              <span style="font-weight:700;color:#000;">${p.currencySymbol}${p.items[0] ? p.items[0].rate : '0'}</span>
            </div>
            ${p.archetype === 'editorial' ? '</div>' : '</div>'}
          </div>

          <h3 class="sc-title">${p.templateName}</h3>
          <p class="sc-desc">${p.sender.name} • ${p.items.length} Pre-configured line items</p>
          <ul class="sc-features">
            <li>• Terms: ${p.paymentTerms}</li>
            <li>• Currency: ${p.currency} (${p.currencySymbol})</li>
            <li>• Tax: ${p.taxRate}%</li>
          </ul>
        </div>
        <div class="sc-footer">
          <span class="sc-meta font-mono">${p.currencySymbol}${p.currency}</span>
          <button class="btn btn-xs btn-primary launch-builder-btn" data-preset="${key}">
            CUSTOMIZE & LAUNCH →
          </button>
        </div>
      `;

      card.querySelector('.launch-builder-btn').addEventListener('click', () => {
        applyPreset(key);
        showWorkspaceScreen();
        setStep(1);
      });

      el.showcaseGrid.appendChild(card);
    });
  }

  // --- Apply Preset ---
  function applyPreset(key) {
    if (PRESETS[key]) {
      const p = PRESETS[key];
      state = JSON.parse(JSON.stringify(p));
      config.archetype = p.archetype || 'swiss';
      config.accentColor = p.accentColor || '#09090b';

      populateEditorForm();
      updateArchetypeUI();
      updateActiveTemplateUI(key);
      showToast(`Loaded ${state.templateName}`);
    }
  }

  function updateActiveTemplateUI(key) {
    if (el.activeTemplateBadge) {
      el.activeTemplateBadge.textContent = (state.templateName || key).toUpperCase();
    }
    if (el.activeArchetypeLabel) {
      const arch = (config.archetype || 'SWISS').toUpperCase();
      el.activeArchetypeLabel.textContent = `${arch} // ${state.currency}`;
    }
  }

  // --- Stepper Navigation Manager ---
  function setStep(stepNumber) {
    activeStep = parseInt(stepNumber, 10);
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-step'), 10) === activeStep);
    });

    document.querySelectorAll('.step-section').forEach(sec => {
      sec.classList.toggle('active-step', parseInt(sec.getAttribute('data-step-id'), 10) === activeStep);
    });

    if (viewMode === 'stepper') {
      document.getElementById('editorPanel').scrollTop = 0;
    }
  }

  function toggleViewMode() {
    if (viewMode === 'stepper') {
      viewMode = 'all';
      el.editorInner.classList.remove('mode-stepper');
      el.editorInner.classList.add('mode-all');
      el.toggleAllSectionsBtn.textContent = 'COLLAPSE TO STEPS';
      el.toggleAllSectionsBtn.classList.add('active');
    } else {
      viewMode = 'stepper';
      el.editorInner.classList.remove('mode-all');
      el.editorInner.classList.add('mode-stepper');
      el.toggleAllSectionsBtn.textContent = 'EXPAND ALL';
      el.toggleAllSectionsBtn.classList.remove('active');
      setStep(activeStep);
    }
  }

  // --- Populate Editor Form from State ---
  function populateEditorForm() {
    el.invNumber.value = state.invNumber || '';
    el.invStatus.value = state.invStatus || 'PENDING';
    el.invDate.value = state.invDate || getTodayDate();
    el.invDueDate.value = state.invDueDate || getOffsetDate(30);
    el.paymentTerms.value = state.paymentTerms || 'Net 30 Days';
    el.poNumber.value = state.poNumber || '';
    el.currencySelect.value = state.currency || 'USD';

    // Sender
    el.senderName.value = state.sender.name || '';
    el.senderEmail.value = state.sender.email || '';
    el.senderAddress.value = state.sender.address || '';
    el.senderPhone.value = state.sender.phone || '';
    el.senderTaxId.value = state.sender.taxId || '';

    // Client
    el.clientName.value = state.client.name || '';
    el.clientEmail.value = state.client.email || '';
    el.clientAddress.value = state.client.address || '';
    el.clientPhone.value = state.client.phone || '';
    el.clientTaxId.value = state.client.taxId || '';

    // Adjustments
    el.discountValue.value = state.discountValue || 0;
    el.discountType.value = state.discountType || 'fixed';
    el.taxRate.value = state.taxRate !== undefined ? state.taxRate : 10;
    el.shippingFee.value = state.shippingFee || 0;
    el.amountPaid.value = state.amountPaid || 0;

    // Notes & Terms
    el.bankDetails.value = state.bankDetails || '';
    el.invoiceNotes.value = state.invoiceNotes || '';
    el.invoiceTerms.value = state.invoiceTerms || '';

    // Date format
    if (config.dateFormat && el.dateFormatSelect) {
      el.dateFormatSelect.value = config.dateFormat;
    }

    // Logo Configuration in Step 1
    if (state.sender.logo) {
      if (el.logoConfigBox) el.logoConfigBox.style.display = 'block';
      if (el.removeLogoBtn) el.removeLogoBtn.style.display = 'inline-flex';
      if (el.logoOrientationSelect) el.logoOrientationSelect.value = state.sender.logoOrientation || 'horizontal';
      if (el.logoHeightSelect) el.logoHeightSelect.value = state.sender.logoHeight || 65;
      if (el.toggleLogoBorder) el.toggleLogoBorder.checked = !!state.sender.logoBorder;
    } else {
      if (el.logoConfigBox) el.logoConfigBox.style.display = 'none';
      if (el.removeLogoBtn) el.removeLogoBtn.style.display = 'none';
    }

    renderItemsEditorTable();
    applyCustomization();
    renderLivePreview();
  }

  // --- Render Items in Editor Table ---
  function renderItemsEditorTable() {
    el.itemsTableBody.innerHTML = '';
    el.itemCountDisplay.textContent = `[${state.items.length} ${state.items.length === 1 ? 'ITEM' : 'ITEMS'}]`;

    state.items.forEach((item, index) => {
      const tr = document.createElement('tr');
      const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);

      tr.innerHTML = `
        <td class="col-num"><div class="row-index">${String(index + 1).padStart(2, '0')}</div></td>
        <td class="col-desc">
          <input type="text" class="item-desc-input" data-field="name" data-index="${index}" value="${escapeHtml(item.name || '')}" placeholder="Item Title / Deliverable">
          <input type="text" class="item-subdesc-input" data-field="description" data-index="${index}" value="${escapeHtml(item.description || '')}" placeholder="Detailed specification or notes">
        </td>
        <td class="col-qty">
          <input type="number" min="0" step="any" class="input-mono" data-field="qty" data-index="${index}" value="${item.qty}">
        </td>
        <td class="col-rate">
          <input type="number" min="0" step="any" class="input-mono" data-field="rate" data-index="${index}" value="${item.rate}">
        </td>
        <td class="col-tax">
          <input type="number" min="0" max="100" step="any" class="input-mono" data-field="tax" data-index="${index}" value="${item.tax || 0}">
        </td>
        <td class="col-total item-amount-cell">
          ${formatMoney(lineTotal, state.currencySymbol)}
        </td>
        <td class="col-action">
          <button type="button" class="btn-remove-row" data-index="${index}" title="Remove line item">✕</button>
        </td>
      `;

      el.itemsTableBody.appendChild(tr);
    });
  }

  // --- Apply Customization (Layout Archetypes, Accent Colors & Visibility) ---
  function applyCustomization() {
    const sheet = el.invoiceSheet;
    if (!sheet) return;

    // 1. Layout Archetype Class
    sheet.classList.remove('layout-swiss', 'layout-band', 'layout-editorial', 'layout-ledger');
    sheet.classList.add(`layout-${config.archetype || 'swiss'}`);

    // Update Brand Name in Top Band Strip
    if (el.bandBrandName) {
      el.bandBrandName.textContent = state.sender.name || 'YOUR BUSINESS NAME';
    }

    // 2. Dynamic Accent Color CSS Variables
    const accent = config.accentColor || '#09090b';
    sheet.style.setProperty('--sheet-accent', accent);
    sheet.style.setProperty('--sheet-accent-bg', `${accent}14`); // ~8% opacity
    sheet.style.setProperty('--sheet-accent-text', '#ffffff');

    // 3. Column Visibility
    const previewTable = sheet.querySelector('.sheet-table');
    const editorTable = document.getElementById('itemsTable');

    const updateColClass = (hideCondition, className) => {
      [previewTable, editorTable].forEach(tbl => {
        if (!tbl) return;
        if (hideCondition) tbl.classList.add(className);
        else tbl.classList.remove(className);
      });
    };

    updateColClass(!config.colNum, 'hide-col-num');
    updateColClass(!config.colSubdesc, 'hide-col-subdesc');
    updateColClass(!config.colQty, 'hide-col-qty');
    updateColClass(!config.colRate, 'hide-col-rate');
    updateColClass(!config.colTax, 'hide-col-tax');
    updateColClass(!config.colAmount, 'hide-col-amount');

    // 4. Section Visibility
    if (el.sheetLogoContainer) el.sheetLogoContainer.style.display = config.secLogo ? 'flex' : 'none';
    if (el.pSenderContacts) el.pSenderContacts.style.display = config.secSenderContacts ? 'block' : 'none';
    if (el.pSenderTaxId) el.pSenderTaxId.style.display = (config.secSenderTax && state.sender.taxId) ? 'block' : 'none';
    if (el.pClientContact) el.pClientContact.style.display = config.secClientContacts ? 'block' : 'none';
    if (el.pClientTaxId) el.pClientTaxId.style.display = (config.secClientTax && state.client.taxId) ? 'block' : 'none';
    if (el.pCalloutBlock) el.pCalloutBlock.style.display = config.secCallout ? 'flex' : 'none';
    if (el.pBankBlock) el.pBankBlock.style.display = (config.secBank && state.bankDetails) ? 'block' : 'none';
    if (el.pNotesBlock) el.pNotesBlock.style.display = (config.secNotes && state.invoiceNotes) ? 'block' : 'none';
    if (el.pTermsBlock) el.pTermsBlock.style.display = (config.secTerms && state.invoiceTerms) ? 'block' : 'none';
    if (el.pBarcodeBlock) el.pBarcodeBlock.style.display = config.secBarcode ? 'block' : 'none';
    if (el.pSheetFooter) el.pSheetFooter.style.display = config.secFooter ? 'flex' : 'none';

    // 5. Sync Color Controls & Swatches
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-color') === config.accentColor);
    });

    if (el.customColorInput) el.customColorInput.value = config.accentColor;
    if (el.quickCustomColorInput) el.quickCustomColorInput.value = config.accentColor;

    if (el.toggleColNum) el.toggleColNum.checked = config.colNum;
    if (el.toggleColSubdesc) el.toggleColSubdesc.checked = config.colSubdesc;
    if (el.toggleColQty) el.toggleColQty.checked = config.colQty;
    if (el.toggleColRate) el.toggleColRate.checked = config.colRate;
    if (el.toggleColTax) el.toggleColTax.checked = config.colTax;
    if (el.toggleColAmount) el.toggleColAmount.checked = config.colAmount;

    if (el.alignColQty) el.alignColQty.value = config.alignQty || 'right';
    if (el.alignColRate) el.alignColRate.value = config.alignRate || 'right';
    if (el.alignColTax) el.alignColTax.value = config.alignTax || 'right';
    if (el.alignColAmount) el.alignColAmount.value = config.alignAmount || 'right';

    if (el.toggleSecLogo) el.toggleSecLogo.checked = config.secLogo;
    if (el.toggleSecSenderContacts) el.toggleSecSenderContacts.checked = config.secSenderContacts;
    if (el.toggleSecSenderTax) el.toggleSecSenderTax.checked = config.secSenderTax;
    if (el.toggleSecClientContacts) el.toggleSecClientContacts.checked = config.secClientContacts;
    if (el.toggleSecClientTax) el.toggleSecClientTax.checked = config.secClientTax;
    if (el.toggleSecCallout) el.toggleSecCallout.checked = config.secCallout;
    if (el.toggleSecBank) el.toggleSecBank.checked = config.secBank;
    if (el.toggleSecNotes) el.toggleSecNotes.checked = config.secNotes;
    if (el.toggleSecTerms) el.toggleSecTerms.checked = config.secTerms;
    if (el.toggleSecBarcode) el.toggleSecBarcode.checked = config.secBarcode;
    if (el.toggleSecFooter) el.toggleSecFooter.checked = config.secFooter;

    saveConfigToLocalStorage();
  }

  function updateArchetypeUI() {
    if (el.activeArchetypeLabel) {
      const arch = (config.archetype || 'SWISS').toUpperCase();
      el.activeArchetypeLabel.textContent = `${arch} // ${state.currency}`;
    }
  }

  // --- Render Live Preview Sheet ---
  function renderLivePreview() {
    const sym = state.currencySymbol || '$';
    const totals = computeTotals();
    const dFormat = config.dateFormat || 'YYYY-MM-DD';

    // Brand & Issuer Logo (Clean & Borderless for Horizontal/Vertical PNGs)
    const brandBox = el.sheetBrandBox || document.getElementById('sheetBrandBox') || (el.sheetLogoContainer ? el.sheetLogoContainer.parentElement : null);

    if (state.sender.logo) {
      el.sheetLogoContainer.className = `sheet-logo-container ${state.sender.logoBorder ? 'has-border' : ''}`;
      el.sheetLogoContainer.style.setProperty('--logo-height', `${state.sender.logoHeight || 65}px`);
      const orient = state.sender.logoOrientation || 'horizontal';

      // Alignment Logic:
      // When width > height (horizontal): stack logo ON TOP of company name, address in same column (.brand-stacked-col)
      // When height > width (vertical) or square: keep side-by-side without background
      let isWide = false;
      if (orient === 'horizontal') {
        isWide = true;
      } else if (orient === 'vertical' || orient === 'square') {
        isWide = false;
      } else if (state.sender.logoWidth && state.sender.logoHeightActual) {
        isWide = state.sender.logoWidth > state.sender.logoHeightActual;
      }

      if (brandBox) {
        if (isWide) {
          brandBox.classList.add('brand-stacked-col');
        } else {
          brandBox.classList.remove('brand-stacked-col');
        }
      }

      el.sheetLogoContainer.innerHTML = `<img src="${state.sender.logo}" alt="Logo" class="sheet-logo-img orientation-${orient}">`;
    } else {
      if (brandBox) {
        brandBox.classList.remove('brand-stacked-col');
      }
      el.sheetLogoContainer.className = 'sheet-logo-container';
      el.sheetLogoContainer.innerHTML = `<div class="sharp-monogram-box"><span class="sharp-monogram">${getMonogram(state.sender.name)}</span></div>`;
    }

    el.pSenderName.textContent = state.sender.name || 'YOUR BUSINESS NAME';
    el.pSenderAddress.textContent = state.sender.address || '';
    
    const contactParts = [];
    if (state.sender.email) contactParts.push(state.sender.email);
    if (state.sender.phone) contactParts.push(state.sender.phone);
    el.pSenderContacts.textContent = contactParts.join(' | ');

    if (state.sender.taxId && config.secSenderTax) {
      el.pSenderTaxId.textContent = `TAX ID: ${state.sender.taxId}`;
      el.pSenderTaxId.style.display = 'block';
    } else {
      el.pSenderTaxId.style.display = 'none';
    }

    // Invoice Meta & Formatted Dates
    el.pInvNumber.textContent = state.invNumber || 'INV-0000';
    el.pInvDate.textContent = formatDateString(state.invDate, dFormat);
    el.pInvDueDate.textContent = formatDateString(state.invDueDate, dFormat);
    el.pPaymentTerms.textContent = state.paymentTerms || '-';

    // Status Badge
    el.pStatusBadge.textContent = state.invStatus || 'DRAFT';
    el.pStatusBadge.className = `meta-badge-status status-${(state.invStatus || 'draft').toLowerCase()}`;

    // PO Row
    if (state.poNumber && state.poNumber.trim()) {
      el.pPoNumber.textContent = state.poNumber;
      el.pPoRow.style.display = 'table-row';
    } else {
      el.pPoRow.style.display = 'none';
    }

    // Client
    el.pClientName.textContent = state.client.name || 'CLIENT / COMPANY NAME';
    el.pClientAddress.textContent = state.client.address || '';
    
    const clientContactParts = [];
    if (state.client.email) clientContactParts.push(state.client.email);
    if (state.client.phone) clientContactParts.push(state.client.phone);
    el.pClientContact.textContent = clientContactParts.join(' | ');

    if (state.client.taxId && config.secClientTax) {
      el.pClientTaxId.textContent = `TAX ID: ${state.client.taxId}`;
      el.pClientTaxId.style.display = 'block';
    } else {
      el.pClientTaxId.style.display = 'none';
    }

    // Callout box
    el.pBalanceCallout.textContent = formatMoney(totals.balanceDue, sym);
    el.pDueDateNotice.textContent = `DUE BY ${formatDateString(state.invDueDate, dFormat)}`;

    // Items table on paper
    el.pItemsTableBody.innerHTML = '';
    state.items.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);

      const qtyAlign = config.alignQty === 'center' ? 'text-center' : 'text-right';
      const rateAlign = config.alignRate === 'center' ? 'text-center' : 'text-right';
      const taxAlign = config.alignTax === 'center' ? 'text-center' : 'text-right';

      tr.innerHTML = `
        <td class="st-num st-col-num font-mono text-center">${String(idx + 1).padStart(2, '0')}</td>
        <td class="st-desc st-col-desc">
          <div class="sheet-item-title">${escapeHtml(item.name || 'Untitled Deliverable')}</div>
          ${item.description ? `<div class="sheet-item-subtitle font-mono">${escapeHtml(item.description)}</div>` : ''}
        </td>
        <td class="st-qty st-col-qty font-mono ${qtyAlign}">${item.qty}</td>
        <td class="st-rate st-col-rate font-mono ${rateAlign}">${formatMoney(item.rate, sym)}</td>
        <td class="st-tax st-col-tax font-mono ${taxAlign}">${item.tax || 0}%</td>
        <td class="st-total st-col-total text-right font-mono font-bold">${formatMoney(lineTotal, sym)}</td>
      `;
      el.pItemsTableBody.appendChild(tr);
    });

    // Notes, Terms & Bank Instructions
    if (state.bankDetails && state.bankDetails.trim() && config.secBank) {
      el.pBankDetails.textContent = state.bankDetails;
      el.pBankBlock.style.display = 'block';
    } else {
      el.pBankBlock.style.display = 'none';
    }

    if (state.invoiceNotes && state.invoiceNotes.trim() && config.secNotes) {
      el.pInvoiceNotes.textContent = state.invoiceNotes;
      el.pNotesBlock.style.display = 'block';
    } else {
      el.pNotesBlock.style.display = 'none';
    }

    if (state.invoiceTerms && state.invoiceTerms.trim() && config.secTerms) {
      el.pInvoiceTerms.textContent = state.invoiceTerms;
      el.pTermsBlock.style.display = 'block';
    } else {
      el.pTermsBlock.style.display = 'none';
    }

    // Calculations in preview
    el.pSubtotal.textContent = formatMoney(totals.subtotal, sym);
    el.subtotalDisplay.textContent = formatMoney(totals.subtotal, sym);

    // Discount
    if (totals.discount > 0) {
      el.pDiscount.textContent = `-${formatMoney(totals.discount, sym)}`;
      el.pDiscountRow.style.display = 'table-row';
      el.discountTotalDisplay.textContent = `-${formatMoney(totals.discount, sym)}`;
    } else {
      el.pDiscountRow.style.display = 'none';
      el.discountTotalDisplay.textContent = formatMoney(0, sym);
    }

    // Tax
    if (totals.taxTotal > 0 || state.taxRate > 0) {
      el.pTaxPercent.textContent = `${state.taxRate || 0}%`;
      el.pTax.textContent = `+${formatMoney(totals.taxTotal, sym)}`;
      el.pTaxRow.style.display = 'table-row';
      el.taxTotalDisplay.textContent = `+${formatMoney(totals.taxTotal, sym)}`;
    } else {
      el.pTaxRow.style.display = 'none';
      el.taxTotalDisplay.textContent = formatMoney(0, sym);
    }

    // Shipping
    if (totals.shipping > 0) {
      el.pShipping.textContent = `+${formatMoney(totals.shipping, sym)}`;
      el.pShippingRow.style.display = 'table-row';
      el.shippingDisplay.textContent = `+${formatMoney(totals.shipping, sym)}`;
    } else {
      el.pShippingRow.style.display = 'none';
      el.shippingDisplay.textContent = formatMoney(0, sym);
    }

    // Grand Total
    el.pGrandTotal.textContent = formatMoney(totals.grandTotal, sym);
    el.grandTotalDisplay.textContent = formatMoney(totals.grandTotal, sym);

    // Paid & Balance
    if (totals.paid > 0) {
      el.pAmountPaid.textContent = formatMoney(totals.paid, sym);
      el.pPaidRow.style.display = 'table-row';
      el.amountPaidDisplay.textContent = formatMoney(totals.paid, sym);
    } else {
      el.pPaidRow.style.display = 'none';
      el.amountPaidDisplay.textContent = formatMoney(0, sym);
    }

    el.pBalanceDue.textContent = formatMoney(totals.balanceDue, sym);
    el.balanceDueDisplay.textContent = formatMoney(totals.balanceDue, sym);

    // Footer timestamp
    el.pFooterTimestamp.textContent = `GENERATED: ${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC`;

    // Persist current draft
    saveDraftToLocalStorage();
  }

  // --- Auto-Save Draft & Config ---
  function saveDraftToLocalStorage() {
    try {
      localStorage.setItem('vertex_invoice_draft', JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  function saveConfigToLocalStorage() {
    try {
      localStorage.setItem('vertex_config', JSON.stringify(config));
    } catch (e) {
      console.warn('Config save failed:', e);
    }
  }

  function loadDraftFromLocalStorage() {
    try {
      const savedCfg = localStorage.getItem('vertex_config');
      if (savedCfg) {
        config = { ...DEFAULT_CONFIG, ...JSON.parse(savedCfg) };
      }
      const saved = localStorage.getItem('vertex_invoice_draft');
      if (saved) {
        state = JSON.parse(saved);
        return true;
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
    return false;
  }

  // --- Saved Invoices Archive Management ---
  function getSavedInvoices() {
    try {
      const raw = localStorage.getItem('vertex_saved_archive');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveInvoiceToArchive() {
    const list = getSavedInvoices();
    const existingIndex = list.findIndex(i => i.invNumber === state.invNumber);
    const invoiceRecord = {
      ...JSON.parse(JSON.stringify(state)),
      config: JSON.parse(JSON.stringify(config)),
      savedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      list[existingIndex] = invoiceRecord;
      showToast(`Updated invoice ${state.invNumber}`);
    } else {
      list.unshift(invoiceRecord);
      showToast(`Saved invoice ${state.invNumber} to archive`);
    }

    localStorage.setItem('vertex_saved_archive', JSON.stringify(list));
    updateSavedCounter();
  }

  function updateSavedCounter() {
    const count = getSavedInvoices().length;
    el.savedCountBadge.textContent = count;
  }

  function renderSavedTable(filter = '') {
    const list = getSavedInvoices();
    el.savedTableBody.innerHTML = '';

    const filtered = list.filter(item => {
      const query = filter.toLowerCase();
      const numMatch = (item.invNumber || '').toLowerCase().includes(query);
      const clientMatch = (item.client && item.client.name ? item.client.name.toLowerCase() : '').includes(query);
      return numMatch || clientMatch;
    });

    if (filtered.length === 0) {
      el.savedEmptyState.style.display = 'block';
      return;
    }

    el.savedEmptyState.style.display = 'none';

    filtered.forEach((inv, index) => {
      const totals = (() => {
        let sub = 0;
        (inv.items || []).forEach(it => {
          sub += (Number(it.qty) || 0) * (Number(it.rate) || 0);
        });
        const disc = inv.discountType === 'percent' ? sub * (inv.discountValue / 100) : (inv.discountValue || 0);
        const tax = Math.max(0, sub - disc) * ((inv.taxRate || 0) / 100);
        return Math.max(0, sub - disc + tax + (inv.shippingFee || 0));
      })();

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-bold">${inv.invNumber}</td>
        <td>${inv.client ? escapeHtml(inv.client.name) : '-'}</td>
        <td>${inv.invDate || '-'}</td>
        <td>${inv.invDueDate || '-'}</td>
        <td><span class="meta-badge-status status-${(inv.invStatus || 'draft').toLowerCase()}">${inv.invStatus || 'DRAFT'}</span></td>
        <td class="text-right font-bold">${formatMoney(totals, inv.currencySymbol)}</td>
        <td class="text-right">
          <button class="btn btn-xs btn-primary load-inv-btn" data-index="${index}">LOAD</button>
          <button class="btn btn-xs btn-outline duplicate-inv-btn" data-index="${index}">CLONE</button>
          <button class="btn btn-xs btn-ghost text-danger delete-inv-btn" data-index="${index}">✕</button>
        </td>
      `;

      tr.querySelector('.load-inv-btn').addEventListener('click', () => {
        state = JSON.parse(JSON.stringify(inv));
        if (inv.config) config = { ...DEFAULT_CONFIG, ...inv.config };
        populateEditorForm();
        el.savedModalBackdrop.classList.remove('show');
        showWorkspaceScreen();
        showToast(`Loaded invoice ${inv.invNumber}`);
      });

      tr.querySelector('.duplicate-inv-btn').addEventListener('click', () => {
        const copy = JSON.parse(JSON.stringify(inv));
        copy.invNumber = generateInvoiceNumber();
        copy.invDate = getTodayDate();
        copy.invDueDate = getOffsetDate(30);
        copy.invStatus = 'DRAFT';
        state = copy;
        populateEditorForm();
        saveInvoiceToArchive();
        renderSavedTable(el.searchSavedInput.value);
        showToast(`Cloned as ${copy.invNumber}`);
      });

      tr.querySelector('.delete-inv-btn').addEventListener('click', () => {
        if (confirm(`Delete invoice ${inv.invNumber} from local archive?`)) {
          const all = getSavedInvoices();
          const targetNum = inv.invNumber;
          const remaining = all.filter(item => item.invNumber !== targetNum);
          localStorage.setItem('vertex_saved_archive', JSON.stringify(remaining));
          updateSavedCounter();
          renderSavedTable(el.searchSavedInput.value);
          showToast(`Deleted invoice ${targetNum}`, 'danger');
        }
      });

      el.savedTableBody.appendChild(tr);
    });
  }

  // --- Attach Event Listeners ---
  function initEventListeners() {
    // Navigation between Landing & Workspace
    el.backToLandingBtn.addEventListener('click', () => {
      showLandingScreen();
    });

    el.landingStartBlankBtn.addEventListener('click', () => {
      resetToBlank();
      showWorkspaceScreen();
      setStep(1);
    });

    // Category Tabs in Landing Screen
    if (el.categoryFilterBar) {
      el.categoryFilterBar.addEventListener('click', (e) => {
        const catBtn = e.target.closest('.cat-btn');
        if (catBtn) {
          document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
          catBtn.classList.add('active');
          renderLandingShowcase(catBtn.getAttribute('data-cat'));
        }
      });
    }

    // UI Font Size Switcher (Normal / Large)
    el.uiFontNormalBtn.addEventListener('click', () => {
      document.body.classList.remove('ui-large');
      el.uiFontNormalBtn.classList.add('active');
      el.uiFontLargeBtn.classList.remove('active');
      localStorage.setItem('vertex_ui_font_size', 'normal');
    });

    el.uiFontLargeBtn.addEventListener('click', () => {
      document.body.classList.add('ui-large');
      el.uiFontLargeBtn.classList.add('active');
      el.uiFontNormalBtn.classList.remove('active');
      localStorage.setItem('vertex_ui_font_size', 'large');
    });

    // Layout switcher
    el.viewSplitBtn.addEventListener('click', () => {
      setLayoutMode('split-view');
      setActiveViewBtn(el.viewSplitBtn);
    });
    el.viewEditBtn.addEventListener('click', () => {
      setLayoutMode('edit-only');
      setActiveViewBtn(el.viewEditBtn);
    });
    el.viewPreviewBtn.addEventListener('click', () => {
      setLayoutMode('preview-only');
      setActiveViewBtn(el.viewPreviewBtn);
    });

    function setLayoutMode(mode) {
      el.appLayout.className = `app-layout ${mode}`;
    }

    function setActiveViewBtn(btn) {
      [el.viewSplitBtn, el.viewEditBtn, el.viewPreviewBtn].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    // Stepper Navigation
    el.stepperBar.addEventListener('click', (e) => {
      const stepBtn = e.target.closest('.step-btn');
      if (stepBtn) {
        setStep(stepBtn.getAttribute('data-step'));
      }
    });

    el.toggleAllSectionsBtn.addEventListener('click', toggleViewMode);

    // Prev / Next Step Buttons
    document.querySelectorAll('.next-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setStep(btn.getAttribute('data-target-step'));
      });
    });

    document.querySelectorAll('.prev-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setStep(btn.getAttribute('data-target-step'));
      });
    });

    // Reset Blank
    function resetToBlank() {
      state = {
        templateKey: 'blank',
        templateName: 'BLANK CUSTOM',
        invNumber: generateInvoiceNumber(),
        invStatus: 'DRAFT',
        invDate: getTodayDate(),
        invDueDate: getOffsetDate(14),
        paymentTerms: 'Net 15 Days',
        poNumber: '',
        currency: 'USD',
        currencySymbol: '$',
        sender: { name: '', email: '', address: '', phone: '', taxId: '', logo: null },
        client: { name: '', email: '', address: '', phone: '', taxId: '' },
        items: [{ id: 1, name: '', description: '', qty: 1, rate: 0, tax: 0 }],
        discountValue: 0,
        discountType: 'fixed',
        taxRate: 0,
        shippingFee: 0,
        amountPaid: 0,
        bankDetails: '',
        invoiceNotes: '',
        invoiceTerms: ''
      };
      config.archetype = 'swiss';
      config.accentColor = '#09090b';
      populateEditorForm();
      updateArchetypeUI();
      showToast('Initialized blank invoice template');
    }

    el.resetBlankBtn.addEventListener('click', () => {
      if (confirm('Reset to an empty invoice? Current unsaved edits will be cleared.')) {
        resetToBlank();
      }
    });

    // Generate new Invoice Number
    el.regenInvNumberBtn.addEventListener('click', () => {
      const newNum = generateInvoiceNumber();
      el.invNumber.value = newNum;
      state.invNumber = newNum;
      renderLivePreview();
      showToast(`Generated: ${newNum}`);
    });

    // Theme Toggle (Supports both landing and workspace buttons)
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.querySelectorAll('.theme-icon').forEach(icon => {
          icon.textContent = newTheme === 'dark' ? '☼' : '☾';
        });
        localStorage.setItem('vertex_theme', newTheme);
      });
    });

    // Sync input changes
    const syncField = (inputEl, stateKey, subKey = null) => {
      if (!inputEl) return;
      inputEl.addEventListener('input', () => {
        if (subKey) {
          state[stateKey][subKey] = inputEl.value;
        } else {
          state[stateKey] = inputEl.value;
        }
        renderLivePreview();
      });
    };

    syncField(el.invNumber, 'invNumber');
    syncField(el.invStatus, 'invStatus');
    syncField(el.invDate, 'invDate');
    syncField(el.invDueDate, 'invDueDate');
    syncField(el.paymentTerms, 'paymentTerms');
    syncField(el.poNumber, 'poNumber');

    syncField(el.senderName, 'sender', 'name');
    syncField(el.senderEmail, 'sender', 'email');
    syncField(el.senderAddress, 'sender', 'address');
    syncField(el.senderPhone, 'sender', 'phone');
    syncField(el.senderTaxId, 'sender', 'taxId');

    syncField(el.clientName, 'client', 'name');
    syncField(el.clientEmail, 'client', 'email');
    syncField(el.clientAddress, 'client', 'address');
    syncField(el.clientPhone, 'client', 'phone');
    syncField(el.clientTaxId, 'client', 'taxId');

    syncField(el.discountValue, 'discountValue');
    syncField(el.discountType, 'discountType');
    syncField(el.taxRate, 'taxRate');
    syncField(el.shippingFee, 'shippingFee');
    syncField(el.amountPaid, 'amountPaid');

    syncField(el.bankDetails, 'bankDetails');
    syncField(el.invoiceNotes, 'invoiceNotes');
    syncField(el.invoiceTerms, 'invoiceTerms');

    // Date Format Selector
    if (el.dateFormatSelect) {
      el.dateFormatSelect.addEventListener('change', () => {
        config.dateFormat = el.dateFormatSelect.value;
        renderLivePreview();
        saveConfigToLocalStorage();
      });
    }

    // Quick Date Chip Buttons
    if (el.dateTodayBtn) {
      el.dateTodayBtn.addEventListener('click', () => {
        const today = getTodayDate();
        el.invDate.value = today;
        state.invDate = today;
        renderLivePreview();
      });
    }

    if (el.date1stMonthBtn) {
      el.date1stMonthBtn.addEventListener('click', () => {
        const d = new Date();
        const first = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        el.invDate.value = first;
        state.invDate = first;
        renderLivePreview();
      });
    }

    document.querySelectorAll('[data-offset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const offset = parseInt(btn.getAttribute('data-offset'), 10);
        const targetDate = getOffsetDate(offset);
        el.invDueDate.value = targetDate;
        state.invDueDate = targetDate;
        renderLivePreview();
      });
    });

    // Currency Switcher
    el.currencySelect.addEventListener('change', () => {
      const selectedOpt = el.currencySelect.options[el.currencySelect.selectedIndex];
      state.currency = selectedOpt.value;
      state.currencySymbol = selectedOpt.getAttribute('data-symbol') || '$';
      renderItemsEditorTable();
      renderLivePreview();
      updateArchetypeUI();
    });

    // Clear Client Button
    el.clearClientBtn.addEventListener('click', () => {
      state.client = { name: '', email: '', address: '', phone: '', taxId: '' };
      el.clientName.value = '';
      el.clientEmail.value = '';
      el.clientAddress.value = '';
      el.clientPhone.value = '';
      el.clientTaxId.value = '';
      renderLivePreview();
      showToast('Cleared client details');
    });

    // Custom Logo File Upload (Supports horizontal, vertical, square transparent PNGs)
    el.logoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          const img = new Image();
          img.onload = () => {
            const isWide = img.naturalWidth > img.naturalHeight;
            state.sender.logo = dataUrl;
            state.sender.logoWidth = img.naturalWidth;
            state.sender.logoHeightActual = img.naturalHeight;
            // Automatic alignment detection:
            // When width > height: orient as horizontal (stacked on top of name in same column)
            // When height >= width: orient as vertical (side-by-side without background)
            state.sender.logoOrientation = isWide ? 'horizontal' : 'vertical';
            state.sender.logoHeight = isWide ? 60 : 75;
            state.sender.logoBorder = false; // strictly default to borderless

            if (el.logoOrientationSelect) {
              el.logoOrientationSelect.value = state.sender.logoOrientation;
            }
            if (el.logoHeightSelect) {
              el.logoHeightSelect.value = String(state.sender.logoHeight);
            }
            if (el.logoConfigBox) el.logoConfigBox.style.display = 'block';
            if (el.removeLogoBtn) el.removeLogoBtn.style.display = 'inline-flex';

            renderLivePreview();
            showToast(isWide 
              ? 'Wide logo (width > height): Stacks on top of name in single column' 
              : 'Tall logo (height > width): Side-by-side with name without background');
          };
          img.src = dataUrl;
        };
        reader.readAsDataURL(file);
      }
    });

    if (el.removeLogoBtn) {
      el.removeLogoBtn.addEventListener('click', () => {
        state.sender.logo = null;
        el.logoUploadInput.value = '';
        if (el.logoConfigBox) el.logoConfigBox.style.display = 'none';
        if (el.removeLogoBtn) el.removeLogoBtn.style.display = 'none';
        renderLivePreview();
        showToast('Logo removed (monogram restored)');
      });
    }

    if (el.logoOrientationSelect) {
      el.logoOrientationSelect.addEventListener('change', () => {
        state.sender.logoOrientation = el.logoOrientationSelect.value;
        renderLivePreview();
      });
    }

    if (el.logoHeightSelect) {
      el.logoHeightSelect.addEventListener('change', () => {
        state.sender.logoHeight = parseInt(el.logoHeightSelect.value, 10);
        renderLivePreview();
      });
    }

    if (el.toggleLogoBorder) {
      el.toggleLogoBorder.addEventListener('change', () => {
        state.sender.logoBorder = el.toggleLogoBorder.checked;
        renderLivePreview();
      });
    }

    // Line items input delegation
    el.itemsTableBody.addEventListener('input', (e) => {
      const target = e.target;
      const index = target.getAttribute('data-index');
      const field = target.getAttribute('data-field');

      if (index !== null && field) {
        state.items[index][field] = target.value;
        const row = target.closest('tr');
        if (row) {
          const qty = Number(state.items[index].qty) || 0;
          const rate = Number(state.items[index].rate) || 0;
          const totalCell = row.querySelector('.item-amount-cell');
          if (totalCell) {
            totalCell.textContent = formatMoney(qty * rate, state.currencySymbol);
          }
        }
        renderLivePreview();
      }
    });

    // Remove line item
    el.itemsTableBody.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-row');
      if (btn) {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        if (state.items.length <= 1) {
          showToast('Invoice must contain at least 1 item', 'danger');
          return;
        }
        state.items.splice(index, 1);
        renderItemsEditorTable();
        renderLivePreview();
      }
    });

    // Add line item buttons
    const addNewLineItem = () => {
      const newItem = {
        id: Date.now(),
        name: 'New Line Item Deliverable',
        description: 'Specification and scope description',
        qty: 1,
        rate: 100,
        tax: state.taxRate || 0
      };
      state.items.push(newItem);
      renderItemsEditorTable();
      renderLivePreview();

      setTimeout(() => {
        const inputs = el.itemsTableBody.querySelectorAll('.item-desc-input');
        if (inputs.length) {
          inputs[inputs.length - 1].focus();
          inputs[inputs.length - 1].select();
        }
      }, 50);
    };

    el.addItemBtn.addEventListener('click', addNewLineItem);
    el.addItemTopBtn.addEventListener('click', addNewLineItem);

    el.clearAllItemsBtn.addEventListener('click', () => {
      if (confirm('Clear all line items?')) {
        state.items = [{ id: Date.now(), name: '', description: '', qty: 1, rate: 0, tax: 0 }];
        renderItemsEditorTable();
        renderLivePreview();
      }
    });

    // ==========================================
    // STEP 5: ARCHETYPE, ACCENT COLOR & TOGGLES
    // ==========================================
    // Archetype selector buttons
    document.querySelectorAll('[data-archetype]').forEach(btn => {
      btn.addEventListener('click', () => {
        config.archetype = btn.getAttribute('data-archetype');
        applyCustomization();
        updateArchetypeUI();
        showToast(`Layout changed to ${config.archetype.toUpperCase()}`);
      });
    });

    // Color Swatch buttons (works for both persistent top bar and Step 5)
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        config.accentColor = btn.getAttribute('data-color');
        applyCustomization();
        renderLivePreview();
        showToast(`Invoice color set to ${config.accentColor}`);
      });
    });

    // Custom Color Inputs (sync top bar & Step 5)
    const updateAccentColor = (newColor) => {
      config.accentColor = newColor;
      applyCustomization();
      renderLivePreview();
    };

    if (el.customColorInput) {
      el.customColorInput.addEventListener('input', () => updateAccentColor(el.customColorInput.value));
    }

    if (el.quickCustomColorInput) {
      el.quickCustomColorInput.addEventListener('input', () => updateAccentColor(el.quickCustomColorInput.value));
    }

    // Column Toggles
    const bindToggle = (chkEl, key) => {
      if (!chkEl) return;
      chkEl.addEventListener('change', () => {
        config[key] = chkEl.checked;
        applyCustomization();
        renderLivePreview();
      });
    };

    bindToggle(el.toggleColNum, 'colNum');
    bindToggle(el.toggleColSubdesc, 'colSubdesc');
    bindToggle(el.toggleColQty, 'colQty');
    bindToggle(el.toggleColRate, 'colRate');
    bindToggle(el.toggleColTax, 'colTax');
    bindToggle(el.toggleColAmount, 'colAmount');

    bindToggle(el.toggleSecLogo, 'secLogo');
    bindToggle(el.toggleSecSenderContacts, 'secSenderContacts');
    bindToggle(el.toggleSecSenderTax, 'secSenderTax');
    bindToggle(el.toggleSecClientContacts, 'secClientContacts');
    bindToggle(el.toggleSecClientTax, 'secClientTax');
    bindToggle(el.toggleSecCallout, 'secCallout');
    bindToggle(el.toggleSecBank, 'secBank');
    bindToggle(el.toggleSecNotes, 'secNotes');
    bindToggle(el.toggleSecTerms, 'secTerms');
    bindToggle(el.toggleSecBarcode, 'secBarcode');
    bindToggle(el.toggleSecFooter, 'secFooter');

    // Alignment controls
    const bindAlign = (selectEl, key) => {
      if (!selectEl) return;
      selectEl.addEventListener('change', () => {
        config[key] = selectEl.value;
        renderLivePreview();
        saveConfigToLocalStorage();
      });
    };

    bindAlign(el.alignColQty, 'alignQty');
    bindAlign(el.alignColRate, 'alignRate');
    bindAlign(el.alignColTax, 'alignTax');
    bindAlign(el.alignColAmount, 'alignAmount');

    if (el.resetVisibilityBtn) {
      el.resetVisibilityBtn.addEventListener('click', () => {
        config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        applyCustomization();
        renderLivePreview();
        showToast('Reset styles and visibility to defaults');
      });
    }

    // Save Draft Button
    el.saveDraftBtn.addEventListener('click', () => {
      saveInvoiceToArchive();
    });

    // Saved Invoices Modal
    el.savedInvoicesBtn.addEventListener('click', () => {
      renderSavedTable();
      el.savedModalBackdrop.classList.add('show');
    });

    el.closeSavedModalBtn.addEventListener('click', () => {
      el.savedModalBackdrop.classList.remove('show');
    });

    el.savedModalBackdrop.addEventListener('click', (e) => {
      if (e.target === el.savedModalBackdrop) {
        el.savedModalBackdrop.classList.remove('show');
      }
    });

    el.searchSavedInput.addEventListener('input', () => {
      renderSavedTable(el.searchSavedInput.value);
    });

    // Export all saved invoices to JSON
    el.exportAllJsonBtn.addEventListener('click', () => {
      const data = getSavedInvoices();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vertex_invoices_backup_${getTodayDate()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported JSON archive backup');
    });

    // Import JSON file
    el.importJsonInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
              localStorage.setItem('vertex_saved_archive', JSON.stringify(imported));
              updateSavedCounter();
              renderSavedTable();
              showToast(`Imported ${imported.length} invoices from backup`);
            } else {
              showToast('Invalid backup JSON format', 'danger');
            }
          } catch (err) {
            showToast('Failed to parse JSON file', 'danger');
          }
        };
        reader.readAsText(file);
      }
    });

    // Print & PDF trigger
    const triggerPrint = () => {
      window.print();
    };

    el.printInvoiceBtn.addEventListener('click', triggerPrint);
    el.previewPrintBtn.addEventListener('click', triggerPrint);
    if (el.finishAndPrintBtn) el.finishAndPrintBtn.addEventListener('click', triggerPrint);

    // Zoom Controls
    const setZoom = (level) => {
      zoomLevel = Math.max(0.6, Math.min(1.5, level));
      el.invoiceSheet.style.transform = `scale(${zoomLevel})`;
      el.zoomLevelDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
    };

    el.zoomInBtn.addEventListener('click', () => setZoom(zoomLevel + 0.1));
    el.zoomOutBtn.addEventListener('click', () => setZoom(zoomLevel - 0.1));
    el.zoomResetBtn.addEventListener('click', () => setZoom(1.0));

    // ==========================================
    // PWA & CHROME APP INSTALLATION LOGIC
    // ==========================================
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      console.log('beforeinstallprompt captured: Ready to install as Chrome App');
    });

    const triggerInstallApp = () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('VERTEX installed as Chrome App!');
          }
          deferredInstallPrompt = null;
        });
      } else {
        // Open the guide modal explaining how to install via browser address bar or menu
        el.installGuideModalBackdrop.classList.add('show');
      }
    };

    if (el.landingInstallBtn) el.landingInstallBtn.addEventListener('click', triggerInstallApp);
    if (el.headerInstallBtn) el.headerInstallBtn.addEventListener('click', triggerInstallApp);

    if (el.closeInstallGuideBtn) {
      el.closeInstallGuideBtn.addEventListener('click', () => {
        el.installGuideModalBackdrop.classList.remove('show');
      });
    }

    if (el.installGuideModalBackdrop) {
      el.installGuideModalBackdrop.addEventListener('click', (e) => {
        if (e.target === el.installGuideModalBackdrop) {
          el.installGuideModalBackdrop.classList.remove('show');
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        triggerPrint();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveInvoiceToArchive();
      }
    });
  }

  // --- Register Service Worker for PWA Offline / Chrome App ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('Service Worker Registered successfully:', reg.scope))
        .catch((err) => console.log('Service Worker registration skipped:', err));
    }
  }

  // --- Initialize Application ---
  function init() {
    // Theme
    const savedTheme = localStorage.getItem('vertex_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.textContent = savedTheme === 'dark' ? '☼' : '☾';
      });
    }

    // UI Font Size
    const savedFontSize = localStorage.getItem('vertex_ui_font_size');
    if (savedFontSize === 'large') {
      document.body.classList.add('ui-large');
      el.uiFontLargeBtn.classList.add('active');
      el.uiFontNormalBtn.classList.remove('active');
    }

    // Render Landing Showcase
    renderLandingShowcase('all');

    // Load saved draft and configuration
    const loaded = loadDraftFromLocalStorage();
    populateEditorForm();
    updateSavedCounter();
    initEventListeners();
    registerServiceWorker();

    // If first load without existing draft, show landing page to pick template!
    if (!loaded) {
      saveInvoiceToArchive();
      showLandingScreen();
    } else {
      // If user had an active draft, go straight to workspace
      showWorkspaceScreen();
      setStep(1);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
