using AutoMapper;
using filmstudion_Justice3000.Entities;
using filmstudion_Justice3000.Models;


namespace filmstudion_Justice3000.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Film, FilmModel>()
            .ReverseMap();

            CreateMap<Film, FilmModel>()
            .ReverseMap();

            CreateMap<FilmStudio, FilmStudioModel>()
            .ReverseMap()
            .ForMember(o => o.Owner, opt => opt.Ignore());

            CreateMap<User, UserModel>()
            .ReverseMap();

            CreateMap<User, RegisterModel>()
            .ReverseMap();

            CreateMap<FilmStudio, FilmStudioModelRegister>()
            .ReverseMap();

            CreateMap<Film, FilmModelManipulate>()
            .ReverseMap();


        }
    }
}