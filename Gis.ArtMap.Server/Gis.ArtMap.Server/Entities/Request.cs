namespace Gis.ArtMap.Server.Entities
{
    using System;
    using System.Collections.Generic;

    public class Request
    {
        public Request()
        {
            PhotoRequest = new HashSet<PhotoRequest>();
        }

        public virtual ArtObject ArtObject { get; set; }
        public string ArtObjectCreationDate { get; set; }
        public string ArtObjectDescription { get; set; }
        public Guid? ArtObjectId { get; set; }
        public double? ArtObjectLatitude { get; set; }
        public double? ArtObjectLongitude { get; set; }
        public string ArtObjectName { get; set; }
        public int? ArtObjectType { get; set; }
        public virtual ArtObjectType ArtObjectTypeNavigation { get; set; }
        public DateTime Date { get; set; }

        public Guid Id { get; set; }
        public virtual ICollection<PhotoRequest> PhotoRequest { get; set; }
        public string Reason { get; set; }
        public int RequestStatus { get; set; }
        public int RequestType { get; set; }
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
    }
}
