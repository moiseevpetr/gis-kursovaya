using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gis.ArtMap.Server.Entities;
using Gis.ArtMap.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Gis.ArtMap.Server.Services
{
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
            Request request = await context.Request
                .Include(r => r.PhotoRequest)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
            {
                throw new Exception("Request with this id is not exist.");
            }

            try
            {
                switch ((RequestType) request.RequestType)
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

                request.RequestStatus = (int) RequestStatus.Accepted;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }

            return await this.context.ArtObject.FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);
        }

        public async Task<Request> Add(RequestContract contract)
        {
            if (contract == null)
            {
                return null;
            }

            var requestId = Guid.NewGuid();
            var request = new Request
            {
                Id = requestId,
                ArtObjectCreationDate = contract.ArtObjectCreationDate,
                ArtObjectDescription = contract.ArtObjectDescription,
                ArtObjectId = contract.ArtObjectId,
                ArtObjectLatitude = contract.ArtObjectLatitude,
                ArtObjectLongitude = contract.ArtObjectLongitude,
                ArtObjectName = contract.ArtObjectName,
                ArtObjectType = contract.ArtObjectType,
                Date = contract.Date,
                Reason = contract.Reason,
                RequestType = contract.RequestType,
                RequestStatus = (int) RequestStatus.Active,
                UserId = contract.UserId
            };

            var photoRequests = new List<PhotoRequest>();
            var photoRequestContracts = contract.PhotoRequest ?? new List<PhotoRequestContract>();
            foreach (var photoRequestContract in photoRequestContracts)
            {
                var photoRequest = new PhotoRequest
                {
                    Id = Guid.NewGuid(),
                    RequestId = requestId,
                    PhotoId = photoRequestContract.PhotoId,
                    PhotoPath = photoRequestContract.PhotoPath,
                    PhotoRequestType = photoRequestContract.PhotoRequestType
                };
                photoRequests.Add(photoRequest);
            }

            await context.Request.AddAsync(request);
            await context.PhotoRequest.AddRangeAsync(photoRequests);
            await context.SaveChangesAsync();

            return await context.Request.FirstOrDefaultAsync(x => x.Id == request.Id);
        }

        [Authorize]
        public async Task Decline(Guid id)
        {
            Request existedRequest = await this.context.Request.FirstOrDefaultAsync(x => x.Id == id);

            if (existedRequest == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            try
            {
                existedRequest.RequestStatus = (int) RequestStatus.Rejected;
                //existedRequest.Reason = reason;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        public async Task<IList<Request>> Get()
        {
            return await context.Request.ToListAsync();
        }

        public async Task<IList<Request>> GetActive()
        {
            return await context.Request
                .Include(r => r.User)
                .Where(r => r.RequestStatus == (int) RequestStatus.Active)
                .OrderByDescending(r => r.Date)
                .ToListAsync();
        }

        public async Task<Request> GetById(Guid id)
        {
            return await context.Request
                .Include(r => r.User)
                .Include(r => r.PhotoRequest)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<Request>> GetByUserId(Guid id)
        {
            return await context.Request
                .Where(x => x.UserId == id)
                .OrderByDescending(r => r.Date)
                .ToListAsync();
        }

        private async Task AddProcess(Request request)
        {
            var objectId = Guid.NewGuid();
            var newObject = new ArtObject
            {
                CreationDate = request.ArtObjectCreationDate,
                Description = request.ArtObjectDescription,
                Id = objectId,
                Latitude = request.ArtObjectLatitude.Value,
                Longitude = request.ArtObjectLongitude.Value,
                Name = request.ArtObjectName,
                TypeKey = (int) request.ArtObjectType,
            };

            var photoRequests = request.PhotoRequest?.ToList() ?? new List<PhotoRequest>();

            var photos = new List<Photo>();
            for (var index = 0; index < photoRequests.Count; index++)
            {
                var photo = new Photo
                {
                    Id = Guid.NewGuid(),
                    ArtObjectId = objectId,
                    Index = index,
                    PhotoPath = photoRequests[index].PhotoPath
                };
                photos.Add(photo);
            }

            try
            {
                await context.ArtObject.AddAsync(newObject);
                await context.Photo.AddRangeAsync(photos);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        private async Task DeleteProcess(Request request)
        {
            ArtObject artObject = await context.ArtObject
                .Include(a => a.Photo)
                .FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);

            if (artObject == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            try
            {
                context.Photo.RemoveRange(artObject.Photo);
                context.ArtObject.Remove(artObject);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ArtMapConstants.DbWriteError);
            }
        }

        private async Task EditProcess(Request request)
        {
            ArtObject artObject = await context.ArtObject
                .Include(a => a.Photo)
                .FirstOrDefaultAsync(x => x.Id == request.ArtObjectId);

            if (artObject == null)
            {
                throw new Exception(ArtMapConstants.EmptyRequest);
            }

            artObject.Name = request.ArtObjectName ?? artObject.Name;
            artObject.Description = request.ArtObjectDescription ?? artObject.Description;
            artObject.Latitude = request.ArtObjectLatitude ?? artObject.Latitude;
            artObject.Longitude = request.ArtObjectLongitude ?? artObject.Longitude;
            artObject.TypeKey = request.ArtObjectType ?? artObject.TypeKey;

            var photoRequests = request.PhotoRequest.ToList();

            var lastIndex = 0.0;
            if (artObject.Photo.Any())
                lastIndex = artObject.Photo
                    .Select(p => p.Index)
                    .Max();
            var addPhotos = new List<Photo>();
            var delPhotos = new List<Photo>();
            foreach (var photoRequest in photoRequests)
                switch (photoRequest.PhotoRequestType)
                {
                    case (int) PhotoRequestType.AddPhoto:
                        var addPhoto = new Photo
                        {
                            Id = Guid.NewGuid(),
                            ArtObjectId = artObject.Id,
                            Index = lastIndex,
                            PhotoPath = photoRequest.PhotoPath
                        };
                        addPhotos.Add(addPhoto);
                        lastIndex++;
                        break;
                    case (int) PhotoRequestType.DeletePhoto:
                        var delPhoto = artObject.Photo
                            .FirstOrDefault(p => p.Id == photoRequest.PhotoId);
                        delPhotos.Add(delPhoto);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }

            await context.Photo.AddRangeAsync(addPhotos);
            context.Photo.RemoveRange(delPhotos);
            context.ArtObject.Update(artObject);

            await context.SaveChangesAsync();
        }
    }
}