Imports Newtonsoft.Json

Public Class Menu_SA_Ajax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "consulta"
                    Consulta_menu()

                Case "Exit"
                    Exit_SOGE("")

                Case "DeleteSession"
                    Dim Valide As String = Request.Form("Valide")
                    Dim vl_S_Url = CType(Session.Item("Var_U"), String)

                    If Valide = "" Then
                        Exit_SOGE(vl_S_Url)
                    End If

            End Select

        End If

    End Sub

    ''' <summary>
    ''' traemos todos los datos para construir el menu
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_menu()

        Dim SQL_Login As New LoginSQLClass
        Dim ObjListMenu As New List(Of LoginClass)
        Dim Encrip As New EncriptarClass

        Dim vl_S_Url = Request.Form("Url")
        Session("Var_U") = vl_S_Url

        Dim TokenNormal As String = Encrip.Des_Encriptar(vl_S_Url)

        Dim vl_S_User = SQL_Login.ValueSession(TokenNormal)

        If vl_S_User = "" Then
            Response.Write("Not_S")
        Else
            ObjListMenu = SQL_Login.Date_User(vl_S_User)
            'serializamos el objeto
            Response.Write(JsonConvert.SerializeObject(ObjListMenu.ToArray()))
        End If

    End Sub

    Protected Sub Exit_SOGE(ByVal vp_S_Url As String)

        Dim SQL_Login As New LoginSQLClass
        Dim ObjListMenu As New List(Of LoginClass)
        Dim Encrip As New EncriptarClass

        Dim vl_S_Url = ""

        If vp_S_Url = "" Then
            vl_S_Url = Request.Form("Url")
        Else
            vl_S_Url = vp_S_Url
        End If

        Dim TokenNormal As String = Encrip.Des_Encriptar(vl_S_Url)

        Dim Result = SQL_Login.DeleteSession(TokenNormal)

        Response.Write(Result)
    End Sub
End Class