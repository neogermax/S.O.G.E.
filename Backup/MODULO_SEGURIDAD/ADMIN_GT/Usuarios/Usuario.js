/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayUsuario = [];
var ArrayDroplist = [];
var ArrayEmpresa = [];
var ArrayRol = [];

var Estado_Process;
var User;
var Update_ID;
/*--------------- region de variables globales --------------------*/

//evento load del Usuario
$(document).ready(function () {

    transacionAjax_CSearch('Charge_Search');
    transacionAjax_CState('Charge_State');
    transacionAjax_Rol('Charge_Rol');
    transacionAjax_Empresa('Charge_Empresa');

    $("#Title_page").html($("#P_Usuario").html());
    $("#block_search_Usu").css("display", "none");
    $("#Block_Insert_Usu").css("display", "none");
    $("#Bloque_estado").css("display", "none");
    $("#I_S").css("display", "none");
    $("#I_E").css("display", "none");
    $("#I_W").css("display", "none");

    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img4").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");

    //funcion para las ventanas emergentes
    $("#Dialog_Grid").dialog({
        autoOpen: false,
        modal: true,
        width: 1100,
        height: 500,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_emergente").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_Session").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        height: 190,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_Inactivar").dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_Validar").dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 280,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_Visualizar").dialog({
        autoOpen: false,
        modal: true,
        width: 550,
        height: 550,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $(function () {
        $("#Acordeon_DatosUser").accordion({
            heightStyle: "content"
        });

    });
});

//manejo del panel de opciones
function OptionPanel(Opc) {

    switch (Opc) {

        case "C":
            $("#block_search_Usu").css("display", "none");
            $("#Block_Insert_Usu").css("display", "block");
            $("#Bloque_estado").css("display", "none");
            $("#BtnSave").attr("value", "Crear");
            $("#TxtUsuario").removeAttr("disabled");
            $("#Select_Empresa").removeAttr("disabled");

            Estado_Process = "C";
            Clear();
            break;

        case "R":
            $("#block_search_Usu").css("display", "block");
            $("#Block_Insert_Usu").css("display", "none");
            Estado_Process = "R";
            break;

        case "U":
            $("#block_search_Usu").css("display", "block");
            $("#Block_Insert_Usu").css("display", "none");
            Estado_Process = "U";
            break;

        case "D":
            $("#block_search_Usu").css("display", "block");
            $("#Block_Insert_Usu").css("display", "none");
            Estado_Process = "D";
            break;

    }
}

//llamado desde el boton Guardar
function ProcessSave() {

    var Validate = CamposObligatorios();

    if (Validate == 0) {

        var validateEmail = validarEmail();

        if (validateEmail == 0) {

            if ($("#Select_Rol").val() == "S_ADMIN") {
                $("#Dialog_Validar").dialog("option", "title", "validar Super usuario");
                $("#Lbl_Validate").text("Debe ingresar clave de Autorización para crear (Super Administrador) ");
                $("#Dialog_Validar").dialog("open");
            }
            else {
                if ($("#BtnSave").val() == "Crear") {
                    transacionAjax_C_reate_And_U_pdate("C_reate");
                }
                else {
                    transacionAjax_C_reate_And_U_pdate("U_pdate");
                }
            }

        }
        else {
            $("#Dialog_emergente").dialog("option", "title", "Invalido");
            $("#Mensaje_alert").text("El correo digitado no es valido!");
            $("#Dialog_emergente").dialog("open");
            $("#I_S").css("display", "none");
            $("#I_E").css("display", "none");
            $("#I_W").css("display", "block");
        }
    }
}


//llamado desde el boton Buscar (READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = $("#Select_Option").val();
    var opcion;

    if (ValidateSelect == "-1") {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Usuario("R_ead", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#Select_Option").val();
        transacionAjax_Usuario("R_ead", filtro, opcion);
    }

}

//llamado desde el boton inactivar (DELETE)
function BtnDelete() {
    transacionAjax_D_elete("D_elete");
}

//llamado desde el boton validar 
function BtnValidate() {
    transacionAjax_Validate("Validar_C_reate");
}

//llamado desde el boton reset 
function Reset() {
    transacionAjax_Reset("Reset");
}

//validamos los campos obligatorios del modulo Usuario
function CamposObligatorios() {

    var lleno = 0;

    var Campo_1 = $("#TxtUsuario").val();
    var Campo_2 = $("#Select_Empresa").val();
    var Campo_3 = $("#Select_Rol").val();
    var Campo_4 = $("#TxtNombre").val();
    var Campo_5 = $("#TxtDocument").val();
    var Campo_6 = $("#TxtCel").val();

    if (Campo_1 == "" || Campo_2 == "-1" || Campo_3 == "-1" || Campo_4 == "" || Campo_5 == "" || Campo_6 == "") {

        lleno = 1;
        if (Campo_1 == "")
            $("#Img1").css("display", "block");

        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "block");

        else
            $("#Img2").css("display", "none");

        if (Campo_3 == "")
            $("#Img3").css("display", "block");

        else
            $("#Img3").css("display", "none");

        if (Campo_4 == "")
            $("#Img4").css("display", "block");

        else
            $("#Img4").css("display", "none");

        if (Campo_5 == "")
            $("#Img5").css("display", "block");

        else
            $("#Img5").css("display", "none");

        if (Campo_6 == "")
            $("#Img6").css("display", "block");

        else
            $("#Img6").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img4").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img6").css("display", "none");
    }

    return lleno;
}

//dispara la grilla solicitado por estado
function table_Usuario() {

    switch (Estado_Process) {

        case "R":
            Tabla_consulta();
            break;

        case "U":
            Tabla_modificar();
            break;

        case "D":
            Tabla_eliminar();
            break;
    }

}

//grid sin botones para ver resultado
function Tabla_consulta() {

    var html_Usuario = "<table id='TUsuario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Visualizar</th><th>Empresa</th><th>Rol</th><th>Usuario</th><th>Nombre</th><th>Documento</th><th>Celular</th><th>Correo</th><th>Dirección</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayUsuario) {
        if (ArrayUsuario[itemArray].Usuario_ID != 0) {
            if (ArrayUsuario[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Usuario += "<tr style='font-size: 13px;' id= 'Usuario_" + ArrayUsuario[itemArray].Usuario_ID + "'><td><input type ='button' class= 'ver BtnUsuario' Value='Detalle' onclick=\"Ver('" + ArrayUsuario[itemArray].Usuario_ID + "')\"></input></td><td>" + ArrayUsuario[itemArray].DescripEmpresa + "</td><td>" + ArrayUsuario[itemArray].DescripRol + "</td><td>" + ArrayUsuario[itemArray].Usuario_ID + "</td><td>" + ArrayUsuario[itemArray].Nombre + "</td><td>" + ArrayUsuario[itemArray].Documento + "</td><td>" + ArrayUsuario[itemArray].Celular + "</td><td>" + ArrayUsuario[itemArray].Correo + "</td><td>" + ArrayUsuario[itemArray].Direccion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayUsuario[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Usuario += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Usuario);

    $("#TUsuario").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });

    $(".ver").click(function () {
    });

    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Usuarios");

}


//grid para ver los datos a modificar
function Tabla_modificar() {

    var html_Usuario = "<table id='TUsuario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Visualizar</th><th>Modificar</th><th>Empresa</th><th>Rol</th><th>Usuario</th><th>Nombre</th><th>Documento</th><th>Celular</th><th>Correo</th><th>Dirección</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayUsuario) {
        if (ArrayUsuario[itemArray].Usuario_ID != 0) {
            if (ArrayUsuario[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Usuario += "<tr style='font-size: 13px;' id= 'Usuario_" + ArrayUsuario[itemArray].Usuario_ID + "'><td><input type ='button' class= 'ver BtnUsuario' Value='Detalle' onclick=\"Ver('" + ArrayUsuario[itemArray].Usuario_ID + "')\"></input></td><td><input type ='button' class= 'Editar BtnUsuario' Value='Editar' onclick=\"Editar('" + ArrayUsuario[itemArray].Usuario_ID + "')\"></input></td><td>" + ArrayUsuario[itemArray].DescripEmpresa + "</td><td>" + ArrayUsuario[itemArray].DescripRol + "</td><td>" + ArrayUsuario[itemArray].Usuario_ID + "</td><td>" + ArrayUsuario[itemArray].Nombre + "</td><td>" + ArrayUsuario[itemArray].Documento + "</td><td>" + ArrayUsuario[itemArray].Celular + "</td><td>" + ArrayUsuario[itemArray].Correo + "</td><td>" + ArrayUsuario[itemArray].Direccion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayUsuario[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Usuario += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Usuario);

    $(".Editar").click(function () {
    });

    $(".ver").click(function () {
    });

    $("#TUsuario").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Usuario ");

}

// muestra el registro a editar
function Editar(index) {

    $("#block_search_Usu").css("display", "none");
    $("#Block_Insert_Usu").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayUsuario) {
        if (index == ArrayUsuario[itemArray].Usuario_ID) {
            Update_ID = ArrayUsuario[itemArray].Usuario_ID;
            $("#TxtUsuario").val(ArrayUsuario[itemArray].Usuario_ID);
            $("#TxtNombre").val(ArrayUsuario[itemArray].Nombre);
            $("#TxtDocument").val(ArrayUsuario[itemArray].Documento);

            $("#TxtDirec").val(ArrayUsuario[itemArray].Direccion);
            $("#TxtCel").val(ArrayUsuario[itemArray].Celular);
            $("#TxtEmail").val(ArrayUsuario[itemArray].Correo);

            $("#Select_Empresa").val(ArrayUsuario[itemArray].Empresa);
            $("#Select_Rol").val(ArrayUsuario[itemArray].Rol);

            $("#Select_Estado").val(ArrayUsuario[itemArray].Estado);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");

            $("#TxtUsuario").attr("disabled", "disabled");
            $("#Select_Empresa").attr("disabled", "disabled");

            if (ArrayUsuario[itemArray].Estado == "1") {
                $("#Select_Estado").attr("disabled", "disabled");
            }
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar() {

    var html_Usuario = "<table id='TUsuario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Visualizar</th><th>Inactivar</th><th>Empresa</th><th>Rol</th><th>Usuario</th><th>Nombre</th><th>Documento</th><th>Celular</th><th>Correo</th><th>Dirección</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayUsuario) {
        if (ArrayUsuario[itemArray].Usuario_ID != 0) {
            if (ArrayUsuario[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Usuario += "<tr style='font-size: 13px;' id= 'Usuario_" + ArrayUsuario[itemArray].Usuario_ID + "'><td><input type ='button' class= 'ver BtnUsuario' Value='Detalle' onclick=\"Ver('" + ArrayUsuario[itemArray].Usuario_ID + "')\"></input></td><td><input type ='button' class= 'Inactivar BtnUsuario' Value='Inactivar' onclick=\"Inactivar('" + ArrayUsuario[itemArray].Usuario_ID + "')\"></input></td><td>" + ArrayUsuario[itemArray].DescripEmpresa + "</td><td>" + ArrayUsuario[itemArray].DescripRol + "</td><td>" + ArrayUsuario[itemArray].Usuario_ID + "</td><td>" + ArrayUsuario[itemArray].Nombre + "</td><td>" + ArrayUsuario[itemArray].Documento + "</td><td>" + ArrayUsuario[itemArray].Celular + "</td><td>" + ArrayUsuario[itemArray].Correo + "</td><td>" + ArrayUsuario[itemArray].Direccion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayUsuario[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }

    html_Usuario += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Usuario);

    $(".Inactivar").click(function () {
    });

    $(".ver").click(function () {
    });

    $("#TUsuario").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Inactivar Usuario");

}

//muestra el registro a inactivar
function Inactivar(index) {
    for (itemArray in ArrayUsuario) {
        if (index == ArrayUsuario[itemArray].Usuario_ID) {
            Update_ID = ArrayUsuario[itemArray].Usuario_ID;
            $("#Lbl_Inactive").text("¿Usted va a desactivar la siguiente Usuario (" + ArrayUsuario[itemArray].Nombre + ") desea continuar?");
            $("#Dialog_Inactivar").dialog("option", "title", "Inactivar?");
            $("#Dialog_Inactivar").dialog("open");
        }
    }
}

//salida de la ventana emergente
function X() {
    $("#Dialog_Grid").dialog("close");
}

//salida de la ventana emergente
function X_Emer() {
    $("#Dialog_emergente").dialog("close");
}

//salida de la ventana emergente
function X_Inac() {
    $("#Dialog_Inactivar").dialog("close");
}

//salida de la ventana emergente
function X_Validate() {
    $("#Dialog_Validar").dialog("close");
}

//salida de la ventana emergente
function X_Ver() {
    $("#Dialog_Visualizar").dialog("close");
}

//funcion que valida el imail
function validarEmail() {

    var validate = 0;
    var email = $("#TxtEmail").val();

    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
        validate = 1;

    return validate;
}

//muestra los datos en ventana emergente
function Ver(index) {

    for (itemArray in ArrayUsuario) {
        if (index == ArrayUsuario[itemArray].Usuario_ID) {

            Update_ID = ArrayUsuario[itemArray].Usuario_ID;

            $("#V_Empresa").html(ArrayUsuario[itemArray].DescripEmpresa);
            $("#V_Usuario").html(ArrayUsuario[itemArray].Usuario_ID);
            $("#V_Nombre").html(ArrayUsuario[itemArray].Nombre);

            $("#V_Documento").html(ArrayUsuario[itemArray].Documento);
            $("#V_Direccion").html(ArrayUsuario[itemArray].Direccion);
            $("#V_Celular").html(ArrayUsuario[itemArray].Celular);
            $("#V_Correo").html(ArrayUsuario[itemArray].Correo);
            $("#V_Rol").html(ArrayUsuario[itemArray].DescripRol);

            $("#V_Estado").html(ArrayUsuario[itemArray].DescripEstado);
            $("#V_FCreacion").html(ArrayUsuario[itemArray].FechaActualizacion);
            $("#V_UserMod").html(ArrayUsuario[itemArray].Usuario);
                                             
        }
    }
    $("#Dialog_Visualizar").dialog("option","title","Detalle");
    $("#Dialog_Visualizar").dialog("open");
}

//limpiar campos
function Clear() {
    $("#TxtUsuario").val("");
    $("#Select_Empresa").val("-1");
    $("#Select_Rol").val("-1");
    $("#TxtNombre").val("");
    $("#TxtCel").val("");
    $("#TxtEmail").val("");
    $("#TxtDirec").val("");
    $("#TxtDocument").val("");
    $("#TxtSearch").val("");
    $("#Select_Option").val("-1");
}