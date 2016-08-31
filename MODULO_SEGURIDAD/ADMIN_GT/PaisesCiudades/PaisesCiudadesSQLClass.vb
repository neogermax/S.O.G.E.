Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class PaisesCiudadesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla PaisesCiudades parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Contenido As String)

        Dim ObjList As New List(Of PaisesCiudadesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        Select Case vp_S_Filtro

            Case "P"
                If vp_S_Contenido = "ALL" Then
                    sql.Append(" SELECT P_ID, P_Nombre, P_FechaCreacion, P_Usuario, COUNT(C_Pais_ID) AS Q_CIUDADES FROM PAISES P " & _
                               " LEFT JOIN CIUDADES C ON C.C_Pais_ID =P.P_ID " & _
                               " GROUP BY P_ID, P_Nombre, P_FechaCreacion, P_Usuario, C_Pais_ID " & _
                               " ORDER BY P_Nombre ASC ")
                Else
                    sql.Append(" SELECT P_ID, P_Nombre, P_FechaCreacion, P_Usuario, COUNT(C_Pais_ID) AS Q_CIUDADES FROM PAISES P " & _
                               " LEFT JOIN CIUDADES C ON C.C_Pais_ID =P.P_ID " & _
                               " WHERE P_Nombre LIKE '%" & vp_S_Contenido & "%' " & _
                               " GROUP BY P_ID, P_Nombre, P_FechaCreacion, P_Usuario, C_Pais_ID " & _
                               " ORDER BY P_Nombre ASC ")
                End If

            Case "C"
                If vp_S_Contenido = "ALL" Then
                    sql.Append(" SELECT C_ID, C_Pais_ID ,C_Nombre, C_FechaCreacion, C_Usuario, P_Nombre FROM CIUDADES C " & _
                               " INNER JOIN PAISES P ON P.P_ID = C.C_Pais_ID " & _
                               " ORDER BY C_Pais_ID, C_Nombre ASC ")
                Else
                    sql.Append(" SELECT C_ID, C_Pais_ID ,C_Nombre, C_FechaCreacion, C_Usuario, P_Nombre FROM CIUDADES C " & _
                               " INNER JOIN PAISES P ON P.P_ID = C.C_Pais_ID " & _
                               " WHERE C_Nombre LIKE '%" & vp_S_Contenido & "%' " & _
                               " ORDER BY C_Pais_ID, C_Nombre ASC ")
                End If
        End Select

        StrQuery = sql.ToString

        ObjList = list(StrQuery, conexion, vp_S_Filtro)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion del nuevo Pais (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_Obj As PaisesCiudadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        If vp_Obj.Proccess = "P" Then
            sql.AppendLine("INSERT PAISES (" & _
                            "P_ID," & _
                            "P_Nombre," & _
                            "P_FechaCreacion," & _
                            "P_Usuario" & _
                            ")")
            sql.AppendLine("VALUES (")
            sql.AppendLine("'" & vp_Obj.Pais_ID & "',")
            sql.AppendLine("'" & vp_Obj.Pais_Nombre & "',")
            sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
            sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")

        Else
            sql.AppendLine("INSERT INTO CIUDADES (" & _
                           "C_Pais_ID," & _
                           "C_Nombre," & _
                           "C_FechaCreacion," & _
                           "C_Usuario" & _
                           ")")
            sql.AppendLine("VALUES (")
            sql.AppendLine("'" & vp_Obj.Pais_ID & "',")
            sql.AppendLine("'" & vp_Obj.Ciudad_Nombre & "',")
            sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
            sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")
        End If

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion de al PaisesCiudades (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_Obj As PaisesCiudadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        If vp_Obj.Proccess = "P" Then

            sql.AppendLine(" UPDATE PAISES SET " & _
                      " P_Nombre ='" & vp_Obj.Pais_Nombre & "', " & _
                      " P_FechaCreacion ='" & vp_Obj.FechaActualizacion & "', " & _
                      " P_Usuario ='" & vp_Obj.Usuario & "' " & _
                      " WHERE P_ID = '" & vp_Obj.Pais_ID & "'")
        Else

            sql.AppendLine(" UPDATE CIUDADES SET " & _
                      " C_Pais_ID ='" & vp_Obj.Pais_ID & "', " & _
                      " C_Nombre ='" & vp_Obj.Ciudad_Nombre & "', " & _
                      " C_FechaCreacion ='" & vp_Obj.FechaActualizacion & "', " & _
                      " C_Usuario ='" & vp_Obj.Usuario & "' " & _
                      " WHERE C_ID = '" & vp_Obj.Ciudad_ID & "'")

        End If

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion de la paisesciudades (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete(ByVal vp_Obj As PaisesCiudadesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String

        If vp_Obj.Proccess = "P" Then
            sql.AppendLine("DELETE PAISES WHERE P_ID = '" & vp_Obj.Pais_ID & "'")

        Else
            sql.AppendLine("DELETE CIUDADES WHERE C_ID = '" & vp_Obj.Ciudad_ID & "'")
        End If

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' creala consulta para la tabla Ciudades dependiendo del pais seleccionado (READ)
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCountry(ByVal vp_S_ID As String)

        Dim ObjList As New List(Of PaisesCiudadesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT C.C_Nombre, P.P_Nombre FROM CIUDADES C " & _
                    " INNER JOIN PAISES P ON C.C_Pais_ID = P.P_ID " & _
                    " WHERE P.P_ID = '" & vp_S_ID & "' " & _
                    " ORDER BY C_Nombre ASC ")

        StrQuery = sql.ToString

        ObjList = listCountry(StrQuery, conexion)

        Return ObjList

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListPaises(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT P_ID AS ID,P_Nombre AS Descripcion FROM " & vp_S_Table & " ORDER BY P_Nombre ASC ")
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de PaisesCiudades para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Filtro As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of PaisesCiudadesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objPaisesCiudades As New PaisesCiudadesClass
            'cargamos datos sobre el objeto de login

            If vp_S_Filtro = "P" Then

                objPaisesCiudades.Pais_ID = ReadConsulta.GetValue(0)
                objPaisesCiudades.Pais_Nombre = ReadConsulta.GetValue(1)
                objPaisesCiudades.FechaActualizacion = ReadConsulta.GetValue(2)
                objPaisesCiudades.Usuario = ReadConsulta.GetValue(3)
                objPaisesCiudades.Cant_Ciudad = ReadConsulta.GetValue(4)

            Else

                objPaisesCiudades.Ciudad_ID = ReadConsulta.GetValue(0)
                objPaisesCiudades.Pais_ID = ReadConsulta.GetValue(1)
                objPaisesCiudades.Ciudad_Nombre = ReadConsulta.GetValue(2)
                objPaisesCiudades.FechaActualizacion = ReadConsulta.GetValue(3)
                objPaisesCiudades.Usuario = ReadConsulta.GetValue(4)
                objPaisesCiudades.Pais_Nombre = ReadConsulta.GetValue(5)

            End If

            'agregamos a la lista
            ObjList.Add(objPaisesCiudades)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que trae el listado de Ciudades para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCountry(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of PaisesCiudadesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objPaisesCiudades As New PaisesCiudadesClass
            'cargamos datos sobre el objeto de login

            objPaisesCiudades.Ciudad_Nombre = ReadConsulta.GetValue(0)
            objPaisesCiudades.Pais_Nombre = ReadConsulta.GetValue(1)

            'agregamos a la lista
            ObjList.Add(objPaisesCiudades)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
