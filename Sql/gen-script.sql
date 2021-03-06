USE [master]
GO
/****** Object:  Database [ArtMapDb]    Script Date: 08.01.2020 18:21:05 ******/
CREATE DATABASE [ArtMapDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ArtMapDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ArtMapDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ArtMapDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ArtMapDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ArtMapDb] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ArtMapDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ArtMapDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ArtMapDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ArtMapDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ArtMapDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ArtMapDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [ArtMapDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ArtMapDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ArtMapDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ArtMapDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ArtMapDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ArtMapDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ArtMapDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ArtMapDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ArtMapDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ArtMapDb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ArtMapDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ArtMapDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ArtMapDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ArtMapDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ArtMapDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ArtMapDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ArtMapDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ArtMapDb] SET RECOVERY FULL 
GO
ALTER DATABASE [ArtMapDb] SET  MULTI_USER 
GO
ALTER DATABASE [ArtMapDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ArtMapDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ArtMapDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ArtMapDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ArtMapDb] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ArtMapDb', N'ON'
GO
ALTER DATABASE [ArtMapDb] SET QUERY_STORE = OFF
GO
USE [ArtMapDb]
GO
/****** Object:  Table [dbo].[ArtObject]    Script Date: 08.01.2020 18:21:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArtObject](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](128) NOT NULL,
	[Description] [varchar](max) NULL,
	[CreationDate] [datetime] NOT NULL,
	[TypeKey] [int] NOT NULL,
	[Longitude] [float] NOT NULL,
	[Latitude] [float] NOT NULL,
 CONSTRAINT [Unique_Identifier1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ArtObjectType]    Script Date: 08.01.2020 18:21:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArtObjectType](
	[Key] [int] NOT NULL,
	[Name] [varchar](32) NOT NULL,
 CONSTRAINT [Unique_Identifier2] PRIMARY KEY CLUSTERED 
(
	[Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Photo]    Script Date: 08.01.2020 18:21:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Photo](
	[Id] [uniqueidentifier] NOT NULL,
	[PhotoPath] [varchar](256) NOT NULL,
	[ArtObjectId] [uniqueidentifier] NOT NULL,
	[Index] [float] NOT NULL,
 CONSTRAINT [Unique_Identifier3] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhotoRequest]    Script Date: 08.01.2020 18:21:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhotoRequest](
	[Id] [uniqueidentifier] NOT NULL,
	[RequestId] [uniqueidentifier] NOT NULL,
	[PhotoPath] [varchar](256) NULL,
	[PhotoRequestType] [int] NOT NULL,
	[PhotoId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_PhotoRequest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 08.01.2020 18:21:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[Id] [uniqueidentifier] NOT NULL,
	[Reason] [varchar](1024) NOT NULL,
	[ArtObjectId] [uniqueidentifier] NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Date] [datetime] NOT NULL,
	[RequestType] [int] NOT NULL,
	[RequestStatus] [int] NOT NULL,
	[ArtObjectName] [varchar](128) NULL,
	[ArtObjectDescription] [varchar](max) NULL,
	[ArtObjectCreationDate] [datetime] NULL,
	[ArtObjectType] [int] NULL,
	[ArtObjectLongitude] [float] NULL,
	[ArtObjectLatitude] [float] NULL,
 CONSTRAINT [Unique_Identifier6] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 08.01.2020 18:21:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](64) NOT NULL,
	[Email] [varchar](64) NOT NULL,
	[Password] [varchar](64) NOT NULL,
	[UserRole] [int] NOT NULL,
 CONSTRAINT [Unique_Identifier4] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Тип арт-объектов]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Тип арт-объектов] ON [dbo].[ArtObject]
(
	[TypeKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Имеет галерею фото]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Имеет галерею фото] ON [dbo].[Photo]
(
	[ArtObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Relationship2]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Relationship2] ON [dbo].[PhotoRequest]
(
	[RequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Relationship3]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Relationship3] ON [dbo].[PhotoRequest]
(
	[PhotoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Relationship1]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Relationship1] ON [dbo].[Request]
(
	[ArtObjectType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Имеет заявки]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Имеет заявки] ON [dbo].[Request]
(
	[ArtObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Подает заявки]    Script Date: 08.01.2020 18:21:07 ******/
CREATE NONCLUSTERED INDEX [IX_Подает заявки] ON [dbo].[Request]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ArtObject] ADD  CONSTRAINT [DF_ArtObject_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[ArtObject] ADD  CONSTRAINT [DF_ArtObject_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
ALTER TABLE [dbo].[Photo] ADD  CONSTRAINT [DF_Photo_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[PhotoRequest] ADD  CONSTRAINT [DF_PhotoRequest_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Request] ADD  CONSTRAINT [DF_Request_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Request] ADD  CONSTRAINT [DF_Request_Date]  DEFAULT (getdate()) FOR [Date]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[ArtObject]  WITH CHECK ADD  CONSTRAINT [Тип арт-объекта] FOREIGN KEY([TypeKey])
REFERENCES [dbo].[ArtObjectType] ([Key])
GO
ALTER TABLE [dbo].[ArtObject] CHECK CONSTRAINT [Тип арт-объекта]
GO
ALTER TABLE [dbo].[Photo]  WITH CHECK ADD  CONSTRAINT [Имеет галерею фото] FOREIGN KEY([ArtObjectId])
REFERENCES [dbo].[ArtObject] ([Id])
GO
ALTER TABLE [dbo].[Photo] CHECK CONSTRAINT [Имеет галерею фото]
GO
ALTER TABLE [dbo].[PhotoRequest]  WITH CHECK ADD  CONSTRAINT [Имеет заявки на добавление/удаление фото] FOREIGN KEY([RequestId])
REFERENCES [dbo].[Request] ([Id])
GO
ALTER TABLE [dbo].[PhotoRequest] CHECK CONSTRAINT [Имеет заявки на добавление/удаление фото]
GO
ALTER TABLE [dbo].[PhotoRequest]  WITH CHECK ADD  CONSTRAINT [Имеет заявки на удаление] FOREIGN KEY([PhotoId])
REFERENCES [dbo].[Photo] ([Id])
GO
ALTER TABLE [dbo].[PhotoRequest] CHECK CONSTRAINT [Имеет заявки на удаление]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [Имеет заявки] FOREIGN KEY([ArtObjectId])
REFERENCES [dbo].[ArtObject] ([Id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [Имеет заявки]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [Новый тип арт-объекта] FOREIGN KEY([ArtObjectType])
REFERENCES [dbo].[ArtObjectType] ([Key])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [Новый тип арт-объекта]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [Подает заявки] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [Подает заявки]
GO
USE [master]
GO
ALTER DATABASE [ArtMapDb] SET  READ_WRITE 
GO
