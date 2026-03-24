<?php

class SimpleSMTP
{
    private $host;
    private $port;
    private $username;
    private $password;
    private $timeout;
    private $debug = false;
    private $socket;

    // Header e Contenuti
    private $fromEmail;
    private $fromName;
    private $recipients = [];
    private $cc = [];
    private $bcc = [];
    private $subject;
    private $body;
    private $isHtml = true;
    private $attachments = [];
    private $customHeaders = [];

    public function __construct($host, $port, $username, $password, $timeout = 30)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->timeout = $timeout;
    }

    /**
     * Abilita o disabilita il log di debug a schermo
     */
    public function setDebug(bool $enable)
    {
        $this->debug = $enable;
    }

    public function setFrom($email, $name = '')
    {
        $this->fromEmail = $email;
        $this->fromName = $name;
    }

    public function addAddress($email, $name = '')
    {
        $this->recipients[] = ['email' => $email, 'name' => $name];
    }

    public function addCC($email)
    {
        $this->cc[] = $email;
    }

    public function addBCC($email)
    {
        $this->bcc[] = $email;
    }

    public function setSubject($subject)
    {
        $this->subject = $subject;
    }

    public function setBody($body, $isHtml = true)
    {
        $this->body = $body;
        $this->isHtml = $isHtml;
    }

    /**
     * Aggiunge un allegato da un percorso file
     */
    public function addAttachment($path, $name = '')
    {
        if (file_exists($path)) {
            $this->attachments[] = [
                'path' => $path,
                'name' => $name ? $name : basename($path)
            ];
        }
        else {
            throw new Exception("File allegato non trovato: $path");
        }
    }

    /**
     * Invia l'email
     */
    public function send()
    {
        try {
            $this->connect();
            $this->auth();
            $this->sendMailData();
            $this->quit();
            return true;
        }
        catch (Exception $e) {
            $this->log("ERRORE: " . $e->getMessage());
            if ($this->socket) {
                fclose($this->socket);
            }
            return false;
        }
    }

    // --- Metodi Interni (Protocollo SMTP) ---

    private function connect()
    {
        $protocol = '';
        // Se la porta Ã¨ 465, usiamo SSL implicito
        if ($this->port == 465) {
            $protocol = 'ssl://';
        }

        $serverAddress = $protocol . $this->host . ':' . $this->port;
        $this->log("Connessione a $serverAddress...");

        $this->socket = stream_socket_client(
            $serverAddress,
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]])
        );

        if (!$this->socket) {
            throw new Exception("Impossibile connettersi: $errstr ($errno)");
        }

        $this->readResponse(); // Leggi il benvenuto del server
        $this->sendCommand('EHLO ' . gethostname());

        // Gestione STARTTLS per porta 587
        if ($this->port == 587) {
            $this->sendCommand('STARTTLS');
            if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new Exception("Impossibile avviare crittografia TLS");
            }
            $this->sendCommand('EHLO ' . gethostname()); // Ripeti EHLO dopo TLS
        }
    }

    private function auth()
    {
        $this->sendCommand('AUTH LOGIN');
        $this->sendCommand(base64_encode($this->username));
        $this->sendCommand(base64_encode($this->password));
    }

    private function sendMailData()
    {
        // MAIL FROM
        $this->sendCommand("MAIL FROM: <{$this->fromEmail}>");

        // RCPT TO (inclusi CC e BCC per il server, ma BCC non appare negli header)
        $allRecipients = array_merge(
            array_column($this->recipients, 'email'),
            $this->cc,
            $this->bcc
        );

        foreach ($allRecipients as $email) {
            $this->sendCommand("RCPT TO: <$email>");
        }

        // DATA
        $this->sendCommand('DATA');

        // Costruzione degli Header MIME
        $boundary = md5(uniqid(time()));
        $headers = $this->buildHeaders($boundary);
        $content = $this->buildBody($boundary);

        // Invio effettivo dei dati
        fputs($this->socket, $headers . "\r\n" . $content . "\r\n.\r\n");
        $this->readResponse();
    }

    private function buildHeaders($boundary)
    {
        $headers = [];
        $headers[] = "Date: " . date('r');

        // Formattazione To
        $toStrings = [];
        foreach ($this->recipients as $rcpt) {
            $toStrings[] = $rcpt['name'] ? "{$rcpt['name']} <{$rcpt['email']}>" : $rcpt['email'];
        }
        $headers[] = "To: " . implode(', ', $toStrings);

        // Formattazione From
        $headers[] = "From: " . ($this->fromName ? "{$this->fromName} <{$this->fromEmail}>" : $this->fromEmail);

        if (!empty($this->cc)) {
            $headers[] = "Cc: " . implode(', ', $this->cc);
        }

        $headers[] = "Subject: " . $this->subject;
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

        return implode("\r\n", $headers);
    }

    private function buildBody($boundary)
    {
        $msg = "";

        // Sezione Messaggio (HTML o Testo)
        $msg .= "--{$boundary}\r\n";
        $contentType = $this->isHtml ? 'text/html' : 'text/plain';
        $msg .= "Content-Type: {$contentType}; charset=\"UTF-8\"\r\n";
        $msg .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $msg .= $this->body . "\r\n\r\n";

        // Sezione Allegati
        if (!empty($this->attachments)) {
            foreach ($this->attachments as $att) {
                $content = file_get_contents($att['path']);
                $encodedContent = chunk_split(base64_encode($content));

                $msg .= "--{$boundary}\r\n";
                $msg .= "Content-Type: application/octet-stream; name=\"{$att['name']}\"\r\n";
                $msg .= "Content-Transfer-Encoding: base64\r\n";
                $msg .= "Content-Disposition: attachment; filename=\"{$att['name']}\"\r\n\r\n";
                $msg .= $encodedContent . "\r\n\r\n";
            }
        }

        $msg .= "--{$boundary}--";
        return $msg;
    }

    private function quit()
    {
        $this->sendCommand('QUIT');
        fclose($this->socket);
    }

    private function sendCommand($cmd)
    {
        $this->log("CLIENT: $cmd");
        fputs($this->socket, $cmd . "\r\n");
        $this->readResponse();
    }

    private function readResponse()
    {
        $response = "";
        while ($str = fgets($this->socket, 515)) {
            $response .= $str;
            // SMTP response format: 3-digit code + space (last line) or - (continuation)
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        $this->log("SERVER: " . trim($response));

        // Controllo errori basilare (codici 4xx e 5xx sono errori)
        $code = substr($response, 0, 3);
        if ($code >= 400) {
            throw new Exception("Errore SMTP dal server: $response");
        }

        return $response;
    }

    private function log($str)
    {
        if ($this->debug) {
            // Rimuove la password dai log per sicurezza
            if (strpos($str, base64_encode($this->password)) !== false) {
                $str = str_replace(base64_encode($this->password), '***PASSWORD***', $str);
            }
            echo htmlspecialchars($str) . "<br>\n";
        }
    }
}
?>