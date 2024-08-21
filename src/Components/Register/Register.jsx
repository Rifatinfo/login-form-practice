
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import {  useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');


    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted,name);

        // reset user
        setSuccess('');
        setShowPassword('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('successfully create a user');

                // update profile 
                updateProfile(loggedUser, {
                    displayName : name,
                    photoURL : "http://localhost:5173/?email=realostyles%40gmail.com&password=1234567#"
                })
                .then( () => console.log('profile updated'))
                .catch()

                // send verification email 
                sendEmailVerification(result.user)
                .then(() => {
                    alert('Please check your email and verify your account');
                })

            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })



        if (password.length < 6) {
            setErrorPassword('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorPassword('Password must contain at least one uppercase character')
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setErrorPassword('Password must contain at least one lowercase character')
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setErrorPassword('Password must contain at least one number character')
            return;
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrorPassword('Password must contain at least one special character')
            return;
        }
        else if (!accepted) {
            setRegisterError('Please accept our terms and condition')
            return;

        }
    }

 
    return (
        <div className="hero bg-base-200 min-h-screen">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div>
                    {
                        success && <p className="text-center font-bold text-green-600">{success}</p>
                    }
                </div>
                <div>
                    {
                        errorPassword && <p className="text-center font-bold text-red-600">{errorPassword}</p>
                    }
                </div>
                <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input 
                        type="name" 
                        name="name" 
                        placeholder="Your name" 
                        className="input input-bordered" 
                        required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className="input input-bordered"
                            required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className="input input-bordered relative"
                            required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute mt-12 ml-72">
                            {
                                showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                            }
                        </span>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <div className="flex gap-2 mt-6">
                            <input type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms">Accept Our <a>terms and Condition</a></label>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-error">Register Now</button>
                    </div>
                </form>

                <div>
                    {
                        registerError && <p className="text-center font-bold text-red-600">{registerError}</p>
                    }
                </div>
                <p className="text-center">Already have an account <a className="text-red-500" href="">Login</a></p>
            </div>
        </div>
    );
};

export default Register;