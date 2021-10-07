const mongoose=require('mongoose');

const uploadSchema=mongoose.Schema({
    filename:{
        type:String,
        unique:true,
        require:true
    },
    contentType:{
        type:String,
        require:true
    },
    imageBase64:{
        type:String,
        require:true
    },
    nazivJela:{
        type:String,
        require:true
    },
    opisJela:{
        type:String,
        require:true
    }
})
module.exports=UploadModel=mongoose.model('uploads',uploadSchema);