using System.Threading.Tasks;
using filmstudion_Justice3000.Entities;


namespace filmstudion_Justice3000.Data
{
    public interface IFilmStudioRepository
    {
        void Create<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
        Task<bool> CheckIfAlreadyExistsAsync(string name);
        Task<FilmStudio> GetByIdAsync(int id);


        Task<FilmStudio[]> GetAllFilmStudiosAsync();
        Task<FilmStudio> GetSpecificFilmStusioAsync(string name);
        Task<FilmStudio[]> GetSpecificFilmStusiosByUserAsync(User user);

        Task<bool> CheckIfFilmISAlreadyInTaken(Film film, FilmStudio filmStudio);








    }
}