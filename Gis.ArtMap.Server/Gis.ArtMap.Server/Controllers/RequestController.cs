using Gis.ArtMap.Server.Models;

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
    public class RequestController : Controller
    {
        private readonly RequestService requestService;

        public RequestController(RequestService requestService)
        {
            this.requestService = requestService;
        }

        [HttpGet("{id:guid}/accept")]
        public async Task<IActionResult> Accept(Guid id)
        {
            try
            {
                return Json(await this.requestService.Accept(id));
            }
            catch (Exception exception)
            {
                return BadRequest(new { errorText = exception.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddRequest(RequestContract request)
        {
            return Json(await this.requestService.Add(request));
        }

        [HttpGet("{id:guid}/decline")]
        public async Task<IActionResult> Decline(Guid id)
        {
            try
            {
                await this.requestService.Decline(id);
                return StatusCode(200);
            }
            catch (Exception exception)
            {
                return BadRequest(new { errorText = exception.Message });
            }
        }

        [HttpGet]
        public async Task<IList<Request>> Get()
        {
            return await this.requestService.Get();
        }

        [HttpGet("active")]
        public async Task<IList<Request>> GetActiveRequests()
        {
            return await this.requestService.GetActive();
        }

        [HttpGet("{id:guid}")]
        public async Task<Request> GetRequestById(Guid id)
        {
            return await this.requestService.GetById(id);
        }

        [HttpGet("user/{id:guid}")]
        public async Task<IList<Request>> GetRequestsByUserId(Guid id)
        {
            return await this.requestService.GetByUserId(id);
        }
    }
}
