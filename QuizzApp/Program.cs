using Microsoft.EntityFrameworkCore;
using QuizzApp.Data;
using QuizzApp.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Config DB
builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("local");
    options.UseSqlServer(connectionString);
});
builder.Services.AddControllersWithViews();
// builder.Services.AddDbContext<DataContext>(options =>
// {
//     options.UseModel(config.GetConnectionString("DefaultConnection"));
// });
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();