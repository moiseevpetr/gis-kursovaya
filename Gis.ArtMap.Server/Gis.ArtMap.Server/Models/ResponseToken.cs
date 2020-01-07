using System;

namespace Gis.ArtMap.Server.Models
{
    public class ResponseToken
    {
        public ResponseToken(Guid userId, string userName, string email, int userRole, string accessToken)
        {
            UserId = userId;
            UserName = userName;
            Email = email;
            UserRole = userRole;
            AccessToken = accessToken;
        }

        public string AccessToken { get; }
        public Guid UserId { get; }
        public string UserName { get; }
        public string Email { get; }
        public int UserRole { get; }
    }
}