// import React, { createContext, useContext, useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../services/firebase"
// import { doc, setDoc } from "firebase/firestore"


// const AuthContext = createContext();

// export function AuthContextProvider({ children }) {
//     const [user, setUser] = useState({});
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });

//         return () => {
//             unsubscribe();
//         } 
//     }, [])

//     async function signUp(email, password) {
//         try {
//             setError(null); // Clear previous errors
//             await createUserWithEmailAndPassword(auth, email, password);
    
//             // Create a new document in Firestore for the user
//             await setDoc(doc(db, "users", email), {
//                 favShows: [],
//             });
//         } catch (err) {
//             if (err.code === "auth/email-already-in-use") {
//                 setError("The email is already in use. Please log in or use a different email.");
//             } else {
//                 console.error("Error during sign-up:", err); 
//                 setError(err.message); 
//             }
//         }
//     }

//     function login(email, password) {
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     function logout() {
//         return signOut(auth);
//     }


//     return <AuthContext.Provider value={{user, signUp, login, logout}}>{children}</AuthContext.Provider>
// }

// export function UserAuth() {
//     return useContext(AuthContext)
// }



import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signUp(email, password) {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Use UID instead of email for Firestore doc
      await setDoc(doc(db, "users", user.uid), {
        favShows: [],
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("The email is already in use. Please log in or use a different email.");
      } else {
        console.error("Error during sign-up:", err);
        setError(err.message);
      }
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
