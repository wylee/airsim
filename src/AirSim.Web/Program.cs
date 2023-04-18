using Microsoft.AspNetCore.ResponseCompression;
using AirSim.Web.Store;
using AirSim.Web.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddResponseCompression(opts =>
{
    var types = new[] { "application/octet-stream" };
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(types);
});
builder.Services.AddScoped<Store>();

var app = builder.Build();
var isDev = app.Environment.IsDevelopment();

if (!isDev)
{
    app.UseResponseCompression();
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();
app.UseRouting();
app.MapBlazorHub();
app.MapHub<ChatHub>("/hubs/chat");
app.MapFallbackToPage("/_Host");
app.Run();
