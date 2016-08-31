Public Class RolClass

#Region "campos"
    Private _Rol_ID As String
    Private _Descripcion As String
    Private _Estado As String
    Private _DescripEstado As String
    Private _FechaActualizacion As String
    Private _Usuario As String

#End Region

#Region "proiedades"
    Public Property Rol_ID() As String
        Get
            Return Me._Rol_ID
        End Get
        Set(ByVal value As String)
            Me._Rol_ID = value
        End Set
    End Property
    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
        End Set
    End Property
    Public Property Estado() As String
        Get
            Return Me._Estado
        End Get
        Set(ByVal value As String)
            Me._Estado = value
        End Set
    End Property
    Public Property DescripEstado() As String
        Get
            Return Me._DescripEstado
        End Get
        Set(ByVal value As String)
            Me._DescripEstado = value
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
