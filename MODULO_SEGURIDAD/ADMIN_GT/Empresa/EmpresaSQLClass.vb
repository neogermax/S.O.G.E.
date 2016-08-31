Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class EmpresaSQLClass
#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla empresa parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjList As New List(Of EmpresaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT E_ID,E_Nombre, E_Nit,E_Direccion, E_Telefono_1, E_Telefono_2, E_Correo,E_Estado, T.TC_CD_Descripcion, E_FechaCreacion,E_usuario FROM EMPRESAS E " & _
                       " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = E.E_Estado WHERE T.TC_CD_Tabla= 'EMPRESAS' ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT E_ID,E_Nombre, E_Nit,E_Direccion, E_Telefono_1, E_Telefono_2, E_Correo,E_Estado, T.TC_CD_Descripcion, E_FechaCreacion,E_usuario FROM EMPRESAS E " & _
                       " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = E.E_Estado WHERE T.TC_CD_Tabla= 'EMPRESAS' ")
            Else
                sql.Append(" SELECT E_ID,E_Nombre, E_Nit,E_Direccion, E_Telefono_1, E_Telefono_2, E_Correo,E_Estado, T.TC_CD_Descripcion, E_FechaCreacion,E_usuario FROM EMPRESAS E " & _
                    " INNER JOIN TC_CHARGE_DROPLIST T ON T.TC_CD_ID = E.E_Estado WHERE T.TC_CD_Tabla= 'EMPRESAS' " & _
                    " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjList = list(StrQuery, conexion)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de la nueva empresa (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_Obj As EmpresaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INTO EMPRESAS (" & _
            "E_Nombre," & _
            "E_Nit," & _
            "E_Direccion," & _
            "E_Telefono_1," & _
            "E_Telefono_2," & _
            "E_Correo," & _
            "E_Estado," & _
            "E_FechaCreacion," & _
            "E_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nombre & "',")
        sql.AppendLine("'" & vp_Obj.Nit & "',")
        sql.AppendLine("'" & vp_Obj.Direccion & "',")
        sql.AppendLine("'" & vp_Obj.Telefono_1 & "',")
        sql.AppendLine("'" & vp_Obj.Telefono_2 & "',")
        sql.AppendLine("'" & vp_Obj.Correo & "',")
        sql.AppendLine("'" & vp_Obj.Estado & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion de al empresa (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_Obj As EmpresaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE EMPRESAS SET " & _
                       " E_Nombre ='" & vp_Obj.Nombre & "', " & _
                       " E_Nit ='" & vp_Obj.Nit & "', " & _
                       " E_Direccion ='" & vp_Obj.Direccion & "', " & _
                       " E_Telefono_1 ='" & vp_Obj.Telefono_1 & "', " & _
                       " E_Telefono_2 ='" & vp_Obj.Telefono_2 & "', " & _
                       " E_Correo ='" & vp_Obj.Correo & "', " & _
                       " E_Estado ='" & vp_Obj.Estado & "', " & _
                       " E_FechaCreacion ='" & vp_Obj.FechaActualizacion & "', " & _
                       " E_Usuario ='" & vp_Obj.Usuario & "' " & _
                       " WHERE E_ID = '" & vp_Obj.ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la inactivacion de la Empresa (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Inactive(ByVal vp_Obj As EmpresaClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String


        sql.AppendLine("UPDATE EMPRESAS SET E_Estado = '2' WHERE E_ID = '" & vp_Obj.ID & "'")
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

        Dim Conexion As String = conex.typeConexion("1")
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

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID_Pais"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListCiudades(ByVal vp_S_ID_Pais As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT C.C_ID AS ID,C.C_Nombre AS Descripcion FROM CIUDADES C " & _
                   " INNER JOIN PAISES P ON P.P_ID = C.C_Pais_ID " & _
                   " WHERE P.P_ID = '" & vp_S_ID_Pais & "'" & _
                   " ORDER BY C_Nombre ASC ")
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
    Public Function ReadCharge_DropListGrupo(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT GA_ID AS ID,GA_Descripcion AS Descripcion FROM " & vp_S_Table & " ORDER BY GA_Descripcion ASC ")
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID_Pais"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListActividad(ByVal vp_S_ID_Pais As String, ByVal vp_S_Type As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT AE_ID AS ID,AE_Descripcion AS Descripcion  FROM ACTIVIDAD_ECONIMICA ")

        If vp_S_Type = 2 Then
            sql.Append(" WHERE AE_GrupoActividad_ID = '" & vp_S_ID_Pais & "'" & " ORDER BY AE_Descripcion ASC ")
        End If

        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Empresa para armar la tabla
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

        Dim ObjList As New List(Of EmpresaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objEmpresa As New EmpresaClass
            'cargamos datos sobre el objeto de login
            objEmpresa.ID = ReadConsulta.GetValue(0)
            objEmpresa.Nombre = ReadConsulta.GetValue(1)

            objEmpresa.Nit = ReadConsulta.GetValue(2)
            objEmpresa.Direccion = ReadConsulta.GetValue(3)
            objEmpresa.Telefono_1 = ReadConsulta.GetValue(4)
            objEmpresa.Telefono_2 = ReadConsulta.GetValue(5)
            objEmpresa.Correo = ReadConsulta.GetValue(6)
            objEmpresa.Estado = ReadConsulta.GetValue(7)
            objEmpresa.DescripEstado = ReadConsulta.GetValue(8)

            objEmpresa.FechaActualizacion = ReadConsulta.GetString(9)
            objEmpresa.Usuario = ReadConsulta.GetString(10)

            'agregamos a la lista
            ObjList.Add(objEmpresa)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
