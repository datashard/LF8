using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController: ControllerBase
{
    private readonly DataContext _context;

    public QuestionsController(DataContext context)
    {

        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestion([FromBody] QuestionDTO dto)
    {
        var newQuestion = new Question()
        {
            Questions = dto.Questions,
            Category = dto.Category,
        };
        await _context.Questions.AddAsync(newQuestion);
        await _context.SaveChangesAsync();

        return Ok("Question saved successfully");
    }

    [HttpGet]
    public async Task<ActionResult<List<Question>>> GetAllQuestions()
    {
        var questions = await _context.Questions.ToListAsync();

        return Ok(questions);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Question>> GetQuestionById([FromRoute] int id)
    {
        var question = await _context.Questions.FirstOrDefaultAsync(m => m.Id == id);

        if (question is null)
        {
            return NotFound("Question not found!");
        }

        return Ok(question);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<Question>> DeleteQuestionById([FromRoute] int id)
    {
        var question = await _context.Questions.FirstOrDefaultAsync(u => u.Id == id);

        if (question is null)
        {
            return NotFound("Question not found!");
        }

        _context.Questions.Remove(question);
        await _context.SaveChangesAsync();

        return Ok("Question deleted successfully!");
    }
}