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
    title: "Da 1,5 ore al giorno a Zero. Come un Agente AI ha rivoluzionato il flusso di uno Studio di Architettura",
    client: "Marco T. - Studio di Architettura",
    sector: "Design e Progettazione Architettonica",
    problem: "Gestione manuale e ripetitiva degli allegati via email",
    solution: "Implementazione di un Agente AI Autonomo per l'archiviazione",
    keyResult: "Recupero di 10 ore settimanali e zero errori umani",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Profilo del Cliente</h3>
          <p className="text-zinc-400 leading-relaxed">
            <strong>Marco T.</strong>, titolare di uno studio di architettura di fascia medio-alta specializzato in residenze di lusso e riqualificazione commerciale. 
            Il suo tempo è il bene più prezioso del suo studio: le sue competenze tecniche e la sua visione creativa sono ciò per cui i clienti lo pagano.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Situazione Iniziale: L'Inferno della Burocrazia Mattutina</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Per Marco, ogni giorno iniziava allo stesso modo. Con una tazza di caffè e un senso di pesantezza. 
            La sua casella di posta era letteralmente inondata da email dei clienti, dei fornitori e delle maestranze. C'era un problema ricorrente: <strong>i file non arrivavano mai nel formato o nel posto giusto.</strong>
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl italic text-zinc-300">
            "Marco, un professionista pagato per progettare spazi, stava dedicando 1,5 ore ogni mattina a fare il lavoro di un impiegato d'ufficio addetto allo scambio file. Questa micro-frizione quotidiana gli rubava energia mentale e, in alcuni casi, portava a errori di salvataggio."
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Risoluzione: Ingegneria del Flusso</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Abbiamo introdotto e configurato un <strong>Agente AI Autonomo</strong> dedicato, creando un ponte invisibile tra la casella di posta e Dropbox.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Comprensione Semantica: Riconosce mittenti e contesti",
              "Classificazione Automatica: Analizza la natura dei file",
              "Archiviazione Intelligente: Applica nomenclature standard",
              "Feedback Immediato: Invia conferme automatiche ai clienti"
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
    title: "Come abbiamo liberato un Avvocato dalla prigione del copia-incolla",
    client: "Avv. Laura B.",
    sector: "Legale - Diritto del Lavoro e Contenzioso",
    problem: "Inserimento manuale dei dati dei fascicoli da email e PDF",
    solution: "Assistente AI per l'elaborazione automatica dei documenti",
    keyResult: "Recupero di 12 ore settimanali e zero errori di trascrizione",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Profilo del Cliente</h3>
          <p className="text-zinc-400 leading-relaxed">
            L'Avv. Laura B. è un punto di riferimento solido nel Diritto del Lavoro. I suoi clienti scelgono lei per il suo acume strategico, non certo per le sue abilità di data entry.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Situazione Iniziale</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Ogni pomeriggio Laura si trovava invischiata in una routine che sottraeva spazio alla vera consulenza legale: scaricare PDF, leggere date e importi, e trascriverli in un foglio Excel.
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl italic text-zinc-300">
            "Una professionista pagata per difendere le persone con la propria intelligenza, che passava il suo tempo a comportarsi come una stampante umana."
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Risoluzione</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Abbiamo introdotto un Assistente AI integrato con Google Sheets che legge le email, analizza i PDF e popola automaticamente il database.
          </p>
          <div className="grid gap-4">
            {[
              { t: "Analisi PDF", d: "Legge il PDF come un occhio umano ed estrae i dati chiave." },
              { t: "Popolamento Database", d: "Inserisce perfettamente i dati nelle colonne predisposte." },
              { t: "Rassicurazione Cliente", d: "Invia conferme istantanee di presa in carico." }
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
    title: "Come abbiamo liberato un Commercialista dalla prigione delle circolari fiscali",
    client: "Dott.ssa Valeria C.",
    sector: "Consulenza fiscale e aziendale",
    problem: "Ore di studio non fatturabili per analizzare le circolari dell'AdE",
    solution: "Sistema h4sh per il confronto automatico normativa/clienti",
    keyResult: "Proattività verso i clienti aumentata del 400%",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Il Profilo del Cliente</h3>
          <p className="text-zinc-400 leading-relaxed">
            La Dott.ssa Valeria C. è specializzata in Agevolazioni e Crediti d'Impresa. Il suo valore è la mente strategica, non il tempo passato a leggere centinaia di pagine di circolari.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Situazione Iniziale</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Ogni weekend Valeria doveva incrociare i parametri aziendali con i requisiti normativi, uno per uno. Un processo estenuante che rubava tempo alla vita privata.
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl italic text-zinc-300">
            "La professionista che avrebbe dovuto far trovare soldi alle aziende trascorreva il suo tempo libero a cercare aghi in un pagliaio normativo."
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">La Risoluzione</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Un sistema h4sh che "legge" le nuove normative e le confronta con l'anagrafica attività dello studio, segnalando solo i clienti idonei.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Acquisizione automatica circolari",
              "Comprensione requisiti agevolazioni",
              "Incrocio silenzioso con anagrafica",
              "Segnalazione proattiva opportunità"
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
