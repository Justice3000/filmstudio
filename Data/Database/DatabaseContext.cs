
using System;
using filmstudion_Justice3000.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace filmstudion_Justice3000.Database
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("MEMORY_DB");
        }


        public DbSet<Film> Films { get; set; }

        public DbSet<FilmStudio> FilmStudios { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 1,
                Name = "Shrek",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2004, 1, 1),
                Runtime = 120.00,
                InfoLink = "https://www.google.com/search?q=shrek",
                QuantityAllowed = 99,
                QuantityInUse = 1
            });

            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 2,
                Name = "Shrek 2",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2004, 1, 1),
                Runtime = 120.00,
                InfoLink = "https://www.google.com/search?q=shrek",
                QuantityAllowed = 99,
                QuantityInUse = 99
            });

            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 3,
                Name = "Shrek 3",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2010, 1, 1),
                Runtime = 140.00,
                InfoLink = "https://www.google.com/search?q=shrek2",
                QuantityAllowed = 101,
                QuantityInUse = 100
            });
            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 4,
                Name = "Shrek 4",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2010, 1, 1),
                Runtime = 140.00,
                InfoLink = "https://www.google.com/search?q=shrek2",
                QuantityAllowed = 101,
                QuantityInUse = 0
            });
            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 5,
                Name = "Shrek 5",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2010, 1, 1),
                Runtime = 140.00,
                InfoLink = "https://www.google.com/search?q=shrek2",
                QuantityAllowed = 50,
                QuantityInUse = 50
            });
            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 6,
                Name = "Shrek 6",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2010, 1, 1),
                Runtime = 140.00,
                InfoLink = "https://www.google.com/search?q=shrek2",
                QuantityAllowed = 49,
                QuantityInUse = 50
            });
            builder.Entity<Film>()
            .HasData(new
            {
                FilmID = 7,
                Name = "Shrek 7",
                Director = "Director's Name",
                Country = "USA",
                Language = "English",
                ReleaseDate = new DateTime(2010, 1, 1),
                Runtime = 140.00,
                InfoLink = "https://www.google.com/search?q=shrek2",
                QuantityAllowed = 100,
                QuantityInUse = 50
            });



        }
    }
}