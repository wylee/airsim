namespace AirSim.Web.Model;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public Role Role { get; set; }
    public bool Connected { get; set; }

    /// <summary>
    /// Create an anonymous, unconnected user with no ID, name, or role.
    /// </summary>
    public User()
    {
        Id = string.Empty;
        Name = string.Empty;
        Role = Role.None;
        Connected = false;
    }

    public User(string id, string name, Role role, bool connected)
    {
        Id = id;
        Name = name;
        Role = role;
        Connected = connected;
    }

    public string RoleName()
    {
        return Role.ToString("f");
    }

    public override string ToString()
    {
        var indicator = Connected ? "*" : "";
        return $"{Name} ({RoleName()}) {indicator}";
    }
}
