import { MongoClient } from "mongodb";

// IIFE ensures that dbClient is defined 
// immediately and returned to dbConnection
const dbConnection = (() => {
    let dbClient = null;
    const uri = "mongodb://MNG1:MNG001@localhost:27017/"
    
    const getClient = () => {
        return new MongoClient(uri);
    }

    return { getAsync: async() => {
        try{
            if(dbClient == null){
                console.log("Getting DB Connection");
                dbClient = getClient();
                await dbClient.connect();
            }
            return dbClient;
        }
        catch(e){
            return e
        }
    }, 
    get: () => {
        try{
            if(dbClient == null){
                console.log("Getting DB Connection");
                dbClient = getClient();
                dbClient.connect();
            }
            return dbClient;
        }
        catch(e){
            return e
        }
    }} 
})();

const priorityQueueConfig = (async ()=> {
    let prioritydata = null;
    const conn = await dbConnection.getAsync();
    const pColl = await conn.db("queue").collection("pQueueConfig")

    const pConfig = (await (await pColl.find()).toArray())
    
    const pConfigSettings = {}
    pConfig.forEach(e => {
        pConfigSettings[e["topic"]] = e;
    });

    return pConfigSettings;
})();

const getCollectionAsync = async (_db, _col) => {
    const conn = await dbConnection.getAsync()
    return conn.db(_db).collection(_col)
}

const getCollection = (_db, _col) => {
    const conn = dbConnection.get()
    return conn.db(_db).collection(_col)
}

export {
    getCollection,
    getCollectionAsync,
    priorityQueueConfig
};