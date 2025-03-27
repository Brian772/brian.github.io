<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $secret_key = '0x4AAAAAABCuXeWljDZBAATnXeJzx2iVOzM';
    $token = $_POST['cf-turnstile-response'];
    
    // Verifikasi dengan Cloudflare
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $data = [
        'secret' => $secret_key,
        'response' => $token
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result);
    
    if (!$response->success) {
        die('Verifikasi gagal! Error codes: ' . implode(', ', $response->{'error-codes'}));
    }
    
    // Jika verifikasi berhasil
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    // Proses data...
    echo "Form berhasil dikirim!";
}
?>