namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.EntityFrameworkCore;
    using Models;

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
                switch ((RequestType)request.RequestType)
                {
                    case RequestType.AddObject:
                        await AddProcess(request);
                        break;
                    case RequestType.EditObject:
                        await EditProcess(request);
                        break;
                    case RequestType.DeleteObject:
                        await DeleteProcess(request);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }

                request.RequestStatus = (int)RequestStatus.Accepted;
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }

            return await this.context.ArtObject.FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);
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
        public async Task Decline(Guid id, string reason)
        {
            Request existedRequest = await this.context.Request.FirstOrDefaultAsync(x => x.Id == id);

            if (existedRequest == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            try
            {
                existedRequest.RequestStatus = (int)RequestStatus.Rejected;
                existedRequest.Reason = reason;
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        public async Task<IList<Request>> Get()
        {
            return await this.context.Request.ToListAsync();
        }

        public async Task<IList<Request>> GetActive()
        {
            return await this.context.Request.Where(x => x.RequestStatus == ArtMapConstants.RequestStatusActive).ToListAsync();
        }

        public async Task<Request> GetById(Guid id)
        {
            return await this.context.Request.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<Request>> GetByUserId(Guid id)
        {
            return await this.context.Request.Where(x => x.UserId == id)
                .ToListAsync();
        }

        private async Task AddProcess(Request request)
        {
            var newObject = new ArtObject
            {
                CreationDate = DateTime.TryParse(request.ArtObjectCreationDate, out DateTime dT) ? dT : DateTime.Now,
                Description = request.ArtObjectDescription,
                Id = Guid.NewGuid(),
                Latitude = (double)request.ArtObjectLatitude,
                Longitude = (double)request.ArtObjectLongitude,
                Name = request.ArtObjectName,
                Photo = request.PhotoRequest
                    .Where(x => x.PhotoRequestType == (int)PhotoRequestType.AddPhoto)
                    .Select(x => x.Photo)
                    .ToList(),
                Request = new List<Request> { request },
                TypeKey = (int)request.ArtObjectType,
                TypeKeyNavigation = request.ArtObjectTypeNavigation
            };

            try
            {
                await this.context.ArtObject.AddAsync(newObject);
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        private async Task DeleteProcess(Request request)
        {
            ArtObject artObject = await this.context.ArtObject.FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);

            if (artObject == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            try
            {
                this.context.ArtObject.Remove(artObject);
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        private async Task EditProcess(Request request)
        {
            ArtObject artObject = await this.context.ArtObject.FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);

            if (artObject == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            artObject.Name = request.ArtObjectName;
            artObject.Description = request.ArtObjectDescription;
            artObject.Latitude = request.ArtObjectLatitude ?? artObject.Latitude;
            artObject.Longitude = request.ArtObjectLongitude ?? artObject.Longitude;
            artObject.TypeKey = request.ArtObjectType ?? artObject.TypeKey;
            artObject.TypeKeyNavigation = request.ArtObjectTypeNavigation ?? artObject.TypeKeyNavigation;

            await this.context.SaveChangesAsync();
        }
    }
}
