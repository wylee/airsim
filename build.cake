var target = Argument("target", "Build");
var configuration = Argument("configuration", "Release");

Task("Clean")
    .WithCriteria(c => HasArgument("rebuild"))
    .Does(() =>
{
    CleanDirectory($"./src/AirSim.Web/bin/{configuration}");
});

Task("Build")
    .IsDependentOn("Clean")
    .Does(() =>
{
    DotNetBuild("./AirSim.sln", new DotNetBuildSettings
    {
        Configuration = configuration,
    });
});

RunTarget(target);

