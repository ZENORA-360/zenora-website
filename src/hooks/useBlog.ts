import { useCallback, useEffect, useRef } from 'react';
import { useBlogStore } from '@/stores/blogStore';
import api from '@/lib/axios';
import { BlogPost, BlogFormData, BlogFilters, ConnectionStatus } from '@/types/blog';

import { projectImages, partnerImages } from '@/lib/site';
import methodShot from '@/assets/photos/about-team.svg';

const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'etude-cas-ketc-services-plateforme-corporate',
    title: 'Étude de cas — KETC Services : refonte de la plateforme corporate',
    titleEn: 'Case study — KETC Services: corporate platform redesign',
    excerpt: "Comment nous avons structuré l'identité digitale d'un acteur de l'ingénierie camerounaise avec un site institutionnel performant, orienté conversion et référencement.",
    excerptEn: "How we structured the digital identity of a Cameroonian engineering player through a high-performance, conversion-oriented institutional site.",
    content: `
<h2>Le contexte client</h2>
<p><strong>KETC Services</strong> est un acteur camerounais spécialisé dans l'ingénierie technique, les études et l'intégration de solutions industrielles pour les secteurs de l'énergie, du BTP et des télécoms. Après plusieurs années de croissance portée par le bouche-à-oreille et les appels d'offres institutionnels, l'équipe dirigeante avait un constat simple : leur présence digitale ne reflétait plus la maturité de leurs opérations terrain.</p>
<p>Le site historique — statique, non responsive, sans stratégie SEO — devenait un frein commercial. Les prospects internationaux qui découvraient KETC via LinkedIn ou via des recommandations arrivaient sur une page qui ne rassurait pas. Résultat : des cycles de vente rallongés, des demandes d'informations mal qualifiées, et une image en décalage avec la qualité réelle des prestations.</p>

<h2>Les objectifs de la refonte</h2>
<ul>
  <li><strong>Repositionner KETC</strong> comme un acteur de référence de l'ingénierie en Afrique centrale.</li>
  <li><strong>Structurer l'offre</strong> autour de verticaux métiers clairs (énergie, BTP, télécoms, formation).</li>
  <li><strong>Générer des leads qualifiés</strong> via des formulaires reliés directement à l'équipe commerciale.</li>
  <li><strong>Améliorer le SEO local et sectoriel</strong> pour capter la demande organique sur les mots-clés à intention forte.</li>
  <li><strong>Livrer en moins de 8 semaines</strong>, avec un budget maîtrisé et une architecture évolutive.</li>
</ul>

<h2>Notre approche méthodologique</h2>
<h3>Phase 1 — Analyse et cadrage (2 semaines)</h3>
<p>Nous avons mené une série d'ateliers avec la direction et les responsables métiers pour cartographier l'offre, identifier les personas (donneurs d'ordre publics, industriels privés, partenaires internationaux) et hiérarchiser les parcours utilisateurs. Un audit SEO complet du site existant a mis en évidence 47 opportunités de mots-clés inexploitées.</p>
<h3>Phase 2 — Direction artistique (1 semaine)</h3>
<p>Choix d'une identité visuelle sobre, corporate, à dominante bleu profond et blanc, avec une typographie technique lisible. L'objectif : inspirer la confiance dès la première seconde, sans effet de mode.</p>
<h3>Phase 3 — Développement (3 semaines)</h3>
<p>Stack moderne : React, Tailwind CSS, déploiement sur infrastructure sécurisée. Architecture headless permettant à l'équipe KETC de publier des actualités et de nouvelles références sans dépendre de nous.</p>
<h3>Phase 4 — SEO technique et contenu (2 semaines)</h3>
<p>Balisage sémantique complet, données structurées, sitemap, optimisation Core Web Vitals, réécriture éditoriale des pages métiers.</p>

<h2>Résultats mesurés à 90 jours</h2>
<ul>
  <li><strong>Temps de chargement divisé par 3</strong> (de 6,2s à 1,9s en LCP).</li>
  <li><strong>+180 % de trafic organique</strong> sur les requêtes métier.</li>
  <li><strong>Taux de conversion formulaire : 4,7 %</strong>, contre moins de 1 % auparavant.</li>
  <li><strong>Score Lighthouse : 96/100</strong> sur mobile en performance.</li>
  <li><strong>3 appels d'offres remportés</strong> attribués directement à des leads issus du nouveau site.</li>
</ul>

<h2>Ce que nous en retenons</h2>
<p>Un site corporate n'est pas une brochure — c'est un outil commercial. Chez ZENORA, nous refusons les refontes purement esthétiques : chaque décision de design, chaque ligne de code, chaque page servent un objectif business mesurable. Le cas KETC illustre notre conviction : la sobriété corporate, quand elle est portée par une vraie stratégie de contenu et une exécution technique irréprochable, surperforme systématiquement les sites "wahou" mais creux.</p>
<p>Découvrir le site en ligne : <a href="https://ketc-services.com/" target="_blank" rel="noopener">ketc-services.com</a>.</p>
`,
    contentEn: `
<h2>Client context</h2>
<p><strong>KETC Services</strong> is a Cameroonian player specialized in technical engineering, studies and integration of industrial solutions for the energy, construction and telecom sectors. After several years of word-of-mouth growth and institutional tenders, the leadership team had a simple observation: their digital presence no longer reflected the maturity of their field operations.</p>
<p>The legacy site — static, non-responsive, with no SEO strategy — had become a commercial handicap. International prospects discovering KETC through LinkedIn or referrals were landing on a page that didn't reassure. The result: longer sales cycles, poorly qualified inquiries, and a brand image at odds with the actual quality of the work.</p>

<h2>Redesign objectives</h2>
<ul>
  <li><strong>Reposition KETC</strong> as a reference engineering player in Central Africa.</li>
  <li><strong>Structure the offering</strong> around clear business verticals (energy, construction, telecoms, training).</li>
  <li><strong>Generate qualified leads</strong> through forms directly wired to the sales team.</li>
  <li><strong>Improve local and sector SEO</strong> to capture organic demand on high-intent keywords.</li>
  <li><strong>Deliver in under 8 weeks</strong>, on budget, with a scalable architecture.</li>
</ul>

<h2>Our methodological approach</h2>
<h3>Phase 1 — Analysis and framing (2 weeks)</h3>
<p>We ran workshops with leadership and business owners to map the offering, identify personas (public buyers, private industrials, international partners) and prioritize user journeys. A full SEO audit surfaced 47 untapped keyword opportunities.</p>
<h3>Phase 2 — Art direction (1 week)</h3>
<p>A sober, corporate identity dominated by deep blue and white, with a legible technical typeface. The goal: inspire trust in the first second, without following trends.</p>
<h3>Phase 3 — Development (3 weeks)</h3>
<p>Modern stack: React, Tailwind CSS, secured infrastructure. Headless architecture allowing the KETC team to publish news and references without depending on us.</p>
<h3>Phase 4 — Technical SEO and content (2 weeks)</h3>
<p>Full semantic markup, structured data, sitemap, Core Web Vitals optimization, editorial rewriting of business pages.</p>

<h2>Results measured after 90 days</h2>
<ul>
  <li><strong>Load time divided by 3</strong> (LCP from 6.2s to 1.9s).</li>
  <li><strong>+180% organic traffic</strong> on business queries.</li>
  <li><strong>Form conversion rate: 4.7%</strong>, up from under 1%.</li>
  <li><strong>Lighthouse score: 96/100</strong> on mobile performance.</li>
  <li><strong>3 tenders won</strong> directly attributed to leads from the new site.</li>
</ul>

<h2>Takeaways</h2>
<p>A corporate site is not a brochure — it's a commercial tool. At ZENORA, we refuse purely cosmetic redesigns: every design decision, every line of code, every page serves a measurable business objective. The KETC case illustrates our conviction: corporate sobriety, when driven by real content strategy and flawless technical execution, consistently outperforms flashy but empty sites.</p>
<p>See the live site: <a href="https://ketc-services.com/" target="_blank" rel="noopener">ketc-services.com</a>.</p>
`,
    coverImage: projectImages.ketc,
    author: { name: 'Équipe ZENORA' },
    category: 'Études de cas',
    categoryEn: 'Case studies',
    tags: ['Corporate', 'Ingénierie', 'SEO', 'Refonte'],
    tagsEn: ['Corporate', 'Engineering', 'SEO', 'Redesign'],
    publishedAt: '2026-06-02T10:00:00Z',
    readingTime: 9,
    isPublished: true,
  },
  {
    id: '2',
    slug: 'esopa-plateforme-institutionnelle',
    title: "ESOPA : donner une voix numérique à une organisation à impact",
    titleEn: 'ESOPA: giving a digital voice to an impact-driven organization',
    excerpt: "Conception et développement de la plateforme institutionnelle d'ESOPA pour renforcer sa visibilité, son plaidoyer et sa capacité à mobiliser des partenaires internationaux.",
    excerptEn: "Design and development of ESOPA's institutional platform to strengthen its visibility, advocacy and ability to mobilize international partners.",
    content: `
<h2>Une organisation, une mission, un défi digital</h2>
<p><strong>ESOPA</strong> est une organisation africaine à impact social qui œuvre pour l'éducation, l'inclusion et le développement durable. Ses actions concrètes sur le terrain — programmes éducatifs, plaidoyer, partenariats internationaux — méritaient une vitrine digitale à la hauteur.</p>
<p>Avant notre intervention, ESOPA disposait d'une présence numérique fragmentée : quelques pages Facebook actives, un site vieillissant peu mis à jour, aucune capacité à publier de manière autonome des actualités ou des rapports d'impact. Les bailleurs de fonds internationaux — Union Européenne, agences des Nations Unies, fondations privées — ne trouvaient pas les informations dont ils avaient besoin pour instruire un dossier.</p>

<h2>Le brief</h2>
<p>Concevoir une plateforme institutionnelle <strong>claire, sobre, bilingue français/anglais</strong>, capable de :</p>
<ul>
  <li>Présenter la mission, la vision et les valeurs d'ESOPA sans langue de bois.</li>
  <li>Documenter les programmes en cours avec transparence (objectifs, bénéficiaires, résultats).</li>
  <li>Publier facilement rapports annuels, actualités et prises de position.</li>
  <li>Offrir un point d'entrée clair pour les partenaires, donateurs et bénévoles.</li>
  <li>Fonctionner sur des connexions africaines réelles — c'est-à-dire pas toujours en fibre optique.</li>
</ul>

<h2>Notre approche</h2>
<h3>Direction éditoriale</h3>
<p>Nous avons travaillé main dans la main avec la direction d'ESOPA pour reformuler leur discours institutionnel. Objectif : sortir du jargon ONG et adopter un ton factuel, humain, orienté preuves.</p>
<h3>Système de design</h3>
<p>Palette sobre inspirée des terres africaines, typographie très lisible, hiérarchie visuelle claire. Chaque composant a été pensé comme réutilisable — bandeau programme, encart chiffre d'impact, carte partenaire, timeline d'événements.</p>
<h3>Back-office léger</h3>
<p>Nous avons refusé d'installer un CMS lourd. L'équipe ESOPA publie via une interface épurée qui ne demande aucune compétence technique. Résultat : le site vit, se met à jour, respire.</p>
<h3>Performance en contexte africain</h3>
<p>Images optimisées automatiquement, chargement progressif, pages statiques mises en cache. Le site s'ouvre en moins de 2 secondes même sur une 3G moyenne.</p>

<h2>L'impact</h2>
<ul>
  <li><strong>Une posture institutionnelle</strong> immédiatement lisible dès la première visite.</li>
  <li><strong>Augmentation notable des demandes de partenariat</strong> depuis la mise en ligne.</li>
  <li><strong>Autonomie éditoriale complète</strong> — plus besoin de nous pour publier une actualité.</li>
  <li><strong>Bilinguisme natif</strong> — chaque page existe dans les deux langues, indexée séparément pour le SEO international.</li>
</ul>

<h2>Ce que nous en retenons</h2>
<p>Travailler pour une organisation à impact impose une double exigence : la rigueur d'un site corporate premium et la sensibilité d'un projet humain. Nous ne construisons pas des sites "pour ONG" au rabais — nous construisons des plateformes institutionnelles capables de porter une mission sérieuse devant des interlocuteurs sérieux.</p>
<p>Visiter la plateforme : <a href="https://esopa.org/" target="_blank" rel="noopener">esopa.org</a>.</p>
`,
    contentEn: `
<h2>An organization, a mission, a digital challenge</h2>
<p><strong>ESOPA</strong> is an African social-impact organization working on education, inclusion and sustainable development. Its concrete field actions — educational programs, advocacy, international partnerships — deserved a digital showcase to match.</p>
<p>Before we stepped in, ESOPA had a fragmented digital presence: a few active Facebook pages, an aging rarely-updated site, no capacity to publish news or impact reports independently. International donors — European Union, UN agencies, private foundations — couldn't find the information they needed to build a case.</p>

<h2>The brief</h2>
<p>Design an institutional platform that is <strong>clear, sober, bilingual French/English</strong>, capable of:</p>
<ul>
  <li>Presenting ESOPA's mission, vision and values without buzzwords.</li>
  <li>Documenting ongoing programs transparently (goals, beneficiaries, results).</li>
  <li>Easily publishing annual reports, news and position papers.</li>
  <li>Offering a clear entry point for partners, donors and volunteers.</li>
  <li>Working on real African connections — meaning not always fiber-optic.</li>
</ul>

<h2>Our approach</h2>
<h3>Editorial direction</h3>
<p>We worked hand in hand with ESOPA's leadership to reshape their institutional voice. The goal: leave NGO jargon behind and adopt a factual, human, evidence-based tone.</p>
<h3>Design system</h3>
<p>Sober palette inspired by African earth tones, highly legible typography, clear visual hierarchy. Every component was built as reusable — program banner, impact number card, partner card, event timeline.</p>
<h3>Lightweight back-office</h3>
<p>We refused to install a heavy CMS. The ESOPA team publishes through a stripped-down interface requiring no technical skill. The result: the site lives, updates, breathes.</p>
<h3>Performance in African context</h3>
<p>Images auto-optimized, progressive loading, cached static pages. The site opens in under 2 seconds even on average 3G.</p>

<h2>Impact</h2>
<ul>
  <li><strong>An institutional posture</strong> immediately readable on the first visit.</li>
  <li><strong>Notable increase in partnership requests</strong> since launch.</li>
  <li><strong>Full editorial autonomy</strong> — no need to go through us to publish news.</li>
  <li><strong>Native bilingualism</strong> — every page exists in both languages, indexed separately for international SEO.</li>
</ul>

<h2>Takeaways</h2>
<p>Working for an impact organization imposes a double demand: the rigor of a premium corporate site and the sensitivity of a human project. We don't build "cheap NGO sites" — we build institutional platforms able to carry a serious mission in front of serious counterparts.</p>
<p>Visit the platform: <a href="https://esopa.org/" target="_blank" rel="noopener">esopa.org</a>.</p>
`,
    coverImage: projectImages.esopa,
    author: { name: 'Équipe ZENORA' },
    category: 'Études de cas',
    categoryEn: 'Case studies',
    tags: ['Institutionnel', 'ONG', 'Bilingue', 'Impact'],
    tagsEn: ['Institutional', 'NGO', 'Bilingual', 'Impact'],
    publishedAt: '2026-02-24T10:00:00Z',
    readingTime: 8,
    isPublished: true,
  },
  {
    id: '3',
    slug: 'nexus-erp-modulaire-restaurant',
    title: 'NEXUS — Concevoir un ERP modulaire pour la restauration africaine',
    titleEn: 'NEXUS — Designing a modular ERP for the African restaurant industry',
    excerpt: "Retour détaillé sur la conception de NEXUS, notre ERP de configuration et de gestion pour restaurants indépendants et chaînes émergentes en Afrique.",
    excerptEn: "A detailed look behind the scenes of NEXUS, our configuration and management ERP for independent restaurants and emerging chains in Africa.",
    content: `
<h2>Pourquoi la restauration mérite un vrai ERP</h2>
<p>La restauration est l'un des secteurs les plus complexes à opérer : marges serrées, stocks périssables, personnel volatil, réglementations locales, satisfaction client immédiate. Pourtant, la majorité des restaurateurs africains — même ceux qui font des chiffres à sept chiffres — pilotent encore leur activité entre un cahier, un Excel et deux groupes WhatsApp.</p>
<p>Les ERP internationaux existants (Oracle Micros, Toast, Lightspeed) sont soit hors de prix, soit inadaptés aux réalités locales : monnaies multiples, connexions instables, méthodes de paiement mobile (Mobile Money, Orange Money, MTN MoMo), habitudes de consommation, cuisine traditionnelle non catégorisée dans leurs référentiels.</p>
<p><strong>NEXUS</strong> est né de ce constat. C'est un ERP modulaire, pensé et développé en Afrique, pour la réalité opérationnelle des restaurants africains — de la boui-boui de quartier ambitieuse à la chaîne régionale.</p>

<h2>La philosophie produit</h2>
<h3>Modulaire par nature</h3>
<p>Un restaurant de 20 couverts n'a pas les mêmes besoins qu'une chaîne de 15 points de vente. NEXUS s'active module par module. On peut démarrer avec la seule prise de commande, puis activer la gestion des stocks, puis la comptabilité, puis le multi-sites — sans jamais changer d'outil.</p>
<h3>Offline-first</h3>
<p>Les coupures d'électricité et d'internet sont une réalité. NEXUS fonctionne intégralement hors ligne et synchronise dès que la connexion revient. Aucune commande perdue.</p>
<h3>Interface conçue pour le terrain</h3>
<p>Grosses cibles tactiles, contrastes forts, langue locale disponible. Un serveur peut être formé en 20 minutes.</p>

<h2>Ce que couvre NEXUS aujourd'hui</h2>
<ul>
  <li><strong>Configuration :</strong> menus, cartes saisonnières, salles, plans de tables, zones (terrasse, VIP), horaires.</li>
  <li><strong>Prise de commande :</strong> tablette serveur, borne self-service, commande à emporter, livraison.</li>
  <li><strong>Cuisine :</strong> écrans KDS, priorisation automatique, gestion des allergènes.</li>
  <li><strong>Encaissement :</strong> multi-modes (espèces, carte, Mobile Money), split de note, pourboires.</li>
  <li><strong>Stocks &amp; achats :</strong> inventaires, seuils d'alerte, commandes fournisseurs, calcul de food cost.</li>
  <li><strong>RH :</strong> planning, pointage, calcul de la paie serveurs / cuisiniers.</li>
  <li><strong>Reporting :</strong> chiffre par service, plat le plus vendu, marge par catégorie, comparaison inter-sites.</li>
  <li><strong>Fidélité client :</strong> programme de points, campagnes SMS/WhatsApp, historique de consommation.</li>
</ul>

<h2>Stack technique</h2>
<p>Backend modulaire découpé en services (commande, stock, paiement, reporting) déployés en conteneurs. Front-end réactif React pour les interfaces administrateur et une application dédiée pour les tablettes de service. Base de données PostgreSQL avec réplication, cache Redis pour les opérations critiques. Toute l'infrastructure est pensée pour scaler horizontalement d'un restaurant à un réseau de plusieurs dizaines de sites.</p>

<h2>Où en est le produit</h2>
<p>NEXUS est aujourd'hui en déploiement pilote chez plusieurs restaurateurs partenaires à Yaoundé et Douala. Les premiers retours sont clairs : gain de temps opérationnel de <strong>30 à 40 % sur les tâches administratives</strong>, réduction du gaspillage alimentaire, meilleure visibilité sur les marges réelles par plat.</p>
<p>Détails du projet : <a href="https://barthez-kenwou.dev/projects/1" target="_blank" rel="noopener">NEXUS — fiche projet</a>.</p>

<h2>Ambition</h2>
<p>Faire de NEXUS le standard de fait pour la gestion des restaurants indépendants et des chaînes émergentes en Afrique francophone d'ici 2027. Nous ne voulons pas être "un ERP de plus" — nous voulons être <em>l'outil que chaque restaurateur africain sérieux installe le jour où il décide de professionnaliser son affaire</em>.</p>
`,
    contentEn: `
<h2>Why the restaurant industry deserves a real ERP</h2>
<p>Restaurants are among the hardest businesses to operate: tight margins, perishable stock, volatile staff, local regulations, immediate customer satisfaction. Yet most African restaurateurs — even those doing seven-figure revenues — still run their business between a notebook, an Excel sheet and two WhatsApp groups.</p>
<p>Existing international ERPs (Oracle Micros, Toast, Lightspeed) are either overpriced or unfit for local realities: multiple currencies, unstable connections, mobile payment methods (Mobile Money, Orange Money, MTN MoMo), consumption habits, traditional cuisine not categorized in their catalogs.</p>
<p><strong>NEXUS</strong> was born from that observation. It's a modular ERP, designed and built in Africa, for the operational reality of African restaurants — from the ambitious neighborhood spot to the regional chain.</p>

<h2>Product philosophy</h2>
<h3>Modular by nature</h3>
<p>A 20-seat restaurant doesn't need what a 15-outlet chain needs. NEXUS activates module by module. Start with order-taking, then enable stock, then accounting, then multi-site — without ever switching tools.</p>
<h3>Offline-first</h3>
<p>Power and internet outages are a reality. NEXUS runs entirely offline and syncs when connection returns. No order lost.</p>
<h3>Field-first interface</h3>
<p>Large touch targets, strong contrast, local language available. A waiter can be trained in 20 minutes.</p>

<h2>What NEXUS covers today</h2>
<ul>
  <li><strong>Configuration:</strong> menus, seasonal cards, rooms, table plans, zones (terrace, VIP), opening hours.</li>
  <li><strong>Order-taking:</strong> waiter tablet, self-service kiosk, takeaway, delivery.</li>
  <li><strong>Kitchen:</strong> KDS screens, automatic prioritization, allergen handling.</li>
  <li><strong>Checkout:</strong> multi-mode (cash, card, Mobile Money), bill splitting, tips.</li>
  <li><strong>Stock &amp; purchasing:</strong> inventories, alert thresholds, supplier orders, food cost calculation.</li>
  <li><strong>HR:</strong> scheduling, clock-in, waiter/kitchen payroll.</li>
  <li><strong>Reporting:</strong> revenue per service, top-selling dishes, margin per category, cross-outlet comparison.</li>
  <li><strong>Customer loyalty:</strong> points program, SMS/WhatsApp campaigns, consumption history.</li>
</ul>

<h2>Technical stack</h2>
<p>Modular backend split into services (order, stock, payment, reporting) deployed as containers. Reactive React front-end for admin interfaces and a dedicated app for service tablets. PostgreSQL with replication, Redis cache for critical ops. The whole infrastructure is designed to scale horizontally from one restaurant to a network of dozens.</p>

<h2>Product status</h2>
<p>NEXUS is currently in pilot rollout with several partner restaurateurs in Yaoundé and Douala. Early feedback is clear: <strong>30–40% time saved on admin tasks</strong>, reduced food waste, better visibility on real margins per dish.</p>
<p>Project details: <a href="https://barthez-kenwou.dev/projects/1" target="_blank" rel="noopener">NEXUS — project sheet</a>.</p>

<h2>Ambition</h2>
<p>Make NEXUS the de facto standard for managing independent restaurants and emerging chains in French-speaking Africa by 2027. We don't want to be "yet another ERP" — we want to be <em>the tool every serious African restaurateur installs the day they decide to professionalize their business</em>.</p>
`,
    coverImage: partnerImages.nexus,
    author: { name: 'Équipe ZENORA' },
    category: 'Produits',
    categoryEn: 'Products',
    tags: ['ERP', 'Restauration', 'SaaS', 'Produit'],
    tagsEn: ['ERP', 'Restaurant', 'SaaS', 'Product'],
    publishedAt: '2026-03-28T10:00:00Z',
    readingTime: 12,
    isPublished: true,
  },
  {
    id: '4',
    slug: 'kaza-application-mobile-gestion-immobiliere',
    title: 'KAZA — Une application mobile pour la gestion immobilière africaine',
    titleEn: 'KAZA — A mobile app for African real estate management',
    excerpt: "Simplifier la vie des gestionnaires de biens et des propriétaires : loyers, locataires, incidents, contrats — dans une app mobile-first pensée pour le contexte africain.",
    excerptEn: "Making life easier for property managers and owners: rents, tenants, incidents, contracts — in a mobile-first app built for the African context.",
    content: `
<h2>Le problème que résout KAZA</h2>
<p>En Afrique, la gestion immobilière locative est un chantier permanent. Les propriétaires jonglent entre :</p>
<ul>
  <li>Un cahier pour noter qui a payé le loyer et qui doit encore.</li>
  <li>WhatsApp pour communiquer avec les locataires.</li>
  <li>Un tableau Excel pour les charges.</li>
  <li>Le téléphone du plombier collé sur le frigo pour les incidents.</li>
</ul>
<p>À l'échelle d'un ou deux biens, ça marche. À l'échelle de dix, vingt ou cinquante lots, ça devient un cauchemar. Retards de paiement mal suivis, contrats égarés, interventions oubliées, tensions avec les locataires.</p>
<p><strong>KAZA</strong> est notre réponse : une application mobile qui centralise tout ce qu'un gestionnaire immobilier — professionnel ou particulier — doit piloter au quotidien.</p>

<h2>La philosophie produit</h2>
<h3>Mobile-first, vraiment</h3>
<p>La cible n'est pas assise derrière un ordinateur. Elle est sur le terrain, en visite, en négociation, en tournée de relance. Toute l'app est pensée pour un usage smartphone, à une main, souvent en déplacement.</p>
<h3>Deux profils, une même app</h3>
<p>KAZA sert à la fois le gestionnaire (côté administration) et le locataire (côté transparence). Le locataire voit son historique de paiement, peut déclarer un incident, télécharger son contrat — sans passer par un appel téléphonique.</p>
<h3>Adapté au paiement mobile africain</h3>
<p>Intégration native avec Mobile Money. Le locataire paie son loyer en 3 clics, la transaction est instantanément rapprochée dans le tableau de bord du gestionnaire.</p>

<h2>Fonctionnalités clés</h2>
<ul>
  <li><strong>Portefeuille de biens</strong> — chaque immeuble, chaque lot, chaque contrat centralisé.</li>
  <li><strong>Suivi des loyers</strong> — quittances générées automatiquement, relances programmables, calendrier de paiement.</li>
  <li><strong>Gestion des locataires</strong> — état des lieux photo, contrat digital signé électroniquement, historique complet.</li>
  <li><strong>Incidents &amp; interventions</strong> — le locataire prend une photo, décrit le problème, le gestionnaire assigne à un prestataire, le prestataire clôture avec preuve d'intervention.</li>
  <li><strong>Tableau de bord de rentabilité</strong> — revenu locatif brut/net, taux d'occupation, charges par bien, alertes d'impayés.</li>
  <li><strong>Notifications intelligentes</strong> — jamais spammy, toujours actionnables.</li>
</ul>

<h2>Pour qui</h2>
<ul>
  <li>Le <strong>petit propriétaire</strong> qui gère 2 à 10 lots et veut arrêter de courir après ses loyers.</li>
  <li>Le <strong>gestionnaire indépendant</strong> qui administre le patrimoine de plusieurs propriétaires.</li>
  <li>L'<strong>agence immobilière</strong> qui veut offrir un service digital moderne à ses mandants.</li>
</ul>

<h2>État du projet</h2>
<p>KAZA est en développement actif, avec un premier déploiement pilote prévu à Yaoundé et Douala. La version beta est déjà testée par un panel restreint de gestionnaires partenaires.</p>
<p>Voir les détails du projet : <a href="https://barthez-kenwou.dev/projects/3" target="_blank" rel="noopener">KAZA — fiche projet</a>.</p>

<h2>Notre conviction</h2>
<p>La proptech africaine est en train de naître. Les acteurs qui gagneront ne seront pas ceux qui copient Zillow ou SeLoger — ce seront ceux qui comprennent que le locataire africain paie en cash ou en Mobile Money, que le propriétaire africain est souvent lui aussi son propre gestionnaire, et que la confiance se construit avec une interface honnête, pas avec des artifices marketing. C'est le pari de KAZA.</p>
`,
    contentEn: `
<h2>The problem KAZA solves</h2>
<p>In Africa, rental property management is a permanent construction site. Owners juggle between:</p>
<ul>
  <li>A notebook to track who paid rent and who hasn't.</li>
  <li>WhatsApp to talk to tenants.</li>
  <li>An Excel sheet for charges.</li>
  <li>The plumber's number stuck on the fridge for incidents.</li>
</ul>
<p>At one or two units, it works. At ten, twenty or fifty units, it becomes a nightmare. Late payments poorly tracked, contracts lost, interventions forgotten, tensions with tenants.</p>
<p><strong>KAZA</strong> is our answer: a mobile app that centralizes everything a property manager — professional or individual — needs to run daily.</p>

<h2>Product philosophy</h2>
<h3>Mobile-first, actually</h3>
<p>The target user isn't sitting behind a computer. They're in the field, doing visits, negotiations, collection rounds. The entire app is designed for smartphone use, one-handed, often on the move.</p>
<h3>Two profiles, one app</h3>
<p>KAZA serves both the manager (admin side) and the tenant (transparency side). The tenant sees their payment history, can report an incident, download their contract — without a phone call.</p>
<h3>Built for African mobile payments</h3>
<p>Native Mobile Money integration. The tenant pays rent in 3 clicks, the transaction is instantly reconciled in the manager's dashboard.</p>

<h2>Key features</h2>
<ul>
  <li><strong>Property portfolio</strong> — every building, every unit, every contract centralized.</li>
  <li><strong>Rent tracking</strong> — automatic receipts, scheduled reminders, payment calendar.</li>
  <li><strong>Tenant management</strong> — photo inventory, digitally signed contracts, full history.</li>
  <li><strong>Incidents &amp; interventions</strong> — tenant takes a photo, describes the issue, manager assigns to a contractor, contractor closes with proof.</li>
  <li><strong>Profitability dashboard</strong> — gross/net rental income, occupancy rate, charges per unit, arrears alerts.</li>
  <li><strong>Smart notifications</strong> — never spammy, always actionable.</li>
</ul>

<h2>Who it's for</h2>
<ul>
  <li>The <strong>small landlord</strong> managing 2 to 10 units who wants to stop chasing rent.</li>
  <li>The <strong>independent manager</strong> administrating multiple owners' assets.</li>
  <li>The <strong>real estate agency</strong> wanting to offer a modern digital service to its clients.</li>
</ul>

<h2>Project status</h2>
<p>KAZA is in active development, with an initial pilot rollout planned in Yaoundé and Douala. The beta is already being tested by a select panel of partner managers.</p>
<p>See project details: <a href="https://barthez-kenwou.dev/projects/3" target="_blank" rel="noopener">KAZA — project sheet</a>.</p>

<h2>Our conviction</h2>
<p>African proptech is being born right now. The winners won't be those who copy Zillow or SeLoger — they'll be those who understand that the African tenant pays in cash or Mobile Money, that the African owner is often their own manager, and that trust is built with an honest interface, not marketing artifice. That's KAZA's bet.</p>
`,
    coverImage: projectImages.kaza,
    author: { name: 'Équipe ZENORA' },
    category: 'Produits',
    categoryEn: 'Products',
    tags: ['Mobile', 'Immobilier', 'App', 'Proptech'],
    tagsEn: ['Mobile', 'Real Estate', 'App', 'Proptech'],
    publishedAt: '2026-05-18T10:00:00Z',
    readingTime: 10,
    isPublished: true,
  },
  {
    id: '5',
    slug: 'erp-zenora-360-plateforme-interne',
    title: 'ERP Zenora 360 — L\'outil qui pilote notre agence au quotidien',
    titleEn: 'ERP Zenora 360 — The tool that runs our agency day-to-day',
    excerpt: "Pourquoi nous avons développé notre propre ERP pour piloter projets, clients, ressources, facturation — et pourquoi nous le proposons désormais à d'autres agences.",
    excerptEn: "Why we built our own ERP to run projects, clients, resources, invoicing — and why we now offer it to other agencies.",
    content: `
<h2>Le principe du dogfooding</h2>
<p>Chez ZENORA, nous avons un principe simple : nous ne recommandons jamais à un client une technologie ou une méthode que nous n'utilisons pas nous-mêmes. C'est ce que la Silicon Valley appelle le <em>dogfooding</em> — manger sa propre nourriture.</p>
<p><strong>Zenora 360</strong> est né de cette exigence. Nous avions besoin d'un outil pour piloter notre propre activité — projets clients, pipeline commercial, facturation, trésorerie, gestion des ressources humaines. Plutôt que d'empiler Notion + Trello + Google Sheets + un logiciel de facturation, nous avons construit une plateforme unifiée. Et parce qu'elle nous sert tous les jours en production, nous en connaissons intimement chaque défaut, chaque coin sombre, chaque friction utilisateur — et nous les corrigeons en continu.</p>

<h2>Ce que couvre Zenora 360</h2>
<h3>Module CRM &amp; Commercial</h3>
<ul>
  <li>Fiches clients enrichies (historique de contacts, projets passés, valeur cumulée).</li>
  <li>Pipeline commercial avec étapes personnalisables (prospect → qualifié → devis → signé).</li>
  <li>Devis générés en un clic avec templates réutilisables.</li>
  <li>Taux de conversion et prévisions par commercial.</li>
</ul>
<h3>Module Projet</h3>
<ul>
  <li>Suivi des livrables par sprint.</li>
  <li>Estimation vs. réel — pour apprendre à mieux chiffrer sur chaque nouveau projet.</li>
  <li>Time-tracking par consultant, avec catégorisation (dev, design, meeting client, admin).</li>
  <li>Rentabilité projet calculée en temps réel.</li>
</ul>
<h3>Module Facturation &amp; Trésorerie</h3>
<ul>
  <li>Génération de factures conformes.</li>
  <li>Relances automatiques configurables (J+7, J+15, J+30).</li>
  <li>Rapprochement bancaire semi-automatisé.</li>
  <li>Vue trésorerie prévisionnelle sur 90 jours.</li>
</ul>
<h3>Module RH &amp; Ressources</h3>
<ul>
  <li>Planning des équipes avec vue capacité disponible / affectée.</li>
  <li>Gestion des congés et absences.</li>
  <li>Fiches collaborateurs avec compétences, taux journalier moyen, projets en cours.</li>
</ul>
<h3>Module Admin &amp; Sécurité</h3>
<ul>
  <li>Rôles et permissions granulaires (fondateur, chef de projet, consultant, comptable, lecture seule).</li>
  <li>Journal d'audit complet.</li>
  <li>Sauvegardes automatiques quotidiennes.</li>
</ul>

<h2>Ce que le dogfooding nous a appris</h2>
<p>Utiliser son propre produit en production, c'est se soumettre à un contrôle qualité impitoyable. Chaque friction, chaque bug, chaque écran mal foutu nous saute au visage. Nous itérons vite, parce que nous en sommes les premières victimes. Résultat : l'outil est beaucoup plus mature que si nous l'avions vendu sans jamais l'utiliser.</p>

<h2>Résultats mesurables sur notre agence</h2>
<ul>
  <li><strong>Cycle client raccourci de 30 %</strong> entre premier contact et signature.</li>
  <li><strong>Visibilité complète sur la marge réelle</strong> par projet, par consultant, par typologie de mission.</li>
  <li><strong>Diminution des impayés</strong> grâce aux relances automatiques.</li>
  <li><strong>Onboarding des nouveaux collaborateurs</strong> divisé par 2 grâce à la centralisation de l'information.</li>
</ul>

<h2>Zenora 360 est désormais disponible pour d'autres agences</h2>
<p>Après plus de 18 mois d'usage interne intensif, nous ouvrons progressivement Zenora 360 à d'autres agences digitales, cabinets de conseil et studios créatifs qui reconnaissent leurs problématiques dans les nôtres. Déploiement accompagné, formation incluse, hébergement en Afrique.</p>
<p>Voir la démo publique : <a href="https://erp-dev.zenora360.com/" target="_blank" rel="noopener">erp-dev.zenora360.com</a>.</p>
`,
    contentEn: `
<h2>The dogfooding principle</h2>
<p>At ZENORA, we have a simple principle: we never recommend to a client a technology or method we don't use ourselves. Silicon Valley calls this <em>dogfooding</em> — eating your own food.</p>
<p><strong>Zenora 360</strong> was born from that requirement. We needed a tool to run our own business — client projects, sales pipeline, invoicing, cash flow, HR. Rather than stacking Notion + Trello + Google Sheets + billing software, we built a unified platform. And because it serves us every day in production, we intimately know every flaw, every dark corner, every user friction — and we fix them continuously.</p>

<h2>What Zenora 360 covers</h2>
<h3>CRM &amp; Sales module</h3>
<ul>
  <li>Enriched client records (contact history, past projects, cumulative value).</li>
  <li>Sales pipeline with customizable stages (prospect → qualified → quoted → signed).</li>
  <li>One-click quotes with reusable templates.</li>
  <li>Conversion rates and forecasts per rep.</li>
</ul>
<h3>Project module</h3>
<ul>
  <li>Deliverable tracking per sprint.</li>
  <li>Estimated vs actual — to learn to scope better on every new project.</li>
  <li>Time tracking per consultant, categorized (dev, design, client meeting, admin).</li>
  <li>Real-time project profitability.</li>
</ul>
<h3>Invoicing &amp; Cash flow module</h3>
<ul>
  <li>Compliant invoice generation.</li>
  <li>Configurable automatic reminders (D+7, D+15, D+30).</li>
  <li>Semi-automated bank reconciliation.</li>
  <li>90-day cash flow forecast view.</li>
</ul>
<h3>HR &amp; Resources module</h3>
<ul>
  <li>Team scheduling with available/allocated capacity view.</li>
  <li>Leave and absence management.</li>
  <li>Staff records with skills, average day rate, current projects.</li>
</ul>
<h3>Admin &amp; Security module</h3>
<ul>
  <li>Granular roles and permissions (founder, PM, consultant, accountant, read-only).</li>
  <li>Full audit trail.</li>
  <li>Automatic daily backups.</li>
</ul>

<h2>What dogfooding taught us</h2>
<p>Using your own product in production means submitting to relentless QA. Every friction, every bug, every clunky screen jumps in your face. We iterate fast because we're the first victims. The tool is far more mature than if we'd sold it without ever using it.</p>

<h2>Measurable results in our agency</h2>
<ul>
  <li><strong>Client cycle shortened by 30%</strong> from first contact to signature.</li>
  <li><strong>Full visibility on real margin</strong> per project, per consultant, per mission type.</li>
  <li><strong>Reduced unpaid invoices</strong> thanks to automated reminders.</li>
  <li><strong>New hire onboarding halved</strong> thanks to information centralization.</li>
</ul>

<h2>Zenora 360 is now available for other agencies</h2>
<p>After 18+ months of intensive internal use, we're gradually opening Zenora 360 to other digital agencies, consulting firms and creative studios who recognize their own problems in ours. Guided rollout, training included, hosted in Africa.</p>
<p>See the public demo: <a href="https://erp-dev.zenora360.com/" target="_blank" rel="noopener">erp-dev.zenora360.com</a>.</p>
`,
    coverImage: projectImages.erp,
    author: { name: 'Équipe ZENORA' },
    category: 'Produits',
    categoryEn: 'Products',
    tags: ['ERP', 'SaaS', 'Interne', 'Dogfooding'],
    tagsEn: ['ERP', 'SaaS', 'Internal', 'Dogfooding'],
    publishedAt: '2026-01-30T10:00:00Z',
    readingTime: 11,
    isPublished: true,
  },
  {
    id: '6',
    slug: 'notre-methode-projet-en-5-etapes',
    title: 'Notre méthode : livrer un projet digital en 5 étapes cadrées',
    titleEn: 'Our method: shipping a digital project in 5 framed stages',
    excerpt: "Analyse, solution, développement, déploiement, suivi. Comment nous cadrons chaque mission pour garantir la livraison, respecter le budget et créer de la valeur mesurable.",
    excerptEn: "Analysis, solution, development, deployment, follow-up. How we frame every engagement to guarantee delivery, respect the budget and create measurable value.",
    content: `
<h2>Pourquoi une méthode</h2>
<p>Un projet digital échoue rarement par manque de talent technique. Il échoue presque toujours par manque de cadre : périmètre flou, décisions floues, responsabilités floues. Nous avons donc formalisé une méthode en 5 étapes que nous appliquons sans exception à chaque mission, quels que soient le budget et la typologie du client.</p>
<p>Cette méthode n'est pas rigide — elle est disciplinée. Elle laisse la place à l'itération créative, mais elle sanctuarise les jalons qui garantissent la livraison.</p>

<h2>Étape 1 — Analyse (1 à 2 semaines)</h2>
<p>Avant d'écrire une ligne de code, nous cherchons à comprendre trois choses :</p>
<ul>
  <li><strong>Le contexte métier</strong> — quel problème réel voulons-nous résoudre ? Pour qui ? Avec quel impact business attendu ?</li>
  <li><strong>Les utilisateurs réels</strong> — pas les personas de laboratoire, mais les vraies personnes qui utiliseront le produit dans leur quotidien.</li>
  <li><strong>Les contraintes</strong> — techniques, réglementaires, organisationnelles, budgétaires, temporelles.</li>
</ul>
<p>Livrable : une note de cadrage synthétique validée par le client. Rien n'avance tant que ce document n'est pas signé.</p>

<h2>Étape 2 — Solution (1 à 2 semaines)</h2>
<p>Nous traduisons l'analyse en propositions concrètes :</p>
<ul>
  <li>Cadrage fonctionnel détaillé (parcours, écrans, règles métier).</li>
  <li>Direction artistique (moodboard, palette, typographie, principes d'interaction).</li>
  <li>Architecture technique proposée avec justification des choix.</li>
  <li>Estimation ferme en jours-homme, par lot, avec marges d'incertitude explicites.</li>
</ul>
<p>Livrable : un document de solution validé, une estimation engageante, un planning macro.</p>

<h2>Étape 3 — Développement (variable selon périmètre)</h2>
<p>Nous travaillons en <strong>itérations courtes de 1 à 2 semaines</strong>, avec démo systématique en fin d'itération. Chaque ligne de code est relue par un pair avant d'être fusionnée. Chaque fonctionnalité fait l'objet de tests automatisés sur les parcours critiques.</p>
<p>Le client dispose d'un environnement de recette permanent sur lequel il peut valider au fil de l'eau. Pas de tunnel de plusieurs mois avant de découvrir le résultat.</p>

<h2>Étape 4 — Déploiement (1 semaine)</h2>
<p>Le déploiement n'est pas un événement improvisé — c'est une étape à part entière :</p>
<ul>
  <li>Infrastructure sécurisée, dimensionnée à la charge attendue.</li>
  <li>Pipeline CI/CD automatisé (chaque commit passe par tests, build, déploiement).</li>
  <li>Tests d'acceptation formels signés par le client.</li>
  <li>Documentation d'exploitation transmise à l'équipe cliente.</li>
  <li>Sauvegardes et plan de reprise d'activité en place dès le jour 1.</li>
</ul>

<h2>Étape 5 — Suivi (contrat ouvert, généralement 3 à 12 mois)</h2>
<p>Livrer, ce n'est pas finir. La vraie valeur d'un produit se construit dans les mois qui suivent la mise en ligne :</p>
<ul>
  <li><strong>Support technique</strong> réactif via un canal dédié.</li>
  <li><strong>Mesure d'impact</strong> — nous instrumentons les indicateurs clés définis à l'étape 1 et faisons un point trimestriel.</li>
  <li><strong>Cycle d'amélioration continue</strong> — chaque trimestre, nous priorisons ensemble les évolutions à forte valeur.</li>
</ul>

<h2>Ce que cette méthode change concrètement</h2>
<ul>
  <li><strong>Aucune surprise budgétaire</strong> — le client sait dès la phase 2 combien il va payer.</li>
  <li><strong>Aucune surprise de périmètre</strong> — le document de solution est le contrat de vérité.</li>
  <li><strong>Aucune surprise à la livraison</strong> — le client a validé chaque itération.</li>
  <li><strong>Une relation qui dure</strong> — 80 % de nos clients nous reconfient un deuxième projet dans les 12 mois.</li>
</ul>

<h2>Notre engagement</h2>
<p>Nous refusons les missions dans lesquelles nous ne pouvons pas appliquer cette méthode. C'est une posture exigeante — parfois nous perdons des deals face à des concurrents "plus flexibles". Mais c'est le prix à payer pour livrer, à chaque fois, un produit dont nous sommes fiers et qui crée de la valeur mesurable pour nos clients.</p>
`,
    contentEn: `
<h2>Why a method</h2>
<p>Digital projects rarely fail from lack of technical talent. They almost always fail from lack of framing: fuzzy scope, fuzzy decisions, fuzzy responsibilities. So we formalized a 5-stage method that we apply without exception to every engagement, regardless of budget or client type.</p>
<p>This method is not rigid — it's disciplined. It leaves room for creative iteration, but it protects the milestones that guarantee delivery.</p>

<h2>Stage 1 — Analysis (1 to 2 weeks)</h2>
<p>Before writing a line of code, we seek to understand three things:</p>
<ul>
  <li><strong>The business context</strong> — what real problem are we solving? For whom? With what expected business impact?</li>
  <li><strong>The real users</strong> — not lab personas, but the actual people who will use the product day-to-day.</li>
  <li><strong>The constraints</strong> — technical, regulatory, organizational, budget, time.</li>
</ul>
<p>Deliverable: a concise framing note validated by the client. Nothing moves until that document is signed.</p>

<h2>Stage 2 — Solution (1 to 2 weeks)</h2>
<p>We translate the analysis into concrete proposals:</p>
<ul>
  <li>Detailed functional framing (journeys, screens, business rules).</li>
  <li>Art direction (moodboard, palette, typography, interaction principles).</li>
  <li>Proposed technical architecture with justification.</li>
  <li>Firm estimate in person-days, per lot, with explicit uncertainty margins.</li>
</ul>
<p>Deliverable: a validated solution document, a binding estimate, a macro schedule.</p>

<h2>Stage 3 — Development (variable, scope-dependent)</h2>
<p>We work in <strong>short 1–2 week iterations</strong>, with a systematic demo at the end of each. Every line of code is peer-reviewed before merging. Every feature is covered by automated tests on critical paths.</p>
<p>The client has a permanent staging environment for continuous validation. No months-long tunnel before discovering the result.</p>

<h2>Stage 4 — Deployment (1 week)</h2>
<p>Deployment is not an improvised event — it's a full stage:</p>
<ul>
  <li>Secure infrastructure, sized to expected load.</li>
  <li>Automated CI/CD pipeline (every commit runs tests, build, deploy).</li>
  <li>Formal acceptance tests signed by the client.</li>
  <li>Operations documentation handed over to the client team.</li>
  <li>Backups and disaster recovery plan in place from day 1.</li>
</ul>

<h2>Stage 5 — Follow-up (open contract, typically 3 to 12 months)</h2>
<p>Shipping isn't finishing. A product's real value is built in the months after go-live:</p>
<ul>
  <li><strong>Responsive technical support</strong> via a dedicated channel.</li>
  <li><strong>Impact measurement</strong> — we instrument the key indicators defined in stage 1 and hold a quarterly review.</li>
  <li><strong>Continuous improvement cycle</strong> — every quarter, we jointly prioritize high-value evolutions.</li>
</ul>

<h2>What this method concretely changes</h2>
<ul>
  <li><strong>No budget surprises</strong> — the client knows in stage 2 what they'll pay.</li>
  <li><strong>No scope surprises</strong> — the solution document is the truth contract.</li>
  <li><strong>No delivery surprises</strong> — the client validated every iteration.</li>
  <li><strong>Lasting relationships</strong> — 80% of our clients entrust us with a second project within 12 months.</li>
</ul>

<h2>Our commitment</h2>
<p>We refuse missions where we can't apply this method. It's a demanding stance — sometimes we lose deals to "more flexible" competitors. But it's the price to pay to consistently ship a product we're proud of and that creates measurable value for our clients.</p>
`,
    coverImage: methodShot,
    author: { name: 'Équipe ZENORA' },
    category: 'Méthode',
    categoryEn: 'Method',
    tags: ['Méthode', 'Gestion de projet', 'Livraison', 'Qualité'],
    tagsEn: ['Method', 'Project management', 'Delivery', 'Quality'],
    publishedAt: '2025-12-18T10:00:00Z',
    readingTime: 10,
    isPublished: true,
  },
];

// Attach a default project gallery to each post (cover + related visuals).
// Provides rich media for the "Project gallery" section on /blog/:slug.
const galleryPool = [
  projectImages.ketc,
  projectImages.esopa,
  projectImages.erp,
  projectImages.kaza,
  partnerImages.nexus,
  methodShot,
];
mockPosts.forEach((p, i) => {
  if (!p.gallery || p.gallery.length === 0) {
    const rotated = [...galleryPool.slice(i % galleryPool.length), ...galleryPool.slice(0, i % galleryPool.length)];
    p.gallery = [p.coverImage, ...rotated.filter((u) => u !== p.coverImage)].slice(0, 6);
  }
});


const simulateDelay = (ms: number = 800) =>
  new Promise(resolve => setTimeout(resolve, ms));

type NetworkInformationLike = {
  effectiveType?: string;
};

const checkConnectionSpeed = (): ConnectionStatus => {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  if (!navigator.onLine) return 'offline';
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    }
  }
  return 'online';
};

export const useBlog = () => {
  // Use individual selectors to avoid infinite re-render loops
  const posts = useBlogStore(s => s.posts);
  const currentPost = useBlogStore(s => s.currentPost);
  const isLoading = useBlogStore(s => s.isLoading);
  const isLoadingMore = useBlogStore(s => s.isLoadingMore);
  const error = useBlogStore(s => s.error);
  const connectionStatus = useBlogStore(s => s.connectionStatus);
  const currentPage = useBlogStore(s => s.currentPage);
  const totalPages = useBlogStore(s => s.totalPages);
  const totalPosts = useBlogStore(s => s.totalPosts);
  const limit = useBlogStore(s => s.limit);
  const filters = useBlogStore(s => s.filters);

  // Get actions (these are stable references in zustand)
  const setPosts = useBlogStore(s => s.setPosts);
  const appendPosts = useBlogStore(s => s.appendPosts);
  const setCurrentPost = useBlogStore(s => s.setCurrentPost);
  const addPost = useBlogStore(s => s.addPost);
  const storeUpdatePost = useBlogStore(s => s.updatePost);
  const storeDeletePost = useBlogStore(s => s.deletePost);
  const setLoading = useBlogStore(s => s.setLoading);
  const setLoadingMore = useBlogStore(s => s.setLoadingMore);
  const setError = useBlogStore(s => s.setError);
  const setConnectionStatus = useBlogStore(s => s.setConnectionStatus);
  const setFilters = useBlogStore(s => s.setFilters);
  const clearCache = useBlogStore(s => s.clearCache);
  const isCacheValid = useBlogStore(s => s.isCacheValid);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Monitor connection status
  useEffect(() => {
    const update = () => setConnectionStatus(checkConnectionSpeed());
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, [setConnectionStatus]);

  const lastFiltersRef = useRef<string>('');

  const fetchPosts = useCallback(async (requestFilters?: BlogFilters, forceRefresh = false) => {
    const filtersKey = JSON.stringify(requestFilters || {});
    const filtersChanged = filtersKey !== lastFiltersRef.current;
    
    if (!forceRefresh && !filtersChanged && isCacheValid() && posts.length > 0) return;
    lastFiltersRef.current = filtersKey;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/blogs', {
        params: {
          page: requestFilters?.page || 1,
          limit: requestFilters?.limit || limit,
          category: requestFilters?.category,
          search: requestFilters?.search,
        },
        signal: abortControllerRef.current.signal,
      });
      const { data, total, page, totalPages: tp } = response.data;
      setPosts(data, total, page, tp);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'CanceledError') return;
      if (typeof err === 'object' && err !== null && 'name' in err && (err as { name?: string }).name === 'CanceledError') return;
      console.log('API unavailable, using mock data');
      await simulateDelay(400);

      // Use store posts (includes admin-created ones) + mock posts as base
      const storePosts = useBlogStore.getState().posts;
      const allPosts = [...mockPosts];
      // Merge store posts that aren't in mockPosts
      storePosts.forEach(sp => {
        if (!allPosts.find(mp => mp.id === sp.id)) {
          allPosts.unshift(sp);
        }
      });

      let filtered = [...allPosts];
      if (requestFilters?.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === requestFilters.category!.toLowerCase());
      }
      if (requestFilters?.search) {
        const s = requestFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(s) ||
          p.excerpt.toLowerCase().includes(s) ||
          (p.titleEn && p.titleEn.toLowerCase().includes(s)) ||
          (p.excerptEn && p.excerptEn.toLowerCase().includes(s))
        );
      }
      filtered = filtered.filter(p => p.isPublished);
      filtered.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );

      const pg = requestFilters?.page || 1;
      const lm = requestFilters?.limit || limit;
      const start = (pg - 1) * lm;
      const paginated = filtered.slice(start, start + lm);
      setPosts(paginated, filtered.length, pg, Math.ceil(filtered.length / lm));
    } finally {
      setLoading(false);
    }
  }, [posts.length, limit, isCacheValid, setPosts, setLoading, setError]);

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || currentPage >= totalPages) return;
    setLoadingMore(true);
    try {
      const response = await api.get('/blogs', { params: { page: currentPage + 1, limit, ...filters } });
      appendPosts(response.data.data);
    } catch {
      await simulateDelay();
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * limit;
      const newPosts = mockPosts.filter(p => p.isPublished).slice(start, start + limit);
      if (newPosts.length > 0) appendPosts(newPosts);
    } finally {
      setLoadingMore(false);
    }
  }, [isLoadingMore, currentPage, totalPages, limit, filters, appendPosts, setLoadingMore]);

  const fetchPostBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/blog/${slug}`);
      setCurrentPost(response.data);
      return response.data;
    } catch {
      await simulateDelay();
      const post = mockPosts.find(p => p.slug === slug);
      if (post) { setCurrentPost(post); return post; }
      else { setError('Article non trouvé'); return null; }
    } finally {
      setLoading(false);
    }
  }, [setCurrentPost, setLoading, setError]);

  const fetchAllPostsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/blogs');
      const data = response.data.data || response.data;
      setPosts(data, data.length, 1, 1);
      return data;
    } catch {
      await simulateDelay();
      setPosts(mockPosts, mockPosts.length, 1, 1);
      return mockPosts;
    } finally {
      setLoading(false);
    }
  }, [setPosts, setLoading, setError]);

  const createPost = useCallback(async (data: BlogFormData): Promise<BlogPost | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/admin/blogs', data);
      addPost(response.data);
      return response.data;
    } catch {
      await simulateDelay();
      const newPost: BlogPost = {
        id: String(Date.now()),
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        ...data,
        author: { name: 'ZENORA Team' },
        publishedAt: new Date().toISOString(),
        readingTime: Math.ceil(data.content.split(' ').length / 200),
      };
      addPost(newPost);
      return newPost;
    } finally {
      setLoading(false);
    }
  }, [addPost, setLoading, setError]);

  const updatePost = useCallback(async (id: string, data: Partial<BlogFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/admin/blogs/${id}`, data);
      storeUpdatePost(id, { ...data, updatedAt: new Date().toISOString() });
      return true;
    } catch {
      await simulateDelay();
      storeUpdatePost(id, { ...data, updatedAt: new Date().toISOString() });
      return true;
    } finally {
      setLoading(false);
    }
  }, [storeUpdatePost, setLoading, setError]);

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/blogs/${id}`);
      storeDeletePost(id);
      return true;
    } catch {
      await simulateDelay();
      storeDeletePost(id);
      return true;
    } finally {
      setLoading(false);
    }
  }, [storeDeletePost, setLoading, setError]);

  const togglePublish = useCallback(async (id: string, isPublished: boolean): Promise<boolean> => {
    return updatePost(id, { isPublished });
  }, [updatePost]);

  return {
    posts, currentPost, isLoading, isLoadingMore, error, connectionStatus,
    currentPage, totalPages, totalPosts,
    hasMore: currentPage < totalPages,
    fetchPosts, loadMorePosts, fetchPostBySlug, fetchAllPostsAdmin,
    createPost, updatePost, deletePost, togglePublish,
    setFilters, clearCache,
  };
};
