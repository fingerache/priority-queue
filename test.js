


const axios = require('axios')


const getData = async () => {
    try{
        const resp = await axios.get("http://localhost:4000/queue/priority?topic=default")
        return resp
    }
    catch(e){
        return e;
    }
}

const sendData = async () => {
    const uri = "http://localhost:4000/queue/priority"
    const data = {
        "data":  {
            "cdate": (new Date()).toISOString(),
            "authority": Math.round(Math.random()*10),
            "msg": "XYZ-"+
                (Math.round(Math.random()*100)).toString().padStart(4,'#')
        },
        "topic": "default"
    }

    try{
        const resp = await axios.post(uri,data, {
                headers: {'Content-Type': 'application/json'}
            })
        return resp
    }
    catch(e){

    }
}


const main = async () => {
    const response = await sendData()
    console.log(response["data"])
}


main().then(d=> {}).catch(e => {console.log(e)})