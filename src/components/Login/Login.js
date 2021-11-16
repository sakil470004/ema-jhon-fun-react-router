
import { UserContext } from '../../App';


import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { initializeLoginFramework, handleGoogleSingIn, handleSingOut, createUserWithEmailAndPasswordByCustom, signInWithEmailAndPasswordByCustom } from './loginManager';

initializeLoginFramework()

function Login() {

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        complect: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const history = useHistory();
    const location = useLocation()

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSingIn = () => {

        handleGoogleSingIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            });

    }
    const signOut = () => {

        handleSingOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })

    }


    const handleBlur = (event) => {
        // console.log(event.target.name, event.target.value)
        let isFildValid = true;
        if (event.target.name === 'email') {
            isFildValid = /\S+@\S+\.\S+/.test(event.target.value)

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6
            const isPasswordContainNumber = /\d{1}/.test(event.target.value)
            isFildValid = isPasswordValid && isPasswordContainNumber;
            user.password = event.target.value
        }
        if (isFildValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (user.name && user.password) {
            createUserWithEmailAndPasswordByCustom(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })

        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPasswordByCustom(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })

        }
        console.log('okkk', user.email, newUser, user.password, 'sakil')
        e.preventDefault();
    }

    return (
        <div className="" style={{ textAlign: 'center', marginTop: '20px' }}>

            {user.isSignIn ?
                <button onClick={signOut} >Sing Out</button>
                : <button onClick={googleSingIn}>Sing In</button>

            }
            {
                user.isSignIn &&
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email ,{user.email}</p>
                    <img src={user.photo} alt=''></img>
                </div>
            }

            <h1>Our own Authentication</h1>

            <input type='checkbox' onChange={() => setNewUser(!newUser)} name='newUser' id='' />
            <label htmlFor="newUser">New User Sign</label>
            <form onSubmit={handleSubmit}>

                {newUser && <input type='text' name='name' onBlur={handleBlur} placeholder='Enter your name' />}
                <br />
                <input type='text' onBlur={handleBlur} placeholder='Your Email address' required name='email' />
                <br />
                <input type='password' onBlur={handleBlur} placeholder='your password' name='password' required />
                <br />
                <input type='submit' value='Submit' />
                <p style={{ color: 'red' }}>{user.error}</p>
                <p style={{ color: 'green' }}>{user.complect}</p>

            </form>
        </div>
    );
}

export default Login;
