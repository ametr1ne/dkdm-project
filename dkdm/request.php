<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require '../phplibs/phpmailer/src/Exception.php';
    require '../phplibs/phpmailer/src/PHPMailer.php';
    require '../phplibs/phpmailer/src/SMTP.php';

    $name = trim($_POST["name"]);
    $price = trim($_POST["price"]);
    $email = trim($_POST["email"]);
    $phone = trim($_POST["phone"]);

    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'utf-8';
        $mail->isSMTP();
        $mail->Host = 'ssl://smtp.yandex.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'yodiz.school@ya.ru';
        $mail->Password = 'rjxwkyyfjnhctszy';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 465;

        $mail->setFrom('yodiz.school@ya.ru', 'Yodiz School');
        // $mail->addAddress('yes@yodiz.ru');
	    // $mail->addAddress('anna@yodiz.ru');
	    $mail->addAddress('kmarx5959@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'Заявка на Онлайн-курс';
        $mail->Body    = '';
        if ($email) {
            $mail->Body .= "<p>Заявка на Онлайн-курс</p><p>Тариф: Обучение с обратной связью</p><p>Имя: {$name}</p><p>Email: {$email}</p><p>Тел: {$phone}</p><p>Способ оплаты: {$price} руб.</p>";
        }

        $mail->send();

        echo "Done!";
    } catch (Exception $e) {
        echo 'Произошла ошибка. Error: ', $mail->ErrorInfo;
    }
}
