import React, { useEffect } from 'react'
import RegisterForm from '../Components/RegisterForm'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            navigate("/dashboard");
        }

        // eslint-disable-next-line 
    }, [])
    

    return (
        <div className='flex flex-grow justify-center space-x-40 items-center'>
            <div className='w-1/3'>
                <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
            </div>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage
