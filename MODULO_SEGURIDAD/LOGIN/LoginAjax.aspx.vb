Public Class LoginAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")
            Session("N_Intentos") = 0
            Session("N_Errores") = 0

            Select Case vl_S_option_login

                Case "Ingresar"
                    ingresar()

                Case "Val"
                    Genera()

                Case "New_Pass"
                    CambioContraseña()

            End Select

        End If
    End Sub

    ''' <summary>
    ''' 'funcion que valida contra la BD si el usuario y contraseña son correctos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ingresar()

        Dim vl_S_user, vl_S_password, vl_S_userEncrip, vl_S_Empresa As String
        Dim vl_I_resultado As String

        Dim Encrip As New EncriptarClass
        Dim SQL_Login As New LoginSQLClass

        Dim ObjListLogin As New List(Of LoginClass)

        vl_S_user = Request.Form("user").ToString()
        vl_S_userEncrip = Encrip.Encriptacion_MD5(UCase(vl_S_user))
        '  vl_S_Empresa = Request.Form("Empresa_ID").ToString()

        vl_S_password = Request.Form("password").ToString()
        'llamamos al procedimiento de encripcion
        vl_S_password = Encrip.Encriptacion_MD5(vl_S_password)
        'llamamos modulo de consultas SQL(todos los usuarios) 
        ObjListLogin = SQL_Login.Read_AllUserLogin(vl_S_user)


        Select Case ObjListLogin.Count

            Case 0
                vl_I_resultado = 2 'no existe usuario

            Case 1
                vl_I_resultado = Valida_Ingreso(ObjListLogin, vl_S_userEncrip, vl_S_password)

            Case Else
                vl_I_resultado = 6 'ususario en varias empresas

        End Select


        Response.Write(vl_I_resultado)

    End Sub




    ''' <summary>
    ''' funcion que ejecuta el proceso de cambio de clave
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CambioContraseña()

        Dim vl_S_user, vl_S_password, vl_S_processUpdate As String
        Dim Encrip As New EncriptarClass
        Dim SQL_Login As New LoginSQLClass

        vl_S_user = Request.Form("user").ToString()
        vl_S_password = Request.Form("password").ToString()
        'llamamos al procedimiento de encripcion
        vl_S_password = Encrip.Encriptacion_MD5(vl_S_password)

        vl_S_processUpdate = SQL_Login.Update_NewPassword(vl_S_user, vl_S_password)

        Response.Write(vl_S_processUpdate)
    End Sub

    ''' <summary>
    ''' funcion de manejode session del usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Genera()

        Dim SQL As New LoginSQLClass
        Dim ObjSession As New LoginClass

        Dim Encrip As New EncriptarClass
        Dim numAleatorio As New Random(CInt(Date.Now.Ticks And Integer.MaxValue))

        Dim Token As String = System.Convert.ToString(numAleatorio.Next)
        Dim TokenEncrip As String = Encrip.Encriptacion(Token)
        Dim TokenNormal As String = Encrip.Des_Encriptar(TokenEncrip)

        Dim User As String = Request.Form("user").ToString()

        ObjSession.Name = User
        ObjSession.Session = Token
        ObjSession.Cantidad = 0

        SQL.InsertSession(ObjSession)

        Response.Write(TokenEncrip)

    End Sub

#Region "FUNCIONES"

    Private Function Valida_Ingreso(ByVal vp_Obj_User As List(Of LoginClass), ByVal vp_S_userEncrip As String, ByVal vp_S_password As String)

        Dim Result As String = ""
        'recorremos la lista de la consulta
        For Each item In vp_Obj_User

            'verificamos que el password sea igual al usuario para cambio de clave
            If item.Password = vp_S_userEncrip Then
                Result = 3 'cambio de password
                Exit For
            End If

            'verificamos el estado del usuario
            If item.Estado = "2" Then
                Result = 4 'usuario deshabilitado
                Exit For
            End If

            'verificamos que el password sea correcto
            If item.Password = vp_S_password Then
                Result = 0 'ingreso usuario
                If item.Rol = "S_ADMIN" Then
                    Result = 5 'ingreso a super menu
                End If
                Exit For
            Else
                Result = 1 ' contraseña incorrecta
                If item.N_Error_Logeo <> 0 Then
                    Result = 7 ' requiere conteo de errores de contraseña
                    Result = Result & "_" & item.N_Error_Logeo
                    Exit For
                End If
            End If
        Next

        Return Result
    End Function

#End Region

End Class