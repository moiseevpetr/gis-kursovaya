namespace Gis.ArtMap.Server.Entities
{
    using System;
    using System.Collections.Generic;

    public class Photo
    {
        public Photo()
        {
            PhotoRequest = new HashSet<PhotoRequest>();
        }

        public virtual ArtObject ArtObject { get; set; }
        public Guid ArtObjectId { get; set; }

        public Guid Id { get; set; }
        public double Index { get; set; }
        public string PhotoPath { get; set; }
        public virtual ICollection<PhotoRequest> PhotoRequest { get; set; }
    }
}
