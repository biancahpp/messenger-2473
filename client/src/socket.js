import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  incomingReadConversation,
} from "./store/conversations";

const url = `${window.location.protocol}//${window.location.hostname}:8000`;
const socket = io(url, { transports : ['websocket']});

socket.on("connect", () => {
  console.log("connected to server");
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("read-conversation", (data) => {
    store.dispatch(incomingReadConversation(data.conversation));
  });
});

export default socket;
