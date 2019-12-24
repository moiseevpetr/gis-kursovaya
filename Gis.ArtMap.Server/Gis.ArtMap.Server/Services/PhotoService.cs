namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
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
        
        public async Task Add(Photo entity)
        {
            if (entity == null)
            {
                return;
            }

            entity.Id = entity.Id == default ?
                Guid.NewGuid() : entity.Id;

            await this.context.Photo.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IList<Photo>> Get()
        {
            if (this.context.ArtObject == null)
            {
                return null;
            }

            return await context.Photo.ToListAsync();
        }

        public async Task<Photo> GetById(Guid id)
        {
            if (id == default)
            {
                return null;
            }

            return await context.Photo.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task Update(Photo entity)
        {
            var existed = await context.Photo.FirstOrDefaultAsync(o=> o.Id == entity.Id);
            
            if (existed == null)
            {
                return;
            }
            
            existed = entity;
            await context.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var removedArtObject = await GetById(id);
            if (removedArtObject == null)
            {
                return;
            }

            context.Photo.Remove(removedArtObject);
            await context.SaveChangesAsync();
        }
    }
}
