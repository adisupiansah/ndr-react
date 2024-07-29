import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import {auth, database} from "../../sdk/Firebase/FirebaseSDK";
import { ref, set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // simpan user ke local storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            // jika user ada, simpan user ke local storage
            if(user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        })

        return unsubscribe; 
    }, [])

    // login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }

    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // masukan ke database
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(). toISOString()
            })
            console.log('berhasil daftar manual ni guys', user);
        })
        .catch((error) => {
            console.error('ada error ni pak di bagian register - LoginProvider.jsx', error);
        });
    }

    const logout = () => {
        return signOut(auth)
        // hapus user dari local storage
        .then(() => {
            localStorage.removeItem('user');
        })
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return signInWithPopup(auth, provider)

        // tambah user ke database
        .then((result) => {
            const user = result.user;
            // masukan ke database
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString()
            })
        })
        .catch((error) => {
            console.error('ada error ni pak di bagian loginWithGoogle', error);
        })
    }


    return (   
        <LoginContext.Provider value={{ user, login, register, logout, loginWithGoogle }}>
            {children}
        </LoginContext.Provider>
    )
}
export const useLogin = () => useContext(LoginContext)
export { LoginContext, LoginProvider }