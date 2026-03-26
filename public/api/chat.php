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

// Simple rule-based logic for the bot "Luca"
if (strpos($userMessage, 'ciao') !== false || strpos($userMessage, 'hey') !== false) {
    $reply = "Ciao! Sono Luca. Come posso aiutarti con i servizi di h4sh oggi?";
} elseif (strpos($userMessage, 'servizi') !== false || strpos($userMessage, 'cosa fate') !== false) {
    $reply = "In h4sh ci occupiamo di AI Automation, sviluppo software su misura e ottimizzazione dei processi aziendali. Vuoi saperne di più su un'area specifica?";
} elseif (strpos($userMessage, 'prezzo') !== false || strpos($userMessage, 'costo') !== false) {
    $reply = "I nostri progetti sono personalizzati. Ti consiglio di usare il nostro 'Generatore di Agenti AI' nella home per avere un'idea del risparmio potenziale, o di contattarci per un preventivo!";
} elseif (strpos($userMessage, 'contatti') !== false || strpos($userMessage, 'email') !== false) {
    $reply = "Puoi scriverci a h4shell@gmail.com o compilare il modulo in fondo alla pagina. Lorenzo sarà felice di risponderti!";
} else {
    $reply = "Interessante! In h4sh amiamo le sfide tecnologiche. Puoi spiegarmi meglio cosa cerchi o vuoi che ti metta in contatto con il team?";
}

echo json_encode([
    'reply' => $reply,
    'status' => 'success'
]);
