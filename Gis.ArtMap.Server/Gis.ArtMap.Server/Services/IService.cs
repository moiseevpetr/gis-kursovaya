namespace Gis.ArtMap.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IService<T>
    {
        Task Add(T entity);
        Task<IList<T>> Get();
        Task<T> GetById(Guid id);
        Task Update(T entity);
        Task Delete(Guid id);
    }
}