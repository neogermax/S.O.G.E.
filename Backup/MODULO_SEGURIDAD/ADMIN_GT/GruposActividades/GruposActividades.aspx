<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/MENU_ADMIN/SOGE.Master"
    CodeBehind="GruposActividades.aspx.vb" Inherits="MODULO_SEGURIDAD.GruposActividades" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../../CSS/S_Admin/Admin_GT.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/S_Admin/Admin_GruposActividades.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/SA_menu.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../../CSS/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../JS/Global/GT_Global.js" type="text/javascript"></script>
    <script src="GruposActividades.js" type="text/javascript"></script>
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
            <div id="DIV_Consuta_GA" class="Dimencion_Control" onclick="OptionPanel('R');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Search" class="I_search" src="../../images/search.png" />
                    <p id="P_Search" style="color: #ffffff;" class="N_search">
                        Consultar</p>
                    <span>Consulta Actividad</span></span>
            </div>
            <div id="DIV_Crear_GA" class="Dimencion_Control" onclick="OptionPanel('C');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Create" class="I_create" src="../../images/new.png" />
                    <p style="color: #ffffff;" class="N_create">
                        Crear</p>
                    <span>Crear Actividad</span></span>
            </div>
            <div id="DIV_Modificar_GA" class="Dimencion_Control" onclick="OptionPanel('U');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Update" class="I_update" src="../../images/refresh.png" />
                    <p style="color: #ffffff;" class="N_update">
                        Actualizar</p>
                    <span>Actualiza Actividad</span></span>
            </div>
            <div id="DIV_Eliminar_GA" class="Dimencion_Control" onclick="OptionPanel('D');">
                <span class="cssToolTip_ver">
                    <img alt="exit" title="" style="height: 40px; width: 40px; position: relative; top: 5px;
                        left: 5px;" id="I_Delete" class="I_delete" src="../../images/delete.png" />
                    <p style="color: #ffffff;" class="N_delete">
                        Eliminar</p>
                    <span>Elimina Actividad</span></span>
            </div>
        </div>
        <div id="Bar_Title_GA">
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
            <div id="block_search_GA">
                <table style="width: 80%; padding-left: 25px; padding-top: 10px">
                    <tr>
                        <td>
                            <select id="Select_Option" class="SelectGrupo">
                                <option value="P">GRUPO</option>
                                <option value="C">ACTIVIDAD ECONOMICA</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" id="TxtSearch" />
                        </td>
                        <td>
                            <input type="button" value="Buscar" class="BtnGrupo" id="BtnSearch" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="Block_Insert_GA">
                <div id="Tab_GrupoActividad">
                    <ul>
                        <li><a href="#tabs_Grupo">Grupos</a></li>
                        <li><a href="#tabs_Actividad">Actividades</a></li>
                    </ul>
                    <div id="tabs_Grupo">
                        <table id="Date_Grupo">
                            <tr>
                                <td>
                                    <span class="cssToolTip_L">
                                        <img alt="exit" title="" id="Img1" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Codigo grupo es obligatorio </span></span>
                                </td>
                                <td id="TD_descrip">
                                    Descripción
                                </td>
                                <td>
                                    <input type="text" id="TxtDescriptionGrupo" maxlength="40" title="Descripción" />
                                </td>
                                <td>
                                    <span class="cssToolTip_R">
                                        <img alt="exit" title="" id="Img2" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>La descripción del pais es obligatoria </span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tabs_Actividad">
                        <table id="Date_Actividad">
                            <tr>
                                <td>
                                    Grupo
                                </td>
                                <td>
                                    <select id="Select_Grupo" class="SelectGrupo">
                                    </select>
                                </td>
                                <td>
                                    <span class="cssToolTip_L">
                                        <img alt="exit" title="" id="Img3" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>Grupo es obligatorio </span></span>
                                </td>
                                <td>
                                    Actividad Economica
                                </td>
                                <td id="TD4" style="width: 210px;">
                                    <input type="text" id="TxtDescriptionActividad" maxlength="40" title="Descripción" />
                                </td>
                                <td>
                                    <span class="cssToolTip_R">
                                        <img alt="exit" title="" id="Img4" class="ImageError" src="../../images/Val_Error.png" />
                                        <span>La descripción de la Actividad es obligatoria </span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <table style="width: 100%; text-align: center;">
                    <tr>
                        <td>
                            <p>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <input id="BtnSave" class="BtnGrupo" type="button" value="Crear" onclick="ProcessSave();" />
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
                    <input type="button" value="Salir" class="BtnGrupo" id="Btn_Exit" onclick="X()" />
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
                    <input type="button" value="Salir" class="BtnGrupo" id="Btn_Exit_Emer" onclick="X_Emer()" />
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
                    <input type="button" value="Confirmar" class="BtnGrupo" id="Btn_Yes" onclick="BtnDelete()" />
                    <input type="button" value="Cancelar" class="BtnGrupo" id="Btn_Not" onclick="X_Inac()" />
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
    <div id="Dialog_Country">
        <table style="text-align: center; width: 100%">
            <tr>
                <td>
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="ContainerCountry">
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
                    <input type="button" value="Salir" class="BtnGrupo" id="BtnExitCountry" onclick="X_Conuntry()" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
