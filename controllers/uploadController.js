export const uploadFile = (req, res) => {
    console.log(req.file);
    res.send("File uploaded");
};