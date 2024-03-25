using System.ComponentModel.DataAnnotations;
using QuizzApp.Models;

namespace QuizzApp.DTOs;

public class PlayerDTO
{
    public string UserName { get; set; }
    public string Password { get; set; }

}