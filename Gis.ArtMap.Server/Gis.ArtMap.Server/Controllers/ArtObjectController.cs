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
    public class ArtObjectController : ControllerBase
    {
        private readonly ArtObjectService artObjectService;

        /// <summary>
        /// Initialize a new instance of the <see cref="ArtObjectController"/> class.
        /// </summary>
        /// <param name="artObjectService">Art object CRUD service.</param>
        public ArtObjectController(ArtObjectService artObjectService)
        {
            this.artObjectService = artObjectService;
        }

        [HttpGet]
        public async Task<IList<ArtObject>> Get()
        {
            return await artObjectService.Get();
        }
        
        [HttpPost]
        public async Task Add(ArtObject artObject)
        { 
            await this.artObjectService.Add(artObject);
        }

        [HttpGet("{id:guid}")]
        public async Task<ArtObject> GetById(Guid id)
        {
            return await artObjectService.GetById(id);
        }

        [HttpPut]
        public async Task Update(ArtObject artObject)
        {
            await this.artObjectService.Update(artObject);
        }

        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await artObjectService.Delete(id);
        }
    }
}
