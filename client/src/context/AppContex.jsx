import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses,setAllCourses] = useState([]);
    const navigate = useNavigate()

    // Fetch all courses

    const fetchAllCourses = async ()=>{
   setAllCourses(dummyCourses);
    }

  useEffect(()=>{
  fetchAllCourses();
  },[])  
 const value ={
    currency,allCourses,navigate
 }


    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )
}
