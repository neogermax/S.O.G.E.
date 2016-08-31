<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/MENU_ADMIN/SOGE.Master"
    CodeBehind="Menu_SA.aspx.vb" Inherits="MODULO_SEGURIDAD.Menu_SA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../CSS/Inicio.css" rel="stylesheet" type="text/css" />
    <script src="../../JS/Dialog/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../../JS/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../JS/Dialog/jquery-ui.js" type="text/javascript"></script>
    <link href="../CSS/Controles.css" rel="stylesheet" type="text/css" />
    <script src="../JS/Global/GT_Global.js" type="text/javascript"></script>   
    <link href="../CSS/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
    <div id="container_Work">
    </div>
    <div id="Dialog_Session">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td id="Mensaje_alert_S" style="width: 250px; color: #ffffff;">
                </td>
                <td style="width: 150px;">
                    <img alt="exit" title="" id="I_W" src="../../images/Warning_Sucess.png" />
                </td>
            </tr>
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
