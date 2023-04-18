using System;
using AirSim.Web.Model;

namespace AirSim.Web.Store;

public class AppState
{
    public User CurrentUser { get; set; } = new User();

    private List<User> Users = new List<User>();
    private List<BroadcastMessage> BroadcastMessages = new List<BroadcastMessage>();

    public void addUser(User user)
    {
        Users.Add(user);
    }

    public bool removeUser(User user)
    {
        // TODO: If the user isn't found, throw and/or log an error?
        return Users.Remove(user);
    }

    public void addBroadcastMessage(BroadcastMessage message)
    {
        BroadcastMessages.Add(message);
        if (BroadcastMessages.Count > 100)
        {
            BroadcastMessages.RemoveAt(0);
        }
    }
}
