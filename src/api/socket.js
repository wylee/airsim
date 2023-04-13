import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server);

  // Map of user ID => user object.
  const users = {};

  // Get list of user objects.
  const getUserList = () => Object.values(users);

  let hasLead = false;

  io.use((socket, next) => {
    console.log("middleware");
    const { role } = socket.handshake.auth;
    const isLead = role === "lead";
    if (isLead && hasLead) {
      return next(new Error("cannot lead"));
    }
    next();
  });

  io.on("connection", (socket) => {
    const { id, name, role } = socket.handshake.auth;
    const isLead = role === "lead";

    users[socket.id] = { id, name, role, connected: true };

    if (isLead) {
      if (hasLead) {
        // TODO: ERROR
      } else {
        hasLead = true;
      }
    }

    // Send the list of users to *only* the current user. Note that the
    // current user is also included in this list.
    socket.emit("user:list", getUserList());

    socket.on("disconnect", () => {
      const user = users[socket.id];
      const isLead = user.role === "lead";
      const deleted = delete users[socket.id];

      if (deleted) {
        if (isLead) {
          hasLead = false;
        }
        // Send the removed user to all users *except* the current user.
        socket.broadcast.emit("user:removed", user.id);
      }
    });

    // The client emits and add-user message after it successfully
    // connects. The user's data is then broadcast to all other clients.
    socket.on("user:add", (userData) => {
      users[socket.id] = userData;

      // Send the added user to all users *except* the current user.
      socket.broadcast.emit("user:added", userData);
    });
  });

  return io;
};
