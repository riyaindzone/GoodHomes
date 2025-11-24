<?php
header('Content-Type: application/json');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Spam honeypot
if (!empty($_POST['website'] ?? '')) {
    echo json_encode(['success' => true, 'message' => 'OK']);
    exit;
}

function sanitize($key, $default = '') {
    return trim(filter_input(INPUT_POST, $key, FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? $default);
}

// Fields from your HTML
$formType = sanitize('formType');
$name     = sanitize('name');
$phone    = sanitize('phone'); 
$interest = sanitize('interest');
$message  = trim($_POST['message'] ?? '');

// Basic validation
if ($name === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
    exit;
}

// Send only to your email
$recipient = "537riya@gmail.com";

// Email subject
$emailSubject = "Good Homes PG: New Enquiry (" . ucfirst($interest) . ")";

// Build email body — **NO IP ADDRESS INCLUDED**
$body = "
<h2>GoodHomes Website Form</h2>
<table style='border-collapse:collapse;width:100%;max-width:700px;font-family:Arial'>
<tr><td><strong>Name</strong></td><td>$name</td></tr>
<tr><td><strong>Phone</strong></td><td>$phone</td></tr>
<tr><td><strong>Interest</strong></td><td>$interest</td></tr>
<tr><td><strong>Message</strong></td><td>".nl2br(htmlspecialchars($message))."</td></tr>
<tr><td><strong>Date</strong></td><td>".date('Y-m-d H:i:s')."</td></tr>
</table>
";

// Headers
$fromEmail = "no-reply@goodhomesofficial.com";
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Good Homes PG Website <{$fromEmail}>\r\n";

// Send email
$ok = @mail($recipient, $emailSubject, $body, $headers);

if ($ok) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email sending failed.']);
}
?>
