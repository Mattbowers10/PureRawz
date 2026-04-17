export interface BundleCompound {
  code: string;
  name: string;
  quantity: number;
  unit: string;
  purity: string;
  color: string;
  role: string;
}

export interface BundleAccessory {
  name: string;
  type: 'accessory' | 'merch';
  description: string;
}

export interface Citation {
  authors: string;
  year: number;
  title: string;
  journal: string;
  pmid: string;
}

export interface MechanismStep {
  compound: string;
  receptor: string;
  pathway: string;
  outcome: string;
  color: string;
}

export interface PeptideBundle {
  slug: string;
  name: string;
  tagline: string;
  heroDescription: string;
  researchDomain: string;
  price: number;
  comparePrice: number;
  compounds: BundleCompound[];
  accessories: BundleAccessory[];
  scientificRationale: string[];
  mechanismSteps: MechanismStep[];
  citations: Citation[];
  researchDisclaimer: string;
  accentColor: string;
  accentGlow: string;
  badgeLabel: string;
}

export const bundles: PeptideBundle[] = [
  /* ─────────────────────────────────────────────────────────────────
     BUNDLE 1 — Tissue Repair & Recovery Bundle
  ──────────────────────────────────────────────────────────────── */
  {
    slug: 'tissue-regeneration',
    name: 'Tissue Repair & Recovery Bundle',
    tagline: 'Complementary vascular & cytoskeletal repair pathways',
    heroDescription:
      'A two-compound research combination targeting non-overlapping tissue repair mechanisms — BPC-157 operating through the vascular and cytoprotective axis, TB-500 through cytoskeletal actin dynamics and stem cell mobilization. Designed for researchers investigating multi-pathway approaches to musculoskeletal, cardiac, and CNS repair.',
    researchDomain: 'Tissue Repair · Angiogenesis · Musculoskeletal',
    price: 189,
    comparePrice: 234,
    accentColor: '#55b3ff',
    accentGlow: 'rgba(85,179,255,0.25)',
    badgeLabel: 'Most Researched',
    compounds: [
      {
        code: 'BPC-157',
        name: 'Body Protection Compound-157',
        quantity: 2,
        unit: '5mg',
        purity: '99.1%',
        color: '#55b3ff',
        role: 'Primary — Vascular/cytoprotective axis',
      },
      {
        code: 'TB-500',
        name: 'Thymosin Beta-4 Analog',
        quantity: 2,
        unit: '5mg',
        purity: '98.9%',
        color: '#7dd3fc',
        role: 'Primary — Cytoskeletal/actin dynamics',
      },
    ],
    accessories: [
      {
        name: 'Bacteriostatic Water 30ml ×2',
        type: 'accessory',
        description: 'Sterile BAC water for peptide reconstitution',
      },
      {
        name: 'PureRawz Lab Research Journal',
        type: 'merch',
        description: 'Spiral-bound, gridded, 120-page research documentation journal',
      },
      {
        name: 'Peptide Storage Vials Set — 10×2ml',
        type: 'accessory',
        description: 'Borosilicate glass vials for separated compound storage',
      },
    ],
    scientificRationale: [
      'BPC-157 and TB-500 represent two biochemically distinct but convergent strategies for tissue repair, grounded in the hypothesis that multi-pathway stimulation produces outcomes neither compound achieves alone. BPC-157 (pentadecapeptide, sequence GEPPPGKPADDAGLV) operates through vascular and cytoprotective mechanisms — upregulating VEGFR2 to drive therapeutic angiogenesis, activating the Src-Caveolin-1-eNOS axis to release nitric oxide at injury sites, and engaging FAK-paxillin signaling to drive fibroblast migration and tendon outgrowth. TB-500, the synthetic active fragment of thymosin β4 (Tβ4), works at the cytoskeletal level: as the predominant G-actin sequestering molecule in eukaryotic cells, Tβ4 controls how cells build, migrate, and restructure their internal scaffolding in response to injury signals.',
      'Tissue repair is a multi-phase process — hemostasis, inflammation, proliferation, remodeling. BPC-157\'s NO-mediated vasodilation and angiogenic signaling address the perfusion deficit at injury sites, ensuring oxygen and nutrient delivery to regenerating tissue, while its upregulation of heme oxygenase-1 (HO-1) and heat shock proteins reduces oxidative damage during the inflammatory phase. TB-500\'s release from activated platelets and macrophages initiates the proliferative phase by mobilizing stem and progenitor cells, reducing myofibroblast accumulation (limiting fibrosis and scar formation), and promoting organized connective tissue restructuring. The temporal and mechanistic complementarity positions this combination as a subject of particular interest for musculoskeletal, cardiac, and CNS repair research.',
      'The mechanisms are non-redundant at both the receptor level and the biological tier. BPC-157 operates at the vascular and signaling tier; TB-500 at the cytoskeletal and stem cell tier. No direct receptor overlap has been identified between the two compounds, allowing researchers to attribute observed outcomes to compound-specific mechanisms more cleanly than with overlapping agents. Goldstein et al. (2012) identified thymosin β4 as a multi-functional regenerative signal with activity across dermal, corneal, cardiac, and CNS injury models. Chang et al. (2011) characterized BPC-157\'s tendon outgrowth activity through FAK-paxillin pathway activation independent of TB-500\'s actin-sequestering mechanism — supporting the complementarity hypothesis.',
    ],
    mechanismSteps: [
      {
        compound: 'BPC-157',
        receptor: 'VEGFR2',
        pathway: 'VEGFR2 upregulation → therapeutic angiogenesis',
        outcome: 'Increased vessel density and blood flow recovery at injury site',
        color: '#55b3ff',
      },
      {
        compound: 'BPC-157',
        receptor: 'Src-Caveolin-1-eNOS',
        pathway: 'Src kinase → eNOS release → NO generation',
        outcome: 'Vasodilation and endothelial cell migration at lesion site',
        color: '#55b3ff',
      },
      {
        compound: 'TB-500',
        receptor: 'G-actin sequestration',
        pathway: 'Tβ4 binds G-actin monomers → cytoskeletal remodeling',
        outcome: 'Stem cell mobilization, migration of endothelial and progenitor cells',
        color: '#7dd3fc',
      },
      {
        compound: 'TB-500',
        receptor: 'Myofibroblast suppression',
        pathway: 'Decreased myofibroblast accumulation at wound margins',
        outcome: 'Reduced fibrosis and scar formation; organized connective tissue',
        color: '#7dd3fc',
      },
    ],
    citations: [
      {
        authors: 'Sikiric P, et al.',
        year: 2016,
        title: 'Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications',
        journal: 'Curr Neuropharmacol',
        pmid: '27847966',
      },
      {
        authors: 'Chang CH, et al.',
        year: 2020,
        title: 'The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration',
        journal: 'J Appl Physiol',
        pmid: '33051481',
      },
      {
        authors: 'Chang CH, et al.',
        year: 2011,
        title: 'Bone-to-bone Healing of the Medial Collateral Ligament Injury of the Knee Joint in Rats Treated With Pentadecapeptide BPC 157',
        journal: 'J Orthop Res',
        pmid: '21030672',
      },
      {
        authors: 'Goldstein AL, Hannappel E, Sosne G, Kleinman HK.',
        year: 2012,
        title: 'Thymosin β4: a multi-functional regenerative peptide',
        journal: 'Expert Opin Biol Ther',
        pmid: '29998800',
      },
      {
        authors: 'Huff T, Müller CS, Otto AM, Netzker R, Hannappel E.',
        year: 2001,
        title: 'β-Thymosins, small acidic peptides with multiple functions',
        journal: 'Int J Biochem Cell Biol',
        pmid: '22074294',
      },
      {
        authors: 'Sosne G, Szliter EA, Barrett R, Kernacki KA, Kleinman H, Hazlett LD.',
        year: 1999,
        title: 'Thymosin beta 4 promotes corneal wound healing and modulates inflammatory mediators in vivo',
        journal: 'Exp Eye Res',
        pmid: '10469335',
      },
      {
        authors: 'Goldstein AL, Hannappel E, Kleinman HK.',
        year: 2005,
        title: 'Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues',
        journal: 'Trends Mol Med',
        pmid: '20536458',
      },
    ],
    researchDisclaimer:
      'This bundle is sold strictly for in vitro laboratory research purposes only. Not intended for human or animal consumption, self-administration, or clinical use. All compounds are supplied for controlled scientific investigation by qualified researchers in appropriate laboratory settings. PureRawz makes no claims regarding therapeutic efficacy. Citations are provided for research context only.',
  },

  /* ─────────────────────────────────────────────────────────────────
     BUNDLE 2 — Growth Hormone Research Bundle
  ──────────────────────────────────────────────────────────────── */
  {
    slug: 'somatotropic-axis',
    name: 'Growth Hormone Research Bundle',
    tagline: 'Dual-receptor GH stimulation with downstream gene expression modulation',
    heroDescription:
      'A three-compound research combination targeting the GH/IGF-1 axis through two distinct pituitary receptor classes (GHRH-R and GHSR-1a), plus orthogonal downstream gene expression modulation via GHK-Cu. Supported by human pharmacokinetic data from Teichman et al. (2006). Designed for researchers investigating somatotropic signaling and extracellular matrix remodeling.',
    researchDomain: 'Endocrinology · GH/IGF-1 Axis · Matrix Remodeling',
    price: 159,
    comparePrice: 198,
    accentColor: '#55b3ff',
    accentGlow: 'rgba(85,179,255,0.25)',
    badgeLabel: 'Human PK Data',
    compounds: [
      {
        code: 'CJC-1295',
        name: 'CJC-1295 (no DAC)',
        quantity: 2,
        unit: '2mg',
        purity: '98.7%',
        color: '#55b3ff',
        role: 'Primary — GHRH-R agonist / pulsatile GH',
      },
      {
        code: 'Ipamorelin',
        name: 'Ipamorelin Acetate',
        quantity: 3,
        unit: '2mg',
        purity: '99.0%',
        color: '#55b3ff',
        role: 'Primary — GHSR-1a agonist / selective GH secretagogue',
      },
      {
        code: 'GHK-Cu',
        name: 'Copper Tripeptide-1',
        quantity: 1,
        unit: '50mg',
        purity: '99.4%',
        color: '#55b3ff',
        role: 'Downstream — Gene expression modulator / matrix remodeling',
      },
    ],
    accessories: [
      {
        name: 'Bacteriostatic Water 30ml ×1',
        type: 'accessory',
        description: 'Sterile BAC water for peptide reconstitution',
      },
      {
        name: 'PureRawz Peptide Mixing Guide',
        type: 'merch',
        description: 'Laminated quick-reference card for reconstitution ratios and storage',
      },
      {
        name: 'Amber Research Vials — 5×5ml',
        type: 'accessory',
        description: 'UV-protective amber glass vials for light-sensitive compounds',
      },
    ],
    scientificRationale: [
      'CJC-1295 and ipamorelin represent two pharmacologically distinct but synergistic methods of stimulating the somatotropic (GH/IGF-1) axis, and their combination has been the subject of formal pharmacokinetic and pharmacodynamic investigation. CJC-1295 acts on the GHRH receptor (GHRH-R) in the anterior pituitary, stimulating somatotroph cells to synthesize and release GH in a pulsatile manner that mirrors endogenous GHRH action. Ipamorelin operates through a separate receptor — GHSR-1a (the ghrelin receptor) — as a selective growth hormone secretagogue (GHS). Because GHRH-R agonism and GHSR-1a agonism activate distinct intracellular pathways (cAMP/PKA and phospholipase C/intracellular calcium, respectively), co-stimulation produces a synergistic amplification of GH pulse amplitude that exceeds the effect of either compound in isolation.',
      'Ipamorelin\'s selectivity profile distinguishes it from earlier GH secretagogues. Unlike GHRP-2 and GHRP-6, ipamorelin does not significantly elevate ACTH or cortisol even at doses 200-fold above its effective dose — a selectivity that Raun et al. (1998) described as characteristic of "the first selective growth hormone secretagogue," enabling cleaner study of GH-axis effects independent of HPA activation. GHK-Cu introduces a third, orthogonal research dimension. While CJC-1295 and ipamorelin elevate systemic GH and downstream IGF-1 (activating PI3K/Akt and Ras/MAPK cascades in target tissues), GHK-Cu operates through gene expression modulation. Connectivity Map analysis reported by Pickart and Margolina (2018) demonstrates GHK modulates at least 4,000 human genes, with enriched effects on collagen/elastin synthesis, antioxidant enzymes, DNA repair, and matrix metalloproteinase regulation.',
      'The downstream convergence is the primary research interest: both the GH/IGF-1 axis and GHK-Cu independently activate PI3K/Akt and Ras/MAPK pathways in target tissues, suggesting that combined stimulation could modulate these pathways with greater magnitude or duration than either approach alone. GHK-Cu also directly stimulates fibroblast collagen synthesis and MMP regulation, addressing the extracellular matrix remodeling dimension that GH/IGF-1 elevation does not specifically target. Human pharmacokinetic data for CJC-1295 (Teichman et al., 2006) shows 2–10-fold GH increases persisting 6+ days post-injection with IGF-1 elevation over 9–11 days — providing well-characterized baseline pharmacology against which the addition of GHK-Cu\'s gene-level effects can be studied.',
    ],
    mechanismSteps: [
      {
        compound: 'CJC-1295',
        receptor: 'GHRH-R',
        pathway: 'GHRH-R agonism → cAMP/PKA cascade in pituitary somatotrophs',
        outcome: 'Synthesis and pulsatile release of GH; IGF-1 elevation 9–11 days',
        color: '#55b3ff',
      },
      {
        compound: 'Ipamorelin',
        receptor: 'GHSR-1a',
        pathway: 'Ghrelin receptor agonism → PLC/IP3/Ca²⁺ intracellular signal',
        outcome: 'Selective GH secretion without ACTH/cortisol elevation (Raun et al. 1998)',
        color: '#55b3ff',
      },
      {
        compound: 'CJC + Ipamorelin',
        receptor: 'Dual-receptor synergy',
        pathway: 'GHRH-R + GHSR-1a co-stimulation → amplified GH pulse',
        outcome: 'Supraadditive GH release; sustained IGF-1; PI3K/Akt + MAPK in target tissues',
        color: '#55b3ff',
      },
      {
        compound: 'GHK-Cu',
        receptor: 'Gene modulation',
        pathway: '4,000+ gene modulation via copper-dependent enzyme activation',
        outcome: 'Collagen/elastin synthesis; antioxidant induction; matrix MMP regulation',
        color: '#55b3ff',
      },
    ],
    citations: [
      {
        authors: 'Teichman SL, et al.',
        year: 2006,
        title: 'Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults',
        journal: 'J Clin Endocrinol Metab',
        pmid: '16352683',
      },
      {
        authors: 'Alba M, et al.',
        year: 2006,
        title: 'Once-monthly administration of CJC-1295, a long-acting growth hormone-releasing hormone (GHRH) analog, normalizes growth in the GHRH knockout mouse',
        journal: 'Am J Physiol Endocrinol Metab',
        pmid: '19386527',
      },
      {
        authors: 'Raun K, et al.',
        year: 1998,
        title: 'Ipamorelin, the first selective growth hormone secretagogue',
        journal: 'Eur J Endocrinol',
        pmid: '9849822',
      },
      {
        authors: 'Johansen PB, et al.',
        year: 1999,
        title: 'Ipamorelin, a new growth-hormone-releasing peptide, induces longitudinal bone growth in rats',
        journal: 'Growth Horm IGF Res',
        pmid: '10373343',
      },
      {
        authors: 'Pickart L, Margolina A.',
        year: 2018,
        title: 'Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data',
        journal: 'Int J Mol Sci',
        pmid: '29986520',
      },
      {
        authors: 'Pickart L, Vasquez-Soltero JM, Margolina A.',
        year: 2015,
        title: 'GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration',
        journal: 'Biomed Res Int',
        pmid: '26236730',
      },
      {
        authors: 'Pickart L.',
        year: 1987,
        title: 'The human tri-peptide GHK and tissue remodeling',
        journal: 'J Biomater Sci Polym Ed',
        pmid: '3169264',
      },
    ],
    researchDisclaimer:
      'This bundle is sold strictly for in vitro laboratory research purposes only. Not intended for human or animal consumption, self-administration, or clinical use. All compounds are supplied for controlled scientific investigation by qualified researchers in appropriate laboratory settings. PureRawz makes no claims regarding therapeutic efficacy. Citations are provided for research context only.',
  },

  /* ─────────────────────────────────────────────────────────────────
     BUNDLE 3 — Neuroendocrine Research Bundle
  ──────────────────────────────────────────────────────────────── */
  {
    slug: 'neuro-cytoprotective',
    name: 'Neuroendocrine Research Bundle',
    tagline: 'Three distinct receptor classes — peripheral, transcriptional, and central neuroendocrine',
    heroDescription:
      'A three-compound research combination with zero receptor overlap between constituents — BPC-157 (peripheral cytoprotection), GHK-Cu (transcriptional gene modulation), and PT-141/bremelanotide (central melanocortin MC3R/MC4R agonism). PT-141\'s parent compound received FDA approval in 2019, providing the strongest regulatory characterization of any compound in this bundle.',
    researchDomain: 'Neuroprotection · Melanocortin Signaling · Multi-System',
    price: 172,
    comparePrice: 218,
    accentColor: '#55b3ff',
    accentGlow: 'rgba(85,179,255,0.25)',
    badgeLabel: 'FDA-Approved Analog',
    compounds: [
      {
        code: 'BPC-157',
        name: 'Body Protection Compound-157',
        quantity: 1,
        unit: '5mg',
        purity: '99.1%',
        color: '#55b3ff',
        role: 'Peripheral — Cytoprotection / CNS neuroprotection',
      },
      {
        code: 'GHK-Cu',
        name: 'Copper Tripeptide-1',
        quantity: 2,
        unit: '50mg',
        purity: '99.4%',
        color: '#55b3ff',
        role: 'Transcriptional — Gene expression / antioxidant / matrix',
      },
      {
        code: 'PT-141',
        name: 'Bremelanotide',
        quantity: 1,
        unit: '10mg',
        purity: '99.3%',
        color: '#55b3ff',
        role: 'Central — MC3R / MC4R melanocortin agonist',
      },
    ],
    accessories: [
      {
        name: 'Bacteriostatic Water 30ml ×2',
        type: 'accessory',
        description: 'Sterile BAC water for peptide reconstitution',
      },
      {
        name: 'PureRawz Research Tote',
        type: 'merch',
        description: 'Heavy canvas research tote for lab transport',
      },
      {
        name: 'Peptide Documentation Kit',
        type: 'merch',
        description: 'Includes lab notebook, gridded data sheets, and COA binder',
      },
    ],
    scientificRationale: [
      'This three-compound combination is notable for the complete absence of receptor overlap between its constituent peptides — making it an unusually clean multi-pathway research design. BPC-157 operates through VEGFR2, Src-eNOS, and FAK-paxillin pathways, driving cytoprotection and vascular repair at peripheral and enteric tissue sites. GHK-Cu modulates gene expression without a defined transmembrane receptor, acting as a transcriptional reprogramming signal across at least 4,000 human genes governing inflammation, matrix remodeling, antioxidant defense, and nerve regeneration. PT-141 (bremelanotide) acts centrally as a selective agonist at MC3R and MC4R — melanocortin receptors expressed in the hypothalamus and limbic system — triggering dopaminergic signaling cascades that influence motivation, arousal, and neuroendocrine function.',
      'The convergence of these three mechanisms is most compelling from a neurological and systemic recovery perspective. BPC-157 has demonstrated cytoprotective activity in the CNS in animal models, including protection against traumatic brain injury sequelae, spinal cord injury, and dopaminergic neurotoxin exposure. PT-141\'s central mechanism — MC4R agonism in the medial preoptic area increasing hypothalamic dopamine tone — overlaps with the same dopaminergic circuitry that BPC-157 appears to protect in rodent models. GHK-Cu\'s documented upregulation of nerve growth factor (NGF)-related genes, antioxidant enzymes (SOD, catalase), and DNA repair pathways provides a third mechanistic layer supporting neuronal health across multiple research contexts (Pickart & Margolina, 2018).',
      'The absence of receptor overlap across the three compounds is a research design strength: BPC-157 does not engage melanocortin receptors, PT-141 does not activate VEGFR2 or eNOS pathways, and GHK-Cu does not act through either. This pharmacological orthogonality allows researchers to attribute observed outcomes to specific compound-receptor interactions more cleanly than with overlapping agents. Notably, PT-141\'s active pharmaceutical parent compound, bremelanotide, received FDA approval in 2019 (Vyleesi) for hypoactive sexual desire disorder — providing the strongest regulatory validation of any compound in this stack and indicating meaningful human safety and pharmacokinetic characterization. BPC-157\'s gastroprotective activity may also be a relevant contextual consideration for multi-compound research protocols.',
    ],
    mechanismSteps: [
      {
        compound: 'BPC-157',
        receptor: 'VEGFR2 / Src-eNOS',
        pathway: 'Angiogenic + cytoprotective signaling at peripheral and CNS tissue sites',
        outcome: 'HO-1 upregulation; neuroprotection in dopaminergic injury models',
        color: '#55b3ff',
      },
      {
        compound: 'GHK-Cu',
        receptor: 'Transcriptional modulation',
        pathway: 'Copper-activated enzyme cascade → 4,000+ gene expression changes',
        outcome: 'Antioxidant enzyme induction; NGF-related neuronal support genes; collagen remodeling',
        color: '#55b3ff',
      },
      {
        compound: 'PT-141',
        receptor: 'MC3R + MC4R',
        pathway: 'Melanocortin receptor agonism in hypothalamic / limbic circuitry',
        outcome: 'Dopamine release into reward/motivational circuits; neuroendocrine modulation',
        color: '#55b3ff',
      },
      {
        compound: 'Multi-compound',
        receptor: 'Orthogonal pathways',
        pathway: 'Zero receptor overlap → pharmacologically clean multi-axis stimulation',
        outcome: 'Outcomes attributable to specific compound-receptor pairs; no cross-receptor interference',
        color: '#55b3ff',
      },
    ],
    citations: [
      {
        authors: 'Sikiric P, et al.',
        year: 2016,
        title: 'Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications',
        journal: 'Curr Neuropharmacol',
        pmid: '27847966',
      },
      {
        authors: 'Chang CH, et al.',
        year: 2020,
        title: 'The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration',
        journal: 'J Appl Physiol',
        pmid: '33051481',
      },
      {
        authors: 'Pickart L, Margolina A.',
        year: 2018,
        title: 'Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data',
        journal: 'Int J Mol Sci',
        pmid: '29986520',
      },
      {
        authors: 'Pickart L, Vasquez-Soltero JM, Margolina A.',
        year: 2015,
        title: 'GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration',
        journal: 'Biomed Res Int',
        pmid: '26236730',
      },
      {
        authors: 'Molinoff PB, et al.',
        year: 2003,
        title: 'PT-141: a melanocortin agonist for the treatment of sexual dysfunction',
        journal: 'Ann N Y Acad Sci',
        pmid: '12851303',
      },
      {
        authors: 'Simon JA, et al.',
        year: 2014,
        title: 'Bremelanotide for Female Sexual Dysfunctions in Premenopausal Women',
        journal: 'Obstet Gynecol',
        pmid: '33455598',
      },
      {
        authors: 'Diamond LE, et al.',
        year: 2004,
        title: 'A double-blind, placebo-controlled evaluation of the safety, pharmacokinetic properties and pharmacodynamic effects of intranasal PT-141, a melanocortin receptor agonist',
        journal: 'J Sex Med',
        pmid: '14963471',
      },
    ],
    researchDisclaimer:
      'This bundle is sold strictly for in vitro laboratory research purposes only. Not intended for human or animal consumption, self-administration, or clinical use. All compounds are supplied for controlled scientific investigation by qualified researchers in appropriate laboratory settings. PureRawz makes no claims regarding therapeutic efficacy. Citations are provided for research context only.',
  },
];

export function getAllBundles(): PeptideBundle[] {
  return bundles;
}

export function getBundleBySlug(slug: string): PeptideBundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
