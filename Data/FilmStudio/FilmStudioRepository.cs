using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using filmstudion_Justice3000.Database;
using filmstudion_Justice3000.Entities;
using filmstudion_Justice3000.Models;

namespace filmstudion_Justice3000.Data
{
    public class FilmStudioRepository : IFilmStudioRepository
    {
        private readonly DatabaseContext _db;

        public FilmStudioRepository(DatabaseContext db)
        {
            _db = db;
        }


        public void Create<T>(T entity) where T : class
        {
            _db.Add(entity);
        }


        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }


        public async Task<bool> SaveChangesAsync()
        {
            //1-1 here
            return (await _db.SaveChangesAsync() > 0);
            //1-0 here
        }


        public async Task<FilmStudio[]> GetAllFilmStudiosAsync()
        {
            IQueryable<FilmStudio> query = _db.FilmStudios;
            query = query.OrderByDescending(s => s.Name)
            .Include(o => o.Owner).Include(l => l.FilmsInPossesion);
            return await query.ToArrayAsync();
        }

        public async Task<FilmStudio> GetSpecificFilmStusioAsync(string name)
        {
            IQueryable<FilmStudio> query = _db.FilmStudios;
            query = query.Where(n => n.Name == name).Include(p => p.FilmsInPossesion);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<FilmStudio[]> GetSpecificFilmStusiosByUserAsync(User user)
        {
            IQueryable<FilmStudio> query = _db.FilmStudios;
            query = query.Where(n => n.Owner == user).Include(p => p.FilmsInPossesion);
            return await query.ToArrayAsync();
        }


        public async Task<FilmStudio> GetByIdAsync(int id)
        {
            IQueryable<FilmStudio> query = _db.FilmStudios;
            query = query.Where(i => i.Id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<bool> CheckIfAlreadyExistsAsync(string name)
        {
            var studio = await GetSpecificFilmStusioAsync(name);
            if (studio == null) { return true; }
            if (studio.Name != name)
            {
                return true;
            }
            return false;

        }

        public async Task<bool> CheckIfFilmISAlreadyInTaken(Film film, FilmStudio filmStudio)
        {


            var studio = await GetSpecificFilmStusioAsync(filmStudio.Name);

            if (studio.FilmsInPossesion.Count <= 0) { return false; }

            var filmName = studio.FilmsInPossesion.FirstOrDefault(w => w.Name == film.Name);



            if (filmName != null && filmName.Name == film.Name)
            {
                return true;
            }
            return false;

        }





    }
}