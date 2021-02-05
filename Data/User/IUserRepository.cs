using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using filmstudion_Justice3000.Entities;

namespace filmstudion_Justice3000.Data
{
    public interface IUserRepository
    {

        User Create(User user, string password, bool admin);
        void Delete(string email);
        void Update(User user, string password = null);
        User Authenticate(string username, string password);
        User GetById(string id);




    }

}

