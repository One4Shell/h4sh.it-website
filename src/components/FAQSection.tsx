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
      answer: "h4sh è un partner tecnologico d'élite specializzato nell'implementazione di 'Protocolli di Ordine Invisibile'. A differenza delle comuni agenzie di AI, non ti vendiamo un software da imparare, ma un risultato: automatizziamo i tuoi flussi di lavoro burocratici (gestione email, archiviazione, data entry) in modo che tu possa trovare il lavoro già fatto senza cambiare le tue abitudini."
    },
    {
      question: "Devo imparare a usare nuovi programmi o piattaforme?",
      answer: "Assolutamente no. La filosofia di h4sh è l'integrazione invisibile. I nostri sistemi lavorano dietro le quinte interfacciandosi con gli strumenti che già utilizzi quotidianamente, come la tua Email, Excel, Dropbox o Google Drive. Tu continui a lavorare come hai sempre fatto, ma con la tranquillità di un assistente instancabile che gestisce la parte meccanica."
    },
    {
      question: "I miei dati e quelli dei miei clienti sono al sicuro?",
      answer: "La sicurezza è il nostro pilastro fondamentale. Utilizziamo esclusivamente ambienti crittografati e blindati. I dati processati dai Protocolli h4sh non vengono mai utilizzati per addestrare modelli pubblici e rimangono di tua esclusiva proprietà all'interno del tuo perimetro digitale. Rispettiamo i più alti standard di privacy per garantire la massima tutela del segreto professionale."
    },
    {
      question: "Quali sono i vantaggi concreti in termini di tempo e costi?",
      answer: "I professionisti che adottano h4sh recuperano mediamente tra le 10 e le 20 ore al mese di tempo non fatturabile. Questo si traduce in un risparmio economico diretto e, soprattutto, in un aumento della qualità della vita e della proattività verso i clienti. Eliminiamo l'errore umano e aumentiamo il prestigio del tuo studio grazie a risposte e conferme immediate."
    },
    {
      question: "Quanto tempo richiede l'attivazione di un Protocollo?",
      answer: "Il processo è rapido e non invasivo. Dopo una call conoscitiva di 15 minuti per analizzare le tue necessità, l'implementazione e l'attivazione di un Protocollo h4sh personalizzato richiedono solitamente dai 7 ai 14 giorni lavorativi. Una volta attivo, il sistema inizia a lavorare immediatamente in autonomia."
    },
    {
      question: "h4sh sostituisce il personale del mio studio?",
      answer: "No, h4sh potenzia il tuo team. Liberando i tuoi collaboratori dai compiti ripetitivi, meccanici e a basso valore aggiunto, permetti loro di concentrarsi su attività che richiedono sensibilità umana, strategia e consulenza di alto livello. h4sh elimina la 'schiavitù delle scartoffie' per tutti i membri dello studio."
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
