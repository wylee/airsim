using System;

namespace AirSim.Web.Model;

public class BroadcastMessage
{
    public uint UserId { get; init; }
    public string Message { get; init; }

    public BroadcastMessage(uint id, string message)
    {
        UserId = id;
        Message = message;
    }
}

