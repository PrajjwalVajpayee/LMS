import Course from "../models/Course.js";

// Gat ALL Courses
export const getAllCourses = async(req,res)=>{
    try {
        const courses = await Course.find({isPublishe:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'})

        res.json({success:true,courses})
    } catch (error) {
        res.json({success:false,messsage:error.messsage})
    }
}

export const getCourseId = async(req,res)=>{
   const {id} = req.params
   
    try {
        const courseData = await Course.findById(id).populate({path:'educator'})

        courseData.courseContent.forEach(chapter =>{
            chapter.chapterContent.forEach(lecture =>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl= "";
                }
            })
        })
        res.json({success:true,courseData })
    } catch (error) {
        res.json({success:false,messsage:error.messsage})
    }
}