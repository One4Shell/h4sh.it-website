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
    $reply = "Ciao! 👋 Sono Luca, l'assistente virtuale di h4sh. Posso aiutarti a mettere in ordine il tuo studio e liberarti dalla burocrazia. Da dove vuoi iniziare?";
 
// ── CHI SIETE / CHI È H4SH ───────────────────────────────────
} elseif (contains($msg, ['chi siete', 'chi è h4sh', "cos'è h4sh", 'di cosa vi occupate', 'presentati', 'parlami di voi', 'about'])) {
    $reply = "h4sh è il partner d'élite per i professionisti che vogliono riprendersi il proprio tempo. Fondata da Lorenzo Fornara, la nostra realtà trasforma il caos documentale in ordine perfetto attraverso protocolli invisibili che lavorano dietro le quinte del tuo studio.";
 
// ── VISION / FILOSOFIA ────────────────────────────────────────
} elseif (contains($msg, ['vision', 'missione', 'filosofia', 'valori', 'obiettivo', 'cosa vi distingue', 'perché scegliere'])) {
    $reply = "La nostra visione è un'Italia produttiva dove il professionista non è più prigioniero della carta. Vogliamo che ogni studio possa accedere a sistemi d'avanguardia con un approccio sartoriale: nessuna soluzione standard, ogni protocollo h4sh è cucito sulle tue esigenze specifiche.";
 
 // ── SERVIZI (panoramica) ──────────────────────────────────────
} elseif (contains($msg, ['servizi', 'cosa fate', 'cosa offrite', 'cosa fai', 'cosa offri', 'prodotti'])) {
    $reply = "In h4sh lavoriamo su tre pilastri della tranquillità:\n\n1️⃣ *Protocolli di Automazione* — gestione documenti, smistamento pratiche, analisi dati.\n2️⃣ *Sistemi Web su Misura* — interfacce eleganti e funzionali per il tuo studio.\n3️⃣ *Manutenzione della Pace* — ci occupiamo noi di tutto il lato tecnico, tu vedi solo il risultato.\n\nSu quale vuoi approfondire?";
 
// ── AUTOMAZIONE AI (generale) ─────────────────────────────────
} elseif (contains($msg, ['automaz', 'agente ai', 'intelligenza artificiale', 'workflow', 'llm', 'analisi predittiva', 'insight'])) {
    $reply = "Con h4sh puoi attivare assistenti invisibili direttamente nei tuoi processi di studio: gestione documenti, supporto clienti, monitoraggio scadenze e molto altro. Il nostro sistema di punta è **PicoClaw / CoreAgent** — lavora dietro le quinte con risposta immediata. Vuoi i dettagli sui protocolli?";
 
// ── PICOCLAW / COREAGENT (specifico) ─────────────────────────
} elseif (contains($msg, ['picoclaw', 'coreagent', 'core agent', 'agente autonomo'])) {
    $reply = "**PicoClaw** è il nostro assistente invisibile ottimizzato per compiti complessi con il minimo ingombro. Garantisce privacy totale con elaborazione isolata ed è completamente scalabile: puoi aggiungere nuovi compiti in qualsiasi momento. Abbiamo due protocolli di avvio — vuoi i prezzi?";
 
// ── PICO SETUP ────────────────────────────────────────────────
} elseif (contains($msg, ['pico setup', 'configurazione agente', 'installazione agente'])) {
    $reply = "Il protocollo **Pico SETUP** (€ 800 una tantum) include:\n✔ Messa in ordine dell'infrastruttura\n✔ Configurazione dell'ambiente di lavoro\n✔ Setup dei collegamenti necessari\n\nÈ il punto di partenza ideale per testare l'efficienza h4sh. Pagamento: 50% all'ordine, 50% alla consegna.";
 
 // ── PICO AUTOMATION ───────────────────────────────────────────
} elseif (contains($msg, ['pico automation', 'task automatici', 'task personalizzati'])) {
    $reply = "Il protocollo **Pico AUTOMATION** (€ 1.800 una tantum) include tutto il SETUP più lo sviluppo di **2 compiti automatici personalizzati** — es. gestione fatture, monitoraggio pratiche, alert intelligenti. Perfetto per chi vuole risultati concreti da subito.";
 
// ── SVILUPPO WEB (generale) ───────────────────────────────────
} elseif (contains($msg, ['sviluppo web', 'sito web', 'web app', 'applicazione web', 'frontend', 'responsive'])) {
    $reply = "Costruiamo **soluzioni web ad alte prestazioni** con architetture sartoriali: focalizzate sull'efficienza e sulla semplicità d'uso. Abbiamo due pacchetti: **Web FOUNDATION** (da € 1.300) e **Web EVOLUTION con sistema intelligente** (da € 2.300). Quale ti interessa?";
 
// ── WEB FOUNDATION ────────────────────────────────────────────
} elseif (contains($msg, ['web foundation', 'foundation'])) {
    $reply = "Il pacchetto **Web FOUNDATION** parte da **€ 1.300** (una tantum) e include:\n✔ Progettazione estetica e funzionale\n✔ Sviluppo per ogni dispositivo\n✔ Architettura su misura\n✔ Setup iniziale completo\n\nLa base solida per la tua presenza digitale professionale.";
 
 // ── WEB EVOLUTION ─────────────────────────────────────────────
} elseif (contains($msg, ['web evolution', 'evolution', 'ai integrat', 'modulo ai'])) {
    $reply = "Il pacchetto **Web EVOLUTION — Sistema Integrato** parte da **€ 2.300** (una tantum). Include tutto il FOUNDATION più l'integrazione di **1 protocollo h4sh dedicato**: assistenti invisibili per gestione dati o analisi dei flussi. Il tuo sito diventa un vero strumento di lavoro.";
 
// ── MANAGED / HOSTING ─────────────────────────────────────────
} elseif (contains($msg, ['hosting', 'managed', 'manutenzione', 'backup', 'monitoring', 'gestione server', 'cloud', 'aggiornamenti'])) {
    $reply = "Offriamo due piani di **Manutenzione della Pace**:\n\n🌐 *Web Care*: **€ 950/anno** — gestione completa, monitoraggio e sicurezza.\n\n🤖 *Protocol Care*: **€ 1.299/anno** — gestione dell'assistente h4sh, aggiornamenti costanti e monitoraggio dei compiti.\n\nEntrambi garantiscono che tu non debba mai preoccuparti del lato tecnico.";
 
// ── PREZZI / COSTI ────────────────────────────────────────────
} elseif (contains($msg, ['prezzo', 'prezzi', 'costo', 'costi', 'quanto costa', 'tariffe', 'preventivo', 'offerta'])) {
    $reply = "Ecco una panoramica dei nostri Protocolli alla Tranquillità:\n\n🤖 **Assistente h4sh (PicoClaw)**\n• Pico SETUP: € 800\n• Pico AUTOMATION: € 1.800\n• Manutenzione annuale: € 1.299/anno\n\n🌐 **Sistemi Web**\n• Web FOUNDATION: da € 1.300\n• Web EVOLUTION: da € 2.300\n• Web Care annuale: € 950/anno\n\nVuoi un preventivo su misura? Scrivi a h4shell@gmail.com!";
 
 // ── PAGAMENTO / TERMINI ───────────────────────────────────────
} elseif (contains($msg, ['pagamento', 'termini', 'modalità', 'acconto', 'anticipo', 'fattura', 'come si paga'])) {
    $reply = "I termini sono semplici e trasparenti:\n\n💳 **Sviluppo / Implementazione:** 50% all'ordine, 50% alla consegna.\n💳 **Manutenzione / Managed Services:** Pagamento anticipato annuale.\n\nHai domande su un protocollo specifico?";
 
// ── PRIVACY / SICUREZZA ───────────────────────────────────────
} elseif (contains($msg, ['privacy', 'sicurezza', 'dati', 'gdpr', 'protezione', 'isolato', 'riservatezza'])) {
    $reply = "La privacy è il patrimonio più grande di un professionista. I dati vengono elaborati in modo **sicuro e isolato**, in una cassaforte digitale privata. Il monitoraggio costante e i backup sono inclusi in tutti i piani di manutenzione.";
 
// ── SCALABILITÀ ───────────────────────────────────────────────
} elseif (contains($msg, ['scalabil', 'crescita', 'espansione', 'aggiungere moduli', 'modulare', 'flessibil'])) {
    $reply = "I nostri protocolli sono progettati per crescere con il tuo studio. Puoi partire da una soluzione base e aggiungere nuovi compiti o risorse in qualsiasi momento — senza mai dover ricominciare da zero.";
 
 // ── PMI / PICCOLE IMPRESE ─────────────────────────────────────
} elseif (contains($msg, ['pmi', 'piccola impresa', 'piccola azienda', 'artigian', 'negozio', 'libero professionista', 'studio professionale'])) {
    $reply = "h4sh nasce per i professionisti italiani! Molte realtà sono prigioniere di processi manuali — noi interveniamo per automatizzare le scartoffie, ridurre l'errore umano e restituirti il tempo per fare il lavoro per cui hai studiato.";
 
// ── DOVE OPERATE / TERRITORIO ─────────────────────────────────
} elseif (contains($msg, ['dove operate', 'territorio', 'liguria', 'bordighera', 'italia', 'remoto', 'on-site', 'trasferta'])) {
    $reply = "h4sh ha sede a **Bordighera (IM)**, ma mettiamo in ordine studi in tutta **Italia** — sia da remoto che con interventi sul posto. La distanza non è mai un problema per la tua tranquillità.";
 
// ── CONTATTI ──────────────────────────────────────────────────
} elseif (contains($msg, ['contatti', 'contattare', 'contatto', 'email', 'scrivere', 'lorenzo', 'referente', 'modulo contatto'])) {
    $reply = "Puoi raggiungerci direttamente:\n\n📧 **Email:** h4shell@gmail.com\n👤 **Referente:** Lorenzo Fornara\n📍 **Sede:** Bordighera (IM), Italia\n\nLorenzo ti risponderà personalmente per capire come snellire il tuo lavoro.";
 
 // ── TEMPI / CONSEGNA ──────────────────────────────────────────
} elseif (contains($msg, ['tempi', 'quando', 'quanto tempo', 'consegna', 'deadline', 'quanto ci vuole'])) {
    $reply = "I tempi dipendono dalla complessità della 'messa in ordine' e vengono definiti nel preventivo. Lavoriamo con fasi chiare: avvio dopo l'acconto, consegna finale e saldo. Scrivici a h4shell@gmail.com per un piano dettagliato!";
 
// ── AIUTO NELLA SCELTA ────────────────────────────────────────
} elseif (contains($msg, ['differenza', 'confronto', 'quale scegliere', 'cosa è meglio', 'consiglio', 'aiutami a scegliere'])) {
    $reply = "Dipende dal tuo studio! 🎯\n\n• Solo ordine iniziale → **Pico SETUP** o **Web FOUNDATION**\n• Risultati operativi subito → **Pico AUTOMATION** o **Web EVOLUTION**\n• Senza pensieri tecnici → aggiungi il piano **Care**\n\nRaccontami il tuo caso e ti aiuterò a trovare la soluzione migliore.";
 
// ── GRAZIE / CONGEDO ──────────────────────────────────────────
} elseif (contains($msg, ['grazie', 'perfetto', 'capito', 'ottimo', 'arrivederci', 'a presto', 'ciao ciao'])) {
    $reply = "Prego! 😊 Se hai altre domande su come h4sh può aiutarti, sono qui. In bocca al lupo per il tuo studio — a presto!";
 
// ── FALLBACK ──────────────────────────────────────────────────
} else {
    $reply = "Interessante! 🚀 In h4sh amiamo risolvere i pasticci burocratici. Puoi spiegarmi meglio cosa ti ruba tempo, o preferisci parlare direttamente con Lorenzo? Scrivici a h4shell@gmail.com!";
}

echo json_encode([
    'reply' => $reply,
    'status' => 'success'
]);
