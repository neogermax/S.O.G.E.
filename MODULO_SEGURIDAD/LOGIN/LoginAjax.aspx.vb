Public Class LoginAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

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

        Dim vl_S_user, vl_S_password, vl_S_userEncrip As String
        Dim vl_B_existeUsuario As Boolean
        Dim vl_B_passwordCorrecto As Boolean
        Dim vl_B_cambioPassword As Boolean
        Dim vl_B_Estado As Boolean
        Dim vl_B_SA As Boolean

        Dim vl_I_resultado As Integer


        Dim Encrip As New EncriptarClass
        Dim SQL_Login As New LoginSQLClass

        Dim ObjListLogin As New List(Of LoginClass)

        vl_S_user = Request.Form("user").ToString()
        vl_S_userEncrip = Encrip.Encriptacion_MD5(UCase(vl_S_user))

        vl_S_password = Request.Form("password").ToString()
        'llamamos al procedimiento de encripcion
        vl_S_password = Encrip.Encriptacion_MD5(vl_S_password)
        'llamamos modulo de consultas SQL(todos los usuarios) 
        ObjListLogin = SQL_Login.Read_AllUserLogin()
        'recorremos la lista de la consulta
        For Each row In ObjListLogin
            'verificamos el usuario exista
            If row.Name = UCase(vl_S_user) Then
                vl_B_existeUsuario = True
                'verificamos que el password sea igual al usuario para cambio de clave
                If row.Password = vl_S_userEncrip Then
                    vl_B_cambioPassword = True
                    Exit For
                End If
                'verificamos el estado del usuario
                If row.Estado = "2" Then
                    vl_B_Estado = True
                    Exit For
                End If
                'verificamos que el password sea correcto
                If row.Password = vl_S_password Then
                    vl_B_passwordCorrecto = True
                    If row.Rol = "S_ADMIN" Then
                        vl_B_SA = True
                    End If
                    Exit For
                Else
                    vl_B_passwordCorrecto = False
                    Exit For
                End If

            Else
                vl_B_existeUsuario = False
            End If
        Next
        'validamos consulta para devolver resultado al json
        If vl_B_existeUsuario = False Then
            vl_I_resultado = 2 'no existe usuario
        Else
            If vl_B_cambioPassword = True Then
                vl_I_resultado = 3 'cambio de password
                GoTo salto
            End If
            If vl_B_Estado = True Then
                vl_I_resultado = 4 'usuario deshabilitado
                GoTo salto
            End If
            If vl_B_passwordCorrecto = False Then
                vl_I_resultado = 1 ' contraseña incorrecta
            Else
                If vl_B_SA = False Then
                    vl_I_resultado = 0 'ingreso usuario
                Else
                    vl_I_resultado = 5 'ingreso a super menu
                End If

            End If
        End If
salto:
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
End Class