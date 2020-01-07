namespace Gis.ArtMap.Server
{
    using System.Text;
    using Microsoft.IdentityModel.Tokens;

    public class AuthOptions
    {
        public const string AUDIENCE = "MyAuthClient"; // потребитель токена
        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const int LIFETIME = 60 * 24; // время жизни токена - 1 сутки
        private const string KEY = "mysupersecret_secretkey!123"; // ключ для шифрации

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
