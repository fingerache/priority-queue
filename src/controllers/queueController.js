import queueDao from "../DbAccess/queueDao"

const enqueuePriority = async (data, topic="default") => {
    const res = await queueDao.enqueuePriority(data, topic)
    return res
}

const dequeuePriority = async (topic="default") => {
    const res = await queueDao.dequeuePriority(topic)
    return res
}

const clearQueuePriority = async (topic="default", dequeuedOnly=true) => {
    const res = await queueDao.clearQueuePriority(topic, dequeuedOnly)
    return res
}

// const enqueue= (data) => {

// }

// const deque = (data) => {

// }

export {
    enqueuePriority, 
    dequeuePriority,
    clearQueuePriority
}