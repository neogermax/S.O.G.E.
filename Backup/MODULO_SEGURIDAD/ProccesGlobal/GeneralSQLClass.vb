Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class GeneralSQLClass

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

#End Region

#Region "CONSULTAS"

    ''' <summary>
    ''' funcion generica para hacer el query si esta repetido el ID 
    ''' </summary>
    ''' <param name="vp_S_NameTabla"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadExist(ByVal vp_S_NameTabla As String, ByVal vp_S_Column_ID As String, ByVal vp_S_Column_Name As String, ByVal vp_S_Cap_ID As String, ByVal vp_S_Cap_Name As String, ByVal vp_S_parametro As String)

        Dim StrQuery As String = ""
        Dim Result_ID As String = ""
        Dim Result_Name As String = ""
        Dim Exist = "N"
        Dim conex As New Conector


        Dim sql As New StringBuilder

        sql.AppendLine("SELECT COUNT(1) FROM " & vp_S_NameTabla & _
                       " WHERE " & vp_S_Column_ID & " = '" & vp_S_Cap_ID & "'")
        StrQuery = sql.ToString

        Result_ID = conex.IDis(StrQuery)

        sql = New StringBuilder()

        If vp_S_Column_Name = "" Then

            Result_Name = "0"

        Else

            sql.AppendLine("SELECT COUNT(1) FROM " & vp_S_NameTabla & _
                           " WHERE " & vp_S_Column_Name & " = '" & vp_S_Cap_Name & "'")

            If vp_S_parametro <> "" Then
                sql.AppendLine(" AND OR_Consecutivo ='" & vp_S_parametro & "'")
            End If

            StrQuery = sql.ToString
            Result_Name = conex.IDis(StrQuery)

        End If

        If Result_ID <> 0 Or Result_Name <> 0 Then
            Exist = "S"
        End If

        Return Exist

    End Function

    ''' <summary>
    ''' funcion generica para hacer el query si esta repetido el ID conformadopor varios campos 
    ''' </summary>
    ''' <param name="vp_S_NameTabla"></param>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadExist_VariantKeys(ByVal vp_S_NameTabla As String, ByVal vp_S_Column As String, ByVal vp_S_Column_2 As String, ByVal vp_S_Column_3 As String, ByVal vp_S_ID As String, ByVal vp_S_ID_2 As String, ByVal vp_S_ID_3 As String)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine("SELECT COUNT(1) FROM " & vp_S_NameTabla & _
                      " WHERE " & vp_S_Column & " = '" & vp_S_ID & "' AND " & vp_S_Column_2 & " = '" & vp_S_ID_2 & "'")

        If vp_S_Column_3 <> "" Then
            sql.AppendLine(" AND " & vp_S_Column_3 & " ='" & vp_S_ID_3 & "'")
        End If

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery)

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de campos de CUALQUIER TABLA para armar el droplist
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listdrop(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListDroplist As New List(Of Droplist_Class)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        While ReadConsulta.Read

            Dim objDropList As New Droplist_Class
            'cargamos datos sobre el objeto de login
            objDropList.ID = ReadConsulta.GetValue(0)
            objDropList.descripcion = ReadConsulta.GetValue(1)

            'agregamos a la lista
            ObjListDroplist.Add(objDropList)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' funcion que trae el listado de campos de CUALQUIER TABLA para armar el droplist con variable
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listdropFlex(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListDroplist As New List(Of Droplist_Class)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        While ReadConsulta.Read

            Dim objDropList As New Droplist_Class
            'cargamos datos sobre el objeto de login
            objDropList.ID = ReadConsulta.GetValue(0)
            objDropList.descripcion = ReadConsulta.GetValue(1)
            objDropList.tipo = ReadConsulta.GetValue(2)

            'agregamos a la lista
            ObjListDroplist.Add(objDropList)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListDroplist

    End Function

#End Region

End Class
