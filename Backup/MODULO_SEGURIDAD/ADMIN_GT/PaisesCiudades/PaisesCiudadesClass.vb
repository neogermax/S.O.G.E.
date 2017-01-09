Public Class PaisesCiudadesClass

#Region "campos"
    Private _Proccess As String

    Private _Pais_ID As Integer
    Private _Pais_Nombre As String
    Private _Ciudad_ID As Integer
    Private _Ciudad_Nombre As String
    Private _Cant_Ciudad As Integer

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


    Public Property Pais_ID() As Integer
        Get
            Return Me._Pais_ID
        End Get
        Set(ByVal value As Integer)
            Me._Pais_ID = value
        End Set
    End Property
    Public Property Pais_Nombre() As String
        Get
            Return Me._Pais_Nombre
        End Get
        Set(ByVal value As String)
            Me._Pais_Nombre = value
        End Set
    End Property
    Public Property Ciudad_ID() As Integer
        Get
            Return Me._Ciudad_ID
        End Get
        Set(ByVal value As Integer)
            Me._Ciudad_ID = value
        End Set
    End Property
    Public Property Ciudad_Nombre() As String
        Get
            Return Me._Ciudad_Nombre
        End Get
        Set(ByVal value As String)
            Me._Ciudad_Nombre = value
        End Set
    End Property
    Public Property Cant_Ciudad() As Integer
        Get
            Return Me._Cant_Ciudad
        End Get
        Set(ByVal value As Integer)
            Me._Cant_Ciudad = value
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
