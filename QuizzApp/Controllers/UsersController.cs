using Microsoft.AspNetCore.Mvc;
using QuizzApp.Data;
using QuizzApp.DTOs;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController: ControllerBase
{
    private readonly DataContext _dataContext;

    public UsersController(DataContext context)
    {
        _dataContext = context;
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        return await _dataContext.Users.FindAsync(id);
    }
    
    
}