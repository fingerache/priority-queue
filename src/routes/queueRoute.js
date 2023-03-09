import { enqueuePriority, dequeuePriority, clearQueuePriority } from "../controllers/queueController";

const queueRoute = (app) => {
    app.route('/queue/priority').post(async (req, res) => {
        const body = req.body
        res.send(await enqueuePriority(body["data"], body["topic"]))
    })

    app.route('/queue/priority').get(async (req, res) => {
        const topic = req.query.topic
        res.send(await dequeuePriority(topic))
    })

    app.route('/queue/priority').delete(async (req, res) => {
        const topic = req.query.topic
        res.send(await clearQueuePriority(topic))
    })
}

export default queueRoute