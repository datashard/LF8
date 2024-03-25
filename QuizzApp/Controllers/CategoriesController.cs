using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;
using QuizzApp.Models;

namespace QuizzApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController: ControllerBase
{
    private readonly DataContext _context;
    
    public CategoriesController(DataContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO dto)
    {
        var newCategory = new Category
        { 
            Categories = dto.Category
        };
        await _context.Categories.AddAsync(newCategory);
        await _context.SaveChangesAsync();

        return Ok("Category saved successfully");
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetAllCategories()
    {
        var categories = await _context.Categories.ToListAsync();

        return Ok(categories);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Category>> GetCategoryById([FromRoute] int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(m => m.Id == id);

        if (category is null)
        {
            return NotFound("Category not found!");
        }

        return Ok(category);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<Category>> DeleteCategoryById([FromRoute] int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(u => u.Id == id);

        if (category is null)
        {
            return NotFound("Category not found!");
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return Ok("Category deleted successfully!");
    }
}