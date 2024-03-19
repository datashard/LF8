using System.ComponentModel.DataAnnotations;

namespace QuizzApp.Models;

public class Score
{
    [Key] 
    public int Id { get; set; }
    public User User { get; set; }
    public int score { get; set; }
}