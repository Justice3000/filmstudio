using System;

namespace filmstudion_Justice3000.Entities
{
    public class Film
    {
        public int FilmID { get; set; }
        public string Name { get; set; }
        public string Director { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Runtime { get; set; }
        public string InfoLink { get; set; }
        public int QuantityAllowed { get; set; }

        public int QuantityInUse { get; set; }
        public int QuantityLeft
        {
            get
            {
                return QuantityAllowed - QuantityInUse;
            }

        }



    }
}
