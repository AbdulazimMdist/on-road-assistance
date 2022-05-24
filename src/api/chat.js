import { app } from "@/firebase";
import store from "@/store";
import { getDatabase, ref, set, push, onValue, query, orderByChild } from "firebase/database";

const db = getDatabase(app);

export const writeChat = (message, success) => {
  const { uid, displayName } = store.getters.getUser;
  const chatRef = push(ref(db, "chat/" + uid));
  const messageCount = ref(db, "admin_count/" + uid);
  let count = 0;

  onValue(messageCount, (snapshot) => {
    count = snapshot.val();
  });

  set(chatRef, {
    author: displayName,
    role: store.getters.isAdmin ? "admin" : "user",
    createdAt: Date.now(),
    message,
  })
    .then(() => {
      success();
      set(messageCount, ++count);
    })
    .catch((e) => console.error(e));
};

export const readChat = (success) => {
  const { uid } = store.getters.getUser;
  const chatRef = query(ref(db, "chat/" + uid, orderByChild("createdAt")));
  const messageCount = ref(db, "count/" + uid);

  set(messageCount, 0);
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    success(data);
  });
};

export const readUserList = (success) => {
  const chatRef = ref(db, "chat/");
  const messageCount = ref(db, "admin_count/");
  let count = null;

  onValue(messageCount, (snapshot) => {
    count = snapshot.val();

    onValue(chatRef, (snapshot) => {
      const list = [];

      const data = snapshot.val();
      const keys = Object.keys(data);
      const values = Object.values(data);

      for (const uid in keys) {
        list.unshift({
          uid: keys[uid],
          author: Object.values(values[uid])[0].author,
          count: count[keys[uid]],
        });
      }

      success(list);
    });
  });
};

export const writeAdminChat = (uid, message, success) => {
  const { displayName } = store.getters.getUser;
  const chatRef = push(ref(db, "chat/" + uid));
  const messageCount = ref(db, "count/" + uid);
  let count = 0;

  onValue(messageCount, (snapshot) => {
    count = snapshot.val();
  });

  set(chatRef, {
    author: displayName,
    role: "admin",
    createdAt: Date.now(),
    message,
  })
    .then(() => {
      success();
      set(messageCount, ++count);
    })
    .catch((e) => console.error(e));
};

export const readAdminChat = (uid, success) => {
  const chatRef = query(ref(db, "chat/" + uid, orderByChild("createdAt")));
  const messageCount = ref(db, "admin_count/" + uid);

  set(messageCount, 0);

  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    success(data);
  });
};

export const getAllCount = (success) => {
  const { uid } = store.getters.getUser;

  const messageCount = ref(db, "count/" + uid);

  onValue(messageCount, (snapshot) => {
    success(snapshot.val());
  });
};

export const getAdminAllCount = (success) => {
  const messageCount = ref(db, "admin_count");

  onValue(messageCount, (snapshot) => {
    success(Object.values(snapshot.val()).reduce((acc, item) => (acc += item)));
  });
};
