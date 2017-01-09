<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/MENU_ADMIN/SOGE.Master"
    CodeBehind="Empresa.aspx.vb" Inherits="MODULO_SEGURIDAD.Empresa" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../../CSS/S_Admin/Admin_GT.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/S_Admin/Admin_Empresa.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/SA_menu.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../JS/Global/GT_Global.js" type="text/javascript"></script>
    <script src="Empresa.js" type="text/javascript"></script>
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
            <div id="DIV_Consuta_Em" class="Dimencion_Control" onclick="OptionPanel('R');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Search" class="I_search" src="../../images/search.png" />
                    <p id="P_Search" style="color: #ffffff;" class="N_search">
                        Consultar</p>
                    <span>Consulta empresa</span></span>
            </div>
            <div id="DIV_Crear_Em" class="Dimencion_Control" onclick="OptionPanel('C');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Create" class="I_create" src="../../images/new.png" />
                    <p style="color: #ffffff;" class="N_create">
                        Crear</p>
                    <span>Crear empresa</span></span>
            </div>
            <div id="DIV_Modificar_Em" class="Dimencion_Control" onclick="OptionPanel('U');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Update" class="I_update" src="../../images/refresh.png" />
                    <p style="color: #ffffff;" class="N_update">
                        Actualizar</p>
                    <span>Actualiza empresa</span></span>
            </div>
            <div id="DIV_Eliminar_Em" class="Dimencion_Control" onclick="OptionPanel('D');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Delete" class="I_delete" src="../../images/delete.png" />
                    <p style="color: #ffffff;" class="N_delete">
                        Eliminar</p>
                    <span>Elimina empresa</span></span>
            </div>
        </div>
        <div id="Bar_Title_Emp">
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
            <div id="block_search_Emp">
                <table style="width: 80%; padding-left: 25px; padding-top: 10px">
                    <tr>
                        <td>
                            <select id="Select_Option" class="SelectEmpresa">
                            </select>
                        </td>
                        <td>
                            <input type="text" id="TxtSearch" />
                        </td>
                        <td>
                            <input type="button" value="Buscar" class="BtnEmpresa" id="BtnSearch" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="Block_Insert_Emp">
                <div id="Tab_Empresa">
                    <ul>
                        <li><a href="#tabs_General">Datos Generales</a></li>
                        <li><a href="#tabs_Config">Configuración</a></li>
                    </ul>
                    <div id="tabs_General">
                        <table style="width: 100%; padding-top: 10px; color: White; padding-left: 25px; text-align: left;">
                            <tr>
                                <td class="lblCreate" style="width: 100px;">
                                    Sitio
                                </td>
                                <td class="lblCreate" style="width: 80px;">
                                    <input id="R_Local" type="radio" name="Pais" value="L" />
                                    Local
                                </td>
                                <td class="lblCreate" style="width: 80px;">
                                    <input id="R_Exterior" type="radio" name="Pais" value="E" />
                                    Exterior
                                </td>
                                <td id="S_Emp" style="width: 200px;" class="Style_Label">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        <table style="width: 100%; padding-top: 10px; color: White; padding-left: 25px; text-align: left;">
                            <tr>
                                <td class="lblCreate" style="width: 100px;">
                                    Actividad
                                </td>
                                <td class="lblCreate" style="width: 80px;">
                                    <input id="R_Grupo" type="radio" name="Actividad" value="G" />
                                    Grupo
                                </td>
                                <td class="lblCreate" style="width: 80px;">
                                    <input id="R_Actividad" type="radio" name="Actividad" value="A" />
                                    Actividad
                                </td>
                                <td id="A_Emp" style="width: 200px;" class="Style_Label">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        <table style="width: 100%; padding-left: 25px; padding-top: 10px;">
                            <tr>
                                <td class="lblCreate" style="width: 100px;">
                                    Nombre
                                </td>
                                <td style="width: 150px;">
                                    <input type="text" id="TxtNombre" maxlength="200" />
                                </td>
                                <td style="width: 50px;">
                                    <span class="cssToolTip_L">
                                        <img alt="exit" title="" id="Img1" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Nombre es Obligatorio!</span></span>
                                </td>
                                <td class="lblCreate" style="width: 100px;">
                                    Nit
                                </td>
                                <td style="width: 150px;">
                                    <input type="text" id="TxtNit" maxlength="18" class="Numeric" />
                                </td>
                                <td style="width: 50px;">
                                    <span class="cssToolTip_R">
                                        <img alt="exit" title="" id="Img2" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Nit es Obligatorio!</span></span>
                                </td>
                            </tr>
                            <tr>
                                <td class="lblCreate">
                                    Dirección
                                </td>
                                <td>
                                    <input type="text" id="TxtDirec" maxlength="100" />
                                </td>
                                <td>
                                    <span class="cssToolTip_L">
                                        <img alt="exit" title="" id="Img3" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Dirección es Obligatoria!</span></span>
                                </td>
                                <td class="lblCreate">
                                    Telefono fijo
                                </td>
                                <td>
                                    <input type="text" id="TxtTel" maxlength="18" class="Numeric" />
                                </td>
                                <td style="width: 50px;">
                                    <span class="cssToolTip_R">
                                        <img alt="exit" title="" id="Img4" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Telefono es Obligatorio!</span></span>
                                </td>
                            </tr>
                            <tr>
                                <td class="lblCreate">
                                    Celular
                                </td>
                                <td>
                                    <input type="text" id="TxtCel" maxlength="18" class="Numeric" />
                                </td>
                                <td>
                                    <span class="cssToolTip_L">
                                        <img alt="exit" title="" id="Img5" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Celular es Obligatorio!</span></span>
                                </td>
                                <td class="lblCreate">
                                    E-mail
                                </td>
                                <td>
                                    <input type="text" id="TxtEmail" maxlength="100" />
                                </td>
                                <td>
                                    <span class="cssToolTip_R">
                                        <img alt="exit" title="" id="Img6" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>E-mail es Obligatorio!</span></span>
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
                                    <select id="Select_Estado" class="SelectEmpresa">
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
                                    <input type="button" value="Crear" class="BtnEmpresa" id="BtnSave" onclick="ProcessSave();" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tabs_Config">
                    </div>
                </div>
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
                    <input type="button" value="Salir" class="BtnEmpresa" id="Btn_Exit" onclick="X()" />
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
                    <input type="button" value="Salir" class="BtnEmpresa" id="Btn_Exit_Emer" onclick="X_Emer()" />
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
                    <input type="button" value="Confirmar" class="BtnEmpresa" id="Btn_Yes" onclick="BtnDelete()" />
                    <input type="button" value="Cancelar" class="BtnEmpresa" id="Btn_Not" onclick="X_Inac()" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Location">
        <table style="width: 100%; text-align: center; color: #ffffff;">
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    Pais
                </td>
                <td>
                    <select id="Select_Pais" class="SelectEmpresa">
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    Ciudad
                </td>
                <td>
                    <select id="Select_Ciudad" class="SelectEmpresa">
                    </select>
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Actividad">
        <table style="width: 100%; text-align: center; color: #ffffff;">
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    Grupo Economico
                </td>
                <td>
                    <select id="Select_Grupo" class="SelectEmpresa">
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    Actividad Economica
                </td>
                <td>
                    <select id="Select_Actividad" class="SelectEmpresa">
                    </select>
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
                    <img alt="exit" title="" id="Img9" src="../../images/Warning_Sucess.png" />
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
