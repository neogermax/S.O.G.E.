Imports Newtonsoft.Json

Public Class UsuarioAjax
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

                Case "Charge_Empresa"
                    CargarDroplistempresa()

                Case "Charge_Rol"
                    CargarDroplistRol()

                Case "C_reate"
                    C_reate()

                Case "R_ead"
                    R_ead()

                Case "U_pdate"
                    U_pdate()

                Case "D_elete"
                    D_elete()

                Case "Validar_C_reate"
                    validateC_reate()

                Case "Reset"
                    ResetUser()

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

        Dim SQL As New UsuarioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListState(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL empresa
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistempresa()

        Dim SQL As New UsuarioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListEmpresa(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL Rol
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistRol()

        Dim SQL As New UsuarioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_valor As String = Request.Form("valor")

        ObjListDroplist = SQL.ReadCharge_DropListRol(vl_S_valor)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub


#End Region

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla Usuario (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub C_reate()

        Dim SQL As New UsuarioSQLClass
        Dim ObjList As New List(Of UsuarioClass)
        Dim objUsuario As New UsuarioClass
        Dim SQL_general As New GeneralSQLClass
        Dim encriptar As New EncriptarClass


        Dim Result As String = ""

        objUsuario.Usuario_ID = Request.Form("ID")

        Dim Exist As String = SQL_general.ReadExist("USUARIOS", "U_Usuario_ID", "", objUsuario.Usuario_ID, "", "")

        If Exist = "N" Then

            Dim vl_S_passEncrip As String = UCase(Request.Form("ID"))
            vl_S_passEncrip = encriptar.Encriptacion_MD5(vl_S_passEncrip)
            objUsuario.Paswword = vl_S_passEncrip

            objUsuario.Empresa = Request.Form("ID_empresa")
            objUsuario.Rol = Request.Form("ID_rol")
            objUsuario.Nombre = Request.Form("nombre")
            objUsuario.Documento = Request.Form("documento")
            objUsuario.Direccion = Request.Form("direccion")
            objUsuario.Celular = Request.Form("celular")
            objUsuario.Correo = Request.Form("correo")
            objUsuario.Estado = Request.Form("estado")
            objUsuario.Usuario = Request.Form("user")
            objUsuario.FechaActualizacion = Date.Now

            ObjList.Add(objUsuario)

            Result = SQL.Insert(objUsuario)
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

        Dim SQL As New UsuarioSQLClass
        Dim ObjList As New List(Of UsuarioClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL.Read_All(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjList Is Nothing Then

            Dim objUsuario As New UsuarioClass
            ObjList = New List(Of UsuarioClass)

            objUsuario.Nombre = ""
            objUsuario.FechaActualizacion = ""
            objUsuario.Usuario = ""

            ObjList.Add(objUsuario)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Usuario (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub U_pdate()

        Dim SQL As New UsuarioSQLClass
        Dim ObjList As New List(Of UsuarioClass)
        Dim objUsuario As New UsuarioClass

        Dim result As String

        objUsuario.Usuario_ID = Request.Form("ID")
        objUsuario.Empresa = Request.Form("ID_empresa")
        objUsuario.Rol = Request.Form("ID_rol")
        objUsuario.Nombre = Request.Form("nombre")
        objUsuario.Documento = Request.Form("documento")
        objUsuario.Direccion = Request.Form("direccion")
        objUsuario.Celular = Request.Form("celular")
        objUsuario.Correo = Request.Form("correo")
        objUsuario.Estado = Request.Form("estado")
        objUsuario.Usuario = Request.Form("user")
        objUsuario.FechaActualizacion = Date.Now

        ObjList.Add(objUsuario)

        result = SQL.Update(objUsuario)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Usuario (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub D_elete()

        Dim SQL As New UsuarioSQLClass
        Dim ObjList As New List(Of UsuarioClass)
        Dim objUsuario As New UsuarioClass

        objUsuario.Usuario_ID = Request.Form("ID")
        ObjList.Add(objUsuario)

        Dim result As String = SQL.Inactive(objUsuario)
        Response.Write(result)

    End Sub

#End Region

#Region "OTROS"

    ''' <summary>
    ''' funcion que valida si esta autorizado para crear el super usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub validateC_reate()

        Dim result As String = ""
        Dim validate As String = Request.Form("valida")

        If validate = "GT_C_2016_Full_Admin" Then

            result = "Valido"
        Else
            result = "Error"
        End If

        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que resetea la contraseña deñ usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ResetUser()
        Dim objReset As New LoginClass
        Dim ObjListReset As New List(Of LoginClass)
        Dim Encriptar As New EncriptarClass
        Dim SQL_Reset As New LoginSQLClass
        Dim vl_s_IDxiste, result As String

        objReset.Name = Request.Form("ID")
        
        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Existe(UCase(objReset.Name))

        If vl_s_IDxiste = "S" Then

            objReset.Password = Encriptar.Encriptacion_MD5(UCase(objReset.Name))
            ObjListReset.Add(objReset)
            result = SQL_Reset.Update_PasswordADM(objReset)
            Response.Write(result)
        Else
            result = "NO"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que valida si el id esta en la BD
    ''' </summary>
    ''' <param name="vp_S_exist"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function Consulta_Existe(ByVal vp_S_exist As String)

        Dim SQL_General As New GeneralSQLClass
        Dim result As String

        result = SQL_General.ReadExist("USUARIOS", "U_Usuario_ID", "", vp_S_exist, "", "")
        Return result

    End Function
#End Region
End Class