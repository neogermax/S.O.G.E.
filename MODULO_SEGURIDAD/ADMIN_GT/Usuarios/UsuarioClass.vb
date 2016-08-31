Public Class UsuarioClass

#Region "campos"

    Private _Usuario_ID As String
    Private _Paswword As String
    Private _Empresa As Integer
    Private _Rol As String

    Private _Nombre As String
    Private _Documento As Long
    Private _Celular As String
    Private _Correo As String
    Private _Direccion As String

    Private _Estado As String
    Private _DescripEstado As String
    Private _DescripEmpresa As String
    Private _DescripRol As String

    Private _FechaActualizacion As String
    Private _Usuario As String

#End Region

#Region "proiedades"

    Public Property Usuario_ID() As String
        Get
            Return Me._Usuario_ID
        End Get
        Set(ByVal value As String)
            Me._Usuario_ID = value
        End Set
    End Property
    Public Property Paswword() As String
        Get
            Return Me._Paswword
        End Get
        Set(ByVal value As String)
            Me._Paswword = value
        End Set
    End Property
    Public Property Empresa() As Integer
        Get
            Return Me._Empresa
        End Get
        Set(ByVal value As Integer)
            Me._Empresa = value
        End Set
    End Property
    Public Property Rol() As String
        Get
            Return Me._Rol
        End Get
        Set(ByVal value As String)
            Me._Rol = value
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
    Public Property Documento() As Long
        Get
            Return Me._Documento
        End Get
        Set(ByVal value As Long)
            Me._Documento = value
        End Set
    End Property
    Public Property Celular() As String
        Get
            Return Me._Celular
        End Get
        Set(ByVal value As String)
            Me._Celular = value
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
    Public Property Direccion() As String
        Get
            Return Me._Direccion
        End Get
        Set(ByVal value As String)
            Me._Direccion = value
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
    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
    Public Property DescripRol() As String
        Get
            Return Me._DescripRol
        End Get
        Set(ByVal value As String)
            Me._DescripRol = value
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
