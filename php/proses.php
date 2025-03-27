<?php
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $secret_key = '6LekygErAAAAAPt3Hy2plhRToQ7a7gTpOCYvSOlV';
    $captcha = $_POST['g-recaptcha-response'];
    
    // Verifikasi reCAPTCHA
    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret=$secret_key&response=$captcha"
    );
    $response = json_decode($response);
    
    if(!$response->success) {
        die('Verifikasi reCAPTCHA gagal!');
    }
    
    // Lanjutkan proses form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Proses pengiriman email...
}
?>
