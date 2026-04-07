import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-400' : 'text-zinc-300 group-hover:text-white'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`shrink-0 ml-4 ${isOpen ? 'text-emerald-400' : 'text-zinc-500'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "Cos'è h4sh e come aiuta il mio studio professionale?",
      answer: "h4sh crea sistemi automatici personalizzati per studi professionali. In pratica, facciamo in modo che il lavoro noioso e ripetitivo (come inserire fatture, cercare documenti o smistare email) venga fatto da un sistema informatico invece che da te o dai tuoi collaboratori. Non vendiamo software, vendiamo tempo recuperato."
    },
    {
      question: "Devo imparare a usare nuovi programmi o piattaforme?",
      answer: "Assolutamente no. Il sistema lavora in background collegandosi agli strumenti che già usi: Email, Excel, Google Drive o il tuo gestionale. Tu continui a lavorare come sempre, ma trovi il lavoro già fatto."
    },
    {
      question: "I miei dati e quelli dei miei clienti sono al sicuro?",
      answer: "La sicurezza è fondamentale. Usiamo standard bancari e crittografia AES-256. I tuoi dati rimangono di tua esclusiva proprietà e non vengono mai usati per addestrare modelli pubblici. Tutto avviene in ambienti blindati e conformi al GDPR."
    },
    {
      question: "Quali sono i vantaggi concreti in termini di tempo e costi?",
      answer: "I nostri clienti recuperano mediamente tra le 15 e le 25 ore al mese. Questo significa eliminare gli straordinari, ridurre gli errori manuali e avere più tempo per i clienti o per la propria vita privata. Il sistema costa meno di un dipendente part-time e lavora 24 ore su 24."
    },
    {
      question: "Quanto tempo richiede l'attivazione di un sistema?",
      answer: "Il processo è rapido. Dopo una call conoscitiva di 15 minuti, l'implementazione del tuo sistema personalizzato richiede solitamente dai 7 ai 14 giorni. Una volta attivo, il sistema inizia a lavorare immediatamente."
    },
    {
      question: "h4sh sostituisce il personale del mio studio?",
      answer: "No, h4sh potenzia il tuo team. Liberando i collaboratori dai compiti meccanici e ripetitivi, permetti loro di concentrarsi su attività più importanti che richiedono sensibilità umana e strategia. Eliminiamo lo stress delle scartoffie per tutti."
    }
  ];

  // Structured Data for SEO (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="min-h-screen relative flex flex-col justify-center px-6 py-24 md:px-24 lg:px-48 bg-zinc-950/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8 reveal">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">Domande Frequenti.</h2>
        </div>
        
        <p className="text-xl text-zinc-400 mb-12 reveal leading-relaxed">
          Tutto quello che devi sapere su come h4sh trasforma il caos in ordine invisibile.
        </p>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 reveal">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-zinc-500 mb-6 uppercase tracking-widest text-xs font-bold">Hai altre domande?</p>
          <a 
            href="#contatti-booking" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold"
          >
            Parla con un esperto h4sh
          </a>
        </div>
      </div>
    </section>
  );
};
