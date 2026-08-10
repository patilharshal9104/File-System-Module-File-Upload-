import express from "express";
import multer from "multer";
import path from 'path'

const app = express();


// app.post("/home",upload.single("file"), (req,res)=>{
//     console.log(req.file);
//     res.send("File uplaoded succesffully");
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

// const upload = multer({storage});

// app.post("/home",upload.single("file"), (req,res)=>{
//     console.log(req.file);
//     res.send("File uplaoded succesffully");
// })

const upload = multer({storage, limits:{
    fileSize: 1024 * 1024

},
fileFilter:(req, file, cb)=>{
    const allowed = ["image/png" , "image/jpeg" , "application/pdf"]
    if(allowed.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(new Error("File type not supported"), false)
    }
}
});

// app.post("/home",upload.array("file"), (req,res)=>{
//     console.log(req.files);
//     res.send("File uplaoded succesffully");
// })
 

//for multiple fields to upload like prevoiusly our fieldname is same files now if we wanted multiple ones we use fields methods instead of array.\


app.post("/upload", upload.fields([
    {name: "avatar", maxCount:1},
    {name: "Resume", maxCount: 1}
]), (req, res)=>{
    console.log(req.files);
    res.send("Done");
})




//file handling -: if limits exceed then we throw error and return directly so no uplodation done -:
//we used middleware inside middleware for this_:


// app.post("/upload", (req,res)=>{
//     upload.single("file")(req, res, (err)=>{
//         if(err.code === "LIMIT_FILE_SIZE"){
//             return res.send("File too large")
//         }
//         res.send("Upload");
//     })
// })







app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});