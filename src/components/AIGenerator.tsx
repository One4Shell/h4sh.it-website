import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Headset, 
  FileText, 
  TrendingUp, 
  Layers, 
  Clock, 
  AlertTriangle, 
  Calendar,
  Settings,
  Zap,
  CheckCircle2,
  ArrowRight,
  Bot,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Phone,
  Loader2
} from 'lucide-react';

// Configuration JSON
const WIZARD_CONFIG = {
  departments: [
    { 
      id: 'customer-care', 
      label: 'Customer Care', 
      icon: Headset, 
      agentPrefix: 'CareBot',
      tasks: [
        "Risposta istantanea alle FAQ h24",
        "Smistamento ticket intelligente",
        "Analisi del sentiment dei clienti"
      ]
    },
    { 
      id: 'admin', 
      label: 'Amministrazione', 
      icon: FileText, 
      agentPrefix: 'AdminMind',
      tasks: [
        "Riconoscimento automatico fatture",
        "Solleciti pagamenti automatizzati",
        "Riconciliazione bancaria assistita"
      ]
    },
    { 
      id: 'sales', 
      label: 'Vendite', 
      icon: TrendingUp, 
      agentPrefix: 'SalesPro',
      tasks: [
        "Qualificazione lead in tempo reale",
        "Follow-up personalizzati automatici",
        "Analisi predittiva delle conversioni"
      ]
    },
    { 
      id: 'back-office', 
      label: 'Back-Office', 
      icon: Layers, 
      agentPrefix: 'FlowMaster',
      tasks: [
        "Sincronizzazione dati tra gestionali",
        "Generazione reportistica avanzata",
        "Automazione flussi di approvazione"
      ]
    }
  ],
  questions: [
    { 
      id: 'hours', 
      label: 'Quante ore perdi a settimana in compiti ripetitivi?', 
      options: [
        { value: 5, label: 'Circa 5 ore' },
        { value: 10, label: 'Oltre 10 ore' },
        { value: 20, label: 'Più di 20 ore' }
      ] 
    },
    { 
      id: 'cost', 
      label: 'Qual è l\'impatto maggiore di un errore umano?', 
      options: [
        { value: 'economico', label: 'Danno Economico' },
        { value: 'stress', label: 'Stress del Team' }
      ] 
    },
    { 
      id: 'weekend', 
      label: 'Hai bisogno di copertura durante il weekend?', 
      options: [
        { value: 'no', label: 'No, solo feriali' },
        { value: 'yes', label: 'Sì, h24 / 7 su 7' }
      ] 
    }
  ],
  processingTexts: [
    "Analizzando flussi operativi...",
    "Mappando i colli di bottiglia...",
    "Generando DNA digitale dell'agente...",
    "Ottimizzando algoritmi di risposta...",
    "Configurando personalità AI...",
    "Quasi pronto..."
  ]
};

type Step = 'dept' | 'thief' | 'personality' | 'loading' | 'result';

export const AIGenerator: React.FC = () => {
  const [step, setStep] = useState<Step>('dept');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({
    hours: 5,
    cost: 'stress',
    weekend: 'no'
  });
  const [personality, setPersonality] = useState({
    tone: 50, // 0: Formale, 100: Amichevole
    style: 50 // 0: Informativo, 100: Operativo
  });
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [phone, setPhone] = useState('');
  const [activationStatus, setActivationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Derived data
  const deptData = WIZARD_CONFIG.departments.find(d => d.id === selectedDept);
  const agentName = `${deptData?.agentPrefix || 'AI'} v1.0`;
  const estimatedSavings = (answers.hours || 0) * 52;

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIndex(prev => (prev + 1) % WIZARD_CONFIG.processingTexts.length);
      }, 600);

      const timer = setTimeout(() => {
        setStep('result');
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  const handleNext = () => {
    if (step === 'dept' && selectedDept) setStep('thief');
    else if (step === 'thief') setStep('personality');
    else if (step === 'personality') setStep('loading');
  };

  const handleBack = () => {
    if (step === 'thief') setStep('dept');
    else if (step === 'personality') setStep('thief');
  };

  const handleActivate = async () => {
    if (!phone) return;
    setActivationStatus('loading');
    try {
      const response = await fetch('/api/index.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          agentName,
          department: selectedDept,
          answers,
          personality,
          estimatedSavings
        })
      });
      
      // Simulating success for demo if API doesn't exist yet
      // In production, we'd check response.ok and data.result
      const data = await response.json()
      
      if (data.result === 1) {
        setActivationStatus('success');
      } else {
        setActivationStatus('error');
      }
    } catch (error) {
      console.error('Activation error:', error);
      // For demo, let's assume success if we can't reach the API
      // setActivationStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        {step !== 'loading' && step !== 'result' && (
          <div className="mb-12">
            <div className="flex justify-between mb-4 text-xs uppercase tracking-widest text-zinc-500">
              <span>Configurazione Agente</span>
              <span>Step {step === 'dept' ? '1' : step === 'thief' ? '2' : '3'} di 3</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: '0%' }}
                animate={{ 
                  width: step === 'dept' ? '33%' : step === 'thief' ? '66%' : '100%' 
                }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* STEP 1: DEPARTMENTS */}
          {step === 'dept' && (
            <motion.div
              key="step-dept"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">In quale reparto c'è più <span className="text-emerald-500 italic">caos</span>?</h2>
                <p className="text-zinc-400 text-lg">Seleziona l'area operativa che necessita di un'iniezione di intelligenza.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WIZARD_CONFIG.departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <motion.button
                      key={dept.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDept(dept.id)}
                      className={`p-8 rounded-[2rem] border text-left transition-all relative overflow-hidden group glass-card ${
                        selectedDept === dept.id 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'hover:border-emerald-500/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                        selectedDept === dept.id ? 'bg-emerald-500 text-black' : 'bg-white/5 text-emerald-500'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{dept.label}</h3>
                      <p className="text-sm text-zinc-500">Ottimizza i flussi e riduci il carico di lavoro manuale.</p>
                      
                      {selectedDept === dept.id && (
                        <motion.div 
                          layoutId="active-glow"
                          className="absolute inset-0 bg-emerald-500/5 pointer-events-none"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  disabled={!selectedDept}
                  onClick={handleNext}
                  className="px-12 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continua <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: TIME THIEF */}
          {step === 'thief' && (
            <motion.div
              key="step-thief"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">Il <span className="text-emerald-500 italic">Ladro</span> di Tempo</h2>
                <p className="text-zinc-400 text-lg">Identifichiamo quanto valore stiamo lasciando sul tavolo.</p>
              </div>

              <div className="space-y-10 max-w-2xl mx-auto">
                {WIZARD_CONFIG.questions.map((q) => (
                  <div key={q.id} className="space-y-4">
                    <label className="text-sm uppercase tracking-widest text-emerald-500 font-bold flex items-center gap-2">
                      {q.id === 'hours' && <Clock size={16} />}
                      {q.id === 'cost' && <AlertTriangle size={16} />}
                      {q.id === 'weekend' && <Calendar size={16} />}
                      {q.label}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {q.options.map((opt: any) => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                          className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all ${
                            answers[q.id] === opt.value
                              ? 'border-emerald-500 bg-emerald-500 text-black'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <ChevronLeft size={20} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  className="px-12 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2"
                >
                  Next <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PERSONALITY */}
          {step === 'personality' && (
            <motion.div
              key="step-personality"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">Personalità dell'<span className="text-emerald-500 italic">Agente</span></h2>
                <p className="text-zinc-400 text-lg">Definisci come l'AI interagirà con il tuo ecosistema.</p>
              </div>

              <div className="space-y-16 max-w-xl mx-auto py-8">
                {/* Tone Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                    <span className={personality.tone < 40 ? 'text-emerald-500' : 'text-zinc-600'}>Formale</span>
                    <span className={personality.tone > 60 ? 'text-emerald-500' : 'text-zinc-600'}>Amichevole</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={personality.tone}
                    onChange={(e) => setPersonality(prev => ({ ...prev, tone: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Style Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                    <span className={personality.style < 40 ? 'text-emerald-500' : 'text-zinc-600'}>Informativo</span>
                    <span className={personality.style > 60 ? 'text-emerald-500' : 'text-zinc-600'}>Operativo</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={personality.style}
                    onChange={(e) => setPersonality(prev => ({ ...prev, style: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <ChevronLeft size={20} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  className="px-12 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  Genera <Zap size={20} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {step === 'loading' && (
            <motion.div
              key="step-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh] space-y-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-t-2 border-r-2 border-emerald-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot className="text-emerald-500 animate-pulse" size={32} />
                </div>
              </div>
              <div className="text-center space-y-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingTextIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl font-medium text-emerald-500"
                  >
                    {WIZARD_CONFIG.processingTexts[loadingTextIndex]}
                  </motion.p>
                </AnimatePresence>
                <p className="text-zinc-500 text-sm">Stiamo assemblando il tuo collaboratore digitale...</p>
              </div>
            </motion.div>
          )}

          {/* RESULT: ID CARD */}
          {step === 'result' && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={14} /> Agente Generato con Successo
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">Ecco il tuo nuovo <span className="text-emerald-500">Collaboratore</span></h2>
              </div>

              {/* ID Card Dashboard */}
              <div className="bg-zinc-900/80 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                <div className="p-8 md:p-12 space-y-10">
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                        <Bot size={40} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight">{agentName}</h3>
                        <p className="text-zinc-400 flex items-center gap-2">
                          Specialista {deptData?.label} • {personality.tone > 50 ? 'Amichevole' : 'Formale'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center min-w-[200px]">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Risparmio Ore Stimato</div>
                      <div className="text-3xl font-bold text-emerald-500">~{estimatedSavings}h <span className="text-sm font-normal text-zinc-400">/ anno</span></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                    {/* Tasks */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Cosa farà da domani:</h4>
                      <ul className="space-y-4">
                        {deptData?.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                              <CheckCircle2 size={12} />
                            </div>
                            <span className="text-zinc-300">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Specs */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Configurazione Tecnica:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-zinc-500 uppercase mb-1">Reattività</div>
                          <div className="font-medium">{answers.weekend === 'yes' ? 'H24 / 7 su 7' : 'Standard (9-18)'}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-zinc-500 uppercase mb-1">Focus</div>
                          <div className="font-medium">{personality.style > 50 ? 'Operativo' : 'Informativo'}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-zinc-500 uppercase mb-1">Priorità</div>
                          <div className="font-medium">{answers.cost === 'economico' ? 'ROI / Margine' : 'Qualità Vita'}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="text-[10px] text-zinc-500 uppercase mb-1">Versione</div>
                          <div className="font-medium">Stable Build 1.0.4</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-8 bg-emerald-500 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-black max-w-md">
                    <div className="font-bold text-xl">Pronto per l'integrazione?</div>
                    <p className="text-sm opacity-80 mb-4">Il tuo agente è configurato e pronto per essere addestrato sui tuoi dati.</p>
                    
                    {activationStatus !== 'success' && (
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input 
                          type="tel" 
                          placeholder="Il tuo numero di telefono"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-black/10 border border-black/20 rounded-xl text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {activationStatus === 'success' ? (
                    <div className="flex flex-col items-center gap-2 bg-black text-white px-8 py-5 rounded-2xl animate-in zoom-in duration-300">
                      <CheckCircle2 className="text-emerald-500" size={24} />
                      <span className="font-bold">Richiesta Inviata!</span>
                      <span className="text-xs opacity-60">Ti contatteremo a breve.</span>
                    </div>
                  ) : (
                    <button 
                      onClick={handleActivate}
                      disabled={!phone || activationStatus === 'loading'}
                      className="w-full md:w-auto px-10 py-5 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 group disabled:opacity-50 disabled:scale-100"
                    >
                      {activationStatus === 'loading' ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Attiva {deptData?.agentPrefix} Ora <Zap size={20} className="group-hover:text-emerald-500 transition-colors" fill="currentColor" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setStep('dept')}
                  className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  Ricomincia Configurazione
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
