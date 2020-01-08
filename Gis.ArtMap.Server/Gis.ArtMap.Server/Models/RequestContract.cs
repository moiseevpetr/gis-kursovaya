using System;
using System.Collections.Generic;
using Gis.ArtMap.Server.Entities;

namespace Gis.ArtMap.Server.Models
{
    public class RequestContract
    {
        public RequestContract()
        {
            PhotoRequest = new List<PhotoRequestContract>();
        }
        public DateTime ArtObjectCreationDate { get; set; }
        public string ArtObjectDescription { get; set; }
        public Guid? ArtObjectId { get; set; }
        public double? ArtObjectLatitude { get; set; }
        public double? ArtObjectLongitude { get; set; }
        public string ArtObjectName { get; set; }
        public int? ArtObjectType { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<PhotoRequestContract> PhotoRequest { get; set; }
        public string Reason { get; set; }
        public int RequestStatus { get; set; }
        public int RequestType { get; set; }
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
    }
}