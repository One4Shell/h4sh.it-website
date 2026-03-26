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
    echo json_encode(['result' => 0, 'error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['result' => 0, 'error' => 'Missing phone number']);
    exit;
}

// Here you would typically save to database or send an email
// For now, we'll just return success

echo json_encode([
    'result' => 1,
    'message' => 'Activation request received',
    'data' => $data
]);
