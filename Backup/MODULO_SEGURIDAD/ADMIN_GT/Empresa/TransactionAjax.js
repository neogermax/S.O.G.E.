/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CSearch(State) {
    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'EMPRESAS'
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
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'EMPRESAS'
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
function transacionAjax_CPais(State) {
    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'PAISES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPais = [];
            }
            else {
                ArrayPais = JSON.parse(result);
                charge_CatalogList(ArrayPais, "Select_Pais", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CCiudad(State, ID_pais) {
    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID_Pais": ID_pais
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCiudades = [];
            }
            else {
                ArrayCiudades = JSON.parse(result);
                charge_CatalogList(ArrayCiudades, "Select_Ciudad", 1);
                $('#Select_Ciudad').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
                Caputure_Ciudad_ID();
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CGrupo(State) {
    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'GRUPOS_ACTIVIDADES_E'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayGrupo = [];
            }
            else {
                ArrayGrupo = JSON.parse(result);
                charge_CatalogList(ArrayGrupo, "Select_Grupo", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CActividad(State, ID_grupo, Type) {
    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID_grupo": ID_grupo,
            "Type": Type
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayActividad = [];
            }
            else {
                ArrayActividad = JSON.parse(result);
                charge_CatalogList(ArrayActividad, "Select_Actividad", 1);
                $('#Select_Actividad').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
            }
        },
        error: function () {

        }
    });
}
/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Empresa(State, filtro, opcion) {
    var contenido;

    if ($("#TxtSearch").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtSearch").val();
    }


    $.ajax({
        url: "EmpresaAjax.aspx",
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
                ArrayEmpresa = [];
            }
            else {
                ArrayEmpresa = JSON.parse(result);
                table_Empresa();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_reate_And_U_pdate(State) {

    var ID = "0";
    var param;
    var StrEstado = "1";

    if (State == "U_pdate") {
        ID = Update_ID;
        StrEstado = $("#Select_Estado").val();
    }

    $.ajax({
        url: "EmpresaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "nombre": $("#TxtNombre").val(),
            "nit": $("#TxtNit").val(),
            "direccion": $("#TxtDirec").val(),
            "tel_fijo": $("#TxtTel").val(),
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
                    $("#Mensaje_alert").text("No se realizo el ingreso de la empresa!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "block");
                    $("#I_W").css("display", "none");
                    break;

                case "Exist":
                    $("#Dialog_emergente").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("La empresa ya existe en la base de datos!");
                    $("#Dialog_emergente").dialog("open");
                    $("#I_S").css("display", "none");
                    $("#I_E").css("display", "none");
                    $("#I_W").css("display", "block");
                    break;

                case "Sucess":
                    if (Estado_Process == "U") {
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("La empresa fue modificada exitosamente! ");
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
                        $("#Mensaje_alert").text("La empresa fue creada exitosamente! ");
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
        url: "EmpresaAjax.aspx",
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
                    $("#Mensaje_alert").text("No se desactivo la empresa!");
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
                    $("#Mensaje_alert").text("La empresa fue inactivada exitosamente! ");
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