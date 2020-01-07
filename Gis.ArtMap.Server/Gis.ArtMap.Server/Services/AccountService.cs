﻿namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using Models;

    public class AccountService
    {
        private readonly ArtMapDbContext context;

        public AccountService(ArtMapDbContext context)
        {
            this.context = context;
        }

        public async Task<ResponseToken> GetToken(string username, string password)
        {
            ClaimsIdentity identity = await GetIdentity(username, password);
            if (identity == null)
            {
                return null;
            }

            DateTime now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                AuthOptions.ISSUER,
                AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new ResponseToken(identity.Name, encodedJwt);
        }

        public async Task<User> Register(string name, string password, string email)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Incorrect data");
            }

            User user = await context.User.FirstOrDefaultAsync(x => x.Name == name);

            if (user != null)
            {
                throw new Exception("A user with that name exists");
            }

            user = new User { Email = email, Name = name, Password = password, Id = Guid.NewGuid() };

            try
            {
                await context.User.AddAsync(user);
                await this.context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Db write error.");
            }

            return user;
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            User person = await this.context.User.FirstOrDefaultAsync(x => x.Name == username && x.Password == password);

            if (person == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, person.Name),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, person.UserRole.ToString())
            };

            var claimsIdentity =
                new ClaimsIdentity(claims,
                    "Token",
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
