import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getDatabase, ref, onValue, remove }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// Paste the same Firebase configuration used in script.js.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const registrationsRef = ref(db, "registrations");

onValue(registrationsRef, function(snapshot) {
    const list = document.getElementById("registrationList");
    list.innerHTML = "";
    let count = 0;

    snapshot.forEach(function(child) {
        count++;
        const data = child.val();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.regNo}</td>
            <td>${data.department}</td>
            <td>${data.event}</td>
            <td><button class="delete" onclick="deleteRegistration('${child.key}')">Delete</button></td>
        `;

        list.appendChild(row);
    });

    document.getElementById("count").innerText = count;
});

window.deleteRegistration = function(id) {
    remove(ref(db, "registrations/" + id));
};
