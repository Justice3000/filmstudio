using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace filmstudion_Justice3000.Entities
{
    public class FilmStudio
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Place { get; set; }
        public string Moderator { get; set; }
        public string ModeratorEmail { get; set; }
        public string ModeratorPhoneNumber { get; set; }
        public ICollection<Film> FilmsInPossesion { get; set; }
        public User Owner { get; set; }


    }
}