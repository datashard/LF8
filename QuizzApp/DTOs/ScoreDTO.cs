using QuizzApp.Models;

namespace QuizzApp.DTOs;

public class ScoreDTO
{
    public Player Player { get; set; }
    public int Score { get; set; }
}