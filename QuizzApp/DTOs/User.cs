using System.ComponentModel.DataAnnotations;

namespace QuizzApp.DTOs;

public class User
{
    [Key]
    public int Id { get; set; }
    public string UserName { get; set; }
}