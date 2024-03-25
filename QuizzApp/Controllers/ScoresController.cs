using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ScoresController: ControllerBase
{
    private readonly DataContext _context;

    public ScoresController(DataContext context)
    {

        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateScore([FromBody] ScoreDTO dto)
    {
        var newScore = new Score()
        {
            Scores = dto.Score,
            Player = dto.Player,
        };
        await _context.Scores.AddAsync(newScore);
        await _context.SaveChangesAsync();

        return Ok("Player saved successfully");
    }

    [HttpGet]
    public async Task<ActionResult<List<Score>>> GetAllScores()
    {
        var scores = await _context.Scores.ToListAsync();

        return Ok(scores);
    }

    [HttpGet]
    [Route("{playerId}")]
    public async Task<ActionResult<Score>> GetScoreFromPlayer([FromRoute] int playerId)
    {
        var score = await _context.Scores.FirstOrDefaultAsync(m => m.Id == playerId);

        if (score is null)
        {
            return NotFound("Player not found!");
        }
        
        
        return Ok(score);
    }

    [HttpDelete]
    [Route("{playerId}")]
    public async Task<ActionResult<Score>> DeleteScoreByPlayerId([FromRoute] int playerId)
    {
        var score = await _context.Scores.FirstOrDefaultAsync(u => u.Id == playerId);

        if (score is null)
        {
            return NotFound("Score not found!");
        }

        _context.Scores.Remove(score);
        await _context.SaveChangesAsync();

        return Ok("Score deleted successfully!");
    }
}