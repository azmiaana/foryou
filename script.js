const firebaseConfig = {
  apiKey: "AIzaSyA-CCHcGmHhd2L4Z8UGMPYWJkzCQxPRSWw",
  authDomain: "foryou-f8027.firebaseapp.com",
  databaseURL: "https://foryou-f8027-default-rtdb.firebaseio.com",
  projectId: "foryou-f8027",
  storageBucket: "foryou-f8027.firebasestorage.app",
  messagingSenderId: "818578274056",
  appId: "1:818578274056:web:5cc28770ff337d9e3a5ebd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Works Section Logic
const checkboxes = document.querySelectorAll('#works input[type="checkbox"]');
const feedback = document.getElementById('feedback');

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const selected = document.querySelectorAll('#works input:checked').length;
        if (selected === 1) {
            feedback.textContent = "You're a curious reader 🌷";
        } else if (selected === 2) {
            feedback.textContent = "You really enjoy her stories";
        } else if (selected === 3) {
            feedback.textContent = "You're a true Bunpei reader 🤍";
        } else {
            feedback.textContent = "";
        }
        feedback.style.animation = 'none';
        setTimeout(() => feedback.style.animation = 'fadeIn 0.5s ease', 10);
    });
});

// Messages Section Logic
const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;

    db.collection('messages').add({
        name: name,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    });
});

// Real-time listener for messages
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    messageList.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `<h3>${data.name}</h3><p>${data.message}</p>`;
        messageList.appendChild(card);
    });
    // Auto-scroll to newest
    messageList.scrollTop = messageList.scrollHeight;
});
