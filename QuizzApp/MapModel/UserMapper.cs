using AutoMapper;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.MapModel;

public class UserMapper: Profile
{
    public UserMapper()
    {
        CreateMap<User, UserDTO>();
        CreateMap<UserDTO, User>();
    }
}