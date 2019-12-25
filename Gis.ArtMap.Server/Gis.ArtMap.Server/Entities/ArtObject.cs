namespace Gis.ArtMap.Server.Entities
{
    using System;
    using System.Collections.Generic;

    public class ArtObject
    {
        public ArtObject()
        {
            Photo = new HashSet<Photo>();
            Request = new HashSet<Request>();
        }

        public DateTime CreationDate { get; set; }
        public string Description { get; set; }

        public Guid Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Photo> Photo { get; set; }
        public virtual ICollection<Request> Request { get; set; }
        public int TypeKey { get; set; }

        public virtual ArtObjectType TypeKeyNavigation { get; set; }
    }
}
