namespace AirSim.Web.Model;

public class User
{
    public uint Id { get; init; } = 0;
    public string Name { get; set; } = string.Empty;
    public Role Role { get; set; } = Role.None;
    public bool Connected { get; set; } = false;

    //public User(uint id, string name, Role role, bool connected)
    //{
    //    Id = id;
    //    Name = name;
    //    Role = role;
    //    Connected = connected;
    //}

    public override string ToString()
    {
        var indicator = Connected ? "*" : "";
        return $"{Name} ({Role}) {indicator}";
    }
}
