Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class RolSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Rol parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjList As New List(Of RolClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT R_Rol_ID,R_Descripcion, R_Estado,T.TC_CD_Descripcion, R_FechaCreacion, R_Usuario  FROM ROLES R " & _
                       " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = R.R_Estado WHERE T.TC_CD_Tabla= 'ROLES' ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT R_Rol_ID,R_Descripcion, R_Estado,T.TC_CD_Descripcion, R_FechaCreacion, R_Usuario  FROM ROLES R " & _
                           " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = R.R_Estado WHERE T.TC_CD_Tabla= 'ROLES' ")
            Else
                sql.Append(" SELECT R_Rol_ID,R_Descripcion, R_Estado,T.TC_CD_Descripcion, R_FechaCreacion, R_Usuario  FROM ROLES R " & _
                           " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = R.R_Estado WHERE T.TC_CD_Tabla= 'ROLES' " & _
                           " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjList = list(StrQuery, conexion)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de la nueva Rol (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_Obj As RolClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT ROLES (" & _
            "R_Rol_ID," & _
            "R_Descripcion," & _
            "R_Estado," & _
            "R_FechaCreacion," & _
            "R_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Rol_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.Estado & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion de al Rol (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_Obj As RolClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE ROLES SET " & _
                       " R_Descripcion ='" & vp_Obj.Descripcion & "', " & _
                       " R_Estado ='" & vp_Obj.Estado & "', " & _
                       " R_FechaCreacion ='" & vp_Obj.FechaActualizacion & "', " & _
                       " R_Usuario ='" & vp_Obj.Usuario & "' " & _
                       " WHERE R_Rol_ID = '" & vp_Obj.Rol_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la inactivacion de la Rol (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Inactive(ByVal vp_Obj As RolClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String


        sql.AppendLine("UPDATE ROLES SET R_Estado = '2' WHERE R_ROL_ID = '" & vp_Obj.Rol_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListState(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT TC_CD_ID AS ID, TC_CD_Descripcion AS DESCRIPCION FROM TC_CHARGE_DROPLIST " & _
                   " WHERE TC_CD_Tabla = '" & vp_S_Table & "' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Area para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of RolClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objRol As New RolClass
            'cargamos datos sobre el objeto de login
            objRol.Rol_ID = ReadConsulta.GetValue(0)
            objRol.Descripcion = ReadConsulta.GetValue(1)
            objRol.Estado = ReadConsulta.GetValue(2)
            objRol.DescripEstado = ReadConsulta.GetValue(3)

            objRol.FechaActualizacion = ReadConsulta.GetString(4)
            objRol.Usuario = ReadConsulta.GetString(5)

            'agregamos a la lista
            ObjList.Add(objRol)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
