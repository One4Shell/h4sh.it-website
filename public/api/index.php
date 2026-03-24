<?php

// 1. Definisci chi può accedere (usa '*' per sviluppo, o l'URL specifico per produzione)
header("Access-Control-Allow-Origin: https://h4sh.it");

// 2. Definisci quali metodi sono consentiti
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

// 3. Definisci quali header può inviare il client (Content-Type è fondamentale per il JSON)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. Gestione della richiesta "Preflight" (il browser chiede il permesso prima del POST)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "sqlite.php";

try {

    // Il file verrà creato in /data/ se non esiste
    $db = new SQLiteDatabase('data/newsletter.sqlite');

    // Creazione tabella
    $db->run("CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE
    )");
/*
 // Inserimento con Prepared Statement
 $db->run("INSERT INTO prodotti (nome, prezzo) VALUES (?, ?)", ["Laptop", 1200.50]);
 $lastId = $db->lastId();
 // Recupero di una riga singola
 $prodotto = $db->fetchOne("SELECT * FROM prodotti WHERE id = :id", [':id' => $lastId]);
 
 // Recupero di un valore singolo (es. conteggio)
 $totale = $db->fetchValue("SELECT COUNT(*) FROM prodotti");
 echo "Inserito prodotto: " . $prodotto['nome'] . " (Totale nel DB: $totale)";
 */

/* $result = $db->fetchAll("SELECT * FROM emails"); */
/*
 header('Content-Type: application/json; charset=utf-8');
 echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
 */
}
catch (Exception $e) {
    echo "Errore applicazione: " . $e->getMessage();
}



$json_data = file_get_contents('php://input');

// Decodifichiamo il JSON in un array associativo
$data = json_decode($json_data, true);

// Ora controlliamo se l'email esiste nell'array decodificato
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['email']) && !empty($data['email'])) {

    $db_result = $db->run("INSERT OR IGNORE INTO emails (email) VALUES (?)", [$data['email']]);

    header('Content-Type: application/json; charset=utf-8');

    $result = [
        "status" => "success",
        "received_email" => $data['email'],
        "result" => $db_result
    ];

    if ($db_result == 1) {
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    else {
        echo json_encode(["error" => 'utente non inserito', "result" => $db_result], JSON_UNESCAPED_UNICODE);
    }


    exit;
}
else {
    // Debug opzionale se non entra nell'if
    header('Content-Type: application/json', true, 400);
    echo json_encode(["error" => "Dati mancanti o formato errato"]);
}