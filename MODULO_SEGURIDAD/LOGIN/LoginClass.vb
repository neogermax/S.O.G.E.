' se crea clase para mamejar los datos como objetos para manipulacion en la BD 
Public Class LoginClass

#Region "campos"
    Private _Name As String
    Private _Password As String
    Private _Estado As String
    Private _Rol As String
    Private _Session As String
    Private _Cantidad As Integer

    Private _NameUser As String
    Private _Descrip_Rol As String


#End Region

#Region "propiedades"
    Public Property Name() As String
        Get
            Return Me._Name
        End Get
        Set(ByVal value As String)
            Me._Name = value
        End Set
    End Property
    Public Property Password() As String
        Get
            Return Me._Password
        End Get
        Set(ByVal value As String)
            Me._Password = value
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
    Public Property Rol() As String
        Get
            Return Me._Rol
        End Get
        Set(ByVal value As String)
            Me._Rol = value
        End Set
    End Property
    Public Property Session() As String
        Get
            Return Me._Session
        End Get
        Set(ByVal value As String)
            Me._Session = value
        End Set
    End Property
    Public Property Cantidad() As Integer
        Get
            Return Me._Cantidad
        End Get
        Set(ByVal value As Integer)
            Me._Cantidad = value
        End Set
    End Property

    Public Property NameUser() As String
        Get
            Return Me._NameUser
        End Get
        Set(ByVal value As String)
            Me._NameUser = value
        End Set
    End Property
    Public Property Descrip_Rol() As String
        Get
            Return Me._Descrip_Rol
        End Get
        Set(ByVal value As String)
            Me._Descrip_Rol = value
        End Set
    End Property

#End Region

End Class
