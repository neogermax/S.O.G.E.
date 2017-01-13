
var flag_Drop = 0;

$(document).ready(function () {

    $(".C_Chosen").chosen({
        width: "100%",
        placeholder: 'Select an option',
        search_contains: true
    });

    $('.Numeric').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });

    $('.Decimal').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9\.]/g, '');
    });

    $('.Letter').keyup(function () {
        this.value = (this.value + '').replace(/[^a-zA-Z\s\ñ\Ñ\ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]+/g, '');
    });

    $('.Numeric_letter_Especial').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z\ñ\Ñ\ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]/g, '');
    });

    $('.Numeric_letter').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z]/g, '');
    });

    $('.Hours').focus(function () {
        this.value = "";
    });
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 INICIO DE PROCESOS                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//llamado de mensajes
function Mensaje_Global(Title, Msn, Type) {
    $("#Dialog_emergente").dialog("open");
    $("#Dialog_emergente").dialog("option", "title", Title);
    $("#Mensaje_alert").text(Msn);

    switch (Type) {
        case "E":
            $("#I_E").css("display", "block");
            $("#I_S").css("display", "none");
            $("#I_W").css("display", "none");
            break;

        case "W":
            $("#I_E").css("display", "none");
            $("#I_S").css("display", "none");
            $("#I_W").css("display", "block");
            break;

        case "S":
            $("#I_E").css("display", "none");
            $("#I_S").css("display", "block");
            $("#I_W").css("display", "none");
            break;
    }
}

//cargar DropList
function charge_CatalogList(objCatalog, nameList, selector) {

    var objList = $('[id$=' + nameList + ']');
    //recorremos para llenar el combo de
    for (itemArray in objCatalog) {
        objList[0].options[itemArray] = new Option(objCatalog[itemArray].descripcion, objCatalog[itemArray].ID);
    };
    //validamos si el combo lleva seleccione y posicionamos en el
    if (selector == 1) {
        if (flag_Drop == 0) {
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            flag_Drop = 1;
        }
    }

    if (selector == 2) {
        if (flag_Drop == 0) {
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList).append("<option value='0'>Todos</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            flag_Drop = 1;
        }
    }

}

