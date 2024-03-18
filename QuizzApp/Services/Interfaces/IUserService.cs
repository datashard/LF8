using QuizzApp.Models;

namespace QuizzApp.Services.Interfaces;

public interface IUserService
{
    Task<User> AddUser(User user);
    bool DeleteUser(string id);
    User UserDetails(string userName);
}