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

$userMessage = strtolower($data['message']);
$reply = "";

// ── SALUTI ───────────────────────────────────────────────────
if (preg_match('/\b(ciao|hey|salve|buongiorno|buonasera|buonanotte|hello|hi)\b/', $msg)) {
    $reply = "Ciao! 👋 Sono Luca, l'assistente virtuale di h4sh. Posso aiutarti su automazione AI, sviluppo web o infrastruttura digitale. Da dove vuoi iniziare?";

// ── CHI SIETE / CHI È H4SH ───────────────────────────────────
} elseif (preg_match('/\b(chi siete|chi è h4sh|cos[\'è]è h4sh|di cosa vi occupate|presentat|parlami di voi|about)\b/', $msg)) {
    $reply = "h4sh è una realtà innovativa fondata da Lorenzo Fornara nel 2024 a Bordighera (IM). Ci occupiamo di automazione AI, sviluppo software su misura e infrastruttura digitale — portando l'innovazione della Silicon Valley nel tessuto produttivo italiano. 🇮🇹 Operiamo su tutto il territorio nazionale, da remoto e on-site.";

// ── VISION / FILOSOFIA ────────────────────────────────────────
} elseif (preg_match('/\b(vision|missione|filosofia|valori|obiettiv|perch[éè] scegliere|cosa vi distingue)\b/', $msg)) {
    $reply = "La nostra visione è un'Italia produttiva dove l'AI non sostituisce l'uomo, ma lo libera dalle mansioni ripetitive. Vogliamo che ogni PMI — non solo i grandi colossi — possa accedere a tecnologie d'avanguardia con un approccio sartoriale: nessuna soluzione standard, ogni progetto è cucito sulle esigenze specifiche del cliente.";

// ── SERVIZI (panoramica) ──────────────────────────────────────
} elseif (preg_match('/\b(servizi|cosa fate|cosa offrite|cosa fai|cosa offri|prodotti)\b/', $msg)) {
    $reply = "In h4sh lavoriamo su tre pilastri:\n\n1️⃣ *Automazione AI & Integrazione* — agenti autonomi, workflow optimization, analisi predittiva.\n2️⃣ *Sviluppo Software & Web* — web app ad alte prestazioni, architetture tailor-made.\n3️⃣ *Infrastruttura Digitale* — cloud, sicurezza, manutenzione evolutiva.\n\nSu quale vuoi approfondire?";

// ── AUTOMAZIONE AI (generale) ─────────────────────────────────
} elseif (preg_match('/\b(automaz|agente ai|intelligenza artificiale|ai|workflow|llm|modello|analisi predittiva|insight)\b/', $msg)) {
    $reply = "Con h4sh puoi integrare agenti AI autonomi direttamente nei tuoi processi aziendali: gestione documenti, supporto clienti, monitoraggio web, alert intelligenti e molto altro. Il nostro prodotto di punta si chiama **PicoClaw / CoreAgent** — ultra-leggero, scritto in Go, con risposta immediata. Vuoi i dettagli sui pacchetti?";

// ── PICOCLAW / COREAGENT (specifico) ─────────────────────────
} elseif (preg_match('/\b(picoclaw|coreagent|core agent|agente autonomo)\b/', $msg)) {
    $reply = "**PicoClaw** è il nostro agente AI ultra-leggero ottimizzato per task complessi con consumo minimo di risorse. È scritto in Go (velocità di risposta immediata), garantisce privacy con elaborazione isolata ed è scalabile: puoi aggiungere nuovi task in qualsiasi momento. Abbiamo due pacchetti di avvio — vuoi i prezzi?";

// ── PICO SETUP ────────────────────────────────────────────────
} elseif (preg_match('/\b(pico setup|setup|configurazione agente|installazione agente)\b/', $msg)) {
    $reply = "Il pacchetto **Pico SETUP** (€ 800 una tantum) include:\n✔ Installazione del core CoreAgent\n✔ Configurazione ambiente (VPS o locale)\n✔ Setup connettori API\n\nÈ il punto di partenza ideale se vuoi testare l'infrastruttura. Il pagamento è 50% all'ordine, 50% a consegna.";

// ── PICO AUTOMATION ───────────────────────────────────────────
} elseif (preg_match('/\b(pico automation|automation|task automatici|2 task|due task)\b/', $msg)) {
    $reply = "Il pacchetto **Pico AUTOMATION** (€ 1.800 una tantum) include tutto il SETUP più lo sviluppo di **2 task automatici personalizzati** — ad esempio: gestione documenti, monitoraggio web, alert intelligenti. Perfetto per chi vuole subito risultati operativi concreti.";

// ── SVILUPPO WEB (generale) ───────────────────────────────────
} elseif (preg_match('/\b(sviluppo web|sito web|web app|applicazione web|frontend|ui|ux|responsive)\b/', $msg)) {
    $reply = "Costruiamo **web application ad alte prestazioni** con architetture tailor-made: UI/UX focalizzata sull'efficienza, frontend responsive, infrastruttura cloud scalabile. Abbiamo due pacchetti: **Web FOUNDATION** (da € 1.300) e **Web EVOLUTION con AI integrata** (da € 2.300). Quale ti interessa?";

// ── WEB FOUNDATION ────────────────────────────────────────────
} elseif (preg_match('/\b(web foundation|foundation)\b/', $msg)) {
    $reply = "Il pacchetto **Web FOUNDATION** parte da **€ 1.300** (una tantum) e include:\n✔ Progettazione UI/UX\n✔ Sviluppo frontend responsive\n✔ Architettura tailor-made\n✔ Setup infrastruttura cloud iniziale\n\nÈ la base solida per la tua presenza digitale professionale.";

// ── WEB EVOLUTION ─────────────────────────────────────────────
} elseif (preg_match('/\b(web evolution|evolution|ai integrat|modulo ai|intelligenza nel sito)\b/', $msg)) {
    $reply = "Il pacchetto **Web EVOLUTION — AI Integrated** parte da **€ 2.300** (una tantum). Include tutto il FOUNDATION più l'integrazione di **1 modulo AI dedicato**: agenti autonomi per gestione dati, workflow optimization o analisi predittiva. Il tuo sito diventa un vero strumento intelligente.";

// ── MANAGED / HOSTING ─────────────────────────────────────────
} elseif (preg_match('/\b(hosting|managed|manutenzione|backup|monitoring|gestione|server|cloud|aggiornamenti)\b/', $msg)) {
    $reply = "Offriamo due servizi **Managed** opzionali:\n\n🌐 *Web Hosting & Care*: **€ 950/anno** — hosting dedicato, manutenzione evolutiva, monitoring e backup.\n\n🤖 *Agent Hosting & Maintenance*: **€ 1.299/anno** — hosting dell'agente CoreAgent, aggiornamenti software, monitoring dei task e backup delle configurazioni.\n\nEntrambi sono pagamento annuale anticipato all'attivazione.";

// ── PREZZI / COSTI ────────────────────────────────────────────
} elseif (preg_match('/\b(prezzo|prezzi|costo|costi|quanto costa|tariffe|preventivo|offerta)\b/', $msg)) {
    $reply = "Ecco una panoramica dei nostri prezzi:\n\n🤖 **Agente AI (CoreAgent / PicoClaw)**\n• Pico SETUP: € 800\n• Pico AUTOMATION: € 1.800\n• Hosting annuale: € 1.299/anno\n\n🌐 **Sviluppo Web**\n• Web FOUNDATION: da € 1.300\n• Web EVOLUTION (AI): da € 2.300\n• Hosting & Care annuale: € 950/anno\n\nTutti i prezzi sono una tantum salvo hosting. Vuoi un preventivo su misura? Scrivi a h4shell@gmail.com!";

// ── PAGAMENTO / TERMINI ───────────────────────────────────────
} elseif (preg_match('/\b(pagamento|termini|modalit|acconto|anticipo|fattura|come si paga)\b/', $msg)) {
    $reply = "I termini di pagamento sono semplici e trasparenti:\n\n💳 **Sviluppo / Implementazione:** 50% all'ordine, 50% alla consegna.\n💳 **Hosting / Managed Services:** Pagamento anticipato annuale all'attivazione.\n\nHai domande su un pacchetto specifico?";

// ── PRIVACY / SICUREZZA ───────────────────────────────────────
} elseif (preg_match('/\b(privacy|sicurezza|dati|gdpr|protezione|isolat|riservatezza)\b/', $msg)) {
    $reply = "La privacy è un pilastro fondamentale per h4sh. I dati vengono elaborati in modo **sicuro e isolato**, garantendo basi digitali protette. Includiamo monitoring costante, backup periodici e aggiornamenti di sicurezza in tutti i nostri piani Managed. Nessun compromesso.";

// ── SCALABILITÀ ───────────────────────────────────────────────
} elseif (preg_match('/\b(scalabil|crescita|espansione|aggiungere|modulare|flessibil)\b/', $msg)) {
    $reply = "Le nostre soluzioni sono progettate per crescere con te. Puoi partire con un pacchetto base e aggiungere moduli AI, nuovi task automatici o risorse cloud in qualsiasi momento — senza dover ripartire da zero. Architettura modulare è il nostro standard.";

// ── PMI / PICCOLE IMPRESE ─────────────────────────────────────
} elseif (preg_match('/\b(pmi|piccola impresa|piccola azienda|artigiani|negozio|libero professionista|studio)\b/', $msg)) {
    $reply = "h4sh nasce proprio per le PMI italiane! Molte realtà restano frenate da processi manuali obsoleti — noi interveniamo per automatizzare la gestione documentale, ridurre l'errore umano e affiancarti in un percorso di alfabetizzazione digitale. L'AI diventa il miglior collaboratore di ogni tuo dipendente, senza la necessità di un reparto IT interno.";

// ── DOVE OPERATE / TERRITORIO ─────────────────────────────────
} elseif (preg_match('/\b(dove operate|territorio|zona|liguria|bordighera|italia|remoto|on.?site|trasferta)\b/', $msg)) {
    $reply = "h4sh ha sede a **Bordighera (IM), in Liguria**, ma operiamo su tutto il **territorio nazionale italiano** — sia da remoto che on-site. La distanza non è mai un problema per noi!";

// ── CONTATTI ──────────────────────────────────────────────────
} elseif (preg_match('/\b(contatti|contattare|contatto|email|scrivere|lorenzo|referente|modulo)\b/', $msg)) {
    $reply = "Puoi raggiungerci direttamente:\n\n📧 **Email:** h4shell@gmail.com\n👤 **Referente:** Lorenzo Fornara\n📍 **Sede:** Bordighera (IM), Italia\n\nRispondiamo rapidamente — Lorenzo sarà felice di ascoltarti!";

// ── TEMPI / QUANDO INIZIO ─────────────────────────────────────
} elseif (preg_match('/\b(tempi|quando|quant[oi] tempo|consegna|deadline|quanto ci vuole)\b/', $msg)) {
    $reply = "I tempi dipendono dalla complessità del progetto e vengono definiti nel preventivo. In genere lavoriamo con milestone chiare: inizio dopo il 50% di acconto, consegna finale e saldo. Contattaci su h4shell@gmail.com per un piano dettagliato sul tuo caso specifico!";

// ── DIFFERENZA TRA PACCHETTI ──────────────────────────────────
} elseif (preg_match('/\b(differenza|confronto|quale scegliere|meglio|consiglio|aiutami a scegliere)\b/', $msg)) {
    $reply = "Dipende dalle tue esigenze! 🎯\n\n• Se parti da zero e vuoi solo l'infrastruttura → **Pico SETUP** o **Web FOUNDATION**\n• Se vuoi subito automazione operativa → **Pico AUTOMATION** o **Web EVOLUTION**\n• Se non vuoi pensare alla gestione tecnica → aggiungi il piano **Managed**\n\nVuoi raccontarmi il tuo caso? Ti aiuto a trovare il fit migliore.";

// ── GRAZIE / ARRIVEDERCI ──────────────────────────────────────
} elseif (preg_match('/\b(grazie|perfetto|capito|ottimo|ok|arrivederci|a presto|ciao ciao)\b/', $msg)) {
    $reply = "Prego! 😊 Se hai altre domande su h4sh sono qui. In bocca al lupo per il tuo progetto — a presto!";

// ── FALLBACK ──────────────────────────────────────────────────
} else {
    $reply = "Interessante! In h4sh amiamo le sfide tecnologiche. 🚀 Puoi spiegarmi meglio cosa stai cercando, o preferisci che ti metta direttamente in contatto con Lorenzo? Scrivici a h4shell@gmail.com!";
}

echo json_encode([
    'reply' => $reply,
    'status' => 'success'
]);
