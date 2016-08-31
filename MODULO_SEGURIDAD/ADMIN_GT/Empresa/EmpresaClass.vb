Public Class EmpresaClass

#Region "campos"
    Private _ID As Integer
    Private _Nombre As String
    Private _Nit As String
    Private _Direccion As String
    Private _Telefono_1 As String
    Private _Telefono_2 As String
    Private _Correo As String
    Private _Estado As String
    Private _DescripEstado As String
    Private _FechaActualizacion As String
    Private _Usuario As String
#End Region

#Region "proiedades"
    Public Property ID() As Integer
        Get
            Return Me._ID
        End Get
        Set(ByVal value As Integer)
            Me._ID = value
        End Set
    End Property
    Public Property Nombre() As String
        Get
            Return Me._Nombre
        End Get
        Set(ByVal value As String)
            Me._Nombre = value
        End Set
    End Property
    Public Property Nit() As String
        Get
            Return Me._Nit
        End Get
        Set(ByVal value As String)
            Me._Nit = value
        End Set
    End Property
    Public Property Direccion() As String
        Get
            Return Me._Direccion
        End Get
        Set(ByVal value As String)
            Me._Direccion = value
        End Set
    End Property
    Public Property Telefono_1() As String
        Get
            Return Me._Telefono_1
        End Get
        Set(ByVal value As String)
            Me._Telefono_1 = value
        End Set
    End Property
    Public Property Telefono_2() As String
        Get
            Return Me._Telefono_2
        End Get
        Set(ByVal value As String)
            Me._Telefono_2 = value
        End Set
    End Property
    Public Property Correo() As String
        Get
            Return Me._Correo
        End Get
        Set(ByVal value As String)
            Me._Correo = value
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
