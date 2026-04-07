import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Clock, Target, TrendingUp, Zap } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string;
  problem: string;
  solution: string;
  keyResult: string;
  content: React.ReactNode;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'architetto',
    title: "Recupero di 10 ore a settimana per uno studio di architettura.",
    client: "Marco T. - Studio di Architettura",
    sector: "Architettura e Progettazione",
    problem: "Marco perdeva 90 minuti ogni mattina a smistare email e salvare allegati nelle cartelle giuste.",
    solution: "Sistema automatico che riconosce i progetti e archivia i file al posto dell'architetto.",
    keyResult: "Tempo di archiviazione azzerato. Marco ora inizia a progettare subito.",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Problema</h3>
          <p className="text-zinc-400 leading-relaxed">
            Marco è un architetto pagato per la sua creatività, ma passava <strong>90 minuti ogni mattina</strong> a fare il lavoro di un impiegato: scaricare file, rinominarli e spostarli su Dropbox. Questa micro-frizione gli rubava energia mentale e tempo prezioso.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Soluzione h4sh</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Abbiamo creato un sistema invisibile che monitora la sua email e gestisce i file in autonomia.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Riconoscimento automatico del progetto",
              "Salvataggio immediato su Dropbox",
              "Nomenclatura file standardizzata",
              "Conferma automatica di ricezione al cliente"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  },
  {
    id: 'avvocato',
    title: "12 ore recuperate ogni settimana eliminando il copia-incolla.",
    client: "Avv. Laura B.",
    sector: "Legale",
    problem: "L'avvocato Laura passava i pomeriggi a trascrivere dati dai PDF delle pratiche in un foglio Excel.",
    solution: "Sistema di lettura automatica che estrae i dati dai documenti e popola il database.",
    keyResult: "Inserimento dati automatico. Laura ha smesso di fare l'impiegata e ha ripreso a fare l'avvocato.",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Problema</h3>
          <p className="text-zinc-400 leading-relaxed">
            Laura è un'esperta di diritto del lavoro, ma la sua routine era bloccata dal <strong>data entry manuale</strong>. Ogni pomeriggio doveva aprire decine di PDF, leggere date e importi, e scriverli a mano in un file Excel per tracciare i fascicoli.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Soluzione h4sh</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Abbiamo implementato un sistema che \"legge\" i documenti come un occhio umano e inserisce i dati al posto suo.
          </p>
          <div className="grid gap-4">
            {[
              { t: "Lettura PDF", d: "Il sistema estrae automaticamente date, importi e nomi dai documenti." },
              { t: "Scrittura Automatica", d: "I dati vengono inseriti perfettamente nelle colonne dell'Excel." },
              { t: "Zero Errori", d: "Eliminata ogni possibilità di refuso o errore di battitura." }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                <h4 className="font-bold text-emerald-400 mb-1">{item.t}</h4>
                <p className="text-sm text-zinc-400">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    id: 'commercialista',
    title: "Proattività aumentata del 400% per uno studio commerciale.",
    client: "Dott.ssa Valeria C.",
    sector: "Consulenza Fiscale",
    problem: "Valeria passava i weekend a leggere circolari fiscali per capire quali clienti potessero beneficiare di nuove agevolazioni.",
    solution: "Sistema che analizza le normative e segnala automaticamente i clienti idonei.",
    keyResult: "Il sistema segnala subito le opportunità. Valeria ora vende consulenza extra ogni lunedì.",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Problema</h3>
          <p className="text-zinc-400 leading-relaxed">
            Valeria doveva incrociare manualmente i requisiti delle nuove circolari dell'Agenzia delle Entrate con l'elenco dei suoi clienti. Un lavoro estenuante che rubava tempo alla vita privata e portava a <strong>perdere opportunità di consulenza</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Soluzione h4sh</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Un sistema che analizza le nuove leggi e le confronta in silenzio con l'anagrafica dei clienti dello studio.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Analisi automatica nuove circolari",
              "Incrocio dati con anagrafica clienti",
              "Segnalazione immediata dei clienti idonei",
              "Bozza di comunicazione già pronta"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl list-none">
                <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">{item}</span>
              </li>
            ))}
          </div>
        </section>
      </div>
    )
  }
];

export const CaseStudies = ({ onBack }: { onBack: () => void }) => {
  const [selectedCase, setSelectedCase] = React.useState<CaseStudy | null>(null);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-24 lg:px-48">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {!selectedCase ? (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-6 uppercase tracking-widest text-xs font-bold"
                >
                  <ArrowLeft size={16} /> Torna alla Home
                </button>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gradient">
                  Casi <span className="text-emerald-500">Studio</span>.
                </h1>
                <p className="text-xl text-zinc-400 mt-6 max-w-2xl">
                  Storie reali di professionisti che hanno scelto l'ordine invisibile per riprendersi il proprio tempo.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedCase(study)}
                  className="group p-8 rounded-3xl glass-card cursor-pointer hover:border-emerald-500/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {study.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">
                    <Clock size={14} className="text-emerald-500" /> {study.keyResult.split(' ')[1]} {study.keyResult.split(' ')[2]}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-8">
                    {study.problem}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                    Leggi il caso <ArrowLeft className="rotate-180 w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            <button 
              onClick={() => setSelectedCase(null)}
              className="flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} /> Tutti i Casi Studio
            </button>

            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                {selectedCase.sector}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                {selectedCase.title}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-950 border border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-emerald-500 mb-2">
                    <Target size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Problema</span>
                  </div>
                  <p className="text-zinc-300 font-medium">{selectedCase.problem}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-emerald-500 mb-2">
                    <TrendingUp size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Risultato</span>
                  </div>
                  <p className="text-zinc-300 font-medium">{selectedCase.keyResult}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {selectedCase.content}
            </div>

            <div className="mt-24 pt-12 border-t border-white/5">
              <div className="bg-emerald-500 p-12 rounded-3xl text-black">
                <h3 className="text-3xl font-bold mb-4">Vuoi lo stesso risultato?</h3>
                <p className="text-xl mb-8 opacity-80">
                  Mettiamo in ordine il tuo studio con lo stesso approccio sartoriale.
                </p>
                <button 
                  onClick={onBack}
                  className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                  Inizia il Progetto <Zap size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
