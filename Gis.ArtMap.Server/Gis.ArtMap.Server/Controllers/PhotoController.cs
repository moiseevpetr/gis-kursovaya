namespace Gis.ArtMap.Server.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    [ApiController]
    [Route("[controller]")]
    public class PhotoController : ControllerBase
    {
        private readonly PhotoService photoService;
        
        public PhotoController(PhotoService photoService)
        {
            this.photoService = photoService;
        }
        
        [HttpGet]
        public async Task<IList<Photo>> Get()
        {
            return await photoService.Get();
        }
        
        [HttpPost]
        public async Task Add(Photo photo)
        { 
            await this.photoService.Add(photo);
        }

        [HttpGet("{id:guid}/main")]
        public async Task<Photo> GetById(Guid id)
        {
            return await photoService.GetById(id);
        }
        
        [HttpGet("{id:guid}")]
        public async Task<IList<Photo>> GetAllById(Guid id)
        {
            return await photoService.GetAllById(id);
        }

        [HttpPut]
        public async Task Update(Photo photo)
        {
            await this.photoService.Update(photo);
        }

        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await photoService.Delete(id);
        }
    }
}
