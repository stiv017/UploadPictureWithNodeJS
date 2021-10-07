const UploadModel=require('../model/schema');
const fs=require('fs');

exports.home=async(req,res)=>{
    const all_images=await UploadModel.find();
    res.render('main',{images:all_images});
}
exports.all=async(req,res)=>
{
    const all_items=await UploadModel.find();

    res.json(all_items);
}
exports.uploads=(req,res,next)=>{
    const files=req.files;
    
                  
    if(!files){
        const error=new Error("Please chose files");
        error.httpStatusCode=400;
        return next(error)
    }
    //convertBase64
    let imgArray=files.map((file)=>{
         let img=fs.readFileSync(file.path)
         return encode_image=img.toString('base64')
    })
    let result=imgArray.map((src,index)=>{
        let finalImg={
            filename:files[index].originalname,
            contentType:files[index].mimetype,
            imageBase64:src,
            nazivJela:req.body.nazivJela,
            opisJela:req.body.opisJela
        }
        let newUpload=new UploadModel(finalImg);
        return newUpload
                .save()
                .then(()=>{
                    return{msg:`${files[index].originalname}Upload Succesfuly`}
                })
                .catch(error=>{
                    if(error){
                        if(error.name==='Mongo Error' && error.code===11000)
                        {
                            return Promise.reject({error:`Duplicate ${files[index].originalname}.File Alredy Exist`})
                        }
                        return Promise.reject({error:error.message || `Cannot Upload ${files[index].originalname}Something Missing`})
                    }
                })
    });
    //res.json(imgArray);
    Promise.all(result)
                .then(msg=>{
                    res.json(msg);
                   // res.redirect('/')
                })
                .catch(err=>{
                    res.json(err);
                })
}