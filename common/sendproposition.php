<?php
$xml = $_POST['xmldata'];
$fname = escapeshellcmd($_POST['entryname']);
file_put_contents("../depository/test.txt", $fname . $xml, FILE_APPEND);
file_put_contents("../depository/" . $fname . ".xml", $xml);

$uploaddir = '../depository/';
/*
$nn = escapeshellcmd($_POST['name'] . $_POST['surname']);
$nn = str_replace(" ", "_", $nn);
*/
$uploadfile = $uploaddir . $fname . "-" . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);

$headers0 = 'From: contactsvalange@gmail.com' . "\r\n" .
    'Reply-To: contactvalange@gmail.com' . "\r\n" ;
$headers = $headers0 . "MIME-Version: 1.0\r\n" . "Content-Type: text/html; charset=UTF-8\r\n";

// to the user
$messageretour = "<p>Bonjour<br/>";
$messageretour .= "<p>Un grand merci pour avoir déposé cet extrait.<br/>";
$messageretour .= "<p>Nous vous contacterons en cas de question complémentaire.<br/>";
$messageretour .= "L'équipe de Valange<br/><a href='http://ct3.ortolang.fr/valange/'>ct3.ortolang.fr/valange/</a><p>";
// file_put_contents("../depository/msg.txt", $messageretour);
$email = $_POST['email'];
mail($email, "Envoi de proposition Valange", $messageretour, $headers);

// to us
echo mail("contactvalange@gmail.com", "proposition video", $xml, $headers0);
?>