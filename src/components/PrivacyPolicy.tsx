import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">Privacy Policy</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar text-zinc-400 leading-relaxed space-y-8">
          <section>
            <h3 className="text-white font-semibold text-lg mb-4">1. Introduzione</h3>
            <p>
              La presente Privacy Policy descrive come h4sh ("noi", "nostro") raccoglie, utilizza e protegge i tuoi dati personali quando visiti il nostro sito web o utilizzi i nostri servizi. Ci impegniamo a proteggere la tua privacy in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR).
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">2. Dati Raccolti</h3>
            <p>Raccogliamo le seguenti tipologie di informazioni:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong className="text-zinc-200">Dati di contatto:</strong> Indirizzo email fornito volontariamente tramite il form di iscrizione alla newsletter.</li>
              <li><strong className="text-zinc-200">Dati di navigazione:</strong> Informazioni tecniche come indirizzo IP, tipo di browser e pagine visitate (tramite cookie tecnici).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">3. Finalità del Trattamento</h3>
            <p>I tuoi dati vengono utilizzati per:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Inviarti il codice sconto di benvenuto e comunicazioni relative ai nostri servizi.</li>
              <li>Migliorare l'esperienza utente sul nostro sito web.</li>
              <li>Adempiere agli obblighi di legge.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">4. Base Giuridica</h3>
            <p>
              Il trattamento dei dati per l'invio della newsletter si basa sul tuo <strong className="text-zinc-200">consenso esplicito</strong> fornito al momento dell'iscrizione. Puoi revocare il consenso in qualsiasi momento cliccando sul link di disiscrizione presente in ogni email.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">5. Conservazione dei Dati</h3>
            <p>
              Conserviamo i tuoi dati personali solo per il tempo necessario a conseguire le finalità per cui sono stati raccolti, a meno che non sia richiesto un periodo di conservazione più lungo dalla legge.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">6. I Tuoi Diritti</h3>
            <p>In conformità con il GDPR, hai il diritto di:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Accedere ai tuoi dati personali.</li>
              <li>Chiedere la rettifica o la cancellazione dei dati.</li>
              <li>Opporsi al trattamento o chiederne la limitazione.</li>
              <li>Richiedere la portabilità dei dati.</li>
            </ul>
            <p className="mt-4">
              Per esercitare questi diritti, puoi contattarci all'indirizzo: <span className="text-emerald-400">lorenzo.fornara@h4shell.it</span>
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold text-lg mb-4">7. Sicurezza</h3>
            <p>
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, alterazioni o distruzioni.
            </p>
          </section>

          <section className="pt-8 border-t border-white/5">
            <p className="text-sm text-zinc-500">
              Ultimo aggiornamento: 23 Marzo 2026
            </p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};
