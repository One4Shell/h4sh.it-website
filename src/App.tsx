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
import { ThreeBackground } from './components/ThreeBackground';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ContactSection } from './components/ContactSection';
import { Logo } from './components/Logo';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center px-6 py-24 md:px-24 lg:px-48 ${className}`}>
    {children}
  </section>
);

const Card = ({ title, description, icon: Icon, items }: { title: string, description: string, icon: any, items?: string[] }) => (
  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 backdrop-blur-sm">
    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-emerald-400" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasConsent, setHasConsent] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && hasConsent) {
      setStatus('loading');
      try {
        // Simulating a POST request to /api/subscribe
        // In a real scenario, this would be:
        // const response = await fetch('/api/subscribe', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email })
        // });
        // if (!response.ok) throw new Error('Subscription failed');
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, we'll succeed
        setStatus('success');
        setEmail('');
        setHasConsent(false);
        setTimeout(() => setStatus('idle'), 5000);
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

    // Parallax effect for Three.js background
    gsap.to("#three-bg", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      },
      y: -250,
      ease: "none"
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-black text-zinc-100 selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Helmet>
        <title>h4sh | AI Automation & Software Development</title>
        <meta name="description" content="Trasformiamo la complessità tecnologica in semplicità operativa. Soluzioni software intelligenti e infrastrutture digitali scalabili." />
        <meta name="keywords" content="AI, Automation, Software Development, h4sh, Lorenzo Fornara, Digital Infrastructure, Scalable Solutions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://h4shell.it/" />
        <meta property="og:title" content="h4sh | AI Automation & Software Development" />
        <meta property="og:description" content="Trasformiamo la complessità tecnologica in semplicità operativa. Soluzioni software intelligenti e infrastrutture digitali scalabili." />
        <meta property="og:image" content="https://h4shell.it/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://h4shell.it/" />
        <meta property="twitter:title" content="h4sh | AI Automation & Software Development" />
        <meta property="twitter:description" content="Trasformiamo la complessità tecnologica in semplicità operativa. Soluzioni software intelligenti e infrastrutture digitali scalabili." />
        <meta property="twitter:image" content="https://h4shell.it/og-image.png" />
      </Helmet>
      <ThreeBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-emerald-500" />
          <span className="font-bold text-xl tracking-tighter uppercase">h4sh</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400 uppercase tracking-widest">
          <a href="#vision" className="hover:text-emerald-400 transition-colors">Vision</a>
          <a href="#servizi" className="hover:text-emerald-400 transition-colors">Servizi</a>
          <a href="#pmi" className="hover:text-emerald-400 transition-colors">PMI</a>
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
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Zap className="w-3 h-3 fill-current" />
          AI Automation & Software Development
        </motion.div>
        <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
          Trasformiamo la <span className="text-emerald-500">complessità</span> in semplicità.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Benvenuti nel profilo ufficiale di h4sh, la realtà innovativa fondata da Lorenzo Fornara dedicata alla progettazione di soluzioni software intelligenti.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="#contatti-booking" className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all group">
            Inizia il Progetto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#servizi" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all">
            Scopri di più
          </a>
        </div>
      </Section>

      {/* Vision Section */}
      <Section id="vision" className="bg-zinc-950/50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Visione Democratica.</h2>
            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              In h4sh, crediamo che l'Intelligenza Artificiale non debba essere un privilegio per pochi colossi tecnologici, ma uno strumento democratico e tangibile per ogni realtà imprenditoriale.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
              La nostra visione è un'Italia produttiva dove l'automazione non sostituisce l'uomo, ma lo libera dalle mansioni ripetitive, permettendogli di tornare a focalizzarsi sulla creatività e sulla strategia.
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Cosa Facciamo.</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Nata nel 2024 a Bordighera, h4sh integra l'innovazione digitale direttamente nei flussi di lavoro attraverso tre pilastri fondamentali.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="reveal">
            <Card 
              icon={Cpu}
              title="Automazione AI"
              description="Non ci limitiamo a fornire strumenti, ma riprogettiamo il modo in cui lavori."
              items={[
                "Agenti Autonomi Intelligenti",
                "Workflow Optimization (LLM & Vision)",
                "Analisi Predittiva Strategica"
              ]}
            />
          </div>
          <div className="reveal">
            <Card 
              icon={Code}
              title="Sviluppo Software"
              description="Costruiamo fondamenta digitali robuste, moderne e scalabili."
              items={[
                "Web Application ad alte prestazioni",
                "Architetture Tailor-made",
                "UI/UX focalizzata sull'efficienza"
              ]}
            />
          </div>
          <div className="reveal">
            <Card 
              icon={Server}
              title="Infrastruttura"
              description="Garantiamo che il tuo business digitale poggi su basi solide e sicure."
              items={[
                "Progettazione Cloud Scalabile",
                "Ottimizzazione Sicurezza",
                "Manutenzione Evolutiva Costante"
              ]}
            />
          </div>
        </div>
      </Section>

      {/* PMI Section */}
      <Section id="pmi" className="bg-zinc-950/50">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
            🇮🇹 Al servizio delle PMI Italiane
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Portiamo la Silicon Valley nel tuo distretto.</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Democratizzazione</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Rendiamo accessibili tecnologie d'avanguardia senza la necessità di reparti IT mastodontici.</p>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Efficienza</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Automatizziamo la gestione documentale riducendo drasticamente l'errore umano.</p>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Alfabetizzazione</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Accompagniamo le PMI in un percorso di crescita, rendendo l'AI il miglior collaboratore.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Perché scegliere h4sh?</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Esperienza Locale, Visione Globale</h3>
                  <p className="text-zinc-400">Da Bordighera serviamo l'intera Italia con standard tecnologici internazionali.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Focus sul Risultato</h3>
                  <p className="text-zinc-400">Ogni riga di codice è scritta per generare un ritorno sull'investimento chiaro e misurabile.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Approccio Sartoriale</h3>
                  <p className="text-zinc-400">Nessuna soluzione standard; ogni progetto è cucito sulle specifiche necessità del cliente.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal bg-emerald-500 p-12 rounded-3xl text-black">
            <div className="mb-12">
              <Zap className="w-12 h-12 fill-black mb-6" />
              <blockquote className="text-3xl font-bold leading-tight">
                "Il nostro obiettivo non è solo scrivere codice, ma creare sistemi che rendano il tempo il bene più prezioso dei nostri clienti."
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ottieni il <span className="text-emerald-500">20% di sconto</span>.</h2>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
            Unisciti alla nostra community e ricevi subito un codice sconto di benvenuto per la tua prima automazione o progetto software.
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
              Trasformiamo la complessità tecnologica in semplicità operativa. Soluzioni software intelligenti e infrastrutture digitali scalabili.
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
              <li>lorenzo.fornara@h4shell.it</li>
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

      <AnimatePresence>
        <PrivacyPolicy 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </AnimatePresence>
    </div>
  );
}
