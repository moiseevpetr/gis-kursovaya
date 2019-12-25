namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class ArtObjectService : IService<ArtObject>
    {
        private readonly ArtMapDbContext context;

        /// <summary>
        /// Initialize a new instance if the <see cref="ArtObjectService"/> class.
        /// </summary>
        /// <param name="context"></param>
        public ArtObjectService(ArtMapDbContext context)
        {
            this.context = context;
        }

        public async Task Add(ArtObject photo)
        {
            if (photo == null)
            {
                return;
            }

            photo.Id = photo.Id == default ?
                Guid.NewGuid() : photo.Id;

            await this.context.ArtObject.AddAsync(photo);
            await context.SaveChangesAsync();
        }
        
        public async Task<IList<ArtObject>> Get()
        {
            if (this.context.ArtObject == null)
            {
                return null;
            }

            return await context.ArtObject.ToListAsync();
        }
        public async Task<ArtObject> GetById(Guid id)
        {
            if (id == default)
            {
                return null;
            }

            return await context.ArtObject.FirstOrDefaultAsync(o => o.Id == id);
        }
        
        public async Task Update(ArtObject entity)
        {
            var existedArtObject = await context.ArtObject.FirstOrDefaultAsync(o=> o.Id == entity.Id);
            
            if (existedArtObject == null)
            {
                return;
            }
            
            existedArtObject = entity;
            await context.SaveChangesAsync();
        }
        public async Task Delete(Guid id)
        {
            var removedArtObject = await GetById(id);
            if (removedArtObject == null)
            {
                return;
            }

            context.ArtObject.Remove(removedArtObject);
            await context.SaveChangesAsync();
        }
    }
}
