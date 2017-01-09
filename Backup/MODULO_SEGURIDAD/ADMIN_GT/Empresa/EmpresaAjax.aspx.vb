Imports Newtonsoft.Json

Public Class EmpresaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Charge_Search"
                    CargarDroplist()

                Case "Charge_State"
                    CargarDroplistState()

                Case "C_reate"
                    C_reate()

                Case "R_ead"
                    R_ead()

                Case "U_pdate"
                    U_pdate()

                Case "D_elete"
                    D_elete()

                Case "Charge_Pais"
                    CargarDroplistPais()

                Case "Charge_Ciudades"
                    CargarDroplistCiudades()

                Case "Charge_Grupo"
                    CargarDroplistGrupo()

                Case "Charge_Actividad"
                    CargarDroplistActividad()
            End Select

        End If

    End Sub

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL busqueda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL As New GeneralSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistState()

        Dim SQL As New EmpresaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListState(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistPais()

        Dim SQL As New EmpresaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListPaises(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistCiudades()

        Dim SQL As New EmpresaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID_Pais As String = Request.Form("ID_Pais")

        ObjListDroplist = SQL.ReadCharge_DropListCiudades(vl_S_ID_Pais)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistGrupo()

        Dim SQL As New EmpresaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListGrupo(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistActividad()

        Dim SQL As New EmpresaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID_Grupo As String = Request.Form("ID_grupo")
        Dim vl_S_Type As String = Request.Form("Type")

        ObjListDroplist = SQL.ReadCharge_DropListActividad(vl_S_ID_Grupo, vl_S_Type)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla empresa (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub C_reate()

        Dim SQL As New EmpresaSQLClass
        Dim ObjList As New List(Of EmpresaClass)
        Dim objEmpresa As New EmpresaClass
        Dim SQL_general As New GeneralSQLClass

        Dim Result As String = ""

        objEmpresa.ID = Request.Form("ID")
        objEmpresa.Nombre = Request.Form("nombre")

        Dim Exist As String = SQL_general.ReadExist("EMPRESAS", "E_ID", "E_Nombre", objEmpresa.ID, objEmpresa.Nombre, "")

        If Exist = "N" Then

            objEmpresa.Nit = Request.Form("nit")
            objEmpresa.Direccion = Request.Form("direccion")
            objEmpresa.Telefono_1 = Request.Form("tel_fijo")
            objEmpresa.Telefono_2 = Request.Form("celular")
            objEmpresa.Correo = Request.Form("correo")
            objEmpresa.Estado = Request.Form("estado")
            objEmpresa.Usuario = Request.Form("user")
            objEmpresa.FechaActualizacion = Date.Now

            ObjList.Add(objEmpresa)

            Result = SQL.Insert(objEmpresa)
        Else
            Result = "Exist"
        End If

        Response.Write(Result)

    End Sub

    ''' <summary>
    ''' traemos todos los datos para tabla empresa (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub R_ead()

        Dim SQL As New EmpresaSQLClass
        Dim ObjList As New List(Of EmpresaClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL.Read_All(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjList Is Nothing Then

            Dim objEmpresa As New EmpresaClass
            ObjList = New List(Of EmpresaClass)

            objEmpresa.Nombre = ""
            objEmpresa.FechaActualizacion = ""
            objEmpresa.Usuario = ""

            ObjList.Add(objEmpresa)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla empresa (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub U_pdate()

        Dim SQL As New EmpresaSQLClass
        Dim ObjList As New List(Of EmpresaClass)
        Dim objEmpresa As New EmpresaClass

        Dim result As String

        objEmpresa.ID = Request.Form("ID")
        objEmpresa.Nombre = Request.Form("nombre")
        objEmpresa.Nit = Request.Form("nit")
        objEmpresa.Direccion = Request.Form("direccion")
        objEmpresa.Telefono_1 = Request.Form("tel_fijo")
        objEmpresa.Telefono_2 = Request.Form("celular")
        objEmpresa.Correo = Request.Form("correo")
        objEmpresa.Estado = Request.Form("estado")
        objEmpresa.Usuario = Request.Form("user")
        objEmpresa.FechaActualizacion = Date.Now

        ObjList.Add(objEmpresa)

        result = SQL.Update(objEmpresa)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla empresa (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub D_elete()

        Dim SQL As New EmpresaSQLClass
        Dim ObjList As New List(Of EmpresaClass)
        Dim objEmpresa As New EmpresaClass

        objEmpresa.ID = Request.Form("ID")
        ObjList.Add(objEmpresa)

        Dim result As String = SQL.Inactive(objEmpresa)
        Response.Write(result)

    End Sub

#End Region
End Class