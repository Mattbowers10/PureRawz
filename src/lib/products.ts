export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: string | null;
  inStock: boolean;
  sku: string;
  concentration: string;
  form: string;
  volume: string;
  purity: string;
  coaBatch: string;
  researchUse: string;
  features: string[];
  relatedIds: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "RAD-140 (Testolone)",
    slug: "rad-140-testolone",
    category: "SARMs",
    categorySlug: "sarms",
    description:
      "RAD-140, also known as Testolone, is a selective androgen receptor modulator (SARM) currently under investigation for its potential applications in muscle wasting conditions and hormone replacement therapy research. It exhibits high affinity and selectivity for the androgen receptor, making it a valuable tool in anabolic research protocols.\n\nThis compound has demonstrated tissue-selective activity in preclinical models, showing strong anabolic effects on muscle and bone while minimizing androgenic effects on other tissues. Researchers have noted its favorable oral bioavailability and pharmacokinetic profile.\n\nAll PureRawz RAD-140 is sourced from GMP-compliant facilities, verified by independent third-party HPLC and mass spectrometry analysis, and ships with a full Certificate of Authenticity.",
    shortDescription: "High-purity SARM for advanced anabolic research protocols.",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 234,
    badge: "Best Seller",
    inStock: true,
    sku: "PR-RAD140-30ML",
    concentration: "10mg/mL",
    form: "Liquid Solution",
    volume: "30mL",
    purity: "99.2%",
    coaBatch: "PR-RAD-2026-03A",
    researchUse: "Anabolic pathway research, androgen receptor binding studies",
    features: [
      "Third-party HPLC verified",
      "99.2% purity confirmed",
      "GMP-compliant sourcing",
      "Full COA included",
      "30mL dropper bottle",
    ],
    relatedIds: ["4", "7", "10"],
  },
  {
    id: "2",
    name: "BPC-157",
    slug: "bpc-157",
    category: "Peptides",
    categorySlug: "peptides",
    description:
      "BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from a partial sequence of a naturally occurring gastric protein. It has been extensively studied in preclinical models for its potential cytoprotective and regenerative properties.\n\nResearch has demonstrated BPC-157's involvement in multiple biological pathways including angiogenesis, nitric oxide system modulation, and growth factor regulation. Published studies have investigated its effects on tendon, ligament, muscle, and gastrointestinal tissue healing in animal models.\n\nPureRawz BPC-157 is synthesized to research-grade standards, verified by independent mass spectrometry and HPLC analysis, and ships with complete documentation.",
    shortDescription: "Research-grade pentadecapeptide for regenerative studies.",
    price: 39.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 189,
    badge: "Popular",
    inStock: true,
    sku: "PR-BPC157-5MG",
    concentration: "5mg",
    form: "Lyophilized Powder",
    volume: "5mg vial",
    purity: "99.5%",
    coaBatch: "PR-BPC-2026-03A",
    researchUse: "Regenerative pathway research, cytoprotective mechanism studies",
    features: [
      "Third-party MS & HPLC verified",
      "99.5% purity confirmed",
      "Lyophilized for stability",
      "Full COA included",
      "Sealed sterile vial",
    ],
    relatedIds: ["5", "8", "11"],
  },
  {
    id: "3",
    name: "Noopept",
    slug: "noopept",
    category: "Nootropics",
    categorySlug: "nootropics",
    description:
      "Noopept (N-phenylacetyl-L-prolylglycine ethyl ester) is a synthetic dipeptide nootropic compound developed in Russia. It is one of the most studied cognitive enhancement compounds, with a substantial body of published research investigating its neuroprotective and procognitive properties.\n\nIn preclinical studies, Noopept has shown activity on both AMPA and NMDA glutamate receptors and has demonstrated neurotrophic factor modulation including BDNF and NGF. Its high oral bioavailability and rapid onset make it a popular subject for cognitive research protocols.\n\nPureRawz Noopept is pharmaceutical-grade quality, verified by independent laboratory analysis with full documentation provided.",
    shortDescription: "High-potency nootropic for cognitive enhancement research.",
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 156,
    badge: null,
    inStock: true,
    sku: "PR-NOOP-10G",
    concentration: "N/A",
    form: "Powder",
    volume: "10g",
    purity: "99.4%",
    coaBatch: "PR-NOP-2026-02A",
    researchUse: "Cognitive enhancement research, neuroprotection studies",
    features: [
      "Third-party HPLC verified",
      "99.4% purity confirmed",
      "Research-grade powder",
      "Full COA included",
      "Sealed container",
    ],
    relatedIds: ["6", "9", "12"],
  },
  {
    id: "4",
    name: "MK-677 (Ibutamoren)",
    slug: "mk-677-ibutamoren",
    category: "SARMs",
    categorySlug: "sarms",
    description:
      "MK-677, also known as Ibutamoren, is a potent orally-active growth hormone secretagogue. While often categorized alongside SARMs, it technically functions as a ghrelin mimetic, stimulating the pituitary gland to increase growth hormone secretion.\n\nExtensive published research has investigated MK-677's effects on GH and IGF-1 levels, body composition, sleep quality, and bone density in both preclinical and clinical models. Its long half-life and oral bioavailability make it highly practical for research protocols.\n\nPureRawz MK-677 is sourced from GMP-compliant facilities and verified through independent third-party analysis.",
    shortDescription: "Oral growth hormone secretagogue for GH pathway research.",
    price: 54.99,
    originalPrice: 64.99,
    rating: 4.9,
    reviewCount: 312,
    badge: "Sale",
    inStock: true,
    sku: "PR-MK677-30ML",
    concentration: "25mg/mL",
    form: "Liquid Solution",
    volume: "30mL",
    purity: "99.1%",
    coaBatch: "PR-MK6-2026-03A",
    researchUse: "Growth hormone pathway research, ghrelin receptor studies",
    features: [
      "Third-party HPLC verified",
      "99.1% purity confirmed",
      "GMP-compliant sourcing",
      "Full COA included",
      "30mL dropper bottle",
    ],
    relatedIds: ["1", "7", "10"],
  },
  {
    id: "5",
    name: "PT-141",
    slug: "pt-141",
    category: "Peptides",
    categorySlug: "peptides",
    description:
      "PT-141 (Bremelanotide) is a synthetic melanocortin peptide that acts on the MC3 and MC4 receptors. It is the subject of extensive research into melanocortin pathway signaling and has been studied for its effects on sexual function in both preclinical and clinical settings.\n\nUnlike traditional compounds studied in this area, PT-141 works through central nervous system mechanisms rather than peripheral vascular effects, making it a unique tool for neuroscience research.\n\nPureRawz PT-141 is synthesized to high purity standards and verified by independent laboratory analysis.",
    shortDescription: "Melanocortin peptide for CNS receptor pathway research.",
    price: 44.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 98,
    badge: "New",
    inStock: true,
    sku: "PR-PT141-10MG",
    concentration: "10mg",
    form: "Lyophilized Powder",
    volume: "10mg vial",
    purity: "99.3%",
    coaBatch: "PR-PT1-2026-02A",
    researchUse: "Melanocortin receptor research, CNS signaling studies",
    features: [
      "Third-party MS & HPLC verified",
      "99.3% purity confirmed",
      "Lyophilized for stability",
      "Full COA included",
      "Sealed sterile vial",
    ],
    relatedIds: ["2", "8", "11"],
  },
  {
    id: "6",
    name: "Alpha GPC",
    slug: "alpha-gpc",
    category: "Nootropics",
    categorySlug: "nootropics",
    description:
      "Alpha GPC (L-Alpha glycerylphosphorylcholine) is a naturally occurring choline compound found in the brain. It is one of the most bioavailable choline sources available and has been extensively researched for its effects on acetylcholine synthesis and cognitive function.\n\nPublished studies have investigated Alpha GPC's role in cholinergic neurotransmission, memory formation, and neuroprotection. Its ability to cross the blood-brain barrier efficiently makes it a valuable compound for neuroscience research.\n\nPureRawz Alpha GPC is pharmaceutical-grade quality with full third-party verification.",
    shortDescription: "Premium choline source for cholinergic pathway research.",
    price: 29.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 201,
    badge: null,
    inStock: true,
    sku: "PR-AGPC-60CAP",
    concentration: "300mg per capsule",
    form: "Capsules",
    volume: "60 capsules",
    purity: "99.0%",
    coaBatch: "PR-AGP-2026-02A",
    researchUse: "Cholinergic pathway research, acetylcholine synthesis studies",
    features: [
      "Third-party HPLC verified",
      "99.0% purity confirmed",
      "Convenient capsule form",
      "Full COA included",
      "60 capsules per bottle",
    ],
    relatedIds: ["3", "9", "12"],
  },
  {
    id: "7",
    name: "LGD-4033 (Ligandrol)",
    slug: "lgd-4033-ligandrol",
    category: "SARMs",
    categorySlug: "sarms",
    description:
      "LGD-4033, also known as Ligandrol, is one of the most researched SARMs in the scientific literature. It demonstrates high selectivity for the androgen receptor in muscle and bone tissue, with a favorable anabolic-to-androgenic ratio in preclinical studies.\n\nMultiple clinical trials have investigated LGD-4033's effects on lean body mass, physical function, and safety parameters. These studies have established dose-response relationships and pharmacokinetic profiles that inform research protocols.\n\nPureRawz LGD-4033 meets our rigorous 99%+ purity standard with full third-party documentation.",
    shortDescription: "Well-characterized SARM for lean mass research protocols.",
    price: 44.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 278,
    badge: null,
    inStock: true,
    sku: "PR-LGD4033-30ML",
    concentration: "10mg/mL",
    form: "Liquid Solution",
    volume: "30mL",
    purity: "99.3%",
    coaBatch: "PR-LGD-2026-02A",
    researchUse: "Androgen receptor research, lean tissue anabolic studies",
    features: [
      "Third-party HPLC verified",
      "99.3% purity confirmed",
      "Clinically studied compound",
      "Full COA included",
      "30mL dropper bottle",
    ],
    relatedIds: ["1", "4", "10"],
  },
  {
    id: "8",
    name: "GHK-Cu",
    slug: "ghk-cu",
    category: "Peptides",
    categorySlug: "peptides",
    description:
      "GHK-Cu (Copper peptide GHK-Cu) is a naturally occurring tripeptide with a high affinity for copper(II) ions. It has been the subject of extensive research for its roles in wound healing, tissue remodeling, and gene expression modulation.\n\nPublished studies have identified over 4,000 genes regulated by GHK-Cu, with effects on collagen synthesis, anti-inflammatory signaling, and antioxidant enzyme activation. It is widely studied in dermatological and regenerative research.\n\nPureRawz GHK-Cu is synthesized to high purity standards with copper complexation verified by independent analysis.",
    shortDescription: "Copper tripeptide for tissue remodeling and gene expression research.",
    price: 59.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 134,
    badge: null,
    inStock: true,
    sku: "PR-GHKCU-50MG",
    concentration: "50mg",
    form: "Lyophilized Powder",
    volume: "50mg vial",
    purity: "99.2%",
    coaBatch: "PR-GHK-2026-01A",
    researchUse: "Tissue remodeling research, gene expression modulation studies",
    features: [
      "Third-party MS & HPLC verified",
      "99.2% purity confirmed",
      "Copper complexation verified",
      "Full COA included",
      "Sealed sterile vial",
    ],
    relatedIds: ["2", "5", "11"],
  },
  {
    id: "9",
    name: "Aniracetam",
    slug: "aniracetam",
    category: "Nootropics",
    categorySlug: "nootropics",
    description:
      "Aniracetam is a fat-soluble ampakine nootropic of the racetam family. It is widely studied for its cognitive-enhancing properties, particularly its effects on AMPA receptor modulation and glutamatergic neurotransmission.\n\nResearch has demonstrated aniracetam's anxiolytic properties alongside its procognitive effects, with studies investigating its impact on memory consolidation, attention, and synaptic plasticity. It also modulates cholinergic, dopaminergic, and serotonergic signaling.\n\nPureRawz Aniracetam is research-grade quality with independent laboratory verification.",
    shortDescription: "Ampakine nootropic for glutamatergic and cognitive research.",
    price: 34.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 87,
    badge: null,
    inStock: true,
    sku: "PR-ANIR-30G",
    concentration: "N/A",
    form: "Powder",
    volume: "30g",
    purity: "99.1%",
    coaBatch: "PR-ANI-2026-01A",
    researchUse: "AMPA receptor research, cognitive enhancement studies",
    features: [
      "Third-party HPLC verified",
      "99.1% purity confirmed",
      "Research-grade powder",
      "Full COA included",
      "Sealed container",
    ],
    relatedIds: ["3", "6", "12"],
  },
  {
    id: "10",
    name: "S-4 (Andarine)",
    slug: "s4-andarine",
    category: "SARMs",
    categorySlug: "sarms",
    description:
      "S-4, known as Andarine, was one of the first SARMs developed and remains widely used in research settings. It demonstrates selective androgen receptor modulation with partial agonist activity, making it useful for studying tissue-selective androgenic effects.\n\nPreclinical studies have investigated S-4's effects on muscle mass, bone mineral density, and prostate tissue, establishing its selectivity profile. Its well-characterized pharmacology makes it a standard reference compound in SARM research.\n\nPureRawz S-4 meets strict purity requirements with complete third-party documentation.",
    shortDescription: "Foundational SARM for selective androgen receptor research.",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 167,
    badge: "Sale",
    inStock: true,
    sku: "PR-S4-30ML",
    concentration: "25mg/mL",
    form: "Liquid Solution",
    volume: "30mL",
    purity: "99.0%",
    coaBatch: "PR-S4-2026-01A",
    researchUse: "Selective androgen receptor research, tissue-selectivity studies",
    features: [
      "Third-party HPLC verified",
      "99.0% purity confirmed",
      "Well-characterized compound",
      "Full COA included",
      "30mL dropper bottle",
    ],
    relatedIds: ["1", "4", "7"],
  },
  {
    id: "11",
    name: "TB-500",
    slug: "tb-500",
    category: "Peptides",
    categorySlug: "peptides",
    description:
      "TB-500 is a synthetic analog of Thymosin Beta-4, a naturally occurring peptide present in virtually all human and animal cells. It has been extensively researched for its role in cell migration, angiogenesis, and tissue repair signaling.\n\nPublished research has demonstrated TB-500's involvement in actin polymerization and cytoskeletal regulation, which are fundamental to wound healing and tissue regeneration processes. It is a key compound in regenerative medicine research.\n\nPureRawz TB-500 is synthesized to research-grade standards with independent verification.",
    shortDescription: "Thymosin Beta-4 analog for regenerative medicine research.",
    price: 49.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 223,
    badge: "Popular",
    inStock: true,
    sku: "PR-TB500-5MG",
    concentration: "5mg",
    form: "Lyophilized Powder",
    volume: "5mg vial",
    purity: "99.4%",
    coaBatch: "PR-TB5-2026-01A",
    researchUse: "Tissue repair research, actin polymerization studies",
    features: [
      "Third-party MS & HPLC verified",
      "99.4% purity confirmed",
      "Lyophilized for stability",
      "Full COA included",
      "Sealed sterile vial",
    ],
    relatedIds: ["2", "5", "8"],
  },
  {
    id: "12",
    name: "Phenylpiracetam",
    slug: "phenylpiracetam",
    category: "Nootropics",
    categorySlug: "nootropics",
    description:
      "Phenylpiracetam (Phenotropil) is a phenylated derivative of piracetam with enhanced potency and additional psychostimulatory properties. It was developed in Russia and has been studied for its cognitive-enhancing, anxiolytic, and physical performance effects.\n\nResearch indicates phenylpiracetam has a broader receptor activity profile than piracetam, including effects on dopamine, NMDA, and nicotinic acetylcholine receptors. Its improved lipophilicity provides better CNS penetration.\n\nPureRawz Phenylpiracetam is pharmaceutical-grade quality with full third-party verification and documentation.",
    shortDescription: "Enhanced racetam nootropic for advanced cognitive research.",
    price: 39.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 112,
    badge: null,
    inStock: true,
    sku: "PR-PHEN-5G",
    concentration: "N/A",
    form: "Powder",
    volume: "5g",
    purity: "99.3%",
    coaBatch: "PR-PHE-2026-01A",
    researchUse: "Advanced nootropic research, dopaminergic pathway studies",
    features: [
      "Third-party HPLC verified",
      "99.3% purity confirmed",
      "Research-grade powder",
      "Full COA included",
      "Sealed container",
    ],
    relatedIds: ["3", "6", "9"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export const categories = [
  { name: "All", slug: "all", count: products.length },
  { name: "SARMs", slug: "sarms", count: products.filter((p) => p.categorySlug === "sarms").length },
  { name: "Nootropics", slug: "nootropics", count: products.filter((p) => p.categorySlug === "nootropics").length },
  { name: "Peptides", slug: "peptides", count: products.filter((p) => p.categorySlug === "peptides").length },
];
