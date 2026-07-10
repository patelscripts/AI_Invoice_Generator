import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, FileText, Loader2, Lock, Mail } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/helper';
import { API_PATHS } from '../../utils/ApiPath';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email :"",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email:"",
    password:""
  });
  const [touched, setTouched] = useState({
    email:false,
    password:false
  });

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) =>({
      ...prev,
      [name]:value,
    }))

    // Real Time validation
    if(touched[name]){
      const newFieldErrors = {...fieldErrors};
      if(name === "email"){
        newFieldErrors.email = validateEmail(value);
      }else if(name === "password"){
        newFieldErrors.password = validatePassword(value)
      }
      setFieldErrors(newFieldErrors)
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const newFieldErrors = { ...fieldErrors };
    if (name === "email") {
      newFieldErrors.email = validateEmail(formData.email);
    } else if (name === "password") {
      newFieldErrors.password = validatePassword(formData.password);
    }
    setFieldErrors(newFieldErrors);
  };

  const isFormValid = () => {
      const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);
      return !emailError && !passwordError && formData.email && formData.password;
  };

  const handleSubmit = async() => {
    // Validate all fields before submit
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

      if (response.status === 200) {
        const {token} = response.data;
        if(token){
          setSuccess("Login successful! Redirecting...");
          login(response.data, token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
      }
    }else{
      setError(response.data.message || "Invalid credentials.");
    }
    } catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message);
      }else{
        setError("An error occurred. Please try again.");
      } 
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='w-12 h-12 bg-linear-to-r from-blue-950 to-blue-900 rounded-xl mx-auto mb-6 flex items-center justify-center'>
            <FileText className='w-6 h-6 text-white'/>
          </div>
          <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Login to your Account</h1>
          <p className='text-gray-600 text-sm'>Welcome back to Invoice Generator</p>
        </div>

        {/* Form */}
        <div className='space-y-4'>
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
              <input 
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                fieldErrors.email && touched.email
                ?"border-red-300 focus:ring-red-500"
                :"border-gray-300 focus:ring-black"
              }`} 
              placeholder='Enter your email'/>
            </div>
            {fieldErrors.email && touched.email && (
              <p className='mt-1 text-sm text-red-600'>{fieldErrors.email}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
              <input 
              name='password'
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                fieldErrors.password && touched.password
                ?"border-red-300 focus:ring-red-500"
                :"border-gray-300 focus:ring-black"
              }`} 
              placeholder='Enter your password'/>
              <button 
              type='button'
              onClick={()=> setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5'/>
                ):(
                  <Eye className='w-5 h-5'/>
                )}
              </button>
            </div>
            {fieldErrors.password && touched.password && (
              <p className='mt-1 text-sm text-red-600'>
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Error/Success Message */}
          {error && (
            <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-red-600 text-sm'>
                {error}
              </p>
            </div>
          )}

          {success && (
            <div className='p-3 bg-green-50 border-green-200 rounded-lg'>
              <p className='text-green-600 text-sm'>{success}</p>
            </div>
          )}

          {/* Sign in Button */}
          <button 
          className='w-full bg-linear-to-r from-blue-950 to-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center group'
          onClick={handleSubmit}
          disabled = {isLoading || !isFormValid()}
          >
            {isLoading ? (
              <>
              <Loader2 className='w-4 h-4 animate-spin'/>
              Signing in...
              </>
            ) : (
              <>
              Sign in
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform'/>
              </>
            )}
          </button>
        </div>
        {/* footer */}
        <div className='mt-6 pt-4 border-t border-gray-200 text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an Account?{" "}
            <button
            className='text-black font-medium hover:underline cursor-pointer'
            onClick={()=> navigate("/signup")}>SignUp</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
