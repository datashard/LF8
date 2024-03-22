using Microsoft.EntityFrameworkCore;
using QuizzApp.Models;

namespace QuizzApp.Data;

public class DataContext: DbContext
{
    private readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder  options)
    {
        // Seed Data can be executed in this method.
        options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
    }
    public DbSet<Player> Players { get; set; }
    
}