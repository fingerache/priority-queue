
import { getCollectionAsync } from "../../mongodb"
import { clearDequeueData } from "./priorityUtil"


const initDB = async () => {
    // initialize singleton DB Connection
    console.log('loading mongodb connection...')
    const tempColl = await getCollectionAsync('test', 'temp')
    const data = await tempColl.findOne()
    
}

const autoQueueClear = async () => {
    const intervalHandle = await setInterval(async ()=> {
        const resp = await clearDequeueData()
        console.log(resp)
    }, 10000)

    return intervalHandle
}

export {
    initDB,
    autoQueueClear
}