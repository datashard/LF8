using Microsoft.EntityFrameworkCore;
using QuizzApp.DTOs;

namespace QuizzApp.Data;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
}