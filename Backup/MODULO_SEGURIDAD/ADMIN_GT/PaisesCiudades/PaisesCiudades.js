
/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayPaises = [];
var ArrayDroplist = [];
var ArrayCiudadesVer = [];

var Estado_Process;
var User;
var Update_ID;
var Campo;
/*--------------- region de variables globales --------------------*/

//evento load del Paises
$(document).ready(function () {

    transacionAjax_CPais('Charge_Pais');

    $("#Title_page").html($("#P_Paises").html());
    $("#block_search_PC").css("display", "none");
    $("#Block_Insert_PC").css("display", "none");
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

    $("#Tab_PaisesCiudades").tabs();

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

    $("#Dialog_Country").dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 500,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $("#Select_Pais").combobox();
  

});

//manejo del panel de opciones
function OptionPanel(Opc) {

    Campo = Opc;

    switch (Opc) {

        case "C":
            $("#block_search_PC").css("display", "none");
            $("#Block_Insert_PC").css("display", "block");
            $("#Bloque_estado").css("display", "none");
            $("#BtnSave").attr("value", "Crear");
            $("#TxtPais_ID").removeAttr("disabled");
            $("#Select_Pais").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
            $("#Select_Pais").parent().find("a.ui-button").button("enable");
            $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');

            Estado_Process = "C";
            $("#Tab_PaisesCiudades").tabs({ disabled: false });
            Clear();
            break;

        case "R":
            $("#block_search_PC").css("display", "block");
            $("#Block_Insert_PC").css("display", "none");
            Estado_Process = "R";
            break;

        case "U":
            $("#block_search_PC").css("display", "block");
            $("#Block_Insert_PC").css("display", "none");
            Estado_Process = "U";
            break;

        case "D":
            $("#block_search_PC").css("display", "block");
            $("#Block_Insert_PC").css("display", "none");
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

    if (ValidateSelect == "P") {
        filtro = "P";
        transacionAjax_Paises("R_ead", filtro);
    }
    else {
        filtro = "C";
        transacionAjax_Paises("R_ead", filtro);
    }

}

//llamado desde el boton inactivar (DELETE)
function BtnDelete() {
    transacionAjax_D_elete("D_elete");
}

//validamos los campos obligatorios del modulo Paises
function CamposObligatorios() {

    var active = $("#Tab_PaisesCiudades").tabs("option", "active");
    var idtabs = $("#Tab_PaisesCiudades ul>li a").eq(active).attr('href');

    var Campo_1 = "";
    var Campo_2 = "";
    var CompareValidation = "";
    var lleno = 0;

    if (idtabs == "#tabs_Pais") {
        Campo_1 = $("#TxtPais_ID").val();
        Campo_2 = $("#TxtDescriptionPais").val();
        CompareValidation = "";
    }
    else {
        Campo_1 = $("#Select_Pais").val();
        Campo_2 = $("#TxtDescriptionCiudad").val();
        CompareValidation = "-1";
    }

    if (Campo_1 == CompareValidation || Campo_2 == "") {

        lleno = 1;
        if (Campo_1 == CompareValidation) {
            if (idtabs == "#tabs_Pais")
                $("#Img1").css("display", "block");
            else
                $("#Img3").css("display", "block");
        }
        else {
            if (idtabs == "#tabs_Pais")
                $("#Img1").css("display", "none");
            else
                $("#Img3").css("display", "none");
        }
        if (Campo_2 == "") {
            if (idtabs == "#tabs_Pais")
                $("#Img2").css("display", "block");
            else
                $("#Img4").css("display", "block");
        }
        else {
            if (idtabs == "#tabs_Pais")
                $("#Img2").css("display", "none");
            else
                $("#Img4").css("display", "none");
        }

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
function table_Paises(Tabla) {

    if (Tabla == "P") {
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
    else {
        switch (Estado_Process) {

            case "R":
                Tabla_consulta_Ciudad();
                break;

            case "U":
                Tabla_modificar_Ciudad();
                break;

            case "D":
                Tabla_eliminar_Ciudad();
                break;
        }
    }

}

//grid sin botones para ver resultado
function table_Country() {

    var Pais;
    var html = "<table id='TCountry' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Ciudades</th></tr></thead><tbody>";

    for (itemArray in ArrayCiudadesVer) {
        if (ArrayCiudadesVer[itemArray].Ciudad_Nombre != 0) {
            Pais = ArrayCiudadesVer[itemArray].Pais_Nombre;
            html += "<tr style='font-size: 13px;'><td>" + ArrayCiudadesVer[itemArray].Ciudad_Nombre + "</td></tr>";
        }
    }
    html += "</tbody></table>";
    $("#ContainerCountry").html("");
    $("#ContainerCountry").html(html);

    $("#TCountry").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Country").dialog("open");
    $("#Dialog_Country").dialog("option", "title", "Pais: " + Pais);

}


//grid sin botones para ver resultado
function Tabla_consulta() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Pais</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Pais_ID != 0) {
            html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Pais_ID + "'><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td></tr>";
        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Paises");

}

//grid sin botones para ver resultado
function Tabla_consulta_Ciudad() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Pais</th><th>Ciudad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Ciudad_ID != 0) {
            html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Ciudad_ID + "'><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td><td>" + ArrayPaises[itemArray].Ciudad_Nombre + "</td></tr>";
        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Ciudades");

}

//grid para ver los datos a modificar
function Tabla_modificar_Ciudad() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Pais</th><th>Ciudad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Ciudad_ID != 0) {
            html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Ciudad_ID + "'><td><input type ='button' class= 'Editar BtnPaises' Value='Editar' onclick=\"Editar_Ciudad('" + ArrayPaises[itemArray].Ciudad_ID + "')\"></input></td><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td><td>" + ArrayPaises[itemArray].Ciudad_Nombre + "</td></tr>";
        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $(".Editar").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Ciudades ");
    $("#Tab_PaisesCiudades").tabs({ selected: 2 });
}

// muestra el registro a editar
function Editar_Ciudad(index) {

    $("#block_search_PC").css("display", "none");
    $("#Block_Insert_PC").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayPaises) {
        if (index == ArrayPaises[itemArray].Ciudad_ID) {
            Update_ID = ArrayPaises[itemArray].Ciudad_ID;
            $("#Select_Pais").val(ArrayPaises[itemArray].Pais_ID);


            for (item in ArrayPaises) {
                if (ArrayPaises[item].Pais_ID == $('#Select_Pais').val()) {
                    $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayPaises[item].Pais_Nombre);
                }
            }

            $("#TxtDescriptionCiudad").val(ArrayPaises[itemArray].Ciudad_Nombre);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");
            $("#TxtPais_ID").attr("disabled", "disabled");

            $("#Tab_PaisesCiudades").tabs({ disabled: [0] });
            $('#Tab_PaisesCiudades').tabs({ active: 1 });
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar_Ciudad() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th><th>Ciudad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Ciudad_ID != 0) {
            html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Pais_ID + "'><td><input type ='button' class= 'Inactivar BtnPaises' Value='Eliminar' onclick=\"Eliminar_Ciudad('" + ArrayPaises[itemArray].Ciudad_ID + "')\"></input></td><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td><td>" + ArrayPaises[itemArray].Ciudad_Nombre + "</td></tr>";
        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $(".Inactivar").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Eliminar Paises");

}

//muestra el registro a inactivar
function Eliminar_Ciudad(index) {
    for (itemArray in ArrayPaises) {
        if (index == ArrayPaises[itemArray].Ciudad_ID) {
            Update_ID = ArrayPaises[itemArray].Ciudad_ID;
            $("#Lbl_Inactive").text("¿Usted va a Eliminar la siguiente Ciudad (" + ArrayPaises[itemArray].Ciudad_Nombre + ") desea continuar?");
            $("#Dialog_Inactivar").dialog("option", "title", "Eliminar?");
            $("#Dialog_Inactivar").dialog("open");
        }
    }
}


//grid para ver los datos a modificar
function Tabla_modificar() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Pais</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Pais_ID != 0) {
            html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Pais_ID + "'><td><input type ='button' class= 'Editar BtnPaises' Value='Editar' onclick=\"Editar('" + ArrayPaises[itemArray].Pais_ID + "')\"></input></td><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td></tr>";
        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $(".Editar").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Paises ");

}

// muestra el registro a editar
function Editar(index) {

    $("#block_search_PC").css("display", "none");
    $("#Block_Insert_PC").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayPaises) {
        if (index == ArrayPaises[itemArray].Pais_ID) {
            Update_ID = ArrayPaises[itemArray].Pais_ID;
            $("#TxtPais_ID").val(ArrayPaises[itemArray].Pais_ID);
            $("#TxtDescriptionPais").val(ArrayPaises[itemArray].Pais_Nombre);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");
            $("#TxtPais_ID").attr("disabled", "disabled");

            $("#Tab_PaisesCiudades").tabs({ disabled: [1] });
            $('#Tab_PaisesCiudades').tabs({ active: 0 });
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar() {

    var html_Paises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Pais_ID != 0) {
            if (ArrayPaises[itemArray].Cant_Ciudad > 0) {
                html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Pais_ID + "'><td><span class='cssToolTip_ver'><input type ='button' class= 'Ver BtnPaises' Value='Ver Ciudades' onclick=\"Ver_Ciudades('" + ArrayPaises[itemArray].Pais_ID + "')\"></input><span>No puede Eliminar el Pais, Tiene Ciudades asignadas debe primero eliminarlas!</span></span></td><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td></tr>";
            }
            else {
                html_Paises += "<tr style='font-size: 13px;' id= 'Paises_" + ArrayPaises[itemArray].Pais_ID + "'><td><input type ='button' class= 'Inactivar BtnPaises' Value='Eliminar' onclick=\"Eliminar_Pais('" + ArrayPaises[itemArray].Pais_ID + "')\"></input></td><td>" + ArrayPaises[itemArray].Pais_Nombre + "</td></tr>";
            }

        }
    }
    html_Paises += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Paises);

    $(".Inactivar").click(function () {
    });
    $(".Ver").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Eliminar Paises");

}

//muestra el registro a inactivar
function Eliminar_Pais(index) {
    for (itemArray in ArrayPaises) {
        if (index == ArrayPaises[itemArray].Pais_ID) {
            Update_ID = ArrayPaises[itemArray].Pais_ID;
            $("#Lbl_Inactive").text("¿Usted va a Eliminar El siguiente Pais (" + ArrayPaises[itemArray].Pais_Nombre + ") desea continuar?");
            $("#Dialog_Inactivar").dialog("option", "title", "Eliminar?");
            $("#Dialog_Inactivar").dialog("open");
        }
    }
}

function Ver_Ciudades(index) {
    transacionAjax_Ciudades("R_ead_Ciudades", index);
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
function X_Conuntry() {
    $("#Dialog_Country").dialog("close");
}

function Clear() {
    $("#TxtPais_ID").val("");
    $("#TxtDescriptionPais").val("");
    $("#Select_Pais").val("-1");
    $("#TxtDescriptionCiudad").val("");
    $("#TxtSearch").val("");
    $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
}

   