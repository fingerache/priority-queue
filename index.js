import express from 'express'
import crmRoutes from './src/routes/crmRoute'
import bodyParser from "body-parser"
import queueRoute from './src/routes/queueRoute'
import { initDB, autoQueueClear } from './src/util/initUtils'


const app = express()
const PORT = 4000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

queueRoute(app);


app.get('/ping', (req, res) => {
    res.send(`Pong received at: ${(new Date()).toISOString()}`)
})

const init = async () => {
    await initDB();
    const intervalHandle = await autoQueueClear();
}


app.listen(PORT, async () => {
    init();
    console.log("server started at port:"+ PORT)
})