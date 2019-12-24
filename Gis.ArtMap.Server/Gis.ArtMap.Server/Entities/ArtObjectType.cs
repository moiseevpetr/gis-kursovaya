namespace Gis.ArtMap.Server.Entities
{
    using System.Collections.Generic;

    public class ArtObjectType
    {
        public ArtObjectType()
        {
            ArtObject = new HashSet<ArtObject>();
            Request = new HashSet<Request>();
        }

        public virtual ICollection<ArtObject> ArtObject { get; set; }

        public int Key { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Request> Request { get; set; }
    }
}
