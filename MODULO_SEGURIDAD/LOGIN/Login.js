var Home;
var option_value;
var Number_intentos;
var Number_Errores = 0;

$(document).ready(function () {

    $('.box_skitter_large').skitter({
        theme: 'clean',
        numbers_align: 'center',
        progressbar: true,
        dots: true,
        preview: true
    });

    $("#I_S").css("display", "none");
    $("#I_E").css("display", "none");
    $("#I_W").css("display", "none");
    $("#I_A").css("display", "none");
    $("#I_I").css("display", "none");
    $("#I_A2").css("display", "none");
    $("#I_I2").css("display", "none");
    $("#BtnConfirm").attr("disabled", "disabled");

    VerPassword();
    ValidarCamposIguales();

    format_text_USER();
    format_text_PASS();
    format_out_text_USER();
    format_out_text_PASS();

    teclaEnter();
    //evento del boton ingresar
    $("#BtnIngresar").click(function () {
        //llamamos la funcion de validar
        var flag_campos = ValidarCampos();
        if (flag_campos == 0) {
            //llamamos la funcion de transaccion
            transacionAjax("Ingresar");
        }
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

    $("#Dialog_Reset").dialog({
        autoOpen: false,
        modal: true,
        width: 450,
        height: 310,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });
});

//funcion para ver los campos password
function VerPassword() {

    $('#I_ver_P').mouseover(function () {
        $('#TxtPassword').attr("type", "text");
        $('#I_ver_P').css('cursor', 'pointer');
    });
    $('#I_ver_P').mouseout(function () {
        $('#TxtPassword').attr("type", "password");
    });

    $('#I_ver').mouseover(function () {
        $('#txtPassword_C').attr("type", "text");
        $('#I_ver').css('cursor', 'pointer');
    });
    $('#I_ver').mouseout(function () {
        $('#txtPassword_C').attr("type", "password");
    });

    $('#I_ver_2').mouseover(function () {
        $('#txtConfirmPassword').attr("type", "text");
        $('#I_ver_2').css('cursor', 'pointer');
    });
    $('#I_ver_2').mouseout(function () {
        $('#txtConfirmPassword').attr("type", "password");
    });

}

//funcion que valida si los campos de la contraseña son igules soi no bloquea boton cambiar
function ValidarCamposIguales() {

    $('#txtConfirmPassword').keyup(function () {

        var campo_1 = $('#txtPassword_C').val();
        var campo_2 = $('#txtConfirmPassword').val();

        if (campo_1 == "" || campo_2 == "") {
            $("#I_A").css("display", "none");
            $("#I_I").css("display", "none");
            $("#I_A2").css("display", "none");
            $("#I_I2").css("display", "none");
        }
        else {

            if (campo_1 === campo_2) {
                $("#I_A").css("display", "block");
                $("#I_I").css("display", "none");
                $("#I_A2").css("display", "block");
                $("#I_I2").css("display", "none");
                $("#BtnConfirm").removeAttr("disabled");
            }
            else {
                $("#I_A").css("display", "none");
                $("#I_I").css("display", "block");
                $("#I_A2").css("display", "none");
                $("#I_I2").css("display", "block");
                $("#BtnConfirm").attr("disabled", "disabled");
            }
        }
    });

    $('#txtPassword_C').keyup(function () {

        var campo_1 = $('#txtPassword_C').val();
        var campo_2 = $('#txtConfirmPassword').val();

        if (campo_1 == "" || campo_2 == "") {
            $("#I_A").css("display", "none");
            $("#I_I").css("display", "none");
            $("#I_A2").css("display", "none");
            $("#I_I2").css("display", "none");
        }
        else {

            if (campo_1 === campo_2) {
                $("#I_A").css("display", "block");
                $("#I_I").css("display", "none");
                $("#I_A2").css("display", "block");
                $("#I_I2").css("display", "none");
                $("#BtnConfirm").removeAttr("disabled");
            }
            else {
                $("#I_A").css("display", "none");
                $("#I_I").css("display", "block");
                $("#I_A2").css("display", "none");
                $("#I_I2").css("display", "block");
                $("#BtnConfirm").attr("disabled", "disabled");
            }
        }
    });

}



function format_text_USER() {
    $("#TxtUser").focusin(function () {
        if ($("#TxtUser").val() == "Usuario" || $("#TxtUser").val() == "Usuario requerido" || $("#TxtUser").val() == "*Usuario incorrecto" || $("#TxtUser").val() == "Usuario incorrecto") {
            $("#TxtUser").val("");
            $("#TxtUser").css("color", "black");
        }
    });
}

function format_out_text_USER() {
    $("#TxtUser").focusout(function () {
        if ($("#TxtUser").val() == "") {
            $("#TxtUser").val("Usuario");
            $("#TxtUser").css("color", "#002e52");
        }
    });
}

function format_text_PASS() {
    $("#TxtPassword").focusin(function () {
        if ($("#TxtPassword").val() == "Contraseña" || $("#TxtPassword").val() == "Contraseña requerida" || $("#TxtPassword").val() == "*Contraseña incorrecta" || $("#TxtPassword").val() == "Contraseña incorrecta") {
            $("#TxtPassword").val("");
            $("#TxtPassword").attr("type", "password");
            $("#TxtPassword").css("color", "black");
        }
    });
}

function format_out_text_PASS() {
    $("#TxtPassword").focusout(function () {
        if ($("#TxtPassword").val() == "") {
            $("#TxtPassword").val("Contraseña");
            $("#TxtPassword").attr("type", "text");
            $("#TxtPassword").css("color", "#002e52");
        }
    });
}

//evento de la tecla enter
function teclaEnter() {
    $(document).keydown(function (ev) {

        if (ev.keyCode == 13) {
            var flag_campos = ValidarCampos();
            if (flag_campos === 0) {
                //llamamos la funcion de transaccion
                transacionAjax("Ingresar");
            }
        }
    });
}

//validamos los campos de captura
function ValidarCampos() {
    var user = $("#TxtUser").val();
    var password = $("#TxtPassword").val();
    var flag_valida = 0;

    if (user == "Usuario" || password == "Contraseña") {
        flag_valida = 1;
        if (user == "Usuario") {
            $("#TxtUser").val("Usuario requerido");
            $("#TxtUser").css("color", "#C33");
        }
        if (password == "Contraseña") {
            $("#TxtPassword").attr("type", "text");
            $("#TxtPassword").val("Contraseña requerida");
            $("#TxtPassword").css("color", "#C33");
        }

    }
    return flag_valida;
}

//salida de la ventana emergente
function X_Emer() {
    $("#Dialog_emergente").dialog("close");
}

//salida de la ventana emergente
function X_Reset() {
    $("#Dialog_Reset").dialog("close");
    clear();
}

//limpieza de campos
function clear() {
    $('#txtPassword_C').val("");
    $('#txtConfirmPassword').val("");
    $("#I_A").css("display", "none");
    $("#I_I").css("display", "none");
    $("#I_A2").css("display", "none");
    $("#I_I2").css("display", "none");
    $("#BtnConfirm").attr("disabled", "disabled");
}

//limpieza de campos
function ClearPrincipal() {
    $('#TxtUser').val("Usuario");
    $('#txtPassword').attr("type", "text");
    $('#TxtPassword').val("Contraseña");
}

//funcion que dispara el bonton confirmar contraseña
function Confirmar() {
    tansaccionAjax_Reset("New_Pass");
}

