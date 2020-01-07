namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.EntityFrameworkCore;

    public class RequestService
    {
        private readonly ArtMapDbContext context;

        public RequestService(ArtMapDbContext context)
        {
            this.context = context;
        }

        [Authorize]
        public async Task<ArtObject> Accept(Guid id)
        {
            Request request = await this.context.Request.FirstOrDefaultAsync(x => x.Id == id);

            if (request == null)
            {
                throw new Exception("Request with this id is not exist.");
            }

            try
            {
                await this.context.ArtObject.AddAsync(request.ArtObject);
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Database write error.");
            }

            return await this.context.ArtObject.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Request> Add(Request request)
        {
            if (request == null)
            {
                return null;
            }

            request.Id = Guid.NewGuid();
            await this.context.Request.AddAsync(request);
            await this.context.SaveChangesAsync();

            return await this.context.Request.FirstOrDefaultAsync(x => x.Id == request.Id);
        }

        [Authorize]
        public async Task Decline(Guid id)
        {
            Request existedRequest = await this.context.Request.FirstOrDefaultAsync(x => x.Id == id);

            if (existedRequest == null)
            {
                throw new Exception("Request with this id is not exist.");
            }

            try
            {
                this.context.Request.Remove(existedRequest);
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Database write error");
            }
        }

        public async Task<IList<Request>> Get()
        {
            return await this.context.Request.ToListAsync();
        }

        public async Task<IList<Request>> GetActive()
        {
            return await this.context.Request
                .Include(r => r.User)
                .Where(x => x.RequestStatus == ArtMapConstants.RequestStatusActive).ToListAsync();
        }

        public async Task<Request> GetById(Guid id)
        {
            return await this.context.Request
                .Include(r => r.User)
                .Include(r => r.PhotoRequest)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<Request>> GetByUserId(Guid id)
        {
            return await this.context.Request
                .Where(x => x.UserId == id)
                .ToListAsync();
        }
    }
}
