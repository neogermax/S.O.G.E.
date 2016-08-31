/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var Url;
var User;
var Campo;
/*--------------- region de variables globales --------------------*/

//evento load del menu
$(document).ready(function () {

    //capturamos la url
    var URLPage = window.location.search.substring(1);
    var URLVariables = URLPage.split('&');

    if (URLVariables.length <= 1) {
        Url = URLVariables[0].replace("U=", "");
    }
    else {
    }

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

    //traemos los datos
    transacionAjax("consulta");

    window.onbeforeunload = function () {

        $.ajax({
            url: "Menu_SA_Ajax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(State) {
    $.ajax({
        url: "/MENU_ADMIN/Menu_SA_Ajax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Url": Url
        },
        //Transaccion Ajax en proceso
        success: function (result) {


            if (result == "Not_S") {
                ArrayUser = [];
                Redireccion_salida();
            }
            else {
                ArrayUser = JSON.parse(result);
                $("#LblUser").html(ArrayUser[0].Name);
                $("#LblRol").html(ArrayUser[0].Descrip_Rol);
                User = ArrayUser[0].NameUser;
            }
        },
        error: function () {
            $("#dialog").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "block");
        }
    });
}

//llama las paginas Administrativas
function Redireccion(opc) {

    Campo = opc;

    switch (opc) {

        case "Actividad":
            window.location = '../../ADMIN_GT/GruposActividades/GruposActividades.aspx?U=' + Url;
            break;
                
        case "Pais":
            window.location = '../../ADMIN_GT/PaisesCiudades/PaisesCiudades.aspx?U=' + Url;
            break;

        case "Emp":
            window.location = '../../ADMIN_GT/Empresa/Empresa.aspx?U=' + Url;
            break;

        case "Rol":
            window.location = '../../ADMIN_GT/Rol/Rol.aspx?U=' + Url;
            break;

        case "Usu":
            window.location = '../../ADMIN_GT/Usuarios/Usuario.aspx?U=' + Url;
            break;
    }

}

//salida de SOGE
function Exit_SOGE() {
    tansaccionAjax_Exit('Exit');
    window.location = "/LOGIN/Login.aspx";
}

function tansaccionAjax_Exit(State) {
    $.ajax({
        url: "/MENU_ADMIN/Menu_SA_Ajax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Url": Url
        },
        //Transaccion Ajax en proceso
        success: function (result) {

        },
        error: function () {
            $("#dialog").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "block");
        }
    });
}

function Redireccion_salida() {
    $("#Dialog_Session").dialog("option", "title", "Session!");
    $("#Mensaje_alert_S").text("Usted esta intentando ingresar indebidamente sera redirecionado a la pagina de login");
    $("#Dialog_Session").dialog("open");

    setTimeout("window.location = '/LOGIN/Login.aspx';", 15000);


}