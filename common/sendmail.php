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
$headers = 'From: contactsvalange@gmail.com' . "\r\n" .
    'Reply-To: contactvalange@gmail.com' . "\r\n" ;
$headers .= "MIME-Version: 1.0\r\n" . "Content-Type: text/html; charset=UTF-8\r\n";

#echo "<h1>", $title, "-X-", $name, "-X-", $email, "-X-", $message, "</h1>";
#file_put_contents('logvalange.xml', "<msg>\r\n<title>" . $title . "</title>\r\n<name>" . $name . "</name>\r\n<email>" . $email . "</email>\r\n<text>" . $message . "</text></msg>\r\n\r\n", FILE_APPEND);
mail($email, $title, "<p>Merci de nous avoir contacté.<br/>L'équipe de Valange<br/><a href='http://ct3.ortolang.fr/valange/'>ct3.ortolang.fr/valange/</a><p>", $headers);
#mail("contactsvalange@gmail.com", "selfcontact", $email . "\r\n" . $title . "\r\n"  . $name . "\r\n-----\r\n" . $message, $headers);
mail("contactsvalange@gmail.com", "selfcontact", "<pre><msg>\r\n<title>" . $title . "</title>\r\n<name>" . $name . "</name>\r\n<email>" . $email . "</email>\r\n<text>" . $message . "</text></msg>\r\n</pre>\r\n", $headers);
echo mail("contactvalange@gmail.com", "contact site valange", "Email: " . $email . "\r\n" . "Titre: " . $title . "\r\n" . "Nom: " . $name . "\r\n" . "Message:" . $message, $headers);
?>