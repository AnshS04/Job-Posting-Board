import React from 'react'

const RegisterFormInput = (props) => {
    const {placeholder, svg, value, setValue, type} = props;
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {svg}
      </div>
      <input
        type={type}
        id="email-address-icon"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default RegisterFormInput
