import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Cpu, 
  Code, 
  Server, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  TrendingUp, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ContactSection } from './components/ContactSection';
import { Logo } from './components/Logo';
import { AIGenerator } from './components/AIGenerator';
import { CaseStudies } from './components/CaseStudies';
import { FAQSection } from './components/FAQSection';
import { Chatbot } from './components/Chatbot';
import { CustomCursor } from './components/CustomCursor';
import { HeroVideoBackground } from './components/HeroVideoBackground';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen relative flex flex-col justify-center px-6 py-24 md:px-24 lg:px-48 ${className}`}>
    {children}
  </section>
);

const Card = ({ title, description, icon: Icon, items }: { title: string, description: string, icon: any, items?: string[] }) => (
  <div className="group p-8 rounded-3xl glass-card">
    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-emerald-400" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-zinc-400 mb-6 leading-relaxed">{description}</p>
    {items && (
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/50 mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'landing' | 'generator' | 'casestudies'>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasConsent, setHasConsent] = useState(false);

  async function fetchPost(email){
    const response = await fetch('/api/index.php', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ "email": email })
         });
         return await response.json()
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && hasConsent) {
      setStatus('loading');
      try {
        // Simulating a POST request to /api/subscribe
        // In a real scenario, this would be:
        
        const api_res = await fetchPost(email);

        // if (!response.ok) throw new Error('Subscription failed');        
        // For demo purposes, we'll succeed
        if (api_res.result === 1){
          setStatus('success');
        } else {
          setStatus('error');
        }
        

        setEmail('');
        setHasConsent(false);
      } catch (error) {
        console.error('Subscription error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    }
  };

  useGSAP(() => {
    // Hero animations
    gsap.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Scroll reveal animations
    const revealElements = gsap.utils.toArray(".reveal");
    revealElements.forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-black text-zinc-100 selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Helmet>
        <title>
          {view === 'generator' ? 'Generatore di Protocolli AI | h4sh' : 
           view === 'casestudies' ? 'Casi Studio e Risultati | h4sh' : 
           'h4sh | Il tuo studio, in perfetto ordine'}
        </title>
        <meta name="description" content="h4sh si integra nel tuo flusso di lavoro esistente. Inizia a risparmiare tempo dal primo giorno, senza imparare nulla. Automazione AI per studi professionali." />
        <meta name="keywords" content="h4sh, Lorenzo Fornara, efficienza studio professionale, automazione documenti, tranquillità professionale, AI per avvocati, automazione per commercialisti, protocolli di ordine invisibile, ottimizzazione processi professionali, intelligenza artificiale studi legali, risparmio tempo professionisti" />
        <meta name="author" content="h4sh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://h4sh.it/${view !== 'landing' ? view : ''}`} />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://h4sh.it/" />
        <meta property="og:site_name" content="h4sh" />
        <meta property="og:title" content="h4sh | Il tuo studio, in perfetto ordine" />
        <meta property="og:description" content="Recupera 15 ore al mese. h4sh mette in ordine il tuo studio senza che tu debba toccare un tasto nuovo. Automazione invisibile per professionisti." />
        <meta property="og:image" content="https://h4sh.it/og-image.png" />
        <meta property="og:locale" content="it_IT" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://h4sh.it/" />
        <meta property="twitter:title" content="h4sh | AI Automation & Software Development" />
        <meta property="twitter:description" content="Trasformiamo la complessità tecnologica in semplicità operativa. Soluzioni software intelligenti e infrastrutture digitali scalabili." />
        <meta property="twitter:image" content="https://h4sh.it/og-image.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "h4sh",
            "url": "https://h4sh.it/",
            "logo": "https://h4sh.it/logo.svg",
            "description": "h4sh automatizza i flussi di lavoro burocratici per studi professionali utilizzando l'intelligenza artificiale.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IT"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "info@h4sh.it"
            }
          })}
        </script>
      </Helmet>

      {view === 'generator' ? (
        <div className="relative">
          <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-emerald-500" />
              <span className="font-bold text-xl tracking-tighter uppercase">h4sh</span>
            </div>
            <button 
              onClick={() => setView('landing')}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <X size={16} /> Chiudi Generatore
            </button>
          </nav>
          <AIGenerator />
        </div>
      ) : view === 'casestudies' ? (
        <div className="relative">
          <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-emerald-500" />
              <span className="font-bold text-xl tracking-tighter uppercase">h4sh</span>
            </div>
            <button 
              onClick={() => setView('landing')}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <X size={16} /> Chiudi Casi Studio
            </button>
          </nav>
          <CaseStudies onBack={() => setView('landing')} />
        </div>
      ) : (
        <>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-emerald-500" />
          <span className="font-bold text-xl tracking-tighter uppercase">h4sh</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400 uppercase tracking-widest">
          <a href="#vision" className="hover:text-emerald-400 transition-colors">Cosa Facciamo</a>
          <a href="#servizi" className="hover:text-emerald-400 transition-colors">Servizi</a>
          <button 
            onClick={() => setView('casestudies')}
            className="hover:text-emerald-400 transition-colors uppercase tracking-widest"
          >
            Casi Studio
          </button>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          <a href="#contatti-booking" className="px-5 py-2 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 transition-colors">Contattaci</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 border-l border-white/10 z-[70] p-12 flex flex-col md:hidden"
            >
              <button 
                className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col gap-8 mt-12">
                <a 
                  href="#vision" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-emerald-400 transition-colors"
                >
                  Vision
                </a>
                <a 
                  href="#servizi" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-emerald-400 transition-colors"
                >
                  Servizi
                </a>
                <button 
                  onClick={() => {
                    setView('casestudies');
                    setIsMenuOpen(false);
                  }}
                  className="text-3xl font-bold hover:text-emerald-400 transition-colors text-left"
                >
                  Casi Studio
                </button>
                <a 
                  href="#faq" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-emerald-400 transition-colors"
                >
                  FAQ
                </a>
                <a 
                  href="#pmi" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-emerald-400 transition-colors"
                >
                  PMI
                </a>
                <a 
                  href="#contatti-booking" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-emerald-500"
                >
                  Contattaci
                </a>
              </div>

              <div className="mt-auto pt-12 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-black text-xs">h</div>
                  <span className="font-bold tracking-tighter uppercase text-sm">h4sh</span>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">
                  Bordighera, Italia
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <Section className="hero-content">
        <HeroVideoBackground />
        <div className="relative z-10">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap className="w-3 h-3 fill-current" />
            Il tuo assistente invisibile
          </motion.div>
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-gradient">
            Riprenditi il tuo <span className="text-emerald-500">tempo</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
            h4sh si integra nel tuo flusso di lavoro esistente. Inizia a risparmiare tempo dal primo giorno, senza imparare nulla.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => setView('generator')}
              className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all group shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Configura il tuo Protocollo <Zap className="w-5 h-5 fill-current" />
            </button>
            <a href="#contatti-booking" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Inizia il Progetto <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Section>

      {/* Vision Section */}
      <Section id="vision" className="bg-zinc-950/50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-gradient">L'automazione per il tuo business.</h2>
            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Niente da installare, niente da imparare. Grazie alle nostre soluzioni ti occuperai solo della tua professione, lasciando a noi lo stress.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
              La nostra missione è liberare i professionisti dalla burocrazia manuale, restituendo loro tempo, tranquillità e la percezione di un lavoro d'élite. Entrerà h4sh, non entrerà il caos.
            </p>
          </div>
          <div className="reveal relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-emerald-500/30 animate-pulse flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-emerald-500/50 flex items-center justify-center">
                  <Cpu className="w-12 h-12 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="servizi">
        <div className="text-center mb-24 reveal">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">I Protocolli h4sh.</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Soluzioni chiuse, pensate per risolvere problemi specifici senza che tu debba cambiare il tuo modo di lavorare.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="reveal">
            <Card 
              icon={Cpu}
              title="Commercialista Autopilota"
              description="Giornate intere perse a estrarre dati dalle fatture? h4sh le legge e le trascrive per te."
              items={[
                "Recupero di 15 ore al mese",
                "Zero errori di trascrizione",
                "Integrazione con il tuo Excel"
              ]}
            />
          </div>
          <div className="reveal">
            <Card 
              icon={Code}
              title="L'Archivio che Parla"
              description="Trova clausole specifiche in contratti di anni fa in pochi secondi, non giorni."
              items={[
                "Risposte immediate ai clienti",
                "Memoria storica infallibile",
                "Ambiente blindato e sicuro"
              ]}
            />
          </div>
          <div className="reveal">
            <Card 
              icon={Server}
              title="Visita Senza Carta"
              description="Per medici e specialisti: referti compilati automaticamente dai tuoi appunti."
              items={[
                "Zero cartelle portate a casa",
                "Lettere formali già pronte",
                "Focus totale sul paziente"
              ]}
            />
          </div>
        </div>
      </Section>

      {/* PMI Section */}
      <Section id="pmi" className="bg-zinc-950/50">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
            🇮🇹 Al servizio dei professionisti italiani
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Smetti di essere l'impiegato di te stesso.</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Tranquillità</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Eliminiamo l'ansia da errore manuale. h4sh ricontrolla tutto tre volte, con precisione chirurgica.</p>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Prestigio</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">I tuoi clienti riceveranno risposte in tempo reale. Penseranno che tu abbia assunto un team d'élite.</p>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Semplicità</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Non devi imparare nulla. Continua a usare la tua email e il tuo Excel. Al resto pensiamo noi.</p>
            </div>
          </div>
        </div>
      </Section>

      <FAQSection />

      {/* Why Choose Us */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Perché h4sh?</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Zero interruzioni</h3>
                  <p className="text-zinc-400">Non ti vendiamo un programma da imparare, ma il risultato finale già pronto.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Focus sul Valore</h3>
                  <p className="text-zinc-400">Torna a fare consulenza di alto livello. Alle scartoffie ci pensa il sistema h4sh.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Approccio Sartoriale</h3>
                  <p className="text-zinc-400">Nessuna soluzione standard; ogni protocollo è cucito sulle tue specifiche necessità.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal bg-emerald-500 p-12 rounded-3xl text-black">
            <div className="mb-12">
              <Zap className="w-12 h-12 fill-black mb-6" />
              <blockquote className="text-3xl font-bold leading-tight">
                "Il nostro obiettivo non è scrivere codice, ma creare sistemi che rendano il tempo il bene più prezioso dei nostri clienti."
              </blockquote>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center font-bold">LF</div>
              <div>
                <div className="font-bold">Lorenzo Fornara</div>
                <div className="text-sm opacity-70">Founder, h4sh</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter / Discount Section */}
      <Section className="bg-emerald-500/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 mx-auto">
            <Zap className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Abbonati alla <span className="text-emerald-500">Tranquillità</span>.</h2>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
            Unisciti alla nostra community di professionisti e scopri come eliminare per sempre il caos dal tuo studio.
          </p>
          
          <form onSubmit={handleSubscribe} className="relative max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input 
                type="email" 
                required
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-white"
              />
              <button 
                type="submit"
                disabled={!hasConsent || status === 'loading'}
                className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  'Ottieni lo Sconto'
                )}
              </button>
            </div>

            <div className="flex items-start gap-3 text-left">
              <input 
                type="checkbox" 
                id="consent"
                required
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-black transition-all cursor-pointer"
              />
              <label htmlFor="consent" className="text-sm text-zinc-500 leading-tight cursor-pointer select-none">
                Acconsento al trattamento dei dati personali secondo la <button type="button" onClick={() => setIsPrivacyOpen(true)} className="text-emerald-500 hover:underline">Privacy Policy</button>. Riceverai il codice sconto e aggiornamenti periodici.
              </label>
            </div>
            
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 w-full mt-4 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium"
                >
                  🎉 Grazie! Controlla la tua email per il codice sconto.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 w-full mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium"
                >
                  ❌ Si è verificato un errore. Riprova più tardi.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          
          <p className="mt-12 text-zinc-500 text-xs uppercase tracking-widest">
            Nessun spam. Solo innovazione e aggiornamenti tecnologici.
          </p>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contatti-booking" className="bg-zinc-950/30">
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Prenota una <span className="text-emerald-500">Consulenza</span>.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Scegli l'orario che preferisci per una call conoscitiva di 15 minuti. Analizzeremo insieme le tue necessità.
            </p>
          </div>
          <ContactSection />
        </div>
      </Section>
      {/* Footer */}
      <footer id="contatti" className="px-6 py-24 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Logo className="w-8 h-8 text-emerald-500" />
              <span className="font-bold text-xl tracking-tighter uppercase">h4sh</span>
            </div>
            <p className="text-zinc-400 max-w-sm mb-8">
              Trasformiamo il caos in ordine invisibile. Soluzioni d'élite per professionisti che vogliono riprendersi il proprio tempo.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                <Globe className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                <Shield className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-500">Contatti</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li>Bordighera, Italia</li>
              <li>h4shell@gmail.it</li>
              <li>
                <button 
                  onClick={() => setView('casestudies')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Casi Studio
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-500">Legal</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li>
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-left hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs uppercase tracking-widest">
          <span>© 2026 h4sh. Tutti i diritti riservati.</span>
          <span className="flex items-center gap-2">Made with <Zap className="w-3 h-3 text-emerald-500 fill-current" /> in Bordighera</span>
        </div>
      </footer>

      </>
      )}

      <AnimatePresence>
        <PrivacyPolicy 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </AnimatePresence>

      <Chatbot />
      <CustomCursor />
    </div>
  );
}
