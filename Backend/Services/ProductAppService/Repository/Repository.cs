using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;
using ProductAppService.Aggregates;

namespace ProductAppService.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ProductsDbContext _context;
        private readonly DbSet<T> _entities;

        public Repository(ProductsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _entities = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _entities.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _entities.SingleOrDefaultAsync(s => s.Id == id);
        }

        public T Add(T entity)
        {
            _entities.Add(entity);
            
            return entity;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync().ConfigureAwait(false) > 0;
        }

        public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }

        public T Update(T entity)
        {                        
            _entities.Update(entity);

            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = _entities.Single(s => s.Id == id);
            _entities.Remove(entity);
            await SaveChangesAsync();
            return true;
        }
    }
}
