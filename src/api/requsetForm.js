import { app } from "@/firebase";
import store from "@/store";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import Swal from "sweetalert2";

const db = getDatabase(app);

export const addNewRequest = (payload, success) => {
  const { uid, displayName } = store.getters.getUser;
  const requestRef = push(ref(db, "requests/" + uid));

  let location = {};

  navigator.permissions.query({ name: "geolocation" }).then((result) => {
   if (result.state !== "denied") {
      navigator.geolocation.getCurrentPosition((position) => {
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;

        set(requestRef, {
          author: displayName,
          status: "waiting",
          location,
          ...payload,
        })
          .then(success)
          .catch((e) => console.error(e));
      });
    } else {
      Swal.fire({ title: "Error", html: "Location permission is not enabled! </br>Please enable your location", icon: "error" });
    }
  });
};

export const getRequestList = (success) => {
  const { uid } = store.getters.getUser;
  const getRequestRef = ref(db, "requests/" + uid);
  onValue(getRequestRef, (snapshot) => {
    const data = snapshot.val();
    success(data);
  });
};

export const getAllRequestList = (success) => {
  const getRequestRef = ref(db, "requests/");
  onValue(getRequestRef, (snapshot) => {
    const list = [];

    snapshot.forEach((data) => {
      const uid = data.key;
      const item = data.val();

      for (const id in item) {
        list.unshift({ uid, id, ...item[id] });
      }
    });

    success(list);
  });
};

export const setRequestStatus = (item, status, success) => {
  const getRequestRef = ref(db, `requests/${item.uid}/${item.id}`);
  item.status = status;
  item.updatedAt = Date.now();
  update(getRequestRef, item);
  onValue(getRequestRef, (snapshot) => {
    success(snapshot.val());
  });
};

export const getRequestDetails = (uid, id, success) => {
  const getRequestRef = ref(db, `requests/${uid}/${id}`);
  onValue(getRequestRef, (snapshot) => {
    success(snapshot.val());
  });
};
