namespace Gis.ArtMap.Server.Entities
{
    using System;
    using Microsoft.EntityFrameworkCore;

    public class ArtMapDbContext : DbContext
    {
        public ArtMapDbContext(DbContextOptions<ArtMapDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<ArtObject> ArtObject { get; set; }
        public virtual DbSet<ArtObjectType> ArtObjectType { get; set; }
        public virtual DbSet<Photo> Photo { get; set; }
        public virtual DbSet<PhotoRequest> PhotoRequest { get; set; }
        public virtual DbSet<Request> Request { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArtObject>(entity =>
            {
                entity.HasIndex(e => e.TypeKey)
                    .HasName("IX_Тип арт-объектов");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.HasOne(d => d.TypeKeyNavigation)
                    .WithMany(p => p.ArtObject)
                    .HasForeignKey(d => d.TypeKey)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Тип арт-объекта");
            });

            modelBuilder.Entity<ArtObjectType>(entity =>
            {
                entity.HasKey(e => e.Key)
                    .HasName("Unique_Identifier2");

                entity.Property(e => e.Key).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.HasIndex(e => e.ArtObjectId)
                    .HasName("IX_Имеет галерею фото");
            
                entity.Property(e => e.Id).ValueGeneratedNever();
            
                entity.Property(e => e.PhotoPath)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);
            
                entity.HasOne(d => d.ArtObject)
                    .WithMany(p => p.Photo)
                    .HasForeignKey(d => d.ArtObjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Имеет галерею фото");
            });
            
            
             modelBuilder.Entity<PhotoRequest>(entity =>
             {
                 entity.HasIndex(e => e.PhotoId)
                     .HasName("IX_Relationship3");
            
                 entity.HasIndex(e => e.RequestId)
                     .HasName("IX_Relationship2");
            
                 entity.Property(e => e.Id).ValueGeneratedNever();
            
                 entity.Property(e => e.PhotoPath)
                     .HasMaxLength(256)
                     .IsUnicode(false);
            
                 entity.HasOne(d => d.Photo)
                     .WithMany(p => p.PhotoRequest)
                     .HasForeignKey(d => d.PhotoId)
                     .HasConstraintName("Имеет заявки на удаление");
            
                 entity.HasOne(d => d.Request)
                     .WithMany(p => p.PhotoRequest)
                     .HasForeignKey(d => d.RequestId)
                     .OnDelete(DeleteBehavior.ClientSetNull)
                     .HasConstraintName("Имеет заявки на добавление/удаление фото");
             });
            
             modelBuilder.Entity<Request>(entity =>
             {
                 entity.HasIndex(e => e.ArtObjectId)
                     .HasName("IX_Имеет заявки");
            
                 entity.HasIndex(e => e.ArtObjectType)
                     .HasName("IX_Relationship1");
            
                 entity.HasIndex(e => e.UserId)
                     .HasName("IX_Подает заявки");
            
                 entity.Property(e => e.Id).ValueGeneratedNever();
            
                 entity.Property(e => e.ArtObjectCreationDate)
                     .HasColumnType("datetime");
            
                 entity.Property(e => e.ArtObjectDescription).IsUnicode(false);
            
                 entity.Property(e => e.ArtObjectName)
                     .HasMaxLength(128)
                     .IsUnicode(false);
            
                 entity.Property(e => e.Date).HasColumnType("datetime");
            
                 entity.Property(e => e.Reason)
                     .IsRequired()
                     .HasMaxLength(1024)
                     .IsUnicode(false);
            
                 entity.HasOne(d => d.ArtObject)
                     .WithMany(p => p.Request)
                     .HasForeignKey(d => d.ArtObjectId)
                     .HasConstraintName("Имеет заявки");
            
                 entity.HasOne(d => d.ArtObjectTypeNavigation)
                     .WithMany(p => p.Request)
                     .HasForeignKey(d => d.ArtObjectType)
                     .HasConstraintName("Новый тип арт-объекта");
            
                 entity.HasOne(d => d.User)
                     .WithMany(p => p.Request)
                     .HasForeignKey(d => d.UserId)
                     .OnDelete(DeleteBehavior.ClientSetNull)
                     .HasConstraintName("Подает заявки");
             });
            
             modelBuilder.Entity<User>(entity =>
             {
                 entity.Property(e => e.Id).ValueGeneratedNever();
            
                 entity.Property(e => e.Email)
                     .IsRequired()
                     .HasMaxLength(64)
                     .IsUnicode(false);
            
                 entity.Property(e => e.Name)
                     .IsRequired()
                     .HasMaxLength(64)
                     .IsUnicode(false);
            
                 entity.Property(e => e.Password)
                     .IsRequired()
                     .HasMaxLength(64)
                     .IsUnicode(false);
             });

            //OnModelCreatingPartial(modelBuilder);
        }

        /*private void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            throw new NotImplementedException();
        }*/
    }
}
