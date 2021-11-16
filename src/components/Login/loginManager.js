import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import firebaseConfig from './firebase.config'
const provider = new GoogleAuthProvider();
export const initializeLoginFramework = () => {
    
    const app = initializeApp(firebaseConfig);
}

export const handleGoogleSingIn = () => {

    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then((result) => {
            //  console.log(result)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const { displayName, photoURL, email } = result.user;
            //create new object
            const singedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL

            };

            return singedInUser;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log('error in singInPop')
        });
}
export const handleSingOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
        // Sign-out successful.
        const singedOutUser = {
            isSignIn: false,
            name: '',
            email: '',
            photo: '',

        }
        console.log("singOUted")
        return singedOutUser;
    }).catch((error) => {
        // An error happened.
    });
}

export const createUserWithEmailAndPasswordByCustom = (name,email,password) => {
    const auth = getAuth();
   return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            const newUserInfo = { ...user };
            newUserInfo.complect = "Successfully Created";
            newUserInfo.error = '';
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            const newUserInfo = {};
            newUserInfo.error = errorCode;
            newUserInfo.complect = '';
            console.log(errorCode)
           return newUserInfo;
        });
    // console.log(user.email,user.password)
}

export const signInWithEmailAndPasswordByCustom = (email,password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const newUserInfo = { ...user };
            newUserInfo.complect = "Successfully LogIn";
            newUserInfo.error = '';
           return newUserInfo;
            // history.replace(from)
            // console.log ('okkk')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {  };
            newUserInfo.error = errorCode;
            newUserInfo.complect = '';
            console.log(errorCode)
            return newUserInfo;
        });
}

//this function for update userInfo
const updateUser = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
}