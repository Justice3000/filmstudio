using AutoMapper;
using filmstudion_Justice3000.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using filmstudion_Justice3000.Data;
using Microsoft.AspNetCore.Identity;
using filmstudion_Justice3000.Entities;
using System.Security.Claims;

namespace filmstudion_Justice3000
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]

    public class FilmStudiosController : ControllerBase
    {
        private readonly IFilmStudioRepository _repo_fstudio;
        private readonly IMapper _mapper;
        private readonly LinkGenerator _link_gen;
        private readonly UserManager<User> _u_mng;



        public FilmStudiosController(IFilmStudioRepository repo_fstudio,
        IMapper mapper,
        LinkGenerator link_gen,
        UserManager<User> u_mng
        )
        {
            _repo_fstudio = repo_fstudio;
            _mapper = mapper;
            _link_gen = link_gen;
            _u_mng = u_mng;

        }


        [HttpGet]
        public async Task<ActionResult<FilmStudioModel[]>> GetAllFilmStudios()
        {
            try
            {
                var answer = await _repo_fstudio.GetAllFilmStudiosAsync();
                return _mapper.Map<FilmStudioModel[]>(answer);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }


        [HttpGet("{studioName}")]
        public async Task<ActionResult<FilmStudioModel>> GetSpecificFilmStudio(string studioName)
        {
            try
            {
                var answer = await _repo_fstudio.GetSpecificFilmStusioAsync(studioName);
                if (answer == null) return NotFound();
                return _mapper.Map<FilmStudioModel>(answer);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }



        [Authorize(Policy = "studio")]
        [HttpPost]
        public async Task<ActionResult<FilmStudioModelRegister>> RegisterNewFilmStudio([FromBody] FilmStudioModelRegister model)
        {

            try
            {
                var filmStudio = _mapper.Map<FilmStudio>(model);
                var owner = _u_mng.FindByIdAsync(User.Identity.Name).Result;

                if (await _repo_fstudio.CheckIfAlreadyExistsAsync(model.Name))
                {
                    filmStudio.Owner = owner;
                    filmStudio.Moderator = $"{owner.FirstName} {owner.LastName}";
                    filmStudio.ModeratorEmail = owner.Email;


                    _repo_fstudio.Create(filmStudio);
                    if (await _repo_fstudio.SaveChangesAsync())
                    {
                        return Ok(new { message = $"{filmStudio.Name} has been added by {filmStudio.Owner.UserName}" });
                    }
                    return BadRequest();
                }

                return BadRequest();



            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }



        [Authorize(Policy = "studio")]
        [HttpGet("myStudios")]
        public async Task<ActionResult<FilmStudioModel[]>> GetAllFilmStudiosByUser()
        {
            try
            {
                var user = _u_mng.FindByIdAsync(User.Identity.Name).Result;
                if (user == null) { return BadRequest("Not Authorized"); }
                var filmStudios = await _repo_fstudio.GetSpecificFilmStusiosByUserAsync(user);

                return _mapper.Map<FilmStudioModel[]>(filmStudios);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }








    }
}