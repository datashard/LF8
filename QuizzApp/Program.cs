using QuizzApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Config DB

builder.Services.AddDbContext<DataContext>();
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
//app.UseStaticFiles();
//app.UseRouting();


// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");

app.Run();