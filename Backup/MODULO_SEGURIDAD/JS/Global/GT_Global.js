
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
        this.value = (this.value + '').replace(/[^a-zA-Z\s]+/g, '');
    });

    $('.Numeric_letter').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z]/g, '');
    });

});

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

