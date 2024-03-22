using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayersController: ControllerBase
{
    private readonly DataContext _context;

    public PlayersController(DataContext context)
    {

        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePlayer([FromBody] PlayerDTO dto)
    {
        var newPlayer = new Player()
        {
            UserName = dto.UserName,
            Password = dto.Password,
        };
        await _context.Players.AddAsync(newPlayer);
        await _context.SaveChangesAsync();

        return Ok("Player saved successfully");
    }

    [HttpGet]
    public async Task<ActionResult<List<Player>>> GetAllPlayers()
    {
        var players = await _context.Players.ToListAsync();

        return Ok(players);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Player>> GetPlayerById([FromRoute] int id)
    {
        var player = await _context.Players.FirstOrDefaultAsync(m => m.Id == id);

        if (player is null)
        {
            return NotFound("User not found!");
        }

        return Ok(player);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<Player>> DeletePlayerById([FromRoute] int id)
    {
        var player = await _context.Players.FirstOrDefaultAsync(u => u.Id == id);

        if (player is null)
        {
            return NotFound("User not found!");
        }

        _context.Players.Remove(player);
        await _context.SaveChangesAsync();

        return Ok("Player deleted successfully!");
    }
}