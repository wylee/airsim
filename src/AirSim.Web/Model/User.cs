namespace AirSim.Web.Model;

public class User
{
    public string Id { get; init; }
    public string Name { get; init; }
    public Role Role { get; init; }
    public bool Connected { get; init; }

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

    public string RoleName
    {
        get
        {
            return Role.ToString("f");
        }
    }

    public string RoleIcon
    {
        get
        {
            return Role switch
            {
                Role.None => "❗️",
                Role.Lead => "✈️",
                Role.Wing => "🛩️",
                Role.Viewer => "👀",
                // XXX: Why is the fallback necessary?
                _ => "❓",
            };
        }
    }

    public override string ToString()
    {
        var indicator = Connected ? "*" : "";
        return $"{Name} ({RoleName}) {indicator}";
    }
}
