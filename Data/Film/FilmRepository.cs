using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using filmstudion_Justice3000.Database;
using filmstudion_Justice3000.Entities;

namespace filmstudion_Justice3000.Data
{
    public class FilmRepository : IFilmRepository
    {
        private readonly DatabaseContext _db;

        public FilmRepository(DatabaseContext db)
        {
            _db = db;
        }

        public void Add<T>(T entity) where T : class
        {
            _db.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _db.SaveChangesAsync()) > 0;
        }

        public async Task<Film[]> GetAllFilmsAsync()
        {
            IQueryable<Film> query = _db.Films;
            query = query.OrderByDescending(f => f.Name);
            return await query.ToArrayAsync();
        }

        public async Task<Film> GetSingleFilmAsync(string name)
        {
            IQueryable<Film> query = _db.Films;
            query = query.Where(f => f.Name == name);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Film[]> GetAvaiableFilmsAsync()
        {
            IQueryable<Film> query = _db.Films;
            query = query.Where(f => f.QuantityAllowed > f.QuantityInUse);
            return await query.ToArrayAsync();
        }

        public async Task<bool> CheckIfAvaiable(string name)
        {
            var wishFilm = await GetSingleFilmAsync(name);

            if (wishFilm == null) { return false; }
            if (wishFilm.QuantityInUse < wishFilm.QuantityAllowed)
            {
                return true;
            }
            return false;
        }


        public async Task<bool> CheckIfAlreadyExist(Film model)
        {
            var film = await GetSingleFilmAsync(model.Name);
            if (film == null) { return false; }
            if (model.Name == film.Name)
            {
                return true;
            }
            return false;
        }





    }
}