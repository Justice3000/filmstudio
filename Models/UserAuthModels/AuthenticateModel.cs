using System.ComponentModel.DataAnnotations;

namespace filmstudion_Justice3000.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


    }
}