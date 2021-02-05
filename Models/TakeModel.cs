using System;
using System.ComponentModel.DataAnnotations;

namespace filmstudion_Justice3000.Models
{
    public class TakeModel
    {

        [Required]
        public string movieName { get; set; }

        [Required]
        public string studio { get; set; }



    }
}