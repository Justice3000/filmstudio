
using System.Linq;
using System;
using System.Collections.Generic;
using filmstudion_Justice3000.Database;
using filmstudion_Justice3000.Custom;
using filmstudion_Justice3000.Entities;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace filmstudion_Justice3000.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _db;
        private readonly RoleManager<IdentityRole> _role_mngr;
        private readonly UserManager<User> _user_mngr;


        public UserRepository(DatabaseContext db, RoleManager<IdentityRole> role_mngr,
        UserManager<User> user_mngr)
        {
            _db = db;
            _role_mngr = role_mngr;
            _user_mngr = user_mngr;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var user = _db.Users.SingleOrDefault(n => n.Email == email);

            if (user == null) { return null; }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }

        public User Create(User user, string password, bool admin)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new AppException("Password is required");
            }

            if (_db.Users.Any(a => a.Email == user.Email))
            {
                throw new AppException($"Email is {user.Email} already in use");
            }

            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;


            if (admin)
            {
                user.Role = "admin";
                _db.Users.Add(user);
                _user_mngr.AddToRoleAsync(user, "admin");
                _db.SaveChanges();
                return user;
            }
            else
            {
                user.Role = "studio";
                _db.Users.Add(user);
                _user_mngr.AddToRoleAsync(user, "studio");
                _db.SaveChanges();
                return user;
            }






        }

        public void Update(User userParam, string password = null)
        {
            var user = _db.Users.Find(userParam.Email);

            if (user == null)
            {
                throw new AppException("user does not exist");
            }

            if (!string.IsNullOrWhiteSpace(userParam.UserName) && userParam.UserName != user.UserName)
            {
                if (_db.Users.Any(u => u.UserName == userParam.UserName))
                {
                    throw new AppException($"Username {userParam.UserName} is taken");
                }

                user.UserName = userParam.UserName;
                // update user properties if provided
                if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                    user.FirstName = userParam.FirstName;

                if (!string.IsNullOrWhiteSpace(userParam.LastName))
                    user.LastName = userParam.LastName;

                // update password if provided
                if (!string.IsNullOrWhiteSpace(password))
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash(password, out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                }

                _db.Users.Update(user);
                _db.SaveChanges();
            }
        }


        public void Delete(string email)
        {
            var user = _db.Users.Find(email);
            if (user != null)
            {
                _db.Users.Remove(user);
                _db.SaveChanges();
            }
        }

        public User GetById(string id)
        {
            return _db.Users.Find(id);
        }








    }



}
