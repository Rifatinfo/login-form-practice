

import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";





const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const emailRef = useRef(null);

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset user
        setSuccess('');
        setShowPassword('');
        setErrorPassword('');
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if(result.user.emailVerified){
                    setSuccess('Logged in successfully');
                }
                else{
                    alert('Please verify your email address');
                }
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
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('please Provided a email', emailRef.current.value)
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('please write a valid email')
            return;
        }
        // send validation email 
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email')
            })
            .catch(error => {
                console.log(error);
            })
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
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                        ref={emailRef}
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
                            <a  onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>

                <div>
                    {
                        registerError && <p className="text-center font-bold text-red-600">{registerError}</p>
                    }
                </div>
                <p className="text-center">New to this website? Please <a className="text-red-500" href="">Register</a></p>
            </div>
        </div>
    );
};

export default Register;