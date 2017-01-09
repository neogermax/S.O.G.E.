/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CSearch(State) {
    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'USUARIOS'
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
//hacemos la transaccion al code behind por medio de Ajax para VALIDACION DE CREACION
function transacionAjax_Validate(State) {
    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "valida": $("#TxtValida").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Valido") {
                $("#Dialog_Validar").dialog("close");
                if ($("#BtnSave").val() == "Crear") {
                    transacionAjax_C_reate_And_U_pdate("C_reate");
                }
                else {
                    transacionAjax_C_reate_And_U_pdate("U_pdate");
                }
            }
            else {
                $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                $("#Mensaje_alert").text("No se realizo el ingreso del Usuario con  el perfil seleccionado!");
                $("#Dialog_emergente").dialog("open");
                $("#Dialog_Validar").dialog("close");
                $("#I_S").css("display", "none");
                $("#I_E").css("display", "block");
                $("#I_W").css("display", "none");
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
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'USUARIOS'
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


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Empresa(State) {
    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'EMPRESAS'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresa = [];
            }
            else {
                ArrayEmpresa = JSON.parse(result);
                charge_CatalogList(ArrayEmpresa, "Select_Empresa", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Rol(State) {
    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "valor": $("#LblRol").html()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayRol = [];
            }
            else {
                ArrayRol = JSON.parse(result);
                charge_CatalogList(ArrayRol, "Select_Rol", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Reset(State) {
    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": Update_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
          
            if (result = "Sucess") {
            
                $("#Dialog_emergente").dialog("option", "title", "Reset exitoso");
                $("#Mensaje_alert").text("se ha reseteado la contraseña, comuniquele al usuario para que ingrese de nuevo");
                $("#Dialog_emergente").dialog("open");
                $("#Dialog_Visualizar").dialog("close");
               
                $("#I_S").css("display", "block");
                $("#I_E").css("display", "none");
                $("#I_W").css("display", "none");
            }
            else {

                $("#Dialog_emergente").dialog("option", "title", "Reset Fallido");
                $("#Mensaje_alert").text("no se ha realizado el reseteo");
                $("#Dialog_emergente").dialog("open");
                $("#I_S").css("display", "none");
                $("#I_E").css("display", "block");
                $("#I_W").css("display", "none");
            
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Usuario(State, filtro, opcion) {
    var contenido;

    if ($("#TxtSearch").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtSearch").val();
    }


    $.ajax({
        url: "UsuarioAjax.aspx",
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
                ArrayUsuario = [];
            }
            else {
                ArrayUsuario = JSON.parse(result);
                table_Usuario();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_reate_And_U_pdate(State) {

    var ID = $("#TxtUsuario").val();
    var StrEstado = "1";

    if (State == "U_pdate") {
        ID = Update_ID;
        StrEstado = $("#Select_Estado").val();
    }

    $.ajax({
        url: "UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "ID_empresa": $("#Select_Empresa").val(),
            "ID_rol": $("#Select_Rol").val(),
            "nombre": $("#TxtNombre").val(),
            "documento": $("#TxtDocument").val(),
            "direccion": $("#TxtDirec").val(),
            "celular": $("#TxtCel").val(),
            "correo": $("#TxtEmail").val(),
            "estado": StrEstado,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Usuario!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "block");
                    $("#I_W").css("display", "none");
                    break;

                case "Exist":
                    $("#Dialog_emergente").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El Usuario ya existe en la base de datos!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "block");
                    break;

                case "Sucess":
                    if (Estado_Process == "U") {
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Usuario fue modificado exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        Clear();
                        $("#block_search_Emp").css("display", "none");
                        $("#Block_Insert_Emp").css("display", "none");

                    }
                    else {
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Usuario fue creado exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        Clear();
                        $("#block_search_Emp").css("display", "none");
                        $("#Block_Insert_Emp").css("display", "none");

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
        url: "UsuarioAjax.aspx",
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
                    $("#Mensaje_alert").text("No se desactivo el Usuario!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "block");
                    $("#I_W").css("display", "none");
                    $("#block_search_Emp").css("display", "none");
                    $("#Block_Insert_Emp").css("display", "none");

                    break;

                case "Sucess":
                    $("#Dialog_Inactivar").dialog("close");
                    $("#Dialog_Grid").dialog("close");
                    $("#Dialog_emergente").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Usuario fue inactivado exitosamente! ");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "block");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "none");
                    $("#block_search_Emp").css("display", "none");
                    $("#Block_Insert_Emp").css("display", "none");

                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });


}