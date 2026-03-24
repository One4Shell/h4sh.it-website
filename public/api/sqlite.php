<?php

/**
 * Classe SQLiteDatabase
 * Gestisce la connessione, la creazione automatica di file/cartelle e 
 * fornisce un'interfaccia fluida per Prepared Statements.
 */
class SQLiteDatabase
{
    private $pdo;
    private $dbFile;

    /**
     * Costruttore della classe.
     * @param string $dbFileName Il percorso/nome del file (es. 'data/database.db')
     */
    public function __construct($dbFileName = 'database.sqlite')
    {
        $this->dbFile = $dbFileName;
        $this->ensureDirectoryExists();
        $this->connect();
    }

    /**
     * Crea ricorsivamente la struttura delle cartelle se non esiste.
     */
    private function ensureDirectoryExists()
    {
        $directory = dirname($this->dbFile);
        if ($directory !== '.' && !is_dir($directory)) {
            if (!mkdir($directory, 0755, true)) {
                throw new Exception("Impossibile creare la directory: $directory");
            }
        }
    }

    /**
     * Stabilisce la connessione PDO.
     */
    private function connect()
    {
        try {
            $this->pdo = new PDO("sqlite:" . $this->dbFile);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        catch (PDOException $e) {
            die("Errore di connessione: " . $e->getMessage());
        }
    }

    /**
     * Metodo generico per eseguire query con prepared statements.
     * @param string $sql Query SQL con segnaposti (?) o (:nome)
     * @param array $params Array di parametri da associare
     * @return PDOStatement
     */
    public function executeQuery($sql, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        }
        catch (PDOException $e) {
            error_log("Errore SQL: " . $e->getMessage() . " - Query: " . $sql);
            throw $e;
        }
    }

    /**
     * Recupera tutti i record di una query.
     * @return array
     */
    public function fetchAll($sql, $params = [])
    {
        return $this->executeQuery($sql, $params)->fetchAll();
    }

    /**
     * Recupera un singolo record (la prima riga).
     * @return array|bool
     */
    public function fetchOne($sql, $params = [])
    {
        return $this->executeQuery($sql, $params)->fetch();
    }

    /**
     * Recupera un singolo valore (es. COUNT(*)).
     * @return mixed
     */
    public function fetchValue($sql, $params = [])
    {
        return $this->executeQuery($sql, $params)->fetchColumn();
    }

    /**
     * Esegue un'operazione che non restituisce righe (INSERT, UPDATE, DELETE).
     * @return int Numero di righe interessate.
     */
    public function run($sql, $params = [])
    {
        $stmt = $this->executeQuery($sql, $params);
        return $stmt->rowCount();
    }

    /**
     * Restituisce l'ultimo ID inserito.
     */
    public function lastId()
    {
        return $this->pdo->lastInsertId();
    }

    /**
     * Gestione delle transazioni: Inizio
     */
    public function beginTransaction()
    {
        return $this->pdo->beginTransaction();
    }

    /**
     * Gestione delle transazioni: Commit
     */
    public function commit()
    {
        return $this->pdo->commit();
    }

    /**
     * Gestione delle transazioni: Rollback
     */
    public function rollBack()
    {
        return $this->pdo->rollBack();
    }
}