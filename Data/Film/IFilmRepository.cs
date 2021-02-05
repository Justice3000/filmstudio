using System.Threading.Tasks;
using filmstudion_Justice3000.Entities;

namespace filmstudion_Justice3000.Data
{
    public interface IFilmRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // my own methods

        Task<Film[]> GetAllFilmsAsync();
        Task<Film> GetSingleFilmAsync(string name);
        Task<Film[]> GetAvaiableFilmsAsync();

        Task<bool> CheckIfAvaiable(string name);
        Task<bool> CheckIfAlreadyExist(Film model);




    }
}