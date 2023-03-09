import { getCollectionAsync, priorityQueueConfig } from "../../mongodb";
import { getPriority } from "../util/priorityUtil";

const queueDao = {
    enqueuePriority: async (data, topic) => {
        const priority = await getPriority(data, topic)
        const coll = await getCollectionAsync("queue", "pQueue")
        const res = await coll.insertOne({
            "priority": priority,
            "topic": topic,
            "pulled": false,
            "data": data
        })

        return res
    },

    dequeuePriority: async (topic) => {
        const coll = await getCollectionAsync('queue', "pQueue")
        let pdata = await coll.findOneAndUpdate(
            {"topic": topic, "pulled": false}, 
            {$set: {"pulled": true}},
            {
                sort: {"priority": 1},
                projection: {
                    priority: 1,
                    data: 1,
                    _id: 0
                }
            }   
        )
        
        return {data: pdata["value"]};
    },

    clearQueuePriority: async (topic, dequeuedOnly) => {
        const coll = await getCollectionAsync('queue', "pQueue")
        const filter = {"topic": topic}
        if(dequeuedOnly){
            filter["pulled"] = true
        }
        let resp = await coll.deleteMany(filter)
        
        return resp;
    },

    clearDequeueDataPriority: async () => {
        const coll = await getCollectionAsync('queue', "pQueue")
        const filter = {"pulled": true}
        
        let resp = await coll.deleteMany(filter)
        
        return resp;
    }
}

export default queueDao
