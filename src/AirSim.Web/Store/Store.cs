using System;
using AirSim.Web.Model;

namespace AirSim.Web.Store;

public class Store
{
    private User currentUser = new User();
    private List<User> users = new List<User>();
    private List<BroadcastMessage> broadcastMessages = new List<BroadcastMessage>();

    public event Action? OnChange;

    private void NotifyStateChanged() => OnChange?.Invoke();

    // Current User ------------------------------------------------------------

    public void ConnectUser(string name, Role role)
    {
        currentUser = new User("<id>", name, role, true);
        NotifyStateChanged();
    }

    public void DisconnectUser()
    {
        currentUser = new User();
        NotifyStateChanged();
    }

    public string CurrentUserName()
    {
        return currentUser.Name;
    }

    public string CurrentUserRole()
    {
        return currentUser.RoleName();
    }

    public bool CurrentUserConnected()
    {
        return currentUser.Connected;
    }

    // Connected Users ---------------------------------------------------------

    public void AddUser(User user)
    {
        users.Add(user);
        NotifyStateChanged();
    }

    public void RemoveUser(User user)
    {
        var removed = users.Remove(user);
        // TODO: If the user isn't found, throw and/or log an error?
        NotifyStateChanged();
    }

    // Broadcast Messages ------------------------------------------------------

    public void AddBroadcastMessage(BroadcastMessage message)
    {
        broadcastMessages.Add(message);
        if (broadcastMessages.Count > 100)
        {
            broadcastMessages.RemoveAt(0);
        }
        NotifyStateChanged();
    }
}
