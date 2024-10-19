import React from 'react'
import RegisterForm from '../Components/RegisterForm'

const RegisterPage = () => {
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
