namespace Gis.ArtMap.Server.Entities
{
    using System;
    using System.Collections.Generic;

    public class User
    {
        public User()
        {
            Request = new HashSet<Request>();
        }
        
        public string Email { get; set; }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Request> Request { get; set; }
        public int UserRole { get; set; }
    }
}
