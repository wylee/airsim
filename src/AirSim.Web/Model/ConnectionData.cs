namespace AirSim.Web.Model;

public class ConnectionData
{
    public string? Name { get; set; }
    public Role Role { get; set; }

    public override string ToString()
    {
        return $"{Name} ({Role})";
    }
}
