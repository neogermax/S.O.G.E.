Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class UsuarioSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Usuario parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjList As New List(Of UsuarioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT U.U_Usuario_ID, " & _
                              " R.R_Descripcion, " & _
                              " U.U_Empresa_ID, " & _
                              " U.U_Nombre, " & _
                              " U.U_Documento, " & _
                              " U.U_Direccion, " & _
                              " U.U_Celular, " & _
                              " U.U_Correo, " & _
                              " E.E_Nombre, " & _
                              " T.TC_CD_Descripcion, " & _
                              " U.U_Rol_ID, " & _
                              " U.U_Estado, " & _
                              " U.U_FechaCreacion, " & _
                              " U.U_usuario " & _
                        " FROM USUARIOS U " & _
                        " INNER JOIN EMPRESAS E ON U.U_Empresa_ID = E.E_ID " & _
                        " INNER JOIN ROLES R ON U.U_Rol_ID = R.R_Rol_ID " & _
                        " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = U.U_Estado WHERE T.TC_CD_Tabla= 'USUARIOS' ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT U.U_Usuario_ID, " & _
                              " R.R_Descripcion, " & _
                              " U.U_Empresa_ID, " & _
                              " U.U_Nombre, " & _
                              " U.U_Documento, " & _
                              " U.U_Direccion, " & _
                              " U.U_Celular, " & _
                              " U.U_Correo, " & _
                              " E.E_Nombre, " & _
                              " T.TC_CD_Descripcion, " & _
                              " U.U_Rol_ID, " & _
                              " U.U_Estado, " & _
                              " U.U_FechaCreacion, " & _
                              " U.U_usuario " & _
                        " FROM USUARIOS U " & _
                        " INNER JOIN EMPRESAS E ON U.U_Empresa_ID = E.E_ID " & _
                        " INNER JOIN ROLES R ON U.U_Rol_ID = R.R_Rol_ID " & _
                        " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = U.U_Estado WHERE T.TC_CD_Tabla= 'USUARIOS' ")
            Else
                sql.Append(" SELECT U.U_Usuario_ID, " & _
                              " R.R_Descripcion, " & _
                              " U.U_Empresa_ID, " & _
                              " U.U_Nombre, " & _
                              " U.U_Documento, " & _
                              " U.U_Direccion, " & _
                              " U.U_Celular, " & _
                              " U.U_Correo, " & _
                              " E.E_Nombre, " & _
                              " T.TC_CD_Descripcion, " & _
                              " U.U_Rol_ID, " & _
                              " U.U_Estado, " & _
                              " U.U_FechaCreacion, " & _
                              " U.U_usuario " & _
                        " FROM USUARIOS U " & _
                        " INNER JOIN EMPRESAS E ON U.U_Empresa_ID = E.E_ID " & _
                        " INNER JOIN ROLES R ON U.U_Rol_ID = R.R_Rol_ID " & _
                        " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = U.U_Estado WHERE T.TC_CD_Tabla= 'USUARIOS' " & _
                        " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjList = list(StrQuery, conexion)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de la nueva Usuario (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_Obj As UsuarioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT USUARIOS (" & _
            "U_Usuario_ID," & _
            "U_Empresa_ID," & _
            "U_Rol_ID," & _
            "U_Nombre," & _
            "U_Documento," & _
            "U_Celular," & _
            "U_Direccion," & _
            "U_Correo," & _
            "U_Estado," & _
            "U_password," & _
            "U_FechaCreacion," & _
            "U_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Usuario_ID & "',")
        sql.AppendLine("'" & vp_Obj.Empresa & "',")
        sql.AppendLine("'" & vp_Obj.Rol & "',")
        sql.AppendLine("'" & vp_Obj.Nombre & "',")
        sql.AppendLine("'" & vp_Obj.Documento & "',")
        sql.AppendLine("'" & vp_Obj.Celular & "',")
        sql.AppendLine("'" & vp_Obj.Direccion & "',")
        sql.AppendLine("'" & vp_Obj.Correo & "',")
        sql.AppendLine("'" & vp_Obj.Estado & "',")
        sql.AppendLine("'" & vp_Obj.Paswword & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion de al Usuario (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_Obj As UsuarioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE USUARIOS SET " & _
                       " U_Rol_ID ='" & vp_Obj.Rol & "', " & _
                       " U_Nombre ='" & vp_Obj.Nombre & "', " & _
                       " U_Documento ='" & vp_Obj.Documento & "', " & _
                       " U_Celular ='" & vp_Obj.Celular & "', " & _
                       " U_Direccion ='" & vp_Obj.Direccion & "', " & _
                       " U_Correo ='" & vp_Obj.Correo & "', " & _
                       " U_Estado ='" & vp_Obj.Estado & "', " & _
                       " U_FechaCreacion ='" & vp_Obj.FechaActualizacion & "', " & _
                       " U_Usuario ='" & vp_Obj.Usuario & "' " & _
                       " WHERE U_Usuario_ID = '" & vp_Obj.Usuario_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la inactivacion de la Usuario (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Inactive(ByVal vp_Obj As UsuarioClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String


        sql.AppendLine("UPDATE USUARIOS SET U_Estado = '2' WHERE U_Usuario_ID = '" & vp_Obj.Usuario_ID & "'")
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

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListEmpresa(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT E_ID AS ID,E_Nombre AS descripcion FROM EMPRESAS ")
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Estado"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListRol(ByVal vp_S_Estado As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        If vp_S_Estado = "Super Administrador" Then

            sql.Append(" SELECT R_Rol_ID AS ID, R_Descripcion AS DESCRIPCION FROM ROLES " & _
                       " WHERE R_Rol_ID <> 'S_ADMIN' ")

        Else
            sql.Append(" SELECT R_Rol_ID AS ID, R_Descripcion AS DESCRIPCION FROM ROLES " & _
                      " WHERE R_Rol_ID LIKE '%ADMIN%' ")

        End If
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Usuario para armar la tabla
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

        Dim ObjList As New List(Of UsuarioClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objUsuario As New UsuarioClass
            'cargamos datos sobre el objeto de login
            objUsuario.Usuario_ID = ReadConsulta.GetValue(0)
            objUsuario.DescripRol = ReadConsulta.GetValue(1)
            objUsuario.Empresa = ReadConsulta.GetValue(2)
            objUsuario.Nombre = ReadConsulta.GetValue(3)
            objUsuario.Documento = ReadConsulta.GetValue(4)

            If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objUsuario.Direccion = ReadConsulta.GetValue(5) Else objUsuario.Direccion = " "
            objUsuario.Celular = ReadConsulta.GetValue(6)
            If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objUsuario.Correo = ReadConsulta.GetValue(7) Else objUsuario.Correo = " "

            objUsuario.DescripEmpresa = ReadConsulta.GetValue(8)
            objUsuario.DescripEstado = ReadConsulta.GetValue(9)
            objUsuario.Rol = ReadConsulta.GetValue(10)
            objUsuario.Estado = ReadConsulta.GetValue(11)

            objUsuario.FechaActualizacion = ReadConsulta.GetString(12)
            objUsuario.Usuario = ReadConsulta.GetString(13)

            'agregamos a la lista
            ObjList.Add(objUsuario)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
