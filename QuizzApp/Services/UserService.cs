using Microsoft.EntityFrameworkCore;
using QuizzApp.Models;
using QuizzApp.Services.Interfaces;
using System.Linq;
using QuizzApp.Data;

namespace QuizzApp.Services;

public class UserService: IUserService
{
    private readonly DataContext _dbContext;
    
    public UserService(DataContext dbContext)
    {

        _dbContext = dbContext;
    }
    
    public async Task<User> AddUser(User user)
    {
        if (user is not null)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        return user;
    }

    public User UserDetails(string userName)
    {
        return _dbContext.Users.FirstOrDefault(m => m.UserName == userName);
    }

    public bool DeleteUser(string id)
    {
        var user = UserDetails(id);
        if (user is not null)
        {
            _dbContext.Users.Remove(user);
            _dbContext.SaveChangesAsync();
            return true;
        }
        return false;
    }
    
    
}