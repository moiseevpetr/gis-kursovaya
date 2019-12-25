namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class PhotoService : IService<Photo>
    {
        private readonly ArtMapDbContext context;

        public PhotoService(ArtMapDbContext context)
        {
            this.context = context;
        }

        public async Task Add(Photo photo)
        {
            if (photo == null)
            {
                return;
            }

            photo.Id = photo.Id == default ? Guid.NewGuid() : photo.Id;

            await this.context.Photo.AddAsync(photo);
            await this.context.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            Photo removedArtObject = await GetById(id);
            if (removedArtObject == null)
            {
                return;
            }

            this.context.Photo.Remove(removedArtObject);
            await this.context.SaveChangesAsync();
        }

        public async Task<IList<Photo>> Get()
        {
            if (this.context.ArtObject == null)
            {
                return null;
            }

            return await this.context.Photo.ToListAsync();
        }

        public async Task<IList<Photo>> GetAllById(Guid id)
        {
            if (id == default)
            {
                return null;
            }
            
            var artObject = await this.context.ArtObject
                .FirstOrDefaultAsync(o => o.Id == id);

            return artObject?.Photo.ToList();
        }

        public async Task<Photo> GetById(Guid id)
        {
            if (id == default)
            {
                return null;
            }
            
            var artObject = await this.context.ArtObject
                .FirstOrDefaultAsync(o => o.Id == id);

            return artObject?.Photo
                .OrderBy(p => p.Id)
                .FirstOrDefault();
        }

        public async Task Update(Photo entity)
        {
            Photo existed = await this.context.Photo.FirstOrDefaultAsync(o => o.Id == entity.Id);

            if (existed == null)
            {
                return;
            }

            existed = entity;
            await this.context.SaveChangesAsync();
        }
    }
}
