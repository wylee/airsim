using System.ComponentModel.DataAnnotations;

namespace AirSim.Web.Model;

public class ConnectionData
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public Role Role { get; set; } = Role.None;

    public override string ToString()
    {
        return $"{Name} ({Role})";
    }
}
