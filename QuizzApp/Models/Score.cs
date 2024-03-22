using System.ComponentModel.DataAnnotations;

namespace QuizzApp.Models;

public class Score
{
     
    public int Id { get; set; }
    public Player Player { get; set; }
    public int score { get; set; }
}