using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController: ControllerBase
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {

        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserDTO dto)
    {
        var newUser = new User()
        {
            UserName = dto.UserName,
            Password = dto.Password,
        };
        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return Ok("User saved successfully");
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();

        return Ok(users);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<User>> GetUserById([FromRoute] int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(m => m.Id == id);

        if (user is null)
        {
            return NotFound("User not found!");
        }

        return Ok(user);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<User>> DeleteUserById([FromRoute] int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            return NotFound("User not found!");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok("User deleted successfully!");
    }
}