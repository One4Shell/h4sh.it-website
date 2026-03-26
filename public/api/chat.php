<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing message']);
    exit;
}

$msg = strtolower($data['message']);

function contains($str, array $keywords) {
    foreach ($keywords as $keyword) {
        if (stripos($str, $keyword) !== false) {
            return true;
        }
    }
    return false;
}
$reply = "";

// ── SALUTI ───────────────────────────────────────────────────
if (contains($msg, ['ciao', 'hey', 'salve', 'buongiorno', 'buonasera', 'buonanotte', 'hello', 'hi'])) {
    $reply = "Ciao! 👋 Sono Luca, l'assistente virtuale di h4sh. Posso aiutarti su automazione AI, sviluppo web o infrastruttura digitale. Da dove vuoi iniziare?";
 
// ── CHI SIETE / CHI È H4SH ───────────────────────────────────
} elseif (contains($msg, ['chi siete', 'chi è h4sh', "cos'è h4sh", 'di cosa vi occupate', 'presentati', 'parlami di voi', 'about'])) {
    $reply = "h4sh è una realtà innovativa fondata da Lorenzo Fornara nel 2024 a Bordighera (IM). Ci occupiamo di automazione AI, sviluppo software su misura e infrastruttura digitale — portando l'innovazione della Silicon Valley nel tessuto produttivo italiano. 🇮🇹 Operiamo su tutto il territorio nazionale, da remoto e on-site.";
 
// ── VISION / FILOSOFIA ────────────────────────────────────────
} elseif (contains($msg, ['vision', 'missione', 'filosofia', 'valori', 'obiettivo', 'cosa vi distingue', 'perché scegliere'])) {
    $reply = "La nostra visione è un'Italia produttiva dove l'AI non sostituisce l'uomo, ma lo libera dalle mansioni ripetitive. Vogliamo che ogni PMI — non solo i grandi colossi — possa accedere a tecnologie d'avanguardia con un approccio sartoriale: nessuna soluzione standard, ogni progetto è cucito sulle esigenze specifiche del cliente.";
 
// ── SERVIZI (panoramica) ──────────────────────────────────────
} elseif (contains($msg, ['servizi', 'cosa fate', 'cosa offrite', 'cosa fai', 'cosa offri', 'prodotti'])) {
    $reply = "In h4sh lavoriamo su tre pilastri:\n\n1️⃣ *Automazione AI & Integrazione* — agenti autonomi, workflow optimization, analisi predittiva.\n2️⃣ *Sviluppo Software & Web* — web app ad alte prestazioni, architetture tailor-made.\n3️⃣ *Infrastruttura Digitale* — cloud, sicurezza, manutenzione evolutiva.\n\nSu quale vuoi approfondire?";
 
// ── AUTOMAZIONE AI (generale) ─────────────────────────────────
} elseif (contains($msg, ['automaz', 'agente ai', 'intelligenza artificiale', 'workflow', 'llm', 'analisi predittiva', 'insight'])) {
    $reply = "Con h4sh puoi integrare agenti AI autonomi direttamente nei tuoi processi aziendali: gestione documenti, supporto clienti, monitoraggio web, alert intelligenti e molto altro. Il nostro prodotto di punta è **PicoClaw / CoreAgent** — ultra-leggero, scritto in Go, con risposta immediata. Vuoi i dettagli sui pacchetti?";
 
// ── PICOCLAW / COREAGENT (specifico) ─────────────────────────
} elseif (contains($msg, ['picoclaw', 'coreagent', 'core agent', 'agente autonomo'])) {
    $reply = "**PicoClaw** è il nostro agente AI ultra-leggero ottimizzato per task complessi con consumo minimo di risorse. È scritto in Go (velocità immediata), garantisce privacy con elaborazione isolata ed è completamente scalabile: puoi aggiungere nuovi task in qualsiasi momento. Abbiamo due pacchetti di avvio — vuoi i prezzi?";
 
// ── PICO SETUP ────────────────────────────────────────────────
} elseif (contains($msg, ['pico setup', 'configurazione agente', 'installazione agente'])) {
    $reply = "Il pacchetto **Pico SETUP** (€ 800 una tantum) include:\n✔ Installazione del core CoreAgent\n✔ Configurazione ambiente (VPS o locale)\n✔ Setup connettori API\n\nÈ il punto di partenza ideale per testare l'infrastruttura. Pagamento: 50% all'ordine, 50% a consegna.";
 
// ── PICO AUTOMATION ───────────────────────────────────────────
} elseif (contains($msg, ['pico automation', 'task automatici', 'task personalizzati'])) {
    $reply = "Il pacchetto **Pico AUTOMATION** (€ 1.800 una tantum) include tutto il SETUP più lo sviluppo di **2 task automatici personalizzati** — es. gestione documenti, monitoraggio web, alert intelligenti. Perfetto per chi vuole risultati operativi concreti da subito.";
 
// ── SVILUPPO WEB (generale) ───────────────────────────────────
} elseif (contains($msg, ['sviluppo web', 'sito web', 'web app', 'applicazione web', 'frontend', 'responsive'])) {
    $reply = "Costruiamo **web application ad alte prestazioni** con architetture tailor-made: UI/UX focalizzata sull'efficienza, frontend responsive e infrastruttura cloud scalabile. Abbiamo due pacchetti: **Web FOUNDATION** (da € 1.300) e **Web EVOLUTION con AI integrata** (da € 2.300). Quale ti interessa?";
 
// ── WEB FOUNDATION ────────────────────────────────────────────
} elseif (contains($msg, ['web foundation', 'foundation'])) {
    $reply = "Il pacchetto **Web FOUNDATION** parte da **€ 1.300** (una tantum) e include:\n✔ Progettazione UI/UX\n✔ Sviluppo frontend responsive\n✔ Architettura tailor-made\n✔ Setup infrastruttura cloud iniziale\n\nLa base solida per la tua presenza digitale professionale.";
 
// ── WEB EVOLUTION ─────────────────────────────────────────────
} elseif (contains($msg, ['web evolution', 'evolution', 'ai integrat', 'modulo ai'])) {
    $reply = "Il pacchetto **Web EVOLUTION — AI Integrated** parte da **€ 2.300** (una tantum). Include tutto il FOUNDATION più l'integrazione di **1 modulo AI dedicato**: agenti autonomi per gestione dati, workflow optimization o analisi predittiva. Il tuo sito diventa un vero strumento intelligente.";
 
// ── MANAGED / HOSTING ─────────────────────────────────────────
} elseif (contains($msg, ['hosting', 'managed', 'manutenzione', 'backup', 'monitoring', 'gestione server', 'cloud', 'aggiornamenti'])) {
    $reply = "Offriamo due piani **Managed** opzionali:\n\n🌐 *Web Hosting & Care*: **€ 950/anno** — hosting dedicato, manutenzione evolutiva, monitoring e backup.\n\n🤖 *Agent Hosting & Maintenance*: **€ 1.299/anno** — hosting CoreAgent, aggiornamenti software, monitoring task e backup configurazioni.\n\nEntrambi con pagamento annuale anticipato all'attivazione.";
 
// ── PREZZI / COSTI ────────────────────────────────────────────
} elseif (contains($msg, ['prezzo', 'prezzi', 'costo', 'costi', 'quanto costa', 'tariffe', 'preventivo', 'offerta'])) {
    $reply = "Ecco una panoramica dei nostri prezzi:\n\n🤖 **Agente AI (CoreAgent / PicoClaw)**\n• Pico SETUP: € 800\n• Pico AUTOMATION: € 1.800\n• Hosting annuale: € 1.299/anno\n\n🌐 **Sviluppo Web**\n• Web FOUNDATION: da € 1.300\n• Web EVOLUTION (AI): da € 2.300\n• Hosting & Care annuale: € 950/anno\n\nVuoi un preventivo su misura? Scrivi a h4shell@gmail.com!";
 
// ── PAGAMENTO / TERMINI ───────────────────────────────────────
} elseif (contains($msg, ['pagamento', 'termini', 'modalità', 'acconto', 'anticipo', 'fattura', 'come si paga'])) {
    $reply = "I termini di pagamento sono semplici e trasparenti:\n\n💳 **Sviluppo / Implementazione:** 50% all'ordine, 50% alla consegna.\n💳 **Hosting / Managed Services:** Pagamento anticipato annuale all'attivazione.\n\nHai domande su un pacchetto specifico?";
 
// ── PRIVACY / SICUREZZA ───────────────────────────────────────
} elseif (contains($msg, ['privacy', 'sicurezza', 'dati', 'gdpr', 'protezione', 'isolato', 'riservatezza'])) {
    $reply = "La privacy è un pilastro fondamentale per h4sh. I dati vengono elaborati in modo **sicuro e isolato**, garantendo basi digitali protette. Monitoring costante, backup periodici e aggiornamenti di sicurezza sono inclusi in tutti i piani Managed.";
 
// ── SCALABILITÀ ───────────────────────────────────────────────
} elseif (contains($msg, ['scalabil', 'crescita', 'espansione', 'aggiungere moduli', 'modulare', 'flessibil'])) {
    $reply = "Le nostre soluzioni sono progettate per crescere con te. Puoi partire da un pacchetto base e aggiungere moduli AI, nuovi task automatici o risorse cloud in qualsiasi momento — senza ripartire da zero. L'architettura modulare è il nostro standard.";
 
// ── PMI / PICCOLE IMPRESE ─────────────────────────────────────
} elseif (contains($msg, ['pmi', 'piccola impresa', 'piccola azienda', 'artigian', 'negozio', 'libero professionista', 'studio professionale'])) {
    $reply = "h4sh nasce proprio per le PMI italiane! Molte realtà restano frenate da processi manuali obsoleti — noi interveniamo per automatizzare la gestione documentale, ridurre l'errore umano e affiancarti in un percorso di alfabetizzazione digitale. L'AI diventa il miglior collaboratore di ogni tuo dipendente, senza bisogno di un reparto IT interno.";
 
// ── DOVE OPERATE / TERRITORIO ─────────────────────────────────
} elseif (contains($msg, ['dove operate', 'territorio', 'liguria', 'bordighera', 'italia', 'remoto', 'on-site', 'trasferta'])) {
    $reply = "h4sh ha sede a **Bordighera (IM), in Liguria**, ma operiamo su tutto il **territorio nazionale italiano** — sia da remoto che on-site. La distanza non è mai un ostacolo!";
 
// ── CONTATTI ──────────────────────────────────────────────────
} elseif (contains($msg, ['contatti', 'contattare', 'contatto', 'email', 'scrivere', 'lorenzo', 'referente', 'modulo contatto'])) {
    $reply = "Puoi raggiungerci direttamente:\n\n📧 **Email:** h4shell@gmail.com\n👤 **Referente:** Lorenzo Fornara\n📍 **Sede:** Bordighera (IM), Italia\n\nLorenzo risponde rapidamente — non esitare a scrivere!";
 
// ── TEMPI / CONSEGNA ──────────────────────────────────────────
} elseif (contains($msg, ['tempi', 'quando', 'quanto tempo', 'consegna', 'deadline', 'quanto ci vuole'])) {
    $reply = "I tempi dipendono dalla complessità del progetto e vengono definiti nel preventivo. Lavoriamo con milestone chiare: avvio dopo il 50% di acconto, consegna finale e saldo. Scrivici a h4shell@gmail.com per un piano dettagliato sul tuo caso!";
 
// ── AIUTO NELLA SCELTA ────────────────────────────────────────
} elseif (contains($msg, ['differenza', 'confronto', 'quale scegliere', 'cosa è meglio', 'consiglio', 'aiutami a scegliere'])) {
    $reply = "Dipende dalle tue esigenze! 🎯\n\n• Solo infrastruttura → **Pico SETUP** o **Web FOUNDATION**\n• Automazione operativa subito → **Pico AUTOMATION** o **Web EVOLUTION**\n• Senza pensieri tecnici → aggiungi il piano **Managed**\n\nRaccontami il tuo caso e ti aiuto a trovare il fit migliore!";
 
// ── GRAZIE / CONGEDO ──────────────────────────────────────────
} elseif (contains($msg, ['grazie', 'perfetto', 'capito', 'ottimo', 'arrivederci', 'a presto', 'ciao ciao'])) {
    $reply = "Prego! 😊 Se hai altre domande su h4sh sono qui. In bocca al lupo per il tuo progetto — a presto!";
 
// ── FALLBACK ──────────────────────────────────────────────────
} else {
    $reply = "Interessante! 🚀 In h4sh amiamo le sfide tecnologiche. Puoi spiegarmi meglio cosa stai cercando, o preferisci che ti metta direttamente in contatto con Lorenzo? Scrivici a h4shell@gmail.com!";
}

echo json_encode([
    'reply' => $reply,
    'status' => 'success'
]);
