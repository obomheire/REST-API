import mongoose from "mongoose";
import config from 'config'
import logger from './logger'

/*
function connect (){

    const dbUri = config.get<string>('dbUri')

    return mongoose
    .connect(dbUri)
    .then(() =>{
        console.log('Connected to Database')
    })
    .catch((error) =>{
        console.log('Unable to connect to database')
        process.exit(1)
    })
}

export default connect
*/

async function connect (){

    try{
        const dbUri = config.get<string>('dbUri')
        await mongoose.connect(dbUri)
        logger.info('Connected to Database')
    }
    catch(error){
        logger.error('Unable to connect to database')
        process.exit(1)
}
}

export default connect