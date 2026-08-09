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

const upload = multer({storage});

app.post("/home",upload.array("file"), (req,res)=>{
    console.log(req.files);
    res.send("File uplaoded succesffully");
})

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});