using System;
using AirSim.Web.Model;

namespace AirSim.Web.Store;

public class Store
{

    // State -----------------------------------------------------------

    public User CurrentUser { get; set; } = new User();
    public List<User> ConnectedUsers { get; } = new List<User>();
    public List<BroadcastMessage> BroadcastMessages { get; } = new List<BroadcastMessage>();

    public event Action? OnChange;
    private void NotifyStateChanged() => OnChange?.Invoke();

    // Current User ----------------------------------------------------

    public bool Connected { get { return CurrentUser.Connected; } }

    public void ConnectUser(string name, Role role)
    {
        CurrentUser = new User("<id>", name, role, true);
        AddUser(CurrentUser);
        NotifyStateChanged();
    }

    public void DisconnectUser()
    {
        RemoveUser(CurrentUser);
        CurrentUser = new User();
        NotifyStateChanged();
    }

    // Connected Users -------------------------------------------------

    public bool HasConnectedUsers { get { return ConnectedUsers.Count > 0; } }

    public void AddUser(User user)
    {
        ConnectedUsers.Add(user);
        NotifyStateChanged();
    }

    public void RemoveUser(User user)
    {
        var removed = ConnectedUsers.Remove(user);
        // TODO: If the user isn't found, throw and/or log an error?
        NotifyStateChanged();
    }

    // Broadcast Messages ----------------------------------------------

    public bool HasBroadcastMessages { get { return BroadcastMessages.Count > 0; } }

    public void AddBroadcastMessage(BroadcastMessage message)
    {
        BroadcastMessages.Add(message);
        if (BroadcastMessages.Count > 100)
        {
            BroadcastMessages.RemoveAt(0);
        }
        NotifyStateChanged();
    }
}
