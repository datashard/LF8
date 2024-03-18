using Microsoft.EntityFrameworkCore;
using QuizzApp.Models;

namespace QuizzApp.Data;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed Data can be executed in this method.
        base.OnModelCreating(modelBuilder);
    }
    public DbSet<User> Users { get; set; }
}