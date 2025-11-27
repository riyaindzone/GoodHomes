<?php
header('Content-Type: application/json');

// Allow POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Sanitize helper
function clean($key){
    return trim(filter_input(INPUT_POST, $key, FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
}

// Match EXACT HTML form fields
$name     = clean('name');
$phone    = clean('phone');
$interest = clean('interest');
$message  = clean('message');

// Basic validation
if ($name === '' || $phone === '' || $interest === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
    exit;
}

// Receiver email
$recipient = "537riya@gmail.com";

// Subject
$emailSubject = "New Website Inquiry - $interest";

// Email body
$body = "
<h2>New Website Inquiry</h2>
<table style='border-collapse:collapse;width:100%;max-width:600px;font-family:Arial;font-size:14px;'>
    <tr><td style='padding:8px;background:#f7f7f7;width:120px;'>Name</td><td style='padding:8px;'>$name</td></tr>
    <tr><td style='padding:8px;background:#f7f7f7;'>Phone</td><td style='padding:8px;'>$phone</td></tr>
    <tr><td style='padding:8px;background:#f7f7f7;'>Interested In</td><td style='padding:8px;'>$interest</td></tr>
    <tr><td style='padding:8px;background:#f7f7f7;'>Message</td><td style='padding:8px;'>" . nl2br(htmlspecialchars($message)) . "</td></tr>
    <tr><td style='padding:8px;background:#f7f7f7;'>Date</td><td style='padding:8px;'>" . date('Y-m-d H:i:s') . "</td></tr>
</table>
";

// Headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Website Form <no-reply@yourdomain.com>\r\n";

// Send mail
$sent = @mail($recipient, $emailSubject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email sending failed on server.']);
}
?>
