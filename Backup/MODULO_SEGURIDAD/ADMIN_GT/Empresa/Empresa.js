/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayEmpresa = [];
var ArrayDroplist = [];
var ArrayPais = [];
var ArrayCiudades = [];
var ArrayGrupo = [];
var ArrayActividad = [];

var Estado_Process;
var User;
var Update_ID;
var Campo;
/*--------------- region de variables globales --------------------*/

//evento load del empresa
$(document).ready(function () {

    opciones();
    transacionAjax_CSearch('Charge_Search');
    transacionAjax_CState('Charge_State');
    transacionAjax_CPais('Charge_Pais');
    transacionAjax_CGrupo('Charge_Grupo');

    $("#Title_page").html($("#P_Empresa").html());
    $("#block_search_Emp").css("display", "none");
    $("#Block_Insert_Emp").css("display", "none");
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
        width: 300,
        height: 200,
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

    $("#Dialog_Location").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        height: 220,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Dialog_Actividad").dialog({
        autoOpen: false,
        modal: true,
        width: 550,
        height: 220,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Select_Pais").combobox();
    $("#Select_Ciudad").combobox();
    $("#Select_Grupo").combobox();
    $("#Select_Actividad").combobox();

    $("#Tab_Empresa").tabs();

});

//habilita los radio button de sitio de la empresa 
function opciones() {

    $("input[name=Pais]").click(function () {
        if ($(this).val() == "L") {
            $("#Dialog_Location").dialog("open");
            $("#Dialog_Location").dialog("option", "title", "Escoja la ciudad de la empresa");
            $("#Select_Pais").val("10");
            $("#Select_Pais").attr("disabled", "disabled");
            $("#Select_Pais").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
            $("#Select_Pais").parent().find("a.ui-button").button("disable");


            for (item in ArrayPais) {
                if (ArrayPais[item].ID == $('#Select_Pais').val()) {
                    $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayPais[item].descripcion);
                }
            }

            transacionAjax_CCiudad('Charge_Ciudades', '10');

        }
        else {
            $("#Dialog_Location").dialog("open");
            $("#Dialog_Location").dialog("option", "title", "Escoja el pais y la ciudad de la empresa");
            $("#Select_Pais").val("-1");
            $("#Select_Pais").removeAttr("disabled");
            $("#Select_Pais").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
            $("#Select_Pais").parent().find("a.ui-button").button("enable");
            $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');

            Caputure_Pais_ID()
        }
    });

    $("input[name=Actividad]").click(function () {
        if ($(this).val() == "G") {
            $("#Dialog_Actividad").dialog("open");
            $("#Dialog_Actividad").dialog("option", "title", "Escoja el grupo y la actividad de la empresa");
            $("#Select_Grupo").val("-1");
            $('#Select_Grupo').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
        }
        else {
            $("#Dialog_Actividad").dialog("open");
            $("#Dialog_Actividad").dialog("option", "title", "Escoja la Actividad de la empresa");
            $("#Select_Grupo").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
            $("#Select_Grupo").parent().find("a.ui-button").button("disable");
            transacionAjax_CActividad('Charge_Actividad', "0", "1");
        }


    });

}

//hablilita el evento de cambio del droplist de pais
function Caputure_Pais_ID() {
    $("#Select_Pais").change(function () {

        ArrayCiudades = [];

        var Val_Pais_ID = this.value;
        $("#Select_Ciudad").combobox();
        transacionAjax_CCiudad('Charge_Ciudades', Val_Pais_ID);
    });
}


function Caputure_Ciudad_ID() {
    $("#Select_Ciudad").change(function () {

        var Val_Ciudad_ID = this.value;


        for (item in ArrayCiudades) {
            if (ArrayCiudades[item].ID == Val_Ciudad_ID) {
                $("#S_Emp").html(ArrayCiudades[item].descripcion);
                $("#Dialog_Location").dialog("close");
            }
        }

    });
}


//manejo del panel de opciones
function OptionPanel(Opc) {

    Campo = Opc;

    switch (Opc) {

        case "C":
            $("#block_search_Emp").css("display", "none");
            $("#Block_Insert_Emp").css("display", "block");
            $("#Bloque_estado").css("display", "none");
            $("#BtnSave").attr("value", "Crear");
            Estado_Process = "C";
            Clear();
            break;

        case "R":
            $("#block_search_Emp").css("display", "block");
            $("#Block_Insert_Emp").css("display", "none");
            Estado_Process = "R";
            break;

        case "U":
            $("#block_search_Emp").css("display", "block");
            $("#Block_Insert_Emp").css("display", "none");
            Estado_Process = "U";
            break;

        case "D":
            $("#block_search_Emp").css("display", "block");
            $("#Block_Insert_Emp").css("display", "none");
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
            if ($("#BtnSave").val() == "Crear") {
                transacionAjax_C_reate_And_U_pdate("C_reate");
            }
            else {
                transacionAjax_C_reate_And_U_pdate("U_pdate");
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
        transacionAjax_Empresa("R_ead", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#Select_Option").val();
        transacionAjax_Empresa("R_ead", filtro, opcion);
    }

}

//llamado desde el boton inactivar (DELETE)
function BtnDelete() {
    transacionAjax_D_elete("D_elete");
}

//validamos los campos obligatorios del modulo empresa
function CamposObligatorios() {

    var lleno = 0;

    var Campo_1 = $("#TxtNombre").val();
    var Campo_2 = $("#TxtNit").val();
    var Campo_3 = $("#TxtDirec").val();
    var Campo_4 = $("#TxtTel").val();
    var Campo_5 = $("#TxtCel").val();
    var Campo_6 = $("#TxtEmail").val();

    if (Campo_1 == "" || Campo_2 == "" || Campo_3 == "" || Campo_4 == "" || Campo_5 == "" || Campo_6 == "") {

        lleno = 1;
        if (Campo_1 == "")
            $("#Img1").css("display", "block");

        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
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
function table_Empresa() {

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

    var html_Empresa = "<table id='TEmpresa' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Nombre</th><th>Nit</th><th>Dirección</th><th>Telefono Fijo</th><th>Celular</th><th>Correo</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayEmpresa) {
        if (ArrayEmpresa[itemArray].ID != 0) {
            if (ArrayEmpresa[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Empresa += "<tr style='font-size: 13px;' id= 'Empresa_" + ArrayEmpresa[itemArray].ID + "'><td>" + ArrayEmpresa[itemArray].Nombre + "</td><td>" + ArrayEmpresa[itemArray].Nit + "</td><td>" + ArrayEmpresa[itemArray].Direccion + "</td><td>" + ArrayEmpresa[itemArray].Telefono_1 + "</td><td>" + ArrayEmpresa[itemArray].Telefono_2 + "</td><td>" + ArrayEmpresa[itemArray].Correo + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayEmpresa[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Empresa += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Empresa);

    $("#TEmpresa").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Empresas");

}


//grid para ver los datos a modificar
function Tabla_modificar() {

    var html_Empresa = "<table id='TEmpresa' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Nombre</th><th>Nit</th><th>Dirección</th><th>Telefono Fijo</th><th>Celular</th><th>Correo</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayEmpresa) {
        if (ArrayEmpresa[itemArray].ID != 0) {
            if (ArrayEmpresa[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Empresa += "<tr style='font-size: 13px;' id= 'Empresa_" + ArrayEmpresa[itemArray].ID + "'><td><input type ='button' class= 'Editar BtnEmpresa' Value='Editar' onclick=\"Editar('" + ArrayEmpresa[itemArray].ID + "')\"></input></td><td>" + ArrayEmpresa[itemArray].Nombre + "</td><td>" + ArrayEmpresa[itemArray].Nit + "</td><td>" + ArrayEmpresa[itemArray].Direccion + "</td><td>" + ArrayEmpresa[itemArray].Telefono_1 + "</td><td>" + ArrayEmpresa[itemArray].Telefono_2 + "</td><td>" + ArrayEmpresa[itemArray].Correo + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayEmpresa[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Empresa += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Empresa);

    $(".Editar").click(function () {
    });

    $("#TEmpresa").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Empresa ");

}

// muestra el registro a editar
function Editar(index) {

    $("#block_search_Emp").css("display", "none");
    $("#Block_Insert_Emp").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayEmpresa) {
        if (index == ArrayEmpresa[itemArray].ID) {
            Update_ID = ArrayEmpresa[itemArray].ID;
            $("#TxtNombre").val(ArrayEmpresa[itemArray].Nombre);
            $("#TxtNit").val(ArrayEmpresa[itemArray].Nit);
            $("#TxtDirec").val(ArrayEmpresa[itemArray].Direccion);
            $("#TxtTel").val(ArrayEmpresa[itemArray].Telefono_1);
            $("#TxtCel").val(ArrayEmpresa[itemArray].Telefono_2);
            $("#TxtEmail").val(ArrayEmpresa[itemArray].Correo);
            $("#Select_Estado").val(ArrayEmpresa[itemArray].Estado);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");

            if (ArrayEmpresa[itemArray].Estado == "1") {
                $("#Select_Estado").attr("disabled", "disabled");
            }
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar() {

    var html_Empresa = "<table id='TEmpresa' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Inactivar</th><th>Nombre</th><th>Nit</th><th>Dirección</th><th>Telefono Fijo</th><th>Celular</th><th>Correo</th><th>Estado</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayEmpresa) {
        if (ArrayEmpresa[itemArray].ID != 0) {
            if (ArrayEmpresa[itemArray].Estado == "1") {
                ruta = "../../images/activo.png";
            }
            else {
                ruta = "../../images/inactivo.png";
            }
            html_Empresa += "<tr style='font-size: 13px;' id= 'Empresa_" + ArrayEmpresa[itemArray].ID + "'><td><input type ='button' class= 'Inactivar BtnEmpresa' Value='Inactivar' onclick=\"Inactivar('" + ArrayEmpresa[itemArray].ID + "')\"></input></td><td>" + ArrayEmpresa[itemArray].Nombre + "</td><td>" + ArrayEmpresa[itemArray].Nit + "</td><td>" + ArrayEmpresa[itemArray].Direccion + "</td><td>" + ArrayEmpresa[itemArray].Telefono_1 + "</td><td>" + ArrayEmpresa[itemArray].Telefono_2 + "</td><td>" + ArrayEmpresa[itemArray].Correo + "</td><td><span class='cssToolTip_ver'><img alt='estado' title='' id='I_Estado' src='" + ruta + "' /><span>" + ArrayEmpresa[itemArray].DescripEstado + "</span></span></td></tr>";
        }
    }
    html_Empresa += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Empresa);

    $(".Inactivar").click(function () {
    });

    $("#TEmpresa").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Inactivar Empresa");

}

//muestra el registro a inactivar
function Inactivar(index) {
    for (itemArray in ArrayEmpresa) {
        if (index == ArrayEmpresa[itemArray].ID) {
            Update_ID = ArrayEmpresa[itemArray].ID;
            $("#Lbl_Inactive").text("¿Usted va a desactivar la siguiente empresa (" + ArrayEmpresa[itemArray].Nombre + ") desea continuar?");
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



//funcion que valida el imail
function validarEmail() {

    var validate = 0;
    var email = $("#TxtEmail").val();

    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
        validate = 1;

    return validate;
}

function Clear() {
    $("#TxtNombre").val("");
    $("#TxtNit").val("");
    $("#TxtDirec").val("");
    $("#TxtTel").val("");
    $("#TxtCel").val("");
    $("#TxtEmail").val("");
    $("#TxtSearch").val("");
    $("#Select_Option").val("-1");
}