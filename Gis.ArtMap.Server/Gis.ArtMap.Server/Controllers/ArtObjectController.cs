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
        private readonly IService<ArtObject> service;

        /// <summary>
        /// Initialize a new instance of the <see cref="ArtObjectController"/> class.
        /// </summary>
        /// <param name="service">Art object CRUD service.</param>
        public ArtObjectController(ArtObjectService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IList<ArtObject>> Get()
        {
            return await this.service.Get();
        }
        
        [HttpPost]
        public async Task Add(ArtObject artObject)
        { 
            await this.service.Add(artObject);
        }

        [HttpGet("{id:guid}")]
        public async Task<ArtObject> GetById(Guid id)
        {
            return await this.service.GetById(id);
        }

        [HttpPut]
        public async Task Update(ArtObject artObject)
        {
            await this.service.Update(artObject);
        }

        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await this.service.Delete(id);
        }
    }
}
