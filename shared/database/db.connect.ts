import mongoose from 'mongoose'

const connect = async ()=>{
    try {
        const uri =  process.env.MONGOURI
        const connection=  await mongoose.connect(uri!)
        if (connection) {
            console.log('database connected');
            
            
        }
    } catch (error) {
        console.log(error);
        
        
    }
}

export default connect