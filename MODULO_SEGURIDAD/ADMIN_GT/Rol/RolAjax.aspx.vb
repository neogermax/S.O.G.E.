Imports Newtonsoft.Json

Public Class RolAjax
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

        Dim SQL As New RolSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListState(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla Rol (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub C_reate()

        Dim SQL As New RolSQLClass
        Dim ObjList As New List(Of RolClass)
        Dim objRol As New RolClass
        Dim SQL_general As New GeneralSQLClass

        Dim Result As String = ""

        objRol.Rol_ID = Request.Form("ID")
        
        Dim Exist As String = SQL_general.ReadExist("ROLES", "R_Rol_ID", "", objRol.Rol_ID, "", "")

        If Exist = "N" Then

            objRol.Descripcion = Request.Form("descripcion")
            objRol.Estado = Request.Form("estado")
            objRol.Usuario = Request.Form("user")
            objRol.FechaActualizacion = Date.Now

            ObjList.Add(objRol)

            Result = SQL.Insert(objRol)
        Else
            Result = "Exist"
        End If

        Response.Write(Result)

    End Sub

    ''' <summary>
    ''' traemos todos los datos para tabla Area (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub R_ead()

        Dim SQL As New RolSQLClass
        Dim ObjList As New List(Of RolClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL.Read_All(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjList Is Nothing Then

            Dim objRol As New RolClass
            ObjList = New List(Of RolClass)

            objRol.Descripcion = ""
            objRol.FechaActualizacion = ""
            objRol.Usuario = ""

            ObjList.Add(objRol)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Rol (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub U_pdate()

        Dim SQL As New RolSQLClass
        Dim ObjList As New List(Of RolClass)
        Dim objRol As New RolClass

        Dim result As String

        objRol.Rol_ID = Request.Form("ID")
        objRol.Descripcion = Request.Form("descripcion")
        objRol.Estado = Request.Form("estado")
        objRol.Usuario = Request.Form("user")
        objRol.FechaActualizacion = Date.Now

        ObjList.Add(objRol)

        result = SQL.Update(objRol)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Rol (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub D_elete()

        Dim SQL As New RolSQLClass
        Dim ObjList As New List(Of RolClass)
        Dim objRol As New RolClass

        objRol.Rol_ID = Request.Form("ID")
        ObjList.Add(objRol)

        Dim result As String = SQL.Inactive(objRol)
        Response.Write(result)

    End Sub

#End Region



End Class