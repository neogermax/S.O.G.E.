
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(vp_State) {
    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "user": $("#TxtUser").val(),
            "password": $("#TxtPassword").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            var pos = result.indexOf("_");

            if (pos == -1)
                option_value = result;
            else {
                var Str_result = result.split("_");
                option_value = Str_result[0];
                Number_intentos = Str_result[1];
            }

            switch (option_value) {

                case "0": //ingresa
                    Home = 0;
                    tansaccionAjax_val('Val');
                    break;
                case "1": //contraseña incorrecta
                    $("#TxtUser").val("Usuario incorrecto");
                    $("#TxtUser").css("color", "#C33");
                    $("#TxtPassword").attr("type", "text");
                    $("#TxtPassword").val("*Contraseña incorrecta");
                    $("#TxtPassword").css("color", "#C33");
                    break;
                case "2": //no existe usuario
                    $("#TxtUser").val("*Usuario incorrecto");
                    $("#TxtUser").css("color", "#C33");
                    $("#TxtPassword").attr("type", "text");
                    $("#TxtPassword").val("Contraseña incorrecta");
                    $("#TxtPassword").css("color", "#C33");
                    break;
                case "3": // cambio de contraseña
                    $("#Dialog_Reset").dialog("option", "title", "Cambio de Contraseña");
                    $("#Dialog_Reset").dialog("open");
                    break
                case "4": //usuario deshabilitado
                    Mensaje_Global("Desactivado!", "El usuario esta deshabilitado comuniquese con el administrador del sistema", "W");
                    break;

                case "5": //ingresa a crear empresa
                    Home = 5;
                    tansaccionAjax_val('Val');
                    break;

                case "6":  //usuario en varias empresas
                    Mensaje_Global("Tiene Multiple Empresas!", "El usuario debe selecciona una de las empresa", "W");
                    break;

                case "7":  //usuario en varias empresas
                    Mensaje_Global("Numero de intentos", "El usuario ha realizado un error precaución puede bloquear su cuenta, maximo de intentos(" + Number_intentos + ")", "W");
                    Number_Errores = Number_Errores + 1;
                    console.log(Number_Errores);
                    if (Number_Errores == Number_intentos) {
                        tansaccionAjax_BloqueoUsuario("Bloquear_Error");
                    }
                    break;
            }

        },
        error: function () {
            Mensaje_Global("Disculpenos :(", "Se genero error al realizar la transacción Ajax!", "E");
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax
function tansaccionAjax_Reset(vp_State) {

    var user = $("#TxtUser").val();

    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "user": user.toUpperCase(),
            "password": $('#txtPassword_C').val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Sucess") {
                Mensaje_Global("Exito", "La contraseña ha sido renovada!", "S");
                $("#Dialog_Reset").dialog("close");
                ClearPrincipal();
            }
            else
                Mensaje_Global("Disculpenos", "La contraseña no fue renovada, consulte con su administrador!", "E");
        },
        error: function () {
            Mensaje_Global("Disculpenos :(", "Se genero error al realizar la transacción Ajax!", "E");
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax
function tansaccionAjax_val(vp_State) {
    var user = $("#TxtUser").val();

    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "user": user.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            var ValUrl = result;

            switch (Home) {
                case 0:
                    break;

                case 5:
                    window.open("../MENU_ADMIN/Menu_SA.aspx?U=" + ValUrl, 'Principal', 'location=no,menubar=no,status=no,toolbar=no,directories=no ');
                    break;
            }

        },
        error: function () {
            Mensaje_Global("Disculpenos :(", "Se genero error al realizar la transacción Ajax!", "E");
        }
    });

}

//hacemos la transaccion al code behind por medio de Ajax
function tansaccionAjax_BloqueoUsuario(vp_State) {
    Mensaje_Global("Bloqueado!", "El usuario (" + $("#TxtUser").val() + ") fue bloqueado por sobre pasar la cantidad de intentos fallidos(" + Number_intentos + "), comuniquese con el administrador del sistema", "W");
}