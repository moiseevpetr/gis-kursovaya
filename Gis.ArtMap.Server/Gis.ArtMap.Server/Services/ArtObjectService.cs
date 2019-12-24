namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class ArtObjectService
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

        public async Task Add(ArtObject artObject)
        {
            if (artObject == null)
            {
                return;
            }

            artObject.Id = artObject.Id == default ?
                Guid.NewGuid() : artObject.Id;

            await this.context.ArtObject.AddAsync(artObject);
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
        public async Task Update(ArtObject artObject)
        {
            var existedArtObject = await context.ArtObject.FirstOrDefaultAsync(o=> o.Id == artObject.Id);
            
            if (existedArtObject == null)
            {
                return;
            }
            
            existedArtObject = artObject;
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
