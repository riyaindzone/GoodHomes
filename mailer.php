<?php

$name     = $_POST['name'] ?? '';
$phone    = $_POST['phone'] ?? '';
$interest = $_POST['interest'] ?? '';
$message  = $_POST['message'] ?? '';

if ($name == "" || $phone == "" || $message == "") {
    echo "<h2 style='font-family:Arial;color:red;'>Form incomplete. Please go back and try again.</h2>";
    exit;
}

// Multiple recipients
$to  = "537riya@gmail.com";
$to2 = "dparag342@gmail.com";

$subject = "Good Homes PG: New Enquiry ($interest)";

$body = "
Name: $name
Phone: $phone
Interest: $interest
Message: $message
";

// From email
$from = "no-reply@goodhomesofficial.com";

// SENDMAIL PATH
$sendmail = "/usr/sbin/sendmail -t";

// FIRST EMAIL
$mail = popen($sendmail, "w");
fputs($mail, "To: $to\n");
fputs($mail, "Subject: $subject\n");
fputs($mail, "From: Good Homes PG <$from>\n");
fputs($mail, "Content-Type: text/plain; charset=UTF-8\n\n");
fputs($mail, $body);
pclose($mail);

// SECOND EMAIL
$mail2 = popen($sendmail, "w");
fputs($mail2, "To: $to2\n");
fputs($mail2, "Subject: $subject\n");
fputs($mail2, "From: Good Homes PG <$from>\n");
fputs($mail2, "Content-Type: text/plain; charset=UTF-8\n\n");
fputs($mail2, $body);
pclose($mail2);

// Success message
echo "
<div style='width:100%;text-align:center;margin-top:80px;font-family:Arial;'>
    <h1 style='color:green;font-size:32px;'>Thank You! 🎉</h1>
    <p style='font-size:20px;'>Your enquiry has been submitted successfully.</p>
    <a href='index.html' style='font-size:18px;color:#007bff;text-decoration:none;'>Go back to Home</a>
</div>
";
exit;
?>