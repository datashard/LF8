using System.ComponentModel.DataAnnotations;

namespace QuizzApp.Models;

public class Player
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
}