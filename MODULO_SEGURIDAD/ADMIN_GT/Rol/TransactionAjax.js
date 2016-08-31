/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CSearch(State) {
    $.ajax({
        url: "RolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'ROLES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDroplist = [];
            }
            else {
                ArrayDroplist = JSON.parse(result);
                charge_CatalogList(ArrayDroplist, "Select_Option", 1);
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CState(State) {
    $.ajax({
        url: "RolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'ROLES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDroplist = [];
            }
            else {
                ArrayDroplist = JSON.parse(result);
                charge_CatalogList(ArrayDroplist, "Select_Estado", 0);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Rol(State, filtro, opcion) {
    var contenido;

    if ($("#TxtSearch").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtSearch").val();
    }


    $.ajax({
        url: "RolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayRol = [];
            }
            else {
                ArrayRol = JSON.parse(result);
                table_Rol();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_reate_And_U_pdate(State) {

    var StrEstado = "1";

    if (State == "U_pdate") {
        StrEstado = $("#Select_Estado").val();
    }

    $.ajax({
        url: "RolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": $("#TxtCodigo").val(),
            "descripcion": $("#TxtDescription").val(),
            "estado": StrEstado,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Rol!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "block");
                    $("#I_W").css("display", "none");
                    break;

                case "Exist":
                    $("#Dialog_emergente").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El Rol ya existe en la base de datos!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "block");
                    break;

                case "Sucess":
                    if (Estado_Process == "U") {
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Rol fue modificado exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        Clear();
                        $("#block_search_Rol").css("display", "none");
                        $("#Block_Insert_Rol").css("display", "none");
                    }
                    else {
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Rol fue creado exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        Clear();
                        $("#block_search_Rol").css("display", "none");
                        $("#Block_Insert_Rol").css("display", "none");
                    }
                    break;
            }

        },
        error: function () {

        }
    });

}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_D_elete(State) {

    $.ajax({
        url: "RolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": Update_ID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#Dialog_Inactivar").dialog("close");
                    $("#Dialog_Grid").dialog("close");
                    $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                    $("#Mensaje_alert").text("No se desactivo el Rol!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "block");
                    $("#I_W").css("display", "none");
                    break;

                case "Sucess":
                    $("#Dialog_Inactivar").dialog("close");
                    $("#Dialog_Grid").dialog("close");
                    $("#Dialog_emergente").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Rol fue inactivado exitosamente! ");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "block");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "none");
                    Clear();
                    $("#block_search_Rol").css("display", "none");
                    $("#Block_Insert_Rol").css("display", "none");
    
                    break;
            }

        },
        error: function () {

        }
    });


}