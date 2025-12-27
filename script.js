import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// CONFIG DARI FIREBASE KAMU
const firebaseConfig = {
  apiKey: "AIzaSyA-CCHcGmHhd2L4Z8UGMPYWJkzCQxPRSWw",
  authDomain: "foryou-f8027.firebaseapp.com",
  databaseURL: "https://foryou-f8027-default-rtdb.firebaseio.com",
  projectId: "foryou-f8027",
  storageBucket: "foryou-f8027.firebasestorage.app",
  messagingSenderId: "818578274056",
  appId: "1:818578274056:web:5cc28770ff337d9e3a5ebd"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// KIRIM PESAN
window.sendMessage = function () {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (message.trim() === "") return;

  push(ref(database, "messages"), {
    name: name || "Anonymous",
    message: message
  });

  document.getElementById("message").value = "";
};

// AMBIL PESAN
const messagesRef = ref(database, "messages");
onValue(messagesRef, (snapshot) => {
  const container = document.getElementById("messages");
  container.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    const div = document.createElement("div");
    div.className = "message-box";
    div.innerHTML = `<b>${data.name}</b><br>${data.message}`;
    container.appendChild(div);
  });
});
