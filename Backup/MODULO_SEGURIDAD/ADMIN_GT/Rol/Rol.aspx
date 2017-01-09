<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/MENU_ADMIN/SOGE.Master"
    CodeBehind="Rol.aspx.vb" Inherits="MODULO_SEGURIDAD.Rol" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../../CSS/S_Admin/Admin_GT.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/S_Admin/Admin_Roles.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/SA_menu.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" /> 
    <link href="../../CSS/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../JS/Global/GT_Global.js" type="text/javascript"></script>
    <script src="Rol.js" type="text/javascript"></script>
    <script src="TransactionAjax.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../JS/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <script src="../../JS/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../JS/Datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            window.onbeforeunload = function () {

                $.ajax({
                    url: "/MENU_ADMIN/Menu_SA_Ajax.aspx",
                    type: "POST",
                    data: { "action": "DeleteSession",
                        "Valide": Campo
                    },
                    async: false,
                    success: function () {
                    }
                });
            }
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
    <div id="container_Work">
        <div id="container_Control">
            <div id="DIV_Consuta_Rol" class="Dimencion_Control" onclick="OptionPanel('R');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Search" class="I_search" src="../../images/search.png" />
                    <p id="P_Search" style="color: #ffffff;" class="N_search">
                        C<link href="../../CSS/S_Admin/Admin_Roles.css" rel="stylesheet" type="text/css" />onsultar</p>
                    <span>Consulta Rol</span></span>
            </div>
            <div id="DIV_Crear_Rol" class="Dimencion_Control" onclick="OptionPanel('C');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Create" class="I_create" src="../../images/new.png" />
                    <p style="color: #ffffff;" class="N_create">
                        Crear</p>
                    <span>Crear Rol</span></span>
            </div>
            <div id="DIV_Modificar_Rol" class="Dimencion_Control" onclick="OptionPanel('U');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Update" class="I_update" src="../../images/refresh.png" />
                    <p style="color: #ffffff;" class="N_update">
                        Actualizar</p>
                    <span>Actualiza Rol</span></span>
            </div>
            <div id="DIV_Eliminar_Rol" class="Dimencion_Control" onclick="OptionPanel('D');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Delete" class="I_delete" src="../../images/delete.png" />
                    <p style="color: #ffffff;" class="N_delete">
                        Eliminar</p>
                    <span>Elimina Rol</span></span>
            </div>
        </div>
        <div id="Bar_Title_Rol">
            <table style="width: 100%;">
                <tr>
                    <td id="Title_page" style="padding-left: 15px; width: 200px; text-align: -webkit-left;">
                    </td>
                    <td id="BtnExit" style="width: 50px; text-align: right; padding-right: 10px;">
                        <span class="cssToolTip_ver">
                            <img alt="exit" title="" style="height: 20px; width: 20px; position: relative;" id="I_close"
                                src="../../images/close.png" />
                            <span>Cierra pestaña</span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="container_state">
            <div id="block_search_Rol">
                <table style="width: 80%; padding-left: 25px; padding-top: 10px">
                    <tr>
                        <td>
                            <select id="Select_Option" class="SelectRol">
                            </select>
                        </td>
                        <td>
                            <input type="text" id="TxtSearch" />
                        </td>
                        <td>
                            <input type="button" value="Buscar" class="BtnRol" id="BtnSearch" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="Block_Insert_Rol">
                <table style="width: 100%; padding-left: 25px; padding-top: 10px">
                    <tr>
                        <td class="lblCreate" style="width: 100px;">
                            Codigo
                        </td>
                        <td style="width: 150px;">
                            <input type="text" id="TxtCodigo" maxlength="10" />
                        </td>
                        <td style="width: 50px;">
                            <span class="cssToolTip_L">
                                <img alt="exit" title="" id="Img1" class="ImageError" src="../../images/Val_Error.png" />
                                <span>Codigo es Obligatorio!</span></span>
                        </td>
                        <td class="lblCreate" style="width: 100px;">
                            Descripción
                        </td>
                        <td style="width: 150px;">
                            <input type="text" id="TxtDescription" maxlength="50" />
                        </td>
                        <td style="width: 50px;">
                            <span class="cssToolTip_R">
                                <img alt="exit" title="" id="Img2" class="ImageError" src="../../images/Val_Error.png" />
                                <span>Descripción es Obligatorio!</span></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                            </p>
                        </td>
                    </tr>
                    <tr id="Bloque_estado">
                        <td class="lblCreate" colspan="3">
                            Estado
                        </td>
                        <td>
                            <select id="Select_Estado" class="SelectRol">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <input type="button" value="Crear" class="BtnRol" id="BtnSave" onclick="ProcessSave();" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="Dialog_Grid">
        <table style="text-align: center; width: 100%">
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="Container_Grid">
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" value="Salir" class="BtnRol" id="Btn_Exit" onclick="X()" />
                </td>
            </tr>
        </table>
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
                    <input type="button" value="Salir" class="BtnRol" id="Btn_Exit_Emer" onclick="X_Emer()" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Inactivar">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td id="Lbl_Inactive" style="width: 250px; color: #ffffff;">
                </td>
                <td style="width: 150px;">
                    <img alt="exit" title="" id="I_W2" src="../../images/Warning_Sucess.png" />
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
                    <input type="button" value="Confirmar" class="BtnRol" id="Btn_Yes" onclick="BtnDelete()" />
                    <input type="button" value="Cancelar" class="BtnRol" id="Btn_Not" onclick="X_Inac()" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Session">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td id="Mensaje_alert_S" style="width: 250px; color: #ffffff;">
                </td>
                <td style="width: 150px;">
                    <img alt="exit" title="" id="Img3" src="../../images/Warning_Sucess.png" />
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
