import { useContext, useState } from 'react'
import './register.scss'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () =>{
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
        email:undefined,
        city:undefined,
        phone:undefined,
        img:undefined,
        country: undefined
    })

    const {user,loading,error,dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        
        try{
        await axios.post('/api/auth/register', credentials)
        }catch(e){
            console.error(e)
            alert("Something went wrong!")
        }

        alert("Successful Registration!")
        navigate('/login')
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id='username' onChange={handleChange}  className="lInput" />
                <input type="password" placeholder="password" id='password' onChange={handleChange}  className="lInput" />
                <input type="text" placeholder="email" id='email' onChange={handleChange}  className="lInput" />
                <input type="text" placeholder="city" id='city' onChange={handleChange}  className="lInput" />
                <input type="number" placeholder="phone number" id='phone' onChange={handleChange}  className="lInput" />
                <input type="text" placeholder="country" id='country' onChange={handleChange}  className="lInput" />
                <button disabled={loading} className="lButton" onClick={handleClick}>Register</button>
                <Link to={'/login'}>Existing User? Login</Link>
                <Link to={'/'}>Go to Home</Link>
                {error && <span>{error.error}</span>}
            </div>
        </div>
    )
}

export default Register;