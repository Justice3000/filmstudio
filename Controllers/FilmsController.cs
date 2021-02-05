using AutoMapper;
using filmstudion_Justice3000.Data;
using filmstudion_Justice3000.Entities;
using filmstudion_Justice3000.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Linq;



namespace filmstudion_Justice3000
{

    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]

    public class FilmsController : ControllerBase

    {
        private readonly IFilmRepository _repo_film;
        private readonly IFilmStudioRepository _studio_repo;
        private readonly IMapper _mapper;
        private readonly LinkGenerator _link_gen;
        private readonly UserManager<User> _u_mng;


        public FilmsController(IFilmRepository repo_film,
        IMapper map,
        LinkGenerator linkGen,
        UserManager<User> u_mng,
        IFilmStudioRepository studio_repo)
        {
            _repo_film = repo_film;
            _mapper = map;
            _link_gen = linkGen;
            _studio_repo = studio_repo;
            _u_mng = u_mng;

        }


        [HttpGet]
        public async Task<ActionResult<FilmModel[]>> GetAllFilms([FromQuery] bool showInStock = false)
        {
            try
            {
                if (showInStock)
                {
                    var inStock = await _repo_film.GetAvaiableFilmsAsync();
                    return _mapper.Map<FilmModel[]>(inStock);
                }
                var answer = await _repo_film.GetAllFilmsAsync();
                return _mapper.Map<FilmModel[]>(answer);

            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<FilmModel>> GetSingleFilm(string name)
        {
            try
            {
                var answer = await _repo_film.GetSingleFilmAsync(name);
                if (answer == null) return NotFound();
                return _mapper.Map<FilmModel>(answer);

            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }


        [Authorize(Policy = "admin")]
        [HttpPost]
        public async Task<ActionResult<FilmModelManipulate>> CreateFilm([FromBody] FilmModelManipulate model)
        {
            try
            {

                var film = _mapper.Map<Film>(model);
                if (await _repo_film.CheckIfAlreadyExist(film))
                {
                    return BadRequest(new { message = "Film already exists" });
                }
                _repo_film.Add(film);

                if (await _repo_film.SaveChangesAsync())
                {
                    return Created($"film {film.Name}", _mapper.Map<FilmModelManipulate>(film));
                }
                return BadRequest();
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

        }


        [Authorize(Policy = "admin")]
        [HttpPut("{filmName}")]
        public async Task<ActionResult<FilmModelManipulate>> UpdateFilm(string filmName, FilmModelManipulate model)
        {
            try
            {
                var film = await _repo_film.GetSingleFilmAsync(filmName);

                if (film == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, film);

                await _repo_film.SaveChangesAsync();

                return _mapper.Map<FilmModelManipulate>(model);





            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

        }


        [Authorize(Policy = "studio")]
        [HttpPost("TakeMovie")]
        public async Task<ActionResult<TakeModel>> TryToTakeMovie(TakeModel model)
        {
            try
            {

                var owner = _u_mng.FindByIdAsync(User.Identity.Name).Result;

                if (owner == null) { return BadRequest(new { message = "Illegal owner" }); }

                var owners_studios = await _studio_repo.GetSpecificFilmStusiosByUserAsync(owner);

                if (owners_studios == null)
                {
                    return BadRequest(new { message = "No studio assigned to this owner" });
                }

                if (owners_studios.FirstOrDefault(n => n.Name == model.studio) == null)
                {
                    return BadRequest();
                }

                if (owners_studios.FirstOrDefault(n => n.Name == model.studio).Name == model.studio)
                {
                    var finalStudio = await _studio_repo.GetSpecificFilmStusioAsync(model.studio);

                    var finalFilm = await _repo_film.GetSingleFilmAsync(model.movieName);

                    if (finalFilm == null) { return NotFound(); }




                    if (await _studio_repo.CheckIfFilmISAlreadyInTaken(finalFilm, finalStudio))
                    {
                        return BadRequest(new { message = $"{finalFilm.Name} is already taken by your studio" });
                    }

                    if (await _repo_film.CheckIfAvaiable(finalFilm.Name) == false)
                    {
                        return BadRequest(new { message = "There are no more copies left" });
                    }

                    /// 1-1 till this moment
                    finalFilm.QuantityInUse = finalFilm.QuantityInUse + 1;





                    finalStudio.FilmsInPossesion.Add(finalFilm);

                    if (await _studio_repo.SaveChangesAsync())
                    {
                        return Ok();
                    }

                }
                return BadRequest(new { message = "Your request is not valid" });


            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }



        [Authorize(Policy = "studio")]
        [HttpPost("LeaveMovie")]
        public async Task<ActionResult<TakeModel>> TryToLeaveMovie(TakeModel model)
        {
            try
            {
                // USER CAN TAKE LEAVE FILM INFINITE between own studios ---fix needed
                var owner = _u_mng.FindByIdAsync(User.Identity.Name).Result;

                if (owner == null) { return BadRequest(new { message = "Illegal owner" }); }

                var owners_studios = await _studio_repo.GetSpecificFilmStusiosByUserAsync(owner);

                if (owners_studios == null) { return BadRequest(new { message = "No studio assigned to this owner" }); }

                if (owners_studios.FirstOrDefault(n => n.Name == model.studio) == null) { return BadRequest(); }

                if (owners_studios.FirstOrDefault(n => n.Name == model.studio).Name == model.studio)
                {
                    var finalStudio = await _studio_repo.GetSpecificFilmStusioAsync(model.studio);

                    var finalFilm = await _repo_film.GetSingleFilmAsync(model.movieName);

                    if (finalFilm == null) { return NotFound(); }

                    if (await _studio_repo.CheckIfFilmISAlreadyInTaken(finalFilm, finalStudio) == false) { return BadRequest(new { message = $"{finalFilm.Name} is not in your possesion" }); }

                    finalFilm.QuantityInUse = finalFilm.QuantityInUse - 1;

                    finalStudio.FilmsInPossesion.Remove(finalFilm);

                    if (await _studio_repo.SaveChangesAsync())
                    {
                        return Ok();
                    }

                }
                return BadRequest(new { message = "You request is not valid" });

            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }




    }

}