Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class GruposActividadesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla GruposActividades parametrizada (READ)
    ''' </summary>
    ''' <param name="vGA_S_Filtro"></param>
    ''' <param name="vGA_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vGA_S_Filtro As String, ByVal vGA_S_Contenido As String)

        Dim ObjList As New List(Of GruposActividadesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        Select Case vGA_S_Filtro

            Case "P"
                If vGA_S_Contenido = "ALL" Then
                    sql.Append(" SELECT GA_ID, GA_Descripcion, GA_FechaCreacion, GA_Usuario, COUNT(AE_GrupoActividad_ID) AS Q_ActividadES FROM GRUPOS_ACTIVIDADES_E P" & _
                               " LEFT JOIN ACTIVIDAD_ECONIMICA C ON C.AE_GrupoActividad_ID =P.GA_ID " & _
                               " GROUP BY GA_ID, GA_Descripcion, GA_FechaCreacion, GA_Usuario, AE_GrupoActividad_ID " & _
                               " ORDER BY GA_Descripcion ASC ")
                Else
                    sql.Append(" SELECT GA_ID, GA_Descripcion, GA_FechaCreacion, GA_Usuario, COUNT(AE_GrupoActividad_ID) AS Q_ActividadES FROM GRUPOS_ACTIVIDADES_E P" & _
                               " LEFT JOIN ACTIVIDAD_ECONIMICA C ON C.AE_GrupoActividad_ID =P.GA_ID " & _
                               " WHERE GA_Descripcion LIKE '%" & vGA_S_Contenido & "%' " & _
                               " GROUP BY GA_ID, GA_Descripcion, GA_FechaCreacion, GA_Usuario, AE_GrupoActividad_ID " & _
                               " ORDER BY GA_Descripcion ASC ")
                End If

            Case "C"
                If vGA_S_Contenido = "ALL" Then
                    sql.Append(" SELECT AE_ID, AE_GrupoActividad_ID ,AE_Descripcion, AE_FechaCreacion, AE_Usuario, GA_Descripcion FROM ACTIVIDAD_ECONIMICA C " & _
                               " INNER JOIN GRUPOS_ACTIVIDADES_E P ON P.GA_ID = C.AE_GrupoActividad_ID " & _
                               " ORDER BY AE_GrupoActividad_ID, AE_Descripcion ASC ")
                Else
                    sql.Append(" SELECT AE_ID, AE_GrupoActividad_ID ,AE_Descripcion, AE_FechaCreacion, AE_Usuario, GA_Descripcion FROM ACTIVIDAD_ECONIMICA C " & _
                               " INNER JOIN GRUPOS_ACTIVIDADES_E P ON P.GA_ID = C.AE_GrupoActividad_ID " & _
                               " WHERE AE_Descripcion LIKE '%" & vGA_S_Contenido & "%' " & _
                               " ORDER BY AE_GrupoActividad_ID, AE_Descripcion ASC ")
                End If
        End Select

        StrQuery = sql.ToString

        ObjList = list(StrQuery, conexion, vGA_S_Filtro)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion del nuevo Grupo (INSERT)
    ''' </summary>
    ''' <param name="vGA_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vGA_Obj As GruposActividadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        If vGA_Obj.Proccess = "P" Then
            sql.AppendLine("INSERT GRUPOS_ACTIVIDADES_E (" & _
                            "GA_Descripcion," & _
                            "GA_FechaCreacion," & _
                            "GA_Usuario" & _
                            ")")
            sql.AppendLine("VALUES (")
            sql.AppendLine("'" & vGA_Obj.Grupo_Nombre & "',")
            sql.AppendLine("'" & vGA_Obj.FechaActualizacion & "',")
            sql.AppendLine("'" & vGA_Obj.Usuario & "' ) ")

        Else
            sql.AppendLine("INSERT INTO ACTIVIDAD_ECONIMICA (" & _
                           "AE_GrupoActividad_ID," & _
                           "AE_Descripcion," & _
                           "AE_FechaCreacion," & _
                           "AE_Usuario" & _
                           ")")
            sql.AppendLine("VALUES (")
            sql.AppendLine("'" & vGA_Obj.Grupo_ID & "',")
            sql.AppendLine("'" & vGA_Obj.Actividad_Nombre & "',")
            sql.AppendLine("'" & vGA_Obj.FechaActualizacion & "',")
            sql.AppendLine("'" & vGA_Obj.Usuario & "' ) ")
        End If

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion de al GruposActividades (UPDATE)
    ''' </summary>
    ''' <param name="vGA_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vGA_Obj As GruposActividadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        If vGA_Obj.Proccess = "P" Then

            sql.AppendLine(" UPDATE GRUPOS_ACTIVIDADES_E SET " & _
                      " GA_Descripcion ='" & vGA_Obj.Grupo_Nombre & "', " & _
                      " GA_FechaCreacion ='" & vGA_Obj.FechaActualizacion & "', " & _
                      " GA_Usuario ='" & vGA_Obj.Usuario & "' " & _
                      " WHERE GA_ID = '" & vGA_Obj.Grupo_ID & "'")
        Else

            sql.AppendLine(" UPDATE ACTIVIDAD_ECONIMICA SET " & _
                      " AE_GrupoActividad_ID ='" & vGA_Obj.Grupo_ID & "', " & _
                      " AE_Descripcion ='" & vGA_Obj.Actividad_Nombre & "', " & _
                      " AE_FechaCreacion ='" & vGA_Obj.FechaActualizacion & "', " & _
                      " AE_Usuario ='" & vGA_Obj.Usuario & "' " & _
                      " WHERE AE_ID = '" & vGA_Obj.Actividad_ID & "'")

        End If

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion de la GruposActividades (DELETE)
    ''' </summary>
    ''' <param name="vGA_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete(ByVal vGA_Obj As GruposActividadesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String

        If vGA_Obj.Proccess = "P" Then
            sql.AppendLine("DELETE GRUPOS_ACTIVIDADES_E WHERE GA_ID = '" & vGA_Obj.Grupo_ID & "'")

        Else
            sql.AppendLine("DELETE ACTIVIDAD_ECONIMICA WHERE AE_ID = '" & vGA_Obj.Actividad_ID & "'")
        End If

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery)

        Return Result

    End Function

    ''' <summary>
    ''' creala consulta para la tabla Actividades dependiendo del Grupo seleccionado (READ)
    ''' </summary>
    ''' <param name="vGA_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCountry(ByVal vGA_S_ID As String)

        Dim ObjList As New List(Of GruposActividadesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT C.AE_Descripcion, P.GA_Descripcion FROM ACTIVIDAD_ECONIMICA C " & _
                    " INNER JOIN GRUPOS_ACTIVIDADES_E P ON C.AE_GrupoActividad_ID = P.GA_ID " & _
                    " WHERE P.GA_ID = '" & vGA_S_ID & "' " & _
                    " ORDER BY AE_Descripcion ASC ")

        StrQuery = sql.ToString

        ObjList = listCountry(StrQuery, conexion)

        Return ObjList

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vGA_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropListGrupo(ByVal vGA_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim SQlGeneral As New GeneralSQLClass

        Dim conexion As String = conex.typeConexion("1")
        Dim sql As New StringBuilder

        sql.Append(" SELECT GA_ID AS ID,GA_Descripcion AS Descripcion FROM " & vGA_S_Table & " ORDER BY GA_Descripcion ASC ")
        StrQuery = sql.ToString

        ObjListDroplist = SQlGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de GruposActividades para armar la tabla
    ''' </summary>
    ''' <param name="vGA_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vGA_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vGA_S_Filtro As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of GruposActividadesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vGA_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objGruposActividades As New GruposActividadesClass
            'cargamos datos sobre el objeto de login

            If vGA_S_Filtro = "P" Then

                objGruposActividades.Grupo_ID = ReadConsulta.GetValue(0)
                objGruposActividades.Grupo_Nombre = ReadConsulta.GetValue(1)
                objGruposActividades.FechaActualizacion = ReadConsulta.GetValue(2)
                objGruposActividades.Usuario = ReadConsulta.GetValue(3)
                objGruposActividades.Cant_Actividad = ReadConsulta.GetValue(4)

            Else

                objGruposActividades.Actividad_ID = ReadConsulta.GetValue(0)
                objGruposActividades.Grupo_ID = ReadConsulta.GetValue(1)
                objGruposActividades.Actividad_Nombre = ReadConsulta.GetValue(2)
                objGruposActividades.FechaActualizacion = ReadConsulta.GetValue(3)
                objGruposActividades.Usuario = ReadConsulta.GetValue(4)
                objGruposActividades.Grupo_Nombre = ReadConsulta.GetValue(5)

            End If

            'agregamos a la lista
            ObjList.Add(objGruposActividades)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que trae el listado de Actividades para armar la tabla
    ''' </summary>
    ''' <param name="vGA_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCountry(ByVal vGA_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of GruposActividadesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vGA_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objGruposActividades As New GruposActividadesClass
            'cargamos datos sobre el objeto de login

            objGruposActividades.Actividad_Nombre = ReadConsulta.GetValue(0)
            objGruposActividades.Grupo_Nombre = ReadConsulta.GetValue(1)

            'agregamos a la lista
            ObjList.Add(objGruposActividades)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
