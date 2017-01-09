/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CPais(State) {
    $.ajax({
        url: "PaisesCiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'PAISES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDroplist = [];
            }
            else {
                ArrayDroplist = JSON.parse(result);
                charge_CatalogList(ArrayDroplist, "Select_Pais", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Paises(State, filtro) {
    var contenido;

    if ($("#TxtSearch").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtSearch").val();
    }


    $.ajax({
        url: "PaisesCiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPaises = [];
            }
            else {
                ArrayPaises = JSON.parse(result);
                table_Paises(filtro);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Ciudades(State, ID) {

    $.ajax({
        url: "PaisesCiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCiudadesVer = [];
            }
            else {
                ArrayCiudadesVer = JSON.parse(result);
                table_Country();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_reate_And_U_pdate(State) {

    var active = $("#Tab_PaisesCiudades").tabs("option", "active");
    var idtabs = $("#Tab_PaisesCiudades ul>li a").eq(active).attr('href');

    var ID = "0";
    var param;

    if (idtabs == "#tabs_Pais") {

        if (State == "U_pdate") {
            ID = Update_ID;
        }
        else {
            ID = $("#TxtPais_ID").val();
        }

        $.ajax({
            url: "PaisesCiudadesAjax.aspx",
            type: "POST",
            //crear json
            data: { "action": State,
                "proceso": "P",
                "ID": ID,
                "nombre": $("#TxtDescriptionPais").val(),
                "user": User
            },
            //Transaccion Ajax en proceso
            success: function (result) {
                switch (result) {

                    case "Error":
                        $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                        $("#Mensaje_alert").text("No se realizo el ingreso del Pais!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "block");
                        $("#I_W").css("display", "none");
                        break;

                    case "Exist":
                        $("#Dialog_emergente").dialog("option", "title", "Ya Existe");
                        $("#Mensaje_alert").text("El Pais ya existe en la base de datos!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "block");
                        break;

                    case "Sucess":
                        if (Estado_Process == "U") {
                            $("#Dialog_emergente").dialog("option", "title", "Exito");
                            $("#Mensaje_alert").text("El Pais fue modificado exitosamente! ");
                            $("#Dialog_emergente").dialog("open");
                            $("#I_S").css("display", "block");
                            $("#I_E").css("display", "none");
                            $("#I_W").css("display", "none");
                            Clear();
                            $("#block_search_PC").css("display", "none");
                            $("#Block_Insert_PC").css("display", "none");

                        }
                        else {
                            $("#Dialog_emergente").dialog("option", "title", "Exito");
                            $("#Mensaje_alert").text("El Pais fue creado exitosamente! ");
                            $("#Dialog_emergente").dialog("open");
                            $("#I_S").css("display", "block");
                            $("#I_E").css("display", "none");
                            $("#I_W").css("display", "none");
                            Clear();
                            $("#block_search_PC").css("display", "none");
                            $("#Block_Insert_PC").css("display", "none");

                        }
                        break;
                }

            },
            error: function () {

            }
        });
    }
    else {

        if (State == "U_pdate") {
            ID = Update_ID;
        }
        else {
            ID = 0;
        }

        $.ajax({
            url: "PaisesCiudadesAjax.aspx",
            type: "POST",
            //crear json
            data: { "action": State,
                "proceso": "C",
                "ID": ID,
                "PaisID": $("#Select_Pais").val(),
                "nombre": $("#TxtDescriptionCiudad").val(),
                "user": User
            },
            //Transaccion Ajax en proceso
            success: function (result) {
                switch (result) {

                    case "Error":
                        $("#Dialog_emergente").dialog("option", "title", "Disculpenos");
                        $("#Mensaje_alert").text("No se realizo el ingreso de la Ciudad!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "block");
                        $("#I_W").css("display", "none");
                        break;

                    case "Exist":
                        $("#Dialog_emergente").dialog("option", "title", "Ya Existe");
                        $("#Mensaje_alert").text("La Ciudad ya existe en la base de datos!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "block");
                        break;

                    case "Sucess":
                        if (Estado_Process == "U") {
                            $("#Dialog_emergente").dialog("option", "title", "Exito");
                            $("#Mensaje_alert").text("La Ciudad fue modificada exitosamente! ");
                            $("#Dialog_emergente").dialog("open");
                            $("#I_S").css("display", "block");
                            $("#I_E").css("display", "none");
                            $("#I_W").css("display", "none");
                            Clear();
                            $("#block_search_PC").css("display", "none");
                            $("#Block_Insert_PC").css("display", "none");

                        }
                        else {
                            $("#Dialog_emergente").dialog("option", "title", "Exito");
                            $("#Mensaje_alert").text("La Ciudad fue creada exitosamente! ");
                            $("#Dialog_emergente").dialog("open");
                            $("#I_S").css("display", "block");
                            $("#I_E").css("display", "none");
                            $("#I_W").css("display", "none");
                            Clear();
                            $("#block_search_PC").css("display", "none");
                            $("#Block_Insert_PC").css("display", "none");

                        }
                        break;
                }

            },
            error: function () {

            }
        });

    }

}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_D_elete(State) {

    if ($("#Select_Option").val() == "P") {

        $.ajax({
            url: "PaisesCiudadesAjax.aspx",
            type: "POST",
            //crear json
            data: { "action": State,
                "proceso": "P",
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
                        $("#Mensaje_alert").text("No se elimino el Pais!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "block");
                        $("#I_W").css("display", "none");
                        $("#block_search_PC").css("display", "none");
                        $("#Block_Insert_PC").css("display", "none");

                        break;

                    case "Sucess":
                        $("#Dialog_Inactivar").dialog("close");
                        $("#Dialog_Grid").dialog("close");
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El pais fue Eliminado exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        $("#block_search_PC").css("display", "none");
                        $("#Block_Insert_PC").css("display", "none");

                        Clear();
                        break;
                }

            },
            error: function () {

            }
        });

    }
    else {
        $.ajax({
            url: "PaisesCiudadesAjax.aspx",
            type: "POST",
            //crear json
            data: { "action": State,
                "proceso": "C",
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
                        $("#Mensaje_alert").text("No se elimino la Ciudad!");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "none");
                        $("#I_E").css("display", "block");
                        $("#I_W").css("display", "none");
                        $("#block_search_PC").css("display", "none");
                        $("#Block_Insert_PC").css("display", "none");

                        break;

                    case "Sucess":
                        $("#Dialog_Inactivar").dialog("close");
                        $("#Dialog_Grid").dialog("close");
                        $("#Dialog_emergente").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("La ciudad fue eliminada exitosamente! ");
                        $("#Dialog_emergente").dialog("open");
                        $("#I_S").css("display", "block");
                        $("#I_E").css("display", "none");
                        $("#I_W").css("display", "none");
                        $("#block_search_PC").css("display", "none");
                        $("#Block_Insert_PC").css("display", "none");

                        Clear();
                        break;
                }

            },
            error: function () {

            }
        });

    }



}