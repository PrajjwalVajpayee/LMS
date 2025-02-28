import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses,setAllCourses] = useState([]);
    const [isEducator,setIsEducator] = useState(true);
    const navigate = useNavigate()

    // Fetch all courses

    const fetchAllCourses = async ()=>{
   setAllCourses(dummyCourses);
    }
    //   function to calc avg rating

    const calculateRating = (course)=>{
       if(course.courseRatings.length === 0){
        return 0;
       }
       let totalRating = 0;
       course.courseRatings.forEach(rating =>{
        totalRating+=rating.rating;
       })
       return totalRating/course.courseRatings.length;
}  
//    function to calculate chapter Time
const calculateChapterTime = (chapter)=>{
   let time =0;
   chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration)
   return humanizeDuration(time*60*1000 ,{unit:['h','m']});

}
//  fuction to calculate course Duration

const calculateCourseDuration = (course) =>{
    let time=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration))
    return humanizeDuration(time*60*1000 ,{unit:['h','m']});
}

//  function to claculate no of lectures in the course

 const calculateNoOfLectures = (course)=>{
    let totalLectures =0;
    course.courseContent.forEach(chapter => {
        if(Array.isArray(chapter.chapterContent)){
            totalLectures += chapter.chapterContent.length;
        }
    })
    return totalLectures;
 }

useEffect(()=>{
  fetchAllCourses();
  },[])  
 const value ={
    currency,allCourses,navigate,
    calculateRating,isEducator,setIsEducator,
    calculateChapterTime,calculateNoOfLectures ,calculateCourseDuration
 }


    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )
}
