using ProductAppService.Aggregates;
using System.Linq.Expressions;

namespace ProductAppService.Repository
{
    public interface IRepository<T>
        where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        T Add(T entity);
        T Update(T entity);
        Task<bool> DeleteAsync(int id);
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> predicate);
    }
}