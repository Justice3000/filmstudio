using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using filmstudion_Justice3000.Data;
using filmstudion_Justice3000.Custom;
using filmstudion_Justice3000.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using filmstudion_Justice3000.Entities;


namespace filmstudion_Justice3000
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/v1/[controller]")]

    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _user_repo;
        private readonly IMapper _map;
        private readonly AppSettings _appSettings;


        public UsersController(IUserRepository user_repo,
        IMapper map,
        IOptions<AppSettings> appSettings
        )
        {
            _user_repo = user_repo;
            _map = map;
            _appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]

        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _user_repo.Authenticate(model.Email, model.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Email or Password is incorrect" }

                );
            }





            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)

                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            //returning token

            return Ok(new
            {
                Id = user.Id,
                Role = user.Role,
                Email = user.Email,
                Firsname = user.FirstName,
                Lastname = user.LastName,
                Username = user.UserName,
                Token = tokenString
            });
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model, [FromQuery] bool asAdmin = false)
        {
            var user = _map.Map<User>(model);

            try
            {

                if (asAdmin)
                {
                    _user_repo.Create(user, model.Password, true);
                    return Ok(new { message = $"Created user {model.UserName} as Admin" });

                }
                else
                {
                    _user_repo.Create(user, model.Password, false);
                    return Ok(new { message = $"Created user {model.UserName}" });
                }


            }
            catch (AppException ex)
            {

                return BadRequest(new { message = ex.Message });
            }
        }











    }



}