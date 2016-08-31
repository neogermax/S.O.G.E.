
/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayGrupo = [];
var ArrayDroplist = [];
var ArrayActividadesVer = [];

var Estado_Process;
var User;
var Update_ID;
var Campo;
/*--------------- region de variables globales --------------------*/

//evento load del Grupo
$(document).ready(function () {

    transacionAjax_CGrupo('Charge_Grupo');

    $("#Title_page").html($("#P_Grupo").html());
    $("#block_search_GA").css("display", "none");
    $("#Block_Insert_GA").css("display", "none");
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

    $("#Tab_GrupoActividad").tabs();

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
            $("#block_search_GA").css("display", "none");
            $("#Block_Insert_GA").css("display", "block");
            $("#Bloque_estado").css("display", "none");
            $("#BtnSave").attr("value", "Crear");
            $("#TxtGrupo_ID").removeAttr("disabled");
            $("#Select_Pais").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
            $("#Select_Pais").parent().find("a.ui-button").button("enable");
            $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');

            Estado_Process = "C";
            $("#Tab_GrupoActividad").tabs({ disabled: false });
            Clear();
            break;

        case "R":
            $("#block_search_GA").css("display", "block");
            $("#Block_Insert_GA").css("display", "none");
            Estado_Process = "R";
            break;

        case "U":
            $("#block_search_GA").css("display", "block");
            $("#Block_Insert_GA").css("display", "none");
            Estado_Process = "U";
            break;

        case "D":
            $("#block_search_GA").css("display", "block");
            $("#Block_Insert_GA").css("display", "none");
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
        transacionAjax_Grupo("R_ead", filtro);
    }
    else {
        filtro = "C";
        transacionAjax_Grupo("R_ead", filtro);
    }

}

//llamado desde el boton inactivar (DELETE)
function BtnDelete() {
    transacionAjax_D_elete("D_elete");
}

//validamos los campos obligatorios del modulo Grupo
function CamposObligatorios() {

    var active = $("#Tab_GrupoActividad").tabs("option", "active");
    var idtabs = $("#Tab_GrupoActividad ul>li a").eq(active).attr('href');

    var Campo_1 = "";
    var Campo_2 = "";
    var CompareValidation = "";
    var lleno = 0;

    if (idtabs == "#tabs_Grupo") {
        Campo_1 = "0";
        Campo_2 = $("#TxtDescriptionGrupo").val();
        CompareValidation = "";
    }
    else {
        Campo_1 = $("#Select_Grupo").val();
        Campo_2 = $("#TxtDescriptionActividad").val();
        CompareValidation = "-1";
    }

    if (Campo_1 == CompareValidation || Campo_2 == "") {

        lleno = 1;
        if (Campo_1 == CompareValidation) {
            if (idtabs == "#tabs_Grupo")
                $("#Img1").css("display", "block");
            else
                $("#Img3").css("display", "block");
        }
        else {
            if (idtabs == "#tabs_Grupo")
                $("#Img1").css("display", "none");
            else
                $("#Img3").css("display", "none");
        }
        if (Campo_2 == "") {
            if (idtabs == "#tabs_Grupo")
                $("#Img2").css("display", "block");
            else
                $("#Img4").css("display", "block");
        }
        else {
            if (idtabs == "#tabs_Grupo")
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
function table_Grupo(Tabla) {

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
                Tabla_consulta_Actividad();
                break;

            case "U":
                Tabla_modificar_Actividad();
                break;

            case "D":
                Tabla_eliminar_Actividad();
                break;
        }
    }

}

//grid sin botones para ver resultado
function table_Country() {

    var GrupoE;
    var html = "<table id='TCountry' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Actividades</th></tr></thead><tbody>";

    for (itemArray in ArrayActividadesVer) {
        if (ArrayActividadesVer[itemArray].Actividad_Nombre != 0) {
            GrupoE = ArrayActividadesVer[itemArray].Grupo_Nombre;
            html += "<tr style='font-size: 13px;'><td>" + ArrayActividadesVer[itemArray].Actividad_Nombre + "</td></tr>";
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
    $("#Dialog_Country").dialog("option", "title", "Grupo Economico: " + GrupoE);

}


//grid sin botones para ver resultado
function Tabla_consulta() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Grupo Economico</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Grupo_ID != 0) {
            html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Grupo_ID + "'><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td></tr>";
        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Grupo");

}

//grid sin botones para ver resultado
function Tabla_consulta_Actividad() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Grupo Economico</th><th>Actividad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Actividad_ID != 0) {
            html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Actividad_ID + "'><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td><td>" + ArrayGrupo[itemArray].Actividad_Nombre + "</td></tr>";
        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Consulta Actividades");

}

//grid para ver los datos a modificar
function Tabla_modificar_Actividad() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Grupo Economico</th><th>Actividad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Actividad_ID != 0) {
            html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Actividad_ID + "'><td><input type ='button' class= 'Editar BtnGrupo' Value='Editar' onclick=\"Editar_Actividad('" + ArrayGrupo[itemArray].Actividad_ID + "')\"></input></td><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td><td>" + ArrayGrupo[itemArray].Actividad_Nombre + "</td></tr>";
        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $(".Editar").click(function () {
    });

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Actividades ");
    $("#Tab_GrupoActividad").tabs({ selected: 2 });
}

// muestra el registro a editar
function Editar_Actividad(index) {

    $("#block_search_GA").css("display", "none");
    $("#Block_Insert_GA").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayGrupo) {
        if (index == ArrayGrupo[itemArray].Actividad_ID) {
            Update_ID = ArrayGrupo[itemArray].Actividad_ID;
            $("#Select_Pais").val(ArrayGrupo[itemArray].Grupo_ID);


            for (item in ArrayGrupo) {
                if (ArrayGrupo[item].Grupo_ID == $('#Select_Pais').val()) {
                    $('#Select_Pais').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayGrupo[item].Grupo_Nombre);
                }
            }

            $("#TxtDescriptionActividad").val(ArrayGrupo[itemArray].Actividad_Nombre);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");
            $("#TxtGrupo_ID").attr("disabled", "disabled");

            $("#Tab_GrupoActividad").tabs({ disabled: [0] });
            $('#Tab_GrupoActividad').tabs({ active: 1 });
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar_Actividad() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Grupo Economico</th><th>Actividad</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Actividad_ID != 0) {
            html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Grupo_ID + "'><td><input type ='button' class= 'Inactivar BtnGrupo' Value='Eliminar' onclick=\"Eliminar_Actividad('" + ArrayGrupo[itemArray].Actividad_ID + "')\"></input></td><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td><td>" + ArrayGrupo[itemArray].Actividad_Nombre + "</td></tr>";
        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $(".Inactivar").click(function () {
    });

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Eliminar Grupo");

}

//muestra el registro a inactivar
function Eliminar_Actividad(index) {
    for (itemArray in ArrayGrupo) {
        if (index == ArrayGrupo[itemArray].Actividad_ID) {
            Update_ID = ArrayGrupo[itemArray].Actividad_ID;
            $("#Lbl_Inactive").text("¿Usted va a Eliminar la siguiente Actividad (" + ArrayGrupo[itemArray].Actividad_Nombre + ") desea continuar?");
            $("#Dialog_Inactivar").dialog("option", "title", "Eliminar?");
            $("#Dialog_Inactivar").dialog("open");
        }
    }
}


//grid para ver los datos a modificar
function Tabla_modificar() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Modificar</th><th>Grupo Economico</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Grupo_ID != 0) {
            html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Grupo_ID + "'><td><input type ='button' class= 'Editar BtnGrupo' Value='Editar' onclick=\"Editar('" + ArrayGrupo[itemArray].Grupo_ID + "')\"></input></td><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td></tr>";
        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $(".Editar").click(function () {
    });

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Actualizar Grupo ");

}

// muestra el registro a editar
function Editar(index) {

    $("#block_search_GA").css("display", "none");
    $("#Block_Insert_GA").css("display", "block");
    $("#Bloque_estado").css("display", "block");

    for (itemArray in ArrayGrupo) {
        if (index == ArrayGrupo[itemArray].Grupo_ID) {
            Update_ID = ArrayGrupo[itemArray].Grupo_ID;
            $("#TxtGrupo_ID").val(ArrayGrupo[itemArray].Grupo_ID);
            $("#TxtDescriptionPais").val(ArrayGrupo[itemArray].Grupo_Nombre);
            $("#BtnSave").attr("value", "Actualizar");
            $("#Dialog_Grid").dialog("close");
            $("#TxtGrupo_ID").attr("disabled", "disabled");

            $("#Tab_GrupoActividad").tabs({ disabled: [1] });
            $('#Tab_GrupoActividad').tabs({ active: 0 });
        }
    }
}

//grid para ver los datos a modificar
function Tabla_eliminar() {

    var html_Grupo = "<table id='TGrupo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Grupo Economico</th></tr></thead><tbody>";
    var ruta;

    for (itemArray in ArrayGrupo) {
        if (ArrayGrupo[itemArray].Grupo_ID != 0) {
            if (ArrayGrupo[itemArray].Cant_Actividad > 0) {
                html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Grupo_ID + "'><td><span class='cssToolTip_ver'><input type ='button' class= 'Ver BtnGrupo' Value='Ver Actividades' onclick=\"Ver_Actividades('" + ArrayGrupo[itemArray].Grupo_ID + "')\"></input><span>No puede Eliminar el Pais, Tiene Actividades asignadas debe primero eliminarlas!</span></span></td><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td></tr>";
            }
            else {
                html_Grupo += "<tr style='font-size: 13px;' id= 'Grupo_" + ArrayGrupo[itemArray].Grupo_ID + "'><td><input type ='button' class= 'Inactivar BtnGrupo' Value='Eliminar' onclick=\"Eliminar_Pais('" + ArrayGrupo[itemArray].Grupo_ID + "')\"></input></td><td>" + ArrayGrupo[itemArray].Grupo_Nombre + "</td></tr>";
            }

        }
    }
    html_Grupo += "</tbody></table>";
    $("#Container_Grid").html("");
    $("#Container_Grid").html(html_Grupo);

    $(".Inactivar").click(function () {
    });
    $(".Ver").click(function () {
    });

    $("#TGrupo").dataTable({
        "bJQueryUI": true,
        "bDestroy": true
    });
    $("#Dialog_Grid").dialog("open");
    $("#Dialog_Grid").dialog("option", "title", "Eliminar Grupo");

}

//muestra el registro a inactivar
function Eliminar_Pais(index) {
    for (itemArray in ArrayGrupo) {
        if (index == ArrayGrupo[itemArray].Grupo_ID) {
            Update_ID = ArrayGrupo[itemArray].Grupo_ID;
            $("#Lbl_Inactive").text("¿Usted va a Eliminar El siguiente Pais (" + ArrayGrupo[itemArray].Grupo_Nombre + ") desea continuar?");
            $("#Dialog_Inactivar").dialog("option", "title", "Eliminar?");
            $("#Dialog_Inactivar").dialog("open");
        }
    }
}

function Ver_Actividades(index) {
    transacionAjax_Actividad("R_ead_Actividades", index);
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
    $("#TxtDescriptionGrupo").val("");
    $("#SelectGrupo").val("-1");
    $("#TxtDescriptionActividad").val("");
    $("#TxtSearch").val("");
    $('#SelectGrupo').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
}

   