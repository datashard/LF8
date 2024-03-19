using System.ComponentModel.DataAnnotations;

namespace QuizzApp.Models;

public class Category
{
    [Key] 
    public int Id { get; set; }
    public string Categories { get; set; }
    
}