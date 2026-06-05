import { useState, useEffect } from "react";

// ─── SVG Icon Library ───────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.7 }) => {
  const icons = {
    // Nav
    home: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></>,
    pill: <><rect x="3.5" y="9.5" width="17" height="5" rx="2.5" transform="rotate(-45 12 12)"/><line x1="9.17" y1="14.83" x2="14.83" y2="9.17"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
    moon: <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    check: <><polyline points="20 6 9 12 4 10"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    starFilled: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/></>,
    // Categories
    analgesic: <><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/><path d="M8 12h8M12 8v8"/></>,
    antibiotic: <><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    stomach: <><path d="M12 2C6.48 2 2 6.48 2 12c0 2.76 1.12 5.26 2.93 7.07C6.74 20.88 9.24 22 12 22s5.26-1.12 7.07-2.93C20.88 17.26 22 14.76 22 12c0-5.52-4.48-10-10-10z"/><path d="M8 10s.5-2 2.5-2 3 2 5 2 2.5-2 2.5-2"/><path d="M8 14s.5 2 2.5 2 3-2 5-2 2.5 2 2.5 2"/></>,
    lungs: <><path d="M12 3v9"/><path d="M6 6.5C4 7.5 2 9.5 2 13c0 4.5 3.5 7 6 7 1.5 0 3-1 4-2"/><path d="M18 6.5c2 1 4 3 4 6.5 0 4.5-3.5 7-6 7-1.5 0-3-1-4-2"/><path d="M8.5 9C8.5 9 9 12 12 12s3.5-3 3.5-3"/></>,
    drop: <><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></>,
    bolt: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    skin: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/><path d="M12 8v4M12 16h.01"/></>,
    brain: <><path d="M9.5 2a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z"/><path d="M6 7.5A2.5 2.5 0 003.5 10v1A2.5 2.5 0 006 13.5h.5"/><path d="M18 7.5a2.5 2.5 0 012.5 2.5v1A2.5 2.5 0 0118 13.5h-.5"/><path d="M9 13.5v6a1.5 1.5 0 003 0v-6"/><path d="M12 13.5v6a1.5 1.5 0 003 0v-6"/><path d="M9.5 7h5"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    leaf: <><path d="M17 8C8 10 5.9 16.17 3.82 19.82a1 1 0 001.59 1.21C7.27 19.1 9.8 17 13 17c4 0 6-3 6-7 0 0 1-9-9-9z"/><path d="M3 22c0 0 3-4 6-4"/></>,
    // Settings icons
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    type: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    helpCircle: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    // Reimbursement
    shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
    shieldX: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></>,
    // Card
    rx: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h4"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    // Logo cross
    cross: <><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></>,
    price: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    flask: <><path d="M9 3h6v7l3.5 6.5A2 2 0 0116.76 19H7.24a2 2 0 01-1.74-2.99L9 10V3z"/><line x1="9" y1="3" x2="15" y2="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    sortAZ: <><path d="M3 6h4M3 12h7M3 18h10M15 6l3-3 3 3M18 3v18"/></>,
    all: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || icons.pill}
    </svg>
  );
};

// ─── Category icon map ───────────────────────────────────────────────────────
const CAT_ICON = {
  "Tous": "all",
  "Analgesiques": "analgesic",
  "Antibiotiques": "antibiotic",
  "Cardiovasculaire": "heart",
  "Gastro-intestinal": "stomach",
  "Respiratoire": "lungs",
  "Diabète": "drop",
  "Vitamines": "bolt",
  "Dermatologie": "skin",
  "Neurologie": "brain",
  "Ophtalmologie": "eye",
  "Allergie": "leaf",
};

// ─── Medicine database ───────────────────────────────────────────────────────
const MEDICINES = [
  { id: 1, name: "Paracétamol Biogaran 1g", brand: "Biogaran", category: "Analgesiques", subcategory: "Antipyrétiques", price: "120 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS","SSM"], description: "Antidouleur et antipyrétique pour adultes.", dosage: "1 comprimé toutes les 6h, max 4/j" },
  { id: 2, name: "Efferalgan 500mg", brand: "UPSA", category: "Analgesiques", subcategory: "Antipyrétiques", price: "180 DA", form: "Comprimé effervescent", prescription: false, reimbursement: null, description: "Paracétamol effervescent pour douleurs légères à modérées.", dosage: "1-2 comprimés toutes les 4-6h" },
  { id: 3, name: "Ibuprofène 400mg", brand: "Sanofi", category: "Analgesiques", subcategory: "Anti-inflammatoires", price: "150 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "AINS pour douleurs, fièvre et inflammations.", dosage: "1 comprimé 3 fois/j après repas" },
  { id: 4, name: "Doliprane 1000mg", brand: "Sanofi", category: "Analgesiques", subcategory: "Antipyrétiques", price: "200 DA", form: "Comprimé", prescription: false, reimbursement: null, description: "Paracétamol pour douleurs et états fébriles.", dosage: "1 comprimé toutes les 6h" },
  { id: 5, name: "Voltarène 50mg", brand: "Novartis", category: "Analgesiques", subcategory: "Anti-inflammatoires", price: "280 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Diclofénac sodique pour douleurs rhumatismales.", dosage: "1 comprimé 2-3 fois/j" },
  { id: 6, name: "Ketoprofène 100mg", brand: "Winthrop", category: "Analgesiques", subcategory: "Anti-inflammatoires", price: "220 DA", form: "Gélule", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Anti-inflammatoire non stéroïdien.", dosage: "1 gélule 2 fois/j" },
  { id: 7, name: "Amoxicilline 500mg", brand: "Biogaran", category: "Antibiotiques", subcategory: "Pénicillines", price: "350 DA", form: "Gélule", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Antibiotique large spectre pour infections bactériennes.", dosage: "1 gélule 3 fois/j pendant 7 jours" },
  { id: 8, name: "Augmentin 1g", brand: "GSK", category: "Antibiotiques", subcategory: "Pénicillines", price: "550 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Amoxicilline + acide clavulanique.", dosage: "1 comprimé 2 fois/j" },
  { id: 9, name: "Azithromycine 500mg", brand: "Pfizer", category: "Antibiotiques", subcategory: "Macrolides", price: "480 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Antibiotique pour infections respiratoires et ORL.", dosage: "1 comprimé/j pendant 3 jours" },
  { id: 10, name: "Ciprofloxacine 500mg", brand: "Bayer", category: "Antibiotiques", subcategory: "Fluoroquinolones", price: "420 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Quinolone pour infections urinaires et respiratoires.", dosage: "1 comprimé 2 fois/j" },
  { id: 11, name: "Ceftriaxone 1g", brand: "Roche", category: "Antibiotiques", subcategory: "Céphalosporines", price: "1200 DA", form: "Injectable", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Céphalosporine 3ème génération injectable.", dosage: "1g/j en IV ou IM" },
  { id: 12, name: "Métronidazole 500mg", brand: "Sanofi", category: "Antibiotiques", subcategory: "Imidazolés", price: "160 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Antibiotique et antiparasitaire.", dosage: "1 comprimé 3 fois/j" },
  { id: 13, name: "Amlodipine 5mg", brand: "Pfizer", category: "Cardiovasculaire", subcategory: "Antihypertenseurs", price: "320 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Inhibiteur calcique pour hypertension.", dosage: "1 comprimé/j" },
  { id: 14, name: "Atorvastatine 40mg", brand: "Pfizer", category: "Cardiovasculaire", subcategory: "Statines", price: "580 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Hypolipémiant pour réduire le cholestérol.", dosage: "1 comprimé/j le soir" },
  { id: 15, name: "Ramipril 5mg", brand: "Sanofi", category: "Cardiovasculaire", subcategory: "IEC", price: "290 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "IEC pour hypertension et insuffisance cardiaque.", dosage: "1-2 comprimés/j" },
  { id: 16, name: "Bisoprolol 5mg", brand: "Merck", category: "Cardiovasculaire", subcategory: "Bêtabloquants", price: "340 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Bêtabloquant cardiosélectif.", dosage: "1 comprimé/j le matin" },
  { id: 17, name: "Aspirine Cardio 100mg", brand: "Bayer", category: "Cardiovasculaire", subcategory: "Antiagrégants", price: "130 DA", form: "Comprimé gastro-résistant", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "Prévention des accidents cardiovasculaires.", dosage: "1 comprimé/j" },
  { id: 18, name: "Oméprazole 20mg", brand: "AstraZeneca", category: "Gastro-intestinal", subcategory: "IPP", price: "240 DA", form: "Gélule", prescription: false, reimbursement: ["CNAS","CASNOS","SSM"], description: "Inhibiteur de la pompe à protons.", dosage: "1 gélule/j à jeun" },
  { id: 19, name: "Smecta 3g", brand: "Ipsen", category: "Gastro-intestinal", subcategory: "Anti-diarrhéiques", price: "180 DA", form: "Sachet", prescription: false, reimbursement: null, description: "Diosmectite pour diarrhées et troubles digestifs.", dosage: "3 sachets/j" },
  { id: 20, name: "Dompéridone 10mg", brand: "Janssen", category: "Gastro-intestinal", subcategory: "Antiémétiques", price: "160 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS"], description: "Anti-nausée et prokinétique.", dosage: "1 comprimé 3 fois/j avant repas" },
  { id: 21, name: "Lansoprazole 30mg", brand: "Takeda", category: "Gastro-intestinal", subcategory: "IPP", price: "310 DA", form: "Gélule", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "IPP pour ulcères et reflux gastro-oesophagien.", dosage: "1 gélule/j" },
  { id: 22, name: "Lactulose 10g", brand: "Merck", category: "Gastro-intestinal", subcategory: "Laxatifs", price: "190 DA", form: "Sachet", prescription: false, reimbursement: null, description: "Laxatif osmotique pour constipation.", dosage: "1-3 sachets/j" },
  { id: 23, name: "Ventoline 100mcg", brand: "GSK", category: "Respiratoire", subcategory: "Bronchodilatateurs", price: "420 DA", form: "Inhalateur", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Salbutamol pour asthme et bronchospasme.", dosage: "2 bouffées si nécessaire" },
  { id: 24, name: "Becotide 250mcg", brand: "GSK", category: "Respiratoire", subcategory: "Corticoïdes inhalés", price: "680 DA", form: "Inhalateur", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Béclométasone pour asthme persistant.", dosage: "2 bouffées 2 fois/j" },
  { id: 25, name: "Mucomyst 600mg", brand: "UPSA", category: "Respiratoire", subcategory: "Mucolytiques", price: "210 DA", form: "Sachet effervescent", prescription: false, reimbursement: null, description: "Acétylcystéine pour fluidifier les sécrétions.", dosage: "1 sachet/j" },
  { id: 26, name: "Rhinathiol 5%", brand: "Sanofi", category: "Respiratoire", subcategory: "Mucolytiques", price: "180 DA", form: "Sirop", prescription: false, reimbursement: null, description: "Carbocistéine sirop pour toux grasse.", dosage: "15ml 3 fois/j" },
  { id: 27, name: "Codéine 30mg", brand: "Cooper", category: "Respiratoire", subcategory: "Antitussifs", price: "140 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Antitussif opioïde pour toux sèche rebelle.", dosage: "1 comprimé 3-4 fois/j" },
  { id: 28, name: "Metformine 850mg", brand: "Merck", category: "Diabète", subcategory: "Biguanides", price: "90 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Antidiabétique oral de référence.", dosage: "1 comprimé 2-3 fois/j pendant les repas" },
  { id: 29, name: "Glibenclamide 5mg", brand: "Sanofi", category: "Diabète", subcategory: "Sulfonylurées", price: "120 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Sulfonylurée pour diabète type 2.", dosage: "1-3 comprimés/j avant les repas" },
  { id: 30, name: "Insuline Actrapid", brand: "Novo Nordisk", category: "Diabète", subcategory: "Insulines", price: "1800 DA", form: "Injectable", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Insuline rapide humaine.", dosage: "Selon prescription médicale" },
  { id: 31, name: "Sitagliptine 100mg", brand: "MSD", category: "Diabète", subcategory: "Gliptines", price: "920 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Inhibiteur de la DPP-4 pour diabète type 2.", dosage: "1 comprimé/j" },
  { id: 32, name: "Vitamine C 1000mg", brand: "Bayer", category: "Vitamines", subcategory: "Vitamines", price: "160 DA", form: "Comprimé effervescent", prescription: false, reimbursement: null, description: "Supplémentation en vitamine C.", dosage: "1 comprimé/j" },
  { id: 33, name: "Vitamine D3 1000 UI", brand: "Mylan", category: "Vitamines", subcategory: "Vitamines", price: "240 DA", form: "Capsule", prescription: false, reimbursement: null, description: "Cholécalciférol pour prévention carences.", dosage: "1 capsule/j" },
  { id: 34, name: "Magnésium B6", brand: "Sanofi", category: "Vitamines", subcategory: "Minéraux", price: "290 DA", form: "Comprimé", prescription: false, reimbursement: null, description: "Supplémentation en magnésium et vitamine B6.", dosage: "2 comprimés/j" },
  { id: 35, name: "Fer Tardyferon 80mg", brand: "Pierre Fabre", category: "Vitamines", subcategory: "Minéraux", price: "210 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "Fumarate ferreux pour anémie ferriprive.", dosage: "1 comprimé/j" },
  { id: 36, name: "Acide Folique 5mg", brand: "Biogaran", category: "Vitamines", subcategory: "Vitamines B", price: "130 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS","SSM"], description: "Vitamine B9 pour grossesse et anémies.", dosage: "1 comprimé/j" },
  { id: 37, name: "Bétaméthasone 0.05%", brand: "GSK", category: "Dermatologie", subcategory: "Corticoïdes topiques", price: "220 DA", form: "Crème", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Corticoïde topique puissant.", dosage: "Appliquer 1-2 fois/j en couche mince" },
  { id: 38, name: "Fucidine 2%", brand: "Leo Pharma", category: "Dermatologie", subcategory: "Antibiotiques topiques", price: "310 DA", form: "Crème", prescription: false, reimbursement: null, description: "Acide fusidique pour infections cutanées.", dosage: "Appliquer 3 fois/j" },
  { id: 39, name: "Terbinafine 1%", brand: "Novartis", category: "Dermatologie", subcategory: "Antifongiques", price: "280 DA", form: "Crème", prescription: false, reimbursement: null, description: "Antifongique pour mycoses cutanées.", dosage: "Appliquer 1 fois/j pendant 1-2 semaines" },
  { id: 40, name: "Aciclovir 5%", brand: "GSK", category: "Dermatologie", subcategory: "Antiviraux topiques", price: "340 DA", form: "Crème", prescription: false, reimbursement: null, description: "Antiviral pour herpès labial.", dosage: "Appliquer 5 fois/j dès les premiers symptômes" },
  { id: 41, name: "Sertraline 50mg", brand: "Pfizer", category: "Neurologie", subcategory: "Antidépresseurs", price: "450 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "ISRS pour dépression et troubles anxieux.", dosage: "1 comprimé/j" },
  { id: 42, name: "Alprazolam 0.25mg", brand: "Pfizer", category: "Neurologie", subcategory: "Anxiolytiques", price: "180 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Benzodiazépine pour anxiété.", dosage: "0.25-0.5mg 3 fois/j" },
  { id: 43, name: "Phénobarbital 50mg", brand: "Luminal", category: "Neurologie", subcategory: "Antiépileptiques", price: "90 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Barbitur pour épilepsie.", dosage: "Selon prescription" },
  { id: 44, name: "Carbamazépine 200mg", brand: "Novartis", category: "Neurologie", subcategory: "Antiépileptiques", price: "230 DA", form: "Comprimé", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Antiépileptique et thymorégulateur.", dosage: "2-4 comprimés/j" },
  { id: 45, name: "Tobramycine 0.3%", brand: "Alcon", category: "Ophtalmologie", subcategory: "Collyres antibiotiques", price: "350 DA", form: "Collyre", prescription: true, reimbursement: ["CNAS","CASNOS"], description: "Antibiotique oculaire pour conjonctivites bactériennes.", dosage: "1-2 gouttes 4 fois/j" },
  { id: 46, name: "Timolol 0.5%", brand: "MSD", category: "Ophtalmologie", subcategory: "Antiglaucomateux", price: "420 DA", form: "Collyre", prescription: true, reimbursement: ["CNAS","CASNOS","SSM"], description: "Bêtabloquant pour glaucome.", dosage: "1 goutte 2 fois/j" },
  { id: 47, name: "Larmes Artificielles", brand: "Alcon", category: "Ophtalmologie", subcategory: "Lubrifiants oculaires", price: "280 DA", form: "Collyre", prescription: false, reimbursement: null, description: "Hydratation oculaire pour yeux secs.", dosage: "1-2 gouttes selon besoin" },
  { id: 48, name: "Cétirizine 10mg", brand: "UCB", category: "Allergie", subcategory: "Antihistaminiques", price: "140 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "Antihistaminique H1 de 2ème génération.", dosage: "1 comprimé/j" },
  { id: 49, name: "Loratadine 10mg", brand: "Schering", category: "Allergie", subcategory: "Antihistaminiques", price: "150 DA", form: "Comprimé", prescription: false, reimbursement: ["CNAS","CASNOS"], description: "Antihistaminique sans sédation.", dosage: "1 comprimé/j" },
  { id: 50, name: "Béclonase 50mcg", brand: "GSK", category: "Allergie", subcategory: "Corticoïdes nasaux", price: "380 DA", form: "Spray nasal", prescription: false, reimbursement: null, description: "Béclométasone nasale pour rhinite allergique.", dosage: "2 pulvérisations/narine le matin" },
];

const CATEGORIES = ["Tous","Analgesiques","Antibiotiques","Cardiovasculaire","Gastro-intestinal","Respiratoire","Diabète","Vitamines","Dermatologie","Neurologie","Ophtalmologie","Allergie"];

const TRANSLATIONS = {
  fr: {
    appTagline: "Tout ce dont vous avez besoin sur les médicaments",
    search: "Rechercher un médicament...", categories: "Catégories", allMeds: "Tous les médicaments",
    prescription: "Sur ordonnance", otc: "Sans ordonnance", price: "Prix", form: "Forme",
    dosage: "Posologie", description: "Description", brand: "Marque",
    home: "Accueil", medicines: "Médicaments", favorites: "Favoris", settings: "Paramètres",
    language: "Langue", darkMode: "Mode sombre", notifications: "Notifications",
    fontSize: "Taille du texte", about: "À propos", version: "Version",
    filter: "Filtrer", all: "Tous", results: "résultats", noResults: "Aucun médicament trouvé",
    addFav: "Ajouter aux favoris", removeFav: "Retirer des favoris", close: "Fermer",
    settingsTitle: "Paramètres", appearance: "Apparence", general: "Général",
    sortBy: "Trier par", name: "Nom", category: "Catégorie",
    contact: "Contact & Support", privacy: "Confidentialité", help: "Aide",
    reimbursable: "Remboursable", notReimbursable: "Non remboursable", reimbursedBy: "Remboursé par",
    reimbursementFilter: "Remboursement", reimb_all: "Tous", reimb_yes: "Remboursable",
    reimb_no: "Non remboursable", reimb_cnas: "CNAS", reimb_casnos: "CASNOS", reimb_ssm: "SSM",
    reimbursementNote: "Le remboursement est soumis à conditions selon votre caisse.",
    popularMeds: "Médicaments populaires",
  },
  ar: {
    appTagline: "كل ما تحتاجه عن الأدوية",
    search: "ابحث عن دواء...", categories: "الفئات", allMeds: "جميع الأدوية",
    prescription: "بوصفة طبية", otc: "بدون وصفة", price: "السعر", form: "الشكل",
    dosage: "الجرعة", description: "الوصف", brand: "العلامة التجارية",
    home: "الرئيسية", medicines: "الأدوية", favorites: "المفضلة", settings: "الإعدادات",
    language: "اللغة", darkMode: "الوضع المظلم", notifications: "الإشعارات",
    fontSize: "حجم الخط", about: "حول التطبيق", version: "الإصدار",
    filter: "تصفية", all: "الكل", results: "نتائج", noResults: "لم يتم العثور على أدوية",
    addFav: "إضافة للمفضلة", removeFav: "إزالة من المفضلة", close: "إغلاق",
    settingsTitle: "الإعدادات", appearance: "المظهر", general: "عام",
    sortBy: "ترتيب حسب", name: "الاسم", category: "الفئة",
    contact: "التواصل والدعم", privacy: "الخصوصية", help: "المساعدة",
    reimbursable: "قابل للتعويض", notReimbursable: "غير قابل للتعويض", reimbursedBy: "التعويض من",
    reimbursementFilter: "التعويض", reimb_all: "الكل", reimb_yes: "قابل للتعويض",
    reimb_no: "غير قابل", reimb_cnas: "CNAS", reimb_casnos: "CASNOS", reimb_ssm: "SSM",
    reimbursementNote: "التعويض مشروط بحسب صندوقك.",
    popularMeds: "الأدوية الشائعة",
  },
  en: {
    appTagline: "Everything you need about medicines",
    search: "Search for a medicine...", categories: "Categories", allMeds: "All Medicines",
    prescription: "Prescription required", otc: "Over the counter", price: "Price", form: "Form",
    dosage: "Dosage", description: "Description", brand: "Brand",
    home: "Home", medicines: "Medicines", favorites: "Favorites", settings: "Settings",
    language: "Language", darkMode: "Dark Mode", notifications: "Notifications",
    fontSize: "Font Size", about: "About", version: "Version",
    filter: "Filter", all: "All", results: "results", noResults: "No medicines found",
    addFav: "Add to favorites", removeFav: "Remove from favorites", close: "Close",
    settingsTitle: "Settings", appearance: "Appearance", general: "General",
    sortBy: "Sort by", name: "Name", category: "Category",
    contact: "Contact & Support", privacy: "Privacy", help: "Help",
    reimbursable: "Reimbursable", notReimbursable: "Not Reimbursable", reimbursedBy: "Reimbursed by",
    reimbursementFilter: "Reimbursement", reimb_all: "All", reimb_yes: "Reimbursable",
    reimb_no: "Not Reimbursable", reimb_cnas: "CNAS", reimb_casnos: "CASNOS", reimb_ssm: "SSM",
    reimbursementNote: "Reimbursement is subject to conditions per your fund.",
    popularMeds: "Popular Medicines",
  }
};

export default function PharmacyApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("fr");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [filterPrescription, setFilterPrescription] = useState("all");
  const [filterReimbursement, setFilterReimbursement] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedMed, setSelectedMed] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const [showIntro, setShowIntro] = useState(true);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  useEffect(() => { const timer = setTimeout(() => setShowIntro(false), 2800); return () => clearTimeout(timer); }, []);

  const filtered = MEDICINES.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "Tous" || m.category === selectedCategory;
    const matchRx = filterPrescription === "all" ||
      (filterPrescription === "prescription" && m.prescription) ||
      (filterPrescription === "otc" && !m.prescription);
    const matchReimb = filterReimbursement === "all" ||
      (filterReimbursement === "yes" && m.reimbursement?.length > 0) ||
      (filterReimbursement === "no" && !m.reimbursement?.length) ||
      (["CNAS","CASNOS","SSM"].includes(filterReimbursement) && m.reimbursement?.includes(filterReimbursement));
    return matchSearch && matchCat && matchRx && matchReimb;
  }).sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));

  const favMeds = MEDICINES.filter(m => favorites.includes(m.id));
  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const dm = darkMode;
  const fs = fontSize === "small" ? "0.85rem" : fontSize === "large" ? "1.1rem" : "0.95rem";

  const C = {
    bg: dm ? "#0d1117" : "#f0f7f4",
    surface: dm ? "#161b22" : "#ffffff",
    surface2: dm ? "#1c2430" : "#e8f5f0",
    primary: "#00875a",
    primary2: "#00b37e",
    accent: "#00d68f",
    text: dm ? "#e6edf3" : "#1a2e25",
    text2: dm ? "#8b949e" : "#5a7a6e",
    border: dm ? "#30363d" : "#c8e6d8",
    card: dm ? "#1c2430" : "#ffffff",
    sidebar: dm ? "#0a0f0a" : "#001a0e",
    red: "#e53e3e",
    yellow: "#d97706",
    blue: "#1d4ed8",
    purple: "#7c3aed",
    amber: "#b45309",
    teal: "#0d9488",
  };

  // ── MedCard ────────────────────────────────────────────────────────────────
  const MedCard = ({ med }) => {
    const isFav = favorites.includes(med.id);
    const hasReimb = med.reimbursement?.length > 0;
    return (
      <div onClick={() => setSelectedMed(med)} style={{
        background: C.card, borderRadius: 16, padding: "14px 14px 12px",
        border: `1px solid ${C.border}`, cursor: "pointer", position: "relative",
        boxShadow: dm ? "none" : "0 2px 8px rgba(0,135,90,0.06)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        {/* Rx badge top-right */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          padding: "2px 7px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3,
          background: med.prescription ? "rgba(229,62,62,0.1)" : "rgba(0,214,143,0.1)",
          color: med.prescription ? C.red : C.accent,
          fontSize: "0.62rem", fontWeight: 700,
        }}>
          <Icon name={med.prescription ? "rx" : "pill"} size={10} color="currentColor" strokeWidth={2} />
          {med.prescription ? "Rx" : "OTC"}
        </div>

        {/* Category icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, marginBottom: 4,
          background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name={CAT_ICON[med.category] || "pill"} size={18} color={C.primary} strokeWidth={1.6} />
        </div>

        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: C.text, lineHeight: 1.3,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", paddingRight: 28 }}>
          {med.name}
        </div>
        <div style={{ fontSize: "0.7rem", color: C.text2 }}>{med.brand}</div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: C.primary, marginTop: 2 }}>{med.price}</div>

        {/* Reimbursement mini badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4, marginTop: 2,
          padding: "2px 7px", borderRadius: 5, alignSelf: "flex-start",
          background: hasReimb ? `${C.teal}15` : `${C.text2}12`,
          color: hasReimb ? C.teal : C.text2,
          fontSize: "0.6rem", fontWeight: 700,
        }}>
          <Icon name={hasReimb ? "shieldCheck" : "shieldX"} size={9} color="currentColor" strokeWidth={2.2} />
          {hasReimb ? t.reimbursable : t.notReimbursable}
        </div>

        {/* Fav button */}
        <button onClick={e => { e.stopPropagation(); toggleFav(med.id); }} style={{
          position: "absolute", bottom: 10, right: 10,
          background: "none", border: "none", cursor: "pointer", padding: 2,
          color: isFav ? C.yellow : C.border, transition: "color 0.2s",
        }}>
          <Icon name={isFav ? "starFilled" : "star"} size={16} color="currentColor" strokeWidth={1.8} />
        </button>
      </div>
    );
  };

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{
      width: 44, height: 24, borderRadius: 12, position: "relative",
      background: on ? C.primary : C.border, border: "none", cursor: "pointer",
      transition: "background 0.2s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }} />
    </button>
  );

  // ── Chip helper ────────────────────────────────────────────────────────────
  const FilterBtn = ({ active, onClick, children, activeColor }) => (
    <button onClick={onClick} style={{
      flexShrink: 0, padding: "6px 12px", borderRadius: 20,
      background: active ? "transparent" : "transparent",
      color: active ? (activeColor || C.primary) : C.text2,
      border: `1.5px solid ${active ? (activeColor || C.primary) : C.border}`,
      cursor: "pointer", fontSize: "0.78rem", fontWeight: active ? 600 : 400,
      transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5,
    }}>
      {children}
    </button>
  );

  // ── HOME ───────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <div>
      {/* Hero */}
      <div style={{
        padding: "28px 20px 22px",
        background: `linear-gradient(135deg, ${dm ? "#001a0e" : "#003d1f"} 0%, ${dm ? "#0a2a18" : "#006640"} 100%)`,
        color: "#fff",
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4,
          background: "linear-gradient(90deg,#fff 60%,#00d68f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {lang === "ar" ? "الصيدلية الجزائرية" : "Algerian Pharmacy"}
        </div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginBottom: 18 }}>{t.appTagline}</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { num: "50+", label: lang === "ar" ? "دواء" : lang === "en" ? "Medicines" : "Médicaments" },
            { num: "12", label: lang === "ar" ? "فئة" : lang === "en" ? "Categories" : "Catégories" },
            { num: "DZ", label: lang === "ar" ? "الجزائر" : "Algérie" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 12,
              padding: "10px 12px", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: C.accent }}>{s.num}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, color: C.text }}>{t.categories}</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => {
            const active = selectedCategory === cat;
            return (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setActiveView("medicines"); }} style={{
                flexShrink: 0, padding: "7px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6,
                background: active ? C.primary : C.surface2,
                color: active ? "#fff" : C.text2,
                border: active ? "none" : `1px solid ${C.border}`,
                cursor: "pointer", fontSize: "0.8rem", fontWeight: active ? 600 : 400,
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                <Icon name={CAT_ICON[cat] || "pill"} size={14} color="currentColor" strokeWidth={1.8} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, color: C.text }}>{t.popularMeds}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {MEDICINES.slice(0, 4).map(med => <MedCard key={med.id} med={med} />)}
        </div>
      </div>
    </div>
  );

  // ── MEDICINES ──────────────────────────────────────────────────────────────
  const renderMedicines = () => (
    <div>
      {/* Rx/OTC + Sort */}
      <div style={{ display: "flex", gap: 8, padding: "12px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { key: "all", label: t.all, icon: "all" },
          { key: "prescription", label: "Rx", icon: "rx" },
          { key: "otc", label: "OTC", icon: "pill" },
        ].map(f => (
          <FilterBtn key={f.key} active={filterPrescription === f.key} onClick={() => setFilterPrescription(f.key)}>
            <Icon name={f.icon} size={12} color="currentColor" strokeWidth={2} />
            {f.label}
          </FilterBtn>
        ))}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <select onChange={e => setSortBy(e.target.value)} value={sortBy} style={{
            padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`,
            background: C.surface2, color: C.text, fontSize: "0.8rem", cursor: "pointer", outline: "none",
          }}>
            <option value="name">{t.name}</option>
            <option value="category">{t.category}</option>
          </select>
        </div>
      </div>

      {/* Reimbursement filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, color: C.text2 }}>
          <Icon name="shieldCheck" size={13} color={C.text2} strokeWidth={1.8} />
          <span style={{ fontSize: "0.72rem" }}>{t.reimbursementFilter}:</span>
        </div>
        {[
          { key: "all", label: t.reimb_all, color: C.primary },
          { key: "yes", label: t.reimb_yes, color: C.teal },
          { key: "no", label: t.reimb_no, color: C.text2 },
          { key: "CNAS", label: "CNAS", color: C.blue },
          { key: "CASNOS", label: "CASNOS", color: C.purple },
          { key: "SSM", label: "SSM", color: C.amber },
        ].map(f => (
          <FilterBtn key={f.key} active={filterReimbursement === f.key} onClick={() => setFilterReimbursement(f.key)} activeColor={f.color}>
            {f.label}
          </FilterBtn>
        ))}
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => {
          const active = selectedCategory === cat;
          return (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              flexShrink: 0, padding: "6px 11px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5,
              background: active ? C.primary : C.surface2,
              color: active ? "#fff" : C.text2,
              border: active ? "none" : `1px solid ${C.border}`,
              cursor: "pointer", fontSize: "0.76rem", fontWeight: active ? 600 : 400,
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>
              <Icon name={CAT_ICON[cat] || "pill"} size={12} color="currentColor" strokeWidth={1.9} />
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 20px 8px", color: C.text2, fontSize: "0.75rem" }}>
        {filtered.length} {t.results}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: C.text2 }}>
          <div style={{ marginBottom: 12, opacity: 0.4 }}><Icon name="search" size={40} color={C.text2} /></div>
          <div>{t.noResults}</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 20px" }}>
          {filtered.map(med => <MedCard key={med.id} med={med} />)}
        </div>
      )}
    </div>
  );

  // ── FAVORITES ──────────────────────────────────────────────────────────────
  const renderFavorites = () => (
    <div style={{ padding: "20px 0" }}>
      {favMeds.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: C.text2 }}>
          <div style={{ marginBottom: 12, opacity: 0.4 }}><Icon name="star" size={40} color={C.text2} /></div>
          <div>{lang === "ar" ? "لا توجد أدوية مفضلة" : lang === "en" ? "No favorites yet" : "Aucun favori pour l'instant"}</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 20px" }}>
          {favMeds.map(med => <MedCard key={med.id} med={med} />)}
        </div>
      )}
    </div>
  );

  // ── SETTINGS ───────────────────────────────────────────────────────────────
  const SettingsGroup = ({ title, children }) => (
    <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 16, overflow: "hidden" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: C.primary, textTransform: "uppercase",
        letterSpacing: "0.8px", padding: "10px 16px 6px", background: C.surface2 }}>{title}</div>
      {children}
    </div>
  );
  const SettingRow = ({ icon, label, desc, right, last }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", borderBottom: last ? "none" : `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ color: C.primary }}><Icon name={icon} size={17} color={C.primary} strokeWidth={1.8} /></div>
        <div>
          <div style={{ fontSize: "0.88rem", color: C.text, fontWeight: 500 }}>{label}</div>
          {desc && <div style={{ fontSize: "0.72rem", color: C.text2, marginTop: 1 }}>{desc}</div>}
        </div>
      </div>
      {right}
    </div>
  );

  const renderSettings = () => (
    <div style={{ padding: "20px" }}>
      <div style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 20, color: C.text }}>{t.settingsTitle}</div>
      <SettingsGroup title={t.appearance}>
        <SettingRow icon="moon" label={t.darkMode}
          desc={lang === "ar" ? "تغيير المظهر" : "Changer le thème"}
          right={<Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />} />
        <SettingRow icon="type" label={t.fontSize}
          desc={lang === "ar" ? "حجم النص" : "Taille de la police"} last
          right={
            <select value={fontSize} onChange={e => setFontSize(e.target.value)} style={{
              padding: "5px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`,
              background: C.surface2, color: C.text, fontSize: "0.82rem", cursor: "pointer", outline: "none",
            }}>
              <option value="small">{lang === "ar" ? "صغير" : lang === "en" ? "Small" : "Petit"}</option>
              <option value="medium">{lang === "ar" ? "متوسط" : lang === "en" ? "Medium" : "Moyen"}</option>
              <option value="large">{lang === "ar" ? "كبير" : lang === "en" ? "Large" : "Grand"}</option>
            </select>
          } />
      </SettingsGroup>

      <SettingsGroup title={t.general}>
        <SettingRow icon="globe" label={t.language} desc="Français / عربية / English"
          right={
            <select value={lang} onChange={e => setLang(e.target.value)} style={{
              padding: "5px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`,
              background: C.surface2, color: C.text, fontSize: "0.82rem", cursor: "pointer", outline: "none",
            }}>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          } />
        <SettingRow icon="bell" label={t.notifications}
          desc={lang === "ar" ? "إشعارات التطبيق" : "Notifications de l'app"} last
          right={<Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />} />
      </SettingsGroup>

      <SettingsGroup title={t.about}>
        {[
          { icon: "helpCircle", label: t.help },
          { icon: "lock", label: t.privacy },
          { icon: "mail", label: t.contact },
          { icon: "info", label: `${t.version} 1.0.0`, last: true },
        ].map((item, i, arr) => (
          <SettingRow key={i} icon={item.icon} label={item.label} last={i === arr.length - 1}
            right={<Icon name="chevronRight" size={16} color={C.text2} strokeWidth={2} />} />
        ))}
      </SettingsGroup>
    </div>
  );

  // ── MODAL ──────────────────────────────────────────────────────────────────
  const isFavMed = selectedMed && favorites.includes(selectedMed.id);
  const hasReimb = selectedMed?.reimbursement?.length > 0;
  const FUND_COLORS = { CNAS: C.blue, CASNOS: C.purple, SSM: C.amber };

  const InfoBox = ({ icon, label, value }) => (
    <div style={{ background: C.surface2, borderRadius: 12, padding: "10px 12px", border: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
        <Icon name={icon} size={11} color={C.text2} strokeWidth={2} />
        <span style={{ fontSize: "0.68rem", color: C.text2, textTransform: "uppercase", letterSpacing: "0.4px" }}>{label}</span>
      </div>
      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: C.text }}>{value}</div>
    </div>
  );

  // ── LAYOUT ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'DM Sans','Segoe UI',sans-serif", fontSize: fs,
      direction: isRTL ? "rtl" : "ltr", transition: "all 0.3s ease", position: "relative",
    }}>
      <style>{`
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeOut{to{opacity:0;pointer-events:none}}
        @keyframes introPop{from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes pulse{0%,100%{box-shadow:0 8px 40px rgba(0,214,143,0.4)}50%{box-shadow:0 8px 60px rgba(0,214,143,0.7)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{display:none}
        input:focus{border-color:#00875a!important;outline:none}
        button{font-family:inherit}
      `}</style>

      {/* ── Intro ── */}
      {showIntro && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "linear-gradient(160deg,#001a0e 0%,#003d1f 50%,#001a0e 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          animation: "none",
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: 24,
            background: "linear-gradient(135deg,#00875a,#00d68f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 20, animation: "introPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards, pulse 2s 0.5s infinite",
          }}>
            <Icon name="cross" size={44} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 8, textAlign: "center" }}>
            Algeria<span style={{ color: "#00d68f" }}>Pharma</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", textAlign: "center" }}>{t.appTagline}</div>
        </div>
      )}

      {/* ── Sidebar overlay ── */}
      <div onClick={() => setSidebarOpen(false)} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40,
        opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }} />

      {/* ── Sidebar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 260,
        background: C.sidebar, zIndex: 50,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: sidebarOpen ? "4px 0 32px rgba(0,135,90,0.25)" : "none",
      }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00875a,#00d68f)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="cross" size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.3px" }}>AlgeriaPharma</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { id: "home", icon: "home", label: t.home },
            { id: "medicines", icon: "pill", label: t.medicines },
            { id: "favorites", icon: "star", label: t.favorites },
            { id: "settings", icon: "settings", label: t.settings },
          ].map(item => {
            const active = activeView === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveView(item.id); setSidebarOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12,
                background: active ? "rgba(0,214,143,0.15)" : "transparent",
                color: active ? "#00d68f" : "rgba(255,255,255,0.65)",
                border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                fontSize: "0.93rem", fontWeight: active ? 600 : 400, transition: "all 0.2s",
              }}>
                <Icon name={item.icon} size={18} color="currentColor" strokeWidth={active ? 2 : 1.6} />
                {item.label}
                {item.id === "favorites" && favorites.length > 0 && (
                  <span style={{ marginLeft: "auto", background: "#00d68f", color: "#000", borderRadius: 10,
                    padding: "1px 7px", fontSize: "0.68rem", fontWeight: 700 }}>{favorites.length}</span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>
          🇩🇿 AlgeriaPharma v1.0
        </div>
      </div>

      {/* ── Top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: dm ? "rgba(13,17,23,0.93)" : "rgba(240,247,244,0.93)",
        backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`,
        padding: "11px 16px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <button onClick={() => setSidebarOpen(true)} style={{
          width: 40, height: 40, borderRadius: 12, background: C.surface2, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
        }}>
          <Icon name="menu" size={18} color={C.primary} strokeWidth={2} />
        </button>

        {activeView !== "settings" ? (
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <Icon name="search" size={15} color={C.text2} strokeWidth={2} />
            </div>
            <input
              placeholder={t.search} value={search}
              onChange={e => { setSearch(e.target.value); if (activeView === "home") setActiveView("medicines"); }}
              style={{
                width: "100%", padding: "9px 14px 9px 36px", borderRadius: 12,
                border: `1.5px solid ${C.border}`, background: C.surface, color: C.text,
                fontSize: "0.88rem", transition: "border-color 0.2s",
              }} />
          </div>
        ) : (
          <div style={{ fontSize: "1rem", fontWeight: 700, color: C.text, flex: 1 }}>{t.settings}</div>
        )}

        <button onClick={() => setDarkMode(!darkMode)} style={{
          width: 40, height: 40, borderRadius: 12, background: C.surface2, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
        }}>
          <Icon name={darkMode ? "sun" : "moon"} size={17} color={C.primary} strokeWidth={1.8} />
        </button>
      </div>

      {/* ── Main ── */}
      <div style={{ paddingBottom: 80 }}>
        {activeView === "home" && renderHome()}
        {activeView === "medicines" && renderMedicines()}
        {activeView === "favorites" && renderFavorites()}
        {activeView === "settings" && renderSettings()}
      </div>

      {/* ── Medicine modal ── */}
      {selectedMed && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end" }}
          onClick={() => setSelectedMed(null)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
          <div onClick={e => e.stopPropagation()} style={{
            position: "relative", width: "100%", background: C.surface,
            borderRadius: "20px 20px 0 0", padding: "20px 20px 24px",
            maxHeight: "82vh", overflowY: "auto", zIndex: 1,
            animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div style={{ width: 40, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 18px" }} />

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.primary}15`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={CAT_ICON[selectedMed.category] || "pill"} size={24} color={C.primary} strokeWidth={1.6} />
              </div>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: C.text, lineHeight: 1.3 }}>{selectedMed.name}</div>
                <div style={{ fontSize: "0.82rem", color: C.primary, fontWeight: 600, marginTop: 2 }}>{selectedMed.brand}</div>
              </div>
            </div>

            {/* Rx badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 20, marginBottom: 14,
              background: selectedMed.prescription ? "rgba(229,62,62,0.1)" : "rgba(0,214,143,0.1)",
              color: selectedMed.prescription ? C.red : C.accent,
              fontSize: "0.8rem", fontWeight: 600,
            }}>
              <Icon name={selectedMed.prescription ? "rx" : "pill"} size={13} color="currentColor" strokeWidth={2} />
              {selectedMed.prescription ? t.prescription : t.otc}
            </div>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <InfoBox icon="price" label={t.price} value={selectedMed.price} />
              <InfoBox icon="flask" label={t.form} value={selectedMed.form} />
            </div>

            {/* Description */}
            <div style={{ background: C.surface2, borderRadius: 12, padding: "12px", border: `1px solid ${C.border}`, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                <Icon name="info" size={12} color={C.text2} strokeWidth={2} />
                <span style={{ fontSize: "0.68rem", color: C.text2, textTransform: "uppercase", letterSpacing: "0.4px" }}>{t.description}</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: C.text, lineHeight: 1.5 }}>{selectedMed.description}</div>
            </div>

            {/* Dosage */}
            <div style={{ background: `linear-gradient(135deg,${C.primary}12,${C.accent}08)`,
              borderRadius: 12, padding: "12px", border: `1px solid ${C.primary}30`, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                <Icon name="clock" size={12} color={C.primary} strokeWidth={2} />
                <span style={{ fontSize: "0.68rem", color: C.primary, textTransform: "uppercase", letterSpacing: "0.4px" }}>{t.dosage}</span>
              </div>
              <div style={{ fontSize: "0.87rem", fontWeight: 600, color: C.text }}>{selectedMed.dosage}</div>
            </div>

            {/* Reimbursement */}
            <div style={{
              borderRadius: 12, padding: "13px 14px", marginBottom: 16,
              background: hasReimb ? `${C.teal}0d` : `${C.text2}0a`,
              border: `1.5px solid ${hasReimb ? C.teal + "40" : C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: hasReimb ? 10 : 0 }}>
                <Icon name={hasReimb ? "shieldCheck" : "shieldX"} size={16}
                  color={hasReimb ? C.teal : C.text2} strokeWidth={2} />
                <span style={{ fontSize: "0.88rem", fontWeight: 700,
                  color: hasReimb ? C.teal : C.text2 }}>
                  {hasReimb ? t.reimbursable : t.notReimbursable}
                </span>
              </div>
              {hasReimb && (
                <div>
                  <div style={{ fontSize: "0.68rem", color: C.text2, textTransform: "uppercase",
                    letterSpacing: "0.4px", marginBottom: 7 }}>{t.reimbursedBy}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selectedMed.reimbursement.map(fund => (
                      <span key={fund} style={{
                        padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700,
                        background: `${FUND_COLORS[fund]}18`, color: FUND_COLORS[fund],
                        border: `1px solid ${FUND_COLORS[fund]}30`,
                      }}>{fund}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 10 }}>
                <Icon name="warning" size={11} color={C.text2} strokeWidth={2} />
                <span style={{ fontSize: "0.67rem", color: C.text2, fontStyle: "italic", lineHeight: 1.4 }}>
                  {t.reimbursementNote}
                </span>
              </div>
            </div>

            {/* Fav button */}
            <button onClick={() => toggleFav(selectedMed.id)} style={{
              width: "100%", padding: "13px", borderRadius: 14, cursor: "pointer",
              background: isFavMed ? "rgba(217,119,6,0.1)" : C.primary,
              color: isFavMed ? C.yellow : "#fff",
              border: isFavMed ? `1.5px solid ${C.yellow}` : "none",
              fontSize: "0.9rem", fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}>
              <Icon name={isFavMed ? "starFilled" : "star"} size={16} color="currentColor" strokeWidth={isFavMed ? 1 : 1.8} />
              {isFavMed ? t.removeFav : t.addFav}
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom nav ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        background: dm ? "rgba(13,17,23,0.97)" : "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)", borderTop: `1px solid ${C.border}`,
        display: "flex", padding: "8px 0 14px",
      }}>
        {[
          { id: "home", icon: "home", label: t.home },
          { id: "medicines", icon: "pill", label: t.medicines },
          { id: "favorites", icon: "star", label: t.favorites },
          { id: "settings", icon: "settings", label: t.settings },
        ].map(item => {
          const active = activeView === item.id;
          return (
            <button key={item.id} onClick={() => setActiveView(item.id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              color: active ? C.primary : C.text2,
              fontSize: "0.63rem", fontWeight: active ? 600 : 400,
              transition: "color 0.2s",
            }}>
              <Icon name={item.icon} size={21} color="currentColor" strokeWidth={active ? 2 : 1.5} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}