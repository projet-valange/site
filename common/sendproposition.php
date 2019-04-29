<?php
/*
$validator = $pp->getValidator();
$validator->fields(['nom','prénom','email'])->areRequired()->maxLength(50);
$validator->field('institution')->maxLength(6000);
$validator->field('email')->isEmail();
$validator->field('agree')->maxLength(6000);
$validator->field("nom_de_lenfant")->maxLength(6000);
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

$xml = "<proposition>\r\n";
$xml .= "<name>" . $_POST['name'] . "</name>\r\n";
$xml .= "<surname>" . $_POST['surname'] . "</surname>\r\n";
$xml .= "<email>" . $_POST['email'] . "</email>\r\n";
$xml .= "<agree>" . $_POST['agree'] . "</agree>\r\n";
$xml .= "<namechi>" . $_POST['namechi'] . "</namechi>\r\n";
$xml .= "<gender>" . $_POST['genre'] . "</gender>\r\n";
$xml .= "<age>" . $_POST['age'] . "</age>\r\n";
$xml .= "<localisation>" . $_POST['localisation'] . "</localisation>\r\n";
$xml .= "<lgfr>" . $_POST['langue_francais'] . "</lgfr>\r\n";
$xml .= "<lgen>" . $_POST['langue_anglais'] . "</lgen>\r\n";
$xml .= "<lgit>" . $_POST['langue_italien'] . "</lgit>\r\n";
$xml .= "<lgpt>" . $_POST['langue_portugais'] . "</lgpt>\r\n";
$xml .= "<lgalt>" . $_POST['langue_autre'] . "</lgalt>\r\n";
$xml .= "<disc>" . $_POST['genre_de_discours'] . "</disc>\r\n";
$xml .= "<file>" . $_FILES['file']['name'] . "</file>\r\n";
$xml .= "<size>" . $_FILES['file']['size'] . "</size>\r\n";
$xml .= "</proposition>\r\n\r\n";
file_put_contents("../depository/valdb.xml", $xml, FILE_APPEND);

$uploaddir = '../depository/';
$nn = escapeshellcmd($_POST['name'] . $_POST['surname']);
$nn = str_replace(" ", "_", $nn);
$uploadfile = $uploaddir . $nn  . "--" . basename($_FILES['file']['name']);
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