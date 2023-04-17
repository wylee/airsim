namespace AirSim.Web.Data;

public enum Role
{
    Lead,
    Wing,
    Viewer,
}

public class ConnectionData
{
    public String Name { get; set; }
    public Role Role { get; set; }
}
