namespace Gis.ArtMap.Server.Entities
{
    using System;

    public class PhotoRequest
    {
        public Guid Id { get; set; }

        public virtual Photo Photo { get; set; }
        public Guid? PhotoId { get; set; }
        public int PhotoRequestType { get; set; }
        public string PthotoPath { get; set; }
        public virtual Request Request { get; set; }
        public Guid RequestId { get; set; }
    }
}
