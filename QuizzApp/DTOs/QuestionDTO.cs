using QuizzApp.Models;

namespace QuizzApp.DTOs;

public class QuestionDTO
{
    public string Questions { get; set; }
    public Category Category { get; set; }
}