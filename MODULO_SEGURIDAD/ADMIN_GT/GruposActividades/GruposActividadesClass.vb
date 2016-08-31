Public Class GruposActividadesClass

#Region "campos"
    Private _Proccess As String

    Private _Grupo_ID As Integer
    Private _Grupo_Nombre As String
    Private _Actividad_ID As Integer
    Private _Actividad_Nombre As String
    Private _Cant_Actividad As Integer

    Private _FechaActualizacion As String
    Private _Usuario As String
#End Region

#Region "proiedades"
    Public Property Proccess() As String
        Get
            Return Me._Proccess
        End Get
        Set(ByVal value As String)
            Me._Proccess = value
        End Set
    End Property


    Public Property Grupo_ID() As Integer
        Get
            Return Me._Grupo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Grupo_ID = value
        End Set
    End Property
    Public Property Grupo_Nombre() As String
        Get
            Return Me._Grupo_Nombre
        End Get
        Set(ByVal value As String)
            Me._Grupo_Nombre = value
        End Set
    End Property
    Public Property Actividad_ID() As Integer
        Get
            Return Me._Actividad_ID
        End Get
        Set(ByVal value As Integer)
            Me._Actividad_ID = value
        End Set
    End Property
    Public Property Actividad_Nombre() As String
        Get
            Return Me._Actividad_Nombre
        End Get
        Set(ByVal value As String)
            Me._Actividad_Nombre = value
        End Set
    End Property
    Public Property Cant_Actividad() As Integer
        Get
            Return Me._Cant_Actividad
        End Get
        Set(ByVal value As Integer)
            Me._Cant_Actividad = value
        End Set
    End Property

    Public Property FechaActualizacion() As String
        Get
            Return Me._FechaActualizacion
        End Get
        Set(ByVal value As String)
            Me._FechaActualizacion = value
        End Set
    End Property
    Public Property Usuario() As String
        Get
            Return Me._Usuario
        End Get
        Set(ByVal value As String)
            Me._Usuario = value
        End Set
    End Property
#End Region

End Class
