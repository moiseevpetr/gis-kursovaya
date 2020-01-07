using Gis.ArtMap.Server.Models;

namespace Gis.ArtMap.Server.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly AccountService accountService;

        public AccountController(AccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("/token")]
        public async Task<IActionResult> GetToken([FromBody] AuthContract request)
        {
            var response = await this.accountService.GetToken(request.Email, request.Password);

            if (response != null)
            {
                return Json(response);
            }

            return BadRequest(new { errorText = "Invalid email or password." });
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterContract request)
        {
            try
            {
                var user = await accountService.Register(request.Name, request.Password, request.Email);
                return Json(user);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
