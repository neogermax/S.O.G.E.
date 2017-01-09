
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(State) {
    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "user": $("#TxtUser").val(),
            "password": $("#TxtPassword").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            result = JSON.parse(result);

            switch (result) {

                case 0: //ingresa
                    Home = 0;
                    tansaccionAjax_val('Val');
                    break;
                case 1: //contraseña incorrecta
                    $("#TxtUser").val("Usuario incorrecto");
                    $("#TxtUser").css("color", "#C33");
                    $("#TxtPassword").attr("type", "text");
                    $("#TxtPassword").val("*Contraseña incorrecta");
                    $("#TxtPassword").css("color", "#C33");
                    break;
                case 2: //no existe usuario
                    $("#TxtUser").val("*Usuario incorrecto");
                    $("#TxtUser").css("color", "#C33");
                    $("#TxtPassword").attr("type", "text");
                    $("#TxtPassword").val("Contraseña incorrecta");
                    $("#TxtPassword").css("color", "#C33");
                    break;
                case 3: // cambio de contraseña
                    $("#Dialog_Reset").dialog("option", "title", "Cambio de Contraseña");
                    $("#Dialog_Reset").dialog("open");
                    break
                case 4: //usuario deshabilitado
                    $("#Dialog_emergente").dialog("option", "title", "Desactivado!");
                    $("#Mensaje_alert").text("El usuario esta deshabilitado comuniquese con el administrador del sistema");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "block");

                    break;
                case 5: //ingrea a crear empresa
                    Home = 5;
                    tansaccionAjax_val('Val');

                    break;
            }

        },
        error: function () {
            $("#Dialog_emergente").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#Dialog_emergente").dialog("open");

        }
    });
}


//hacemos la transaccion al code behind por medio de Ajax
function tansaccionAjax_Reset(State) {

    var user = $("#TxtUser").val();

    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "user": user.toUpperCase(),
            "password": $('#txtPassword_C').val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Sucess") {
                $("#Dialog_emergente").dialog("option", "title", "Exito");
                $("#Mensaje_alert").text("La contraseña ha sido renovada!");
                $("#Dialog_emergente").dialog("open");
                $("#Dialog_Reset").dialog("close");
                $("#I_S").css("display", "block");
                $("#I_E").css("display", "none");
                $("#I_W").css("display", "none");
                ClearPrincipal();
            }
            else {
                $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                $("#Mensaje_alert").text("La contraseña no fue renovada, consulte con su administrador!");
                $("#Dialog_emergente").dialog("open");
                $("#I_S").css("display", "none");
                $("#I_E").css("display", "block");
                $("#I_W").css("display", "none");
            }

        },
        error: function () {
            $("#Dialog_emergente").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#Dialog_emergente").dialog("open");
            $("#I_S").css("display", "none");
            $("#I_E").css("display", "block");
            $("#I_W").css("display", "none");
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax
function tansaccionAjax_val(State) {
    var user = $("#TxtUser").val();

    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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
            $("#Dialog_emergente").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#Dialog_emergente").dialog("open");
        }
    });

}

