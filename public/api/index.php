<?php

// 1. Definisci chi può accedere
header("Access-Control-Allow-Origin: *");

// 2. Definisci quali metodi sono consentiti
header("Access-Control-Allow-Methods: POST, OPTIONS");

// 3. Definisci quali header può inviare il client (Content-Type è fondamentale per il JSON)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. Gestione della richiesta "Preflight" (il browser chiede il permesso prima del POST)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(404);
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

    $db->run("CREATE TABLE IF NOT EXISTS phones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE
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

// Ora controlliamo se l'email o il telefono esistono nell'array decodificato
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['phone']) && !empty($data['phone'])) {
    $db_result = $db->run("INSERT OR IGNORE INTO phones (phone) VALUES (?)", [$data['phone']]);
    
    header('Content-Type: application/json; charset=utf-8');

    // Invio notifica email
    require_once "EmailManager.php";
    require 'config.php';

    try {
        $mail = new SimpleSMTP($config['smtp_host'], $config['smtp_port'], $config['smtp_user'], $config['smtp_pass'], $config['smtp_timeout']);
        $mail->setFrom($config['smtp_user'], 'h4sh.it - AI Agent Activation');
        $mail->addAddress("h4shell@gmail.com");
        $mail->setSubject("Nuova richiesta attivazione Agente AI");

        $agentName = $data['agentName'] ?? 'N/A';
        $dept = $data['department'] ?? 'N/A';

        $htmlBody = "
                <html>
                <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background-color: #333'>
                    <div style='background-color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #333; border-radius: 8px; overflow: hidden;'>
                        <div style='background-color: #10b981; color: black; padding: 20px; text-align: center;'>
                            <h1 style='margin: 0;'>Nuova Richiesta Attivazione</h1>
                        </div>
                        <div style='padding: 20px;'>
                            <p>Hai ricevuto una nuova richiesta di attivazione per un Agente AI.</p>
                            <div style='background: black; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                                <strong>Telefono:</strong> <span style='color: #10b981;'>{$data['phone']}</span><br>
                                <strong>Agente:</strong> {$agentName}<br>
                                <strong>Reparto:</strong> {$dept}
                            </div>
                        </div>
                        <div style='background-color: black; color: #777; padding: 10px; text-align: center; font-size: 12px;'>
                            © " . date("Y") . " Lorenzo Fornara - Tutti i diritti riservati.
                        </div>
                    </div>
                </body>
                </html>
                ";

        $mail->setBody($htmlBody, true);
        $mail->send();
    } catch (Exception $e) {
        // Errore silenzioso per l'utente, ma loggato se necessario
    }
    
    echo json_encode([
        "status" => "success",
        "result" => 1,
        "message" => "Richiesta ricevuta"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['email']) && !empty($data['email'])) {

    $db_result = $db->run("INSERT OR IGNORE INTO emails (email) VALUES (?)", [$data['email']]);

    header('Content-Type: application/json; charset=utf-8');

    $result = [
        "status" => "success",
        "received_email" => $data['email'],
        "result" => $db_result
    ];

    if ($db_result == 1) {

        require_once "EmailManager.php";
        require 'config.php';

        try {
            $mail = new SimpleSMTP($config['smtp_host'], $config['smtp_port'], $config['smtp_user'], $config['smtp_pass'], $config['smtp_timeout']);

            // Impostazione mittente e destinatario
            $mail->setFrom($config['smtp_user'], 'Lorenzo Fornara');
            $mail->addAddress("h4shell@gmail.com");
            // Contenuto dell'email
            $mail->setSubject("Nuova iscrizione alla newsletter");

            $htmlBody = "
                    <html>
                    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; background-color: #333'>
                        <div style='background-color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #333; border-radius: 8px; overflow: hidden;'>
                            <div style='background-color: #01bd7d; color: black; padding: 20px; text-align: center;'>
                                <h1 style='margin: 0;'>Nuova Iscrizione</h1>
                            </div>
                            <div style='padding: 20px;'>
                                <p>Ciao <strong>Lorenzo</strong>,</p>
                                <p>Hai ricevuto una nuova iscrizione alla tua newsletter.</p>
                                <div style='background: black; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                                    <strong>Email utente:</strong> <span style='color: #01bd7d;'>{$data['email']}</span>
                                </div>
                                <p>Ricordati di mandare il codice sconto</p>
                            </div>
                            <div style='background-color: black; color: #777; padding: 10px; text-align: center; font-size: 12px;'>
                                © " . date("Y") . " Lorenzo Fornara - Tutti i diritti riservati.
                            </div>
                        </div>
                    </body>
                    </html>
                    ";

            $mail->setBody($htmlBody, true);
            $response = $mail->send();
        }
        catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }



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