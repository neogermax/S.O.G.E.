/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayRol = [];
var ArrayDroplist = [];

var Estado_Process;
var User;
var Update_ID;
/*--------------- region de variables globales --------------------*/

//evento load del Rol
$(document).ready(function () {

    transacionAjax_CSearch('Charge_Search');
    transacionAjax_CState('Charge_State');

    $("#Title_page").html($("#P_Rol").html());
    $("#block_search_Rol").css("display", "none");
    $("#Block_Insert_Rol").css("display", "none");
    $("#Bloque_estado").css("display", "none");
    $("#I_S").css("display", "none");
    $("#I_E").css("display", "none");
    $("#I_W").css("display", "none");

    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");

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
        width: 300,
        height: 200,
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

});

//manejo del panel de opciones
function OptionPanel(Opc) {

    switch (Opc) {

        case "C":
            $("#block_search_Rol").css("display", "none");
            $("#Block_Insert_Rol").css("display", "block");
            $("#Bloque_estado").css("display", "none");
            $("#BtnSave").attr("value", "Crear");
            $("#TxtCodigo").removeAttr("disabled");

            Estado_Process = "C";
            Clear();
            break;

        case "R":
            $("#block_search_Rol").css("display", "block");
            $("#Block_Insert_Rol").css("display", "none");
            Estado_Process = "R";
            break;

        case "U":
            $("#block_search_Rol").css("display", "block");
            $("#Block_Insert_Rol").css("display", "none");
            Estado_Process = "U";
            break;

        case "D":
            $("#block_search_Rol").css("display", "block");
            $("#Block_Insert_Rol").css("display", "none");
            Estado_Process = "D";
            break;

    }
}

//llamado desde el boton Guardar
function ProcessSave() {

    var Validate = CamposObligatorios();

    if (Validate == 0) {

        if ($("#BtnSave").val() == "Crear") {
            transacionAjax_C_reate_And_U_pdate("C_reate");
        }
        else {
            transacionAjax_C_reate_And_U_pdate("U_pdate");
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
        transacionAjax_Rol("R_ead", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#Select_Option").val();
        transacionAjax_Rol("R_ead", filtro, opcion);
    }

}

//llamado desde el boton inactivar (DELETE)
function BtnDelete() {
    transacionAjax_D_elete("D_elete");
}

//validamos los campos obligatorios del modulo Rol
function CamposObligatorios() {

    var lleno = 0;

    var Campo_1 = $("#TxtCodigo").val();
    var Campo_2 = $("#TxtDescription").val();

    if (Campo_1 == "" || Campo_2 == "") {

        lleno = 1;
        if (Campo_1 == "")
            $("#Img1").css("display", "block");

        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "block");

        else
            $("#Img2").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }

    return lleno;
}

//dispara la grilla solicitado por estado
function table_Rol() {

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

    var html_Rol = "<table id='TRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Descripción</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayRol) {
        if (ArrayRol[itemArray].Rol_ID != 0) {
            if (ArrayRol[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Rol += "<tr style='font-size: 13px;' id= 'Rol_" + ArrayRol[itemArray].Rol_ID + "'><td>" + ArrayRol[itemArray].Rol_ID + "</td><td>" + ArrayRol[itemArray].Descripcion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayRol[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Rol += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Rol);

    $("#TRol").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Roles");

}


//grid para ver los datos a modificar
function Tabla_modificar() {

    var html_Rol = "<table id='TRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Codigo</th><th>Descripción</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayRol) {
        if (ArrayRol[itemArray].Rol_ID != 0) {
            if (ArrayRol[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Rol += "<tr style='font-size: 13px;' id= 'Rol_" + ArrayRol[itemArray].Rol_ID + "'><td><input type ='button' class= 'Editar BtnRol' Value='Editar' onclick=\"Editar('" + ArrayRol[itemArray].Rol_ID + "')\"></input></td><td>" + ArrayRol[itemArray].Rol_ID + "</td><td>" + ArrayRol[itemArray].Descripcion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayRol[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Rol += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Rol);

    $(".Editar").click(function () {
    });

    $("#TRol").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Rol ");

}

// muestra el registro a editar
function Editar(index) {

    $("#block_search_Rol").css("display", "none");
    $("#Block_Insert_Rol").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayRol) {
        if (index == ArrayRol[itemArray].Rol_ID) {
            Update_ID = ArrayRol[itemArray].Rol_ID;
            $("#TxtCodigo").val(ArrayRol[itemArray].Rol_ID);
            $("#TxtCodigo").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayRol[itemArray].Descripcion);
            $("#Select_Estado").val(ArrayRol[itemArray].Estado);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");

            if (ArrayRol[itemArray].Estado == "1") {
                $("#Select_Estado").attr("disabled", "disabled");
            }
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar() {

    var html_Rol = "<table id='TRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Inactivar</th><th>Codigo</th><th>Descripción</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayRol) {
        if (ArrayRol[itemArray].Rol_ID != 0) {
            if (ArrayRol[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Rol += "<tr style='font-size: 13px;' id= 'Rol_" + ArrayRol[itemArray].Rol_ID + "'><td><input type ='button' class= 'Inactivar BtnRol' Value='Inactivar' onclick=\"Inactivar('" + ArrayRol[itemArray].Rol_ID + "')\"></input></td><td>" + ArrayRol[itemArray].Rol_ID + "</td><td>" + ArrayRol[itemArray].Descripcion + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayRol[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Rol += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Rol);

    $(".Inactivar").click(function () {
    });

    $("#TRol").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Inactivar Rol");

}

//muestra el registro a inactivar
function Inactivar(index) {
    for (itemArray in ArrayRol) {
        if (index == ArrayRol[itemArray].Rol_ID) {
            Update_ID = ArrayRol[itemArray].Rol_ID;
            $("#Lbl_Inactive").text("¿Usted va a desactivar la siguiente Rol (" + ArrayRol[itemArray].Descripcion + ") desea continuar?");
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


function Clear() {
    $("#TxtCodigo").val("");
    $("#TxtDescription").val("");
    $("#TxtSearch").val("");
    $("#Select_Option").val("-1");
}