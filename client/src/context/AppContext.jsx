// ...existing code...
import React, { createContext, use, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export const AppContext = createContext();
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
const[token,setToken] = useState(localStorage.getItem('token'))
const[credit,setCredit] = useState(false)
const navigate = useNavigate()
  const backendUrl  = import.meta.env.VITE_BACKEND_URL;

  const loadCreditData = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/user/credits", {
      headers: { token }
    });

    const data = response.data;

    if (data.success) {
      setCredit(data.credits); // not data.credits
      setUser(data.user);
    } else {
      toast.error(data.message || "Failed to load credit");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const generateImage = async(prompt)=>{
   
  try {
    const { data} = await axios.post(backendUrl + "/api/image/generate-image",{prompt},{headers:{token}})
    if(data.success){
     loadCreditData();
     return data.resultImage;
    }
    else {
  toast.error(data.message || "Image generation failed.");
  loadCreditData();
  if (data.creditBalance === 0) {
    navigate('/buy');
  }
}

    
  } catch (error) {
    toast.error(error.message);
  }

}

const logout = () =>{
localStorage.removeItem("token")
setToken("")
setUser(null)


}

useEffect(()=>{
  if(token){
    loadCreditData();
  }
},[token])

  const value = { user, setUser, showLogin, setShowLogin ,backendUrl ,token,setToken,credit,setCredit,loadCreditData,logout,generateImage};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;