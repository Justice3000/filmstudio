using Microsoft.AspNetCore.Identity;
namespace filmstudion_Justice3000.Entities
{
    public class User : IdentityUser
    {

        new public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        new public string UserName { get; set; }
        public byte[] PasswordSalt { get; set; }
        new public byte[] PasswordHash { get; set; }
        public string Role { get; set; }

    }
}