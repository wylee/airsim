import { Server } from "socket.io";

// XXX: Duplicates User definition in UI
interface User {
  id: string;
  name: string;
  role: string;
  connected: boolean;
}

type ErrorType = Record<string, { message: string }>;

const errors: ErrorType = {
  "duplicate-id": {
    message: "That user ID is already in use.",
  },
  "duplicate-name": {
    message: "That name is already in use. Please use a different name.",
  },
  "duplicate-lead": {
    message: "Someone else has already connected as lead.",
  },
};

const makeError = (cause: string) => {
  return new Error(errors[cause].message, { cause });
};

export const initSocket = (server: any) => {
  const io = new Server(server);

  // Map of user ID => user object.
  const users: Record<string, User> = {};

  // User ID of the current lead, if there is one.
  let leadId: string | undefined;

  // Return list of user objects.
  const getUserList = (): User[] => Object.values(users);

  const findUserByName = (name: string): User | undefined => {
    return getUserList().find((u) => u.name === name);
  };

  io.use((socket, next) => {
    const { id, name, role } = socket.handshake.auth;
    const isLead = role === "lead";
    if (users[id] !== undefined) {
      return next(makeError("duplicate-id"));
    }
    if (findUserByName(name) !== undefined) {
      return next(makeError("duplicate-name"));
    }
    if (isLead) {
      if (leadId) {
        return next(makeError("duplicate-lead"));
      } else {
        leadId = id;
      }
    }
    next();
  });

  io.on("connection", (socket) => {
    const { id, name, role } = socket.handshake.auth;

    users[id] = { id, name, role, connected: true };

    // Send the list of users to *only* the current user. Note that the
    // current user is also included in this list.
    socket.emit("user:list", getUserList());

    socket.on("disconnect", () => {
      const user = users[id];
      const isLead = user.role === "lead";
      const deleted = delete users[id];

      if (deleted) {
        if (isLead) {
          leadId = undefined;
        }
        // Send the removed user to all users *except* the current user.
        socket.broadcast.emit("user:removed", user.id);
      }
    });

    // The client emits and add-user message after it successfully
    // connects. The user's data is then broadcast to all other clients.
    socket.on("user:add", (userData) => {
      users[id] = userData;

      // Send the added user to all users *except* the current user.
      socket.broadcast.emit("user:added", userData);
    });

    socket.on("broadcast:message", (message) => {
      // Broadcast the message to all users *except* the current user.
      if (message.userId === socket.handshake.auth.id) {
        socket.broadcast.emit("broadcast:message", message);
      }
    });
  });

  return io;
};
