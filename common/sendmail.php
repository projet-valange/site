<?php
/*
$validator = $pp->getValidator();
$validator->fields(['nom','prénom','email'])->areRequired()->maxLength(50);
$validator->field('institution')->maxLength(6000);
$validator->field('email')->isEmail();
$validator->field('agree')->maxLength(6000);
$validator->field("nom_de_l'enfant")->maxLength(6000);
$validator->field('genre')->maxLength(6000);
$validator->field('age')->maxLength(6000);
$validator->field('localisation')->maxLength(6000);
$validator->field('langue_français')->maxLength(6000);
$validator->field('langue_anglais')->maxLength(6000);
$validator->field('langue_italien')->maxLength(6000);
$validator->field('langue_portugais')->maxLength(6000);
$validator->field('langue_autre')->maxLength(6000);
$validator->field('genre_de_discours')->maxLength(6000);

$pp->attachFiles(['file']);
*/

$title=$_POST['title'];
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['text'];
$headers0 = 'From: contactsvalange@gmail.com' . "\r\n" .
    'Reply-To: contactvalange@gmail.com' . "\r\n" ;
$headers = $headers0 . "MIME-Version: 1.0\r\n" . "Content-Type: text/html; charset=UTF-8\r\n";

// trace in file
file_put_contents('../depository/logvalange.xml', "<msg>\r\n<title>" . $title . "</title>\r\n<name>" . $name . "</name>\r\n<email>" . $email . "</email>\r\n<text>" . $message . "</text>\r\n</msg>\r\n\r\n", FILE_APPEND);
// response to the user
mail($email, $title, "<p>Merci de nous avoir contacté.<br/>L'équipe de Valange<br/><a href='http://ct3.ortolang.fr/valange/'>ct3.ortolang.fr/valange/</a><p>", $headers);

// send to us
// mail("contactsvalange@gmail.com", "selfcontact", "<msg>\r\n<title>" . $title . "</title>\r\n<name>" . $name . "</name>\r\n<email>" . $email . "</email>\r\n<text>" . $message . "</text>\r\n</msg>\r\n", $headers0);
echo mail("contactvalange@gmail.com", "contact site valange", "Email: " . $email . "\r\n" . "Titre: " . $title . "\r\n" . "Nom: " . $name . "\r\n" . "Message:\r\n" . $message . "\r\n", $headers0);
?>