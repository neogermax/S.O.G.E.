Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class LoginSQLClass

    ''' <summary>
    ''' manejo de insercion de la session
    ''' </summary>
    ''' <param name="vp_O_objClass"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertSession(ByVal vp_O_objClass As LoginClass)

        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" INSERT SESSION (" & _
                   " S_Usuario_ID," & _
                   " S_Usuario_FK," & _
                   " S_Token," & _
                   " S_Cantidad) VALUES (")
        sql.AppendLine("'" & vp_O_objClass.Name & "',")
        sql.AppendLine("'" & vp_O_objClass.Name & "',")
        sql.AppendLine("'" & vp_O_objClass.Session & "',")
        sql.AppendLine("'" & vp_O_objClass.Cantidad & "' ) ")

        StrQuery = sql.ToString

        Dim vl_S_processSessions As String = conex.StrInsert_and_Update_All(StrQuery)

        Return vl_S_processSessions

    End Function

    ''' <summary>
    ''' traeel usuario de la session activa
    ''' </summary>
    ''' <param name="vp_S_Session"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ValueSession(ByVal vp_S_Session As String)

        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append(" SELECT S_Usuario_ID FROM SESSION " & _
                   " WHERE S_Token = '" & vp_S_Session & "'")

        StrQuery = sql.ToString

        Dim vl_S_valuesSessions As String = ObjValue(StrQuery, conexion)

        Return vl_S_valuesSessions

    End Function

    ''' <summary>
    ''' ELIMINA SESSION ACTIVA AL SALIR
    ''' </summary>
    ''' <param name="vp_S_Session"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function DeleteSession(ByVal vp_S_Session As String)

        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append(" DELETE SESSION " & _
                   " WHERE S_Token = '" & vp_S_Session & "'")

        StrQuery = sql.ToString

        Dim vl_S_processSessions As String = conex.StrInsert_and_Update_All(StrQuery)

        Return vl_S_processSessions

    End Function

    ''' <summary>
    ''' funcion query para la actualizacion de la contrazeña desde el login
    ''' </summary>
    ''' <param name="pl_S_User"></param>
    ''' <param name="pl_S_Password"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_NewPassword(ByVal pl_S_User As String, ByVal pl_S_Password As String)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" UPDATE USUARIOS SET " & _
                   " U_password = '" & pl_S_Password & _
                   "' WHERE  U_Usuario_ID = '" & UCase(pl_S_User) & "'")

        StrQuery = sql.ToString

        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery)

        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion query para la actualizacion de la contraseña desde el panel administrativo
    ''' </summary>
    ''' <param name="pl_obj_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_PasswordADM(ByVal pl_obj_User As LoginClass)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" UPDATE USUARIOS SET " & _
                   " U_password = '" & pl_obj_User.Password & "'" & _
                   " WHERE  U_Usuario_ID = '" & UCase(pl_obj_User.Name) & "'")

        StrQuery = sql.ToString

        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery)

        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion query para la consulta tabla Usuarios para ingreso a la aplicacion
    ''' </summary>
    ''' <param name="vp_S_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllUserLogin(ByVal vp_S_User As String)

        Dim objUser As New LoginClass
        Dim ObjListLogin As New List(Of LoginClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append(" SELECT U_Usuario_ID, U_password, U_Estado, U_Rol_ID, U_Usuario_ID, U_Multi_IP, U_N_Error_Logeo FROM USUARIOS " & _
                                " WHERE U_Usuario_ID = '" & UCase(vp_S_User) & "'")
        StrQuery = sql.ToString

        ObjListLogin = ListLogin(StrQuery, conexion, "login")

        Return ObjListLogin

    End Function

    Public Function Date_User(ByVal vp_S_User As String)

        Dim objUser As New LoginClass
        Dim ObjListLogin As New List(Of LoginClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append(" SELECT U_Nombre, R.R_Descripcion, U_Estado, U_Rol_ID, U_Usuario_ID FROM USUARIOS U " & _
                   " INNER JOIN ROLES R ON R.R_Rol_ID = U.U_Rol_ID " & _
                   " WHERE U_Usuario_ID ='" & vp_S_User & "'")

        StrQuery = sql.ToString

        StrQuery = sql.ToString

        ObjListLogin = ListLogin(StrQuery, conexion, "SA")

        Return ObjListLogin


    End Function

    ''' <summary>
    ''' trae el listado solicitado por login
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <param name="vp_S_TypeTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListLogin(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeTrans As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListLogin As New List(Of LoginClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()
        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objUser As New LoginClass

            If vp_S_TypeTrans = "SA" Then

                'cargamos datos sobre el objeto de user
                objUser.Name = ReadConsulta.GetValue(0)
                objUser.Descrip_Rol = ReadConsulta.GetValue(1)
                objUser.Estado = ReadConsulta.GetValue(2)
                objUser.Rol = ReadConsulta.GetValue(3)
                objUser.NameUser = ReadConsulta.GetValue(4)
            Else
                'cargamos datos sobre el objeto de login
                objUser.Name = ReadConsulta.GetValue(0)
                objUser.Password = ReadConsulta.GetValue(1)
                objUser.Estado = ReadConsulta.GetValue(2)
                objUser.Rol = ReadConsulta.GetValue(3)
                objUser.NameUser = ReadConsulta.GetValue(4)
                objUser.Multi_IP = ReadConsulta.GetValue(5)
                objUser.N_Error_Logeo = ReadConsulta.GetValue(6)

            End If

            'agregamos a la lista
            ObjListLogin.Add(objUser)

        End While
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListLogin
    End Function

    Public Function ObjValue(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim vl_S_User As String = ""

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()
        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            'cargamos datos sobre el objeto de user
            vl_S_User = ReadConsulta.GetString(0)

        End While
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return vl_S_User

    End Function

End Class
