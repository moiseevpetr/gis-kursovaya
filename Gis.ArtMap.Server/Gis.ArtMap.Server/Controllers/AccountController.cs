namespace Gis.ArtMap.Server.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Services;

    public class AccountController : Controller
    {
        private readonly AccountService accountService;

        public AccountController(AccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("/token")]
        public async Task<IActionResult> GetToken(string username, string password)
        {
            var response = await this.accountService.GetToken(username, password);

            if (response != null)
            {
                return Json(response);
            }

            return BadRequest(new { errorText = "Invalid username or password." });
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register(string name, string password, string email)
        {
            try
            {
                var user = await accountService.Register(name, password, email);
                return Json(user);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
