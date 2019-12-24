namespace Gis.ArtMap.Server.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    public abstract class BaseController<TEntity, TService> : ControllerBase
    where TService : IService<TEntity>
    {
        private readonly TService service;

        protected BaseController(TService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IList<TEntity>> Get()
        {
            return await this.service.Get();
        }
    }
}
