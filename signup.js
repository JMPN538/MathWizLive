import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhgFL9kmRQ61RLeq4HqIGimNxoDxCGBHo",
  authDomain: "mathwiz-3b54e.firebaseapp.com",
  projectId: "mathwiz-3b54e",
  storageBucket: "mathwiz-3b54e.appspot.com",
  messagingSenderId: "560429917669",
  appId: "1:560429917669:web:401d368b83adc51802fb0c",
  measurementId: "G-4Z3NRDN21N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('loginButton')?.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value;
  const errorEl = document.getElementById('errorMessage');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth); // Sign out unverified user
      alert("Please verify your email before logging in. Check your inbox.");
      return;
    }

    // Get username from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;

    if (userData?.username) {
      // Optional: You can store the name for display (not required if using Firebase auth state elsewhere)
      console.log("Welcome, " + userData.username);
    }

    // Proceed to home
    window.location.href = "HomePageWithUser.html";

  } catch (error) {
    console.error(error);
    errorEl.style.display = 'block';
    errorEl.textContent = "Invalid email or password.";
  }
});
