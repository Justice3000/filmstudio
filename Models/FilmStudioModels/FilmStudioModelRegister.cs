using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using filmstudion_Justice3000.Entities;
using Microsoft.AspNetCore.Identity;

namespace filmstudion_Justice3000.Models
{
    public class FilmStudioModelRegister
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Place { get; set; }

        public string Moderator { get; set; }

        public string ModeratorEmail { get; set; }

        [Required]
        [Phone]
        public string ModeratorPhoneNumber { get; set; }
        public ICollection<FilmModel> FilmsInPossesion { get; set; }

        public User Owner { get; set; }

    }
}