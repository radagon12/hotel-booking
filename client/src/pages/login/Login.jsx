import { useContext, useState } from 'react'
import './login.scss'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () =>{
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const {user,loading,error,dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{

            const res = await axios.post("/api/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        }catch(err)
        {
            alert("wrong credentials")
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id='username' onChange={handleChange}  className="lInput" />
                <input type="password" placeholder="password" id='password' onChange={handleChange}  className="lInput" />
                <button disabled={loading} className="lButton" onClick={handleClick}>Login</button>
                <Link to={'/register'}>New user? Register Now!</Link>
                <Link to={'/'}>Go to Home</Link>
                {error && <span>{error.error}</span>}
            </div>
        </div>
    )
}

export default Login;