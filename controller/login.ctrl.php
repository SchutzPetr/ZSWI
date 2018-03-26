<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.03.2018
 * Time: 19:12
 */
session_start();

//print_r($_SERVER);
//
//$_SESSION['username'] = $_SERVER['REMOTE_USER']; //timhle dostanes ze serveru uzivatelske jmeno, ve vasem pripade orion login
//
//print_r("Hiii");
//header('Location: /');

/****
 * v nastaveni apache
 <Directory /var/www/mujweb/sso/>
AuthName "Kerberos Login"
AuthType Kerberos
KrbAuthRealms DC.DOMENA.LOCAL DOMENA.LOCAL
KrbServiceName HTTP/mujweb.domena.local@DOMENA.LOCAL
Krb5KeyTab /etc/apache2/mujweb.keytab
require valid-user
</Directory>
 *
 * v radce require valid-user, davas misto valid-user orion login
 */