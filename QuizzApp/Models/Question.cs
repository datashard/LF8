﻿using System.ComponentModel.DataAnnotations;

namespace QuizzApp.Models;

public class Question
{
    [Key] 
    public int Id { get; set; }
    public string Questions { get; set; }
    public Category Category { get; set; }
}