using System;

namespace Gis.ArtMap.Server.Models
{
    public class PhotoRequestContract
    {
        public Guid? PhotoId { get; set; }
        public int PhotoRequestType { get; set; }
        public string PhotoPath { get; set; }
    }
}