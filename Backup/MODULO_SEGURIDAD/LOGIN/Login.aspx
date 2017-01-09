<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Login.aspx.vb" Inherits="MODULO_SEGURIDAD.Login1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../CSS/Slider/styles.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Slider/skitter.styles.min.css" rel="stylesheet" type="text/css" />
    <script src="../JS/Slider/jquery-2.1.1.min.js" type="text/javascript"></script>
    <script src="../JS/Slider/jquery.easing.1.3.js" type="text/javascript"></script>
    <script src="../JS/Slider/jquery.skitter.min.js" type="text/javascript"></script>
    <script src="../JS/Dialog/jquery-ui.js" type="text/javascript"></script>
    <link href="../CSS/Inicio.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Controles.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="Login.js" type="text/javascript"></script>
    <script src="TransactionAjax.js" type="text/javascript"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="page">
        <div id="Container_title">
            <h2 id="titulo_login">
                S.O.G.E</h2>
        </div>
        <br />
        <div id="Container_Carrusel" class="box_skitter box_skitter_large">
            <ul>
                <li><a href="#cube">
                    <img src="../../images/example/001.jpg" class="circles" alt="" /></a><div class="label_text">
                        <p>
                            Software</p>
                    </div>
                </li>
                <li><a href="#cubeRandom">
                    <img src="../../images/example/002.jpg" class="circlesInside" alt="" /></a><div class="label_text">
                        <p>
                            Operacional</p>
                    </div>
                </li>
                <li><a href="#block">
                    <img src="../../images/example/003.jpg" class="circlesRotate" alt="" /></a><div class="label_text">
                        <p>
                            Gestion</p>
                    </div>
                </li>
                <li><a href="#cubeStop">
                    <img src="../../images/example/004.jpg" class="cubeShow" alt="" /></a><div class="label_text">
                        <p>
                            Empresarial</p>
                    </div>
                </li>
            </ul>
        </div>
        <div id="login">
            <table style="width: 100%;">
                <tr>
                    <td style="width: 20px; padding-left: 5px; text-align: center;">
                    </td>
                    <td id="TUser" colspan="2">
                        <span class="cssToolTip_ver">
                            <input id="TxtUser" type="text" name="user" value="Usuario" />
                            <span>Digite Usuario</span></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20px; text-align: center;">
                        <img alt="exit" title="" style="height: 20px; width: 20px; position: relative; top: 5px;
                            right: 8px; margin-bottom: 10px;" id="I_ver_P" src="../images/eye.png" />
                    </td>
                    <td id="TPass">
                        <span class="cssToolTip_ver">
                            <input id="TxtPassword" type="text" name="user" value="Contraseña" />
                            <span>Digite Contraseña</span></span>
                    </td>
                </tr>
                <tr>
                    <td id="TBoton" colspan="2">
                        <input id="BtnIngresar" type="button" name="user" value="Ingresar" class="BtnLogin" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="Footer">
            <p>
                Desarrollado por GT SOFT
            </p>
            <p>
                Software para la administración empresarial</p>
            <p>
                2016 Bogota D.C.</p>
        </div>
    </div>
    <div id="Dialog_emergente">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td id="Mensaje_alert" style="width: 250px; color: #ffffff;">
                </td>
                <td style="width: 150px;">
                    <img alt="exit" title="" id="I_S" src="../../images/Full_Sucess.png" />
                    <img alt="exit" title="" id="I_E" src="../../images/Error_Sucess.png" />
                    <img alt="exit" title="" id="I_W" src="../../images/Warning_Sucess.png" />
                </td>
            </tr>
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="button" value="Salir" class="BtnLogin" id="Btn_Exit_Usuer" onclick="X_Emer()" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Reset">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td colspan="3" style="width: 200px; color: #ffffff; padding-top: 15px;">
                    Digite Contreseña (Nueva)
                </td>
            </tr>
            <tr>
                <td style="width: 20px; padding-left: 25px; text-align: right;">
                    <img alt="exit" title="" style="height: 20px; width: 20px; position: relative; top: 5px;
                        left: 5px; margin-bottom: 10px;" id="I_ver" src="../images/eye.png" />
                </td>
                <td style="width: 150px;">
                    <input id="txtPassword_C" type="password" name="pass1" />
                </td>
                <td style="width: 50px; text-align: left;">
                    <span class="cssToolTip_ver_R">
                        <img alt="exit" title="" style="margin-bottom: 10px; height: 20px; width: 20px; position: relative;
                            top: 5px; left: 5px;" id="I_A" src="../images/activo.png" />
                        <span>Las claves coinciden</span></span> <span class="cssToolTip_R">
                            <img alt="exit" title="" style="margin-bottom: 10px; height: 20px; width: 20px; position: relative;
                                top: 5px; left: 5px;" id="I_I" src="../images/inactivo.png" />
                            <span>Las claves NO coinciden</span></span>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="width: 200px; color: #ffffff; padding-top: 15px;">
                    Confirme Contreseña
                </td>
            </tr>
            <tr>
                <td style="width: 20px; padding-left: 25px; text-align: right;">
                    <img alt="exit" title="" style="height: 20px; width: 20px; position: relative; top: 5px;
                        left: 5px; margin-bottom: 10px;" id="I_ver_2" src="../images/eye.png" />
                </td>
                <td style="width: 150px;">
                    <input id="txtConfirmPassword" type="password" name="Pass2" />
                </td>
                <td style="width: 50px; text-align: left;">
                    <span class="cssToolTip_ver_R">
                        <img alt="exit" title="" style="margin-bottom: 10px; height: 20px; width: 20px; position: relative;
                            top: 5px; left: 5px;" id="I_A2" src="../images/activo.png" />
                        <span>Las claves coinciden</span></span> <span class="cssToolTip_R">
                            <img alt="exit" title="" style="margin-bottom: 10px; height: 20px; width: 20px; position: relative;
                                top: 5px; left: 5px;" id="I_I2" src="../images/inactivo.png" />
                            <span>Las claves NO coinciden</span></span>
                </td>
            </tr>
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="padding-top: 15px;">
                    <input type="button" value="Actualizar" class="BtnLogin" id="BtnConfirm" onclick="Confirmar()" />
                    <input type="button" value="Cancelar" class="BtnLogin" id="Btn_Exit_Reset" onclick="X_Reset()" />
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
