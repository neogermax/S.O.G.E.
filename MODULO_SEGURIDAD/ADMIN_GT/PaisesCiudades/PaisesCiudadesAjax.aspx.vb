Imports Newtonsoft.Json

Public Class PaisesCiudadesAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Charge_Pais"
                    CargarDroplistPais()

                Case "C_reate"
                    C_reate()

                Case "R_ead"
                    R_ead()

                Case "U_pdate"
                    U_pdate()

                Case "D_elete"
                    D_elete()

                Case "R_ead_Ciudades"
                    R_ead_Country()

            End Select

        End If


    End Sub

#Region "DROP LIST"


    ''' <summary>
    ''' funcion que carga el objeto DDL estado
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplistPais()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropListPaises(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla PaisesCiudades (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub C_reate()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjList As New List(Of PaisesCiudadesClass)
        Dim obj As New PaisesCiudadesClass
        Dim SQL_general As New GeneralSQLClass

        Dim Result As String = ""

        obj.Proccess = Request.Form("proceso")

        If obj.Proccess = "P" Then

            obj.Pais_ID = Request.Form("ID")

            Dim Exist As String = SQL_general.ReadExist("PAISES", "P_ID", "", obj.Pais_ID, "", "")

            If Exist = "N" Then

                obj.Pais_Nombre = UCase(Request.Form("nombre"))
                obj.Usuario = Request.Form("user")
                obj.FechaActualizacion = Date.Now

                ObjList.Add(obj)

                Result = SQL.Insert(obj)
            Else
                Result = "Exist"
            End If

        Else

            obj.Pais_ID = Request.Form("PaisID")
            obj.Ciudad_Nombre = UCase(Request.Form("nombre"))

            Dim Exist As String = SQL_general.ReadExist("CIUDADES", "C_Pais_ID", "C_Nombre", obj.Pais_ID, obj.Ciudad_Nombre, "")

            If Exist = "N" Then

                obj.Usuario = Request.Form("user")
                obj.FechaActualizacion = Date.Now

                ObjList.Add(obj)

                Result = SQL.Insert(obj)
            Else
                Result = "Exist"
            End If

        End If


        Response.Write(Result)

    End Sub

    ''' <summary>
    ''' traemos todos los datos para tabla PaisesCiudades (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub R_ead()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjList As New List(Of PaisesCiudadesClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL.Read_All(vl_S_filtro, vl_S_contenido)

        If ObjList Is Nothing Then

            Dim objPaisesCiudades As New PaisesCiudadesClass
            ObjList = New List(Of PaisesCiudadesClass)

            objPaisesCiudades.Pais_ID = ""
            objPaisesCiudades.FechaActualizacion = ""
            objPaisesCiudades.Usuario = ""

            ObjList.Add(objPaisesCiudades)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla PaisesCiudades (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub U_pdate()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjList As New List(Of PaisesCiudadesClass)
        Dim obj As New PaisesCiudadesClass
        
        Dim Result As String = ""

        obj.Proccess = Request.Form("proceso")

        If obj.Proccess = "P" Then

            obj.Pais_ID = Request.Form("ID")
            obj.Pais_Nombre = UCase(Request.Form("nombre"))
            obj.Usuario = Request.Form("user")
            obj.FechaActualizacion = Date.Now

            ObjList.Add(obj)

        Else

            obj.Ciudad_ID = Request.Form("ID")
            obj.Pais_ID = Request.Form("PaisID")
            obj.Ciudad_Nombre = UCase(Request.Form("nombre"))
            obj.Usuario = Request.Form("user")
            obj.FechaActualizacion = Date.Now

            ObjList.Add(obj)

        End If

        Result = SQL.Update(obj)

        Response.Write(Result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla PaisesCiudades (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub D_elete()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjList As New List(Of PaisesCiudadesClass)
        Dim obj As New PaisesCiudadesClass

        obj.Proccess = Request.Form("proceso")

        If obj.Proccess = "P" Then

            obj.Pais_ID = Request.Form("ID")
            ObjList.Add(obj)

        Else
            obj.Ciudad_ID = Request.Form("ID")
            ObjList.Add(obj)

        End If

        Dim result As String = SQL.Delete(obj)
        Response.Write(result)

    End Sub

    ''' <summary>
    ''' traemos todos los datos para tabla PaisesCiudades (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub R_ead_Country()

        Dim SQL As New PaisesCiudadesSQLClass
        Dim ObjList As New List(Of PaisesCiudadesClass)

        Dim vl_S_ID As String = Request.Form("ID")

        ObjList = SQL.Read_AllCountry(vl_S_ID)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

#End Region

End Class