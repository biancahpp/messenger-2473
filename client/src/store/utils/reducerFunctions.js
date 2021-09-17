export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadCount: 1
    };
    newConvo.latestMessageText = message;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newConvo = { ...convo };
      newConvo.messages.push(message);
      newConvo.latestMessageText = message;
      if ((message.senderId === convo.otherUser.id)) newConvo.unreadCount = newConvo.unreadCount + 1;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message;
      convo.unreadCount = 1;
      return convo;
    } else {
      return convo;
    }
  });
};

export const readConversationStore = (state, currentConvo) => {
  return state.map((convo) => {
    if (convo.id === currentConvo.id) {
      const newConvo = { ...convo };
      newConvo.unreadCount = 0;
      newConvo.latestMessageText.isRead = true;
      return newConvo;
    } else {
      return convo;
    }
  });
}

export const receivingReadConversationStore = (state, currentConvo) => {

  const myLastMessage = currentConvo.messages.filter(message => message.senderId === currentConvo.otherUser.id)

  return state.map((convo) => {
    if (convo.id === currentConvo.id) {
      const newConvo = { ...convo };
      newConvo.unreadCount = 0;
      newConvo.latestMessageText.isRead = true;
      newConvo.lastRead = myLastMessage[myLastMessage.length - 1].id;
      return newConvo;
    } else {
      return convo;
    }
  });
}


