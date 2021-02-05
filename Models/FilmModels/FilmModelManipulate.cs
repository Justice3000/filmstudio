using System;
using System.ComponentModel.DataAnnotations;

namespace filmstudion_Justice3000.Models
{
    public class FilmModelManipulate
    {

        [Required]
        public string Name { get; set; }

        [Required]
        public string Director { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string Language { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; } = DateTime.Now;


        [Required]
        [Range(0, double.MaxValue)]
        public double Runtime { get; set; }

        [Url]
        public string InfoLink { get; set; }

        [Required]
        public int QuantityAllowed { get; set; }

        public int QuantityInUse { get; }

        public int QuantityLeft
        {
            get
            {
                return QuantityAllowed - QuantityInUse;
            }

        }

    }
}