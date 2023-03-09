
import { priorityQueueConfig } from "../../mongodb"
import queueDao from "../DbAccess/queueDao"


const priorityConvConfig= {
    "datetime": {
        "conv": {
            "epochSec": (dt, max, order, padLength) => {
                const dtt = new Date(dt)
                let v = Math.round(dtt.getTime()/1000)
                if(order == "desc"){
                    v = max - v
                }

                return v.toString().padStart(padLength, '0')
            }
        }
    },
    "int": {
        "conv": {
            "int": (v, max, order, padLength) => {
                let d = v
                if(order == 'desc'){
                    d = max - d
                }

                return d.toString().padStart(padLength, '0')
            }
        }
    }
}

const getPFieldValue = (value, field) => {
    let func = priorityConvConfig[field["type"]]["conv"][field["conv"]]

    return func(value, field["max"], field["order"], field["padLength"])
}

const getPriority = async (data, topic) => {
    // console.log(data)
    // console.log(topic)
    const pConfig = (await priorityQueueConfig)[topic]
    // console.log(pConfig); return 0
    let priority = ""
    pConfig["fields"].forEach( (field) => {
        // console.log(field)
        priority +=  getPFieldValue(data[field["field"]], field)
    });
    // console.log(priority)
    return priority
}


const clearDequeueData = async () => {
    return await queueDao.clearDequeueDataPriority()
}

export {
    priorityConvConfig,
    getPriority,
    clearDequeueData
}