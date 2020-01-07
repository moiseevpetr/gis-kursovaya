namespace Gis.ArtMap.Server.Models
{
    public class ResponseToken
    {
        public ResponseToken(string userName, string accessToken)
        {
            UserName = userName;
            AccessToken = accessToken;
        }

        public string AccessToken { get; }
        public string UserName { get; }
    }
}
