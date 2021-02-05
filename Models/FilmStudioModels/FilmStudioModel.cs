using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using filmstudion_Justice3000.Entities;
using Microsoft.AspNetCore.Identity;

namespace filmstudion_Justice3000.Models
{
    public class FilmStudioModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Place { get; set; }

        [Required]
        public string Moderator { get; set; }

        [Required]
        [EmailAddress]
        public string ModeratorEmail { get; set; }

        [Required]
        [Phone]
        public string ModeratorPhoneNumber { get; set; }
        public ICollection<FilmModel> FilmsInPossesion { get; set; }


    }
}