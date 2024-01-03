const mongo = require('mongodb')


async function connectDB(){
    // console.log(mongo)
    try{
        // const client = new mongo.MongoClient('mongodb://127.0.0.1:27017/SwiftDevelopmentDB')
        const client = new mongo.MongoClient('mongodb+srv://matthewlow99:11B4SAsdM8lMsIW0@swiftpms.crm8qn2.mongodb.net/SwiftPMS')
        const db = await client.connect()
        console.log('connected')
        return db.db();
    } catch(e){
        return e
    }

}
async function closeConnection(client){
    console.log('connection closed')
    return await client.close();
}

async function getDatabasesList(){
    const db = await connectDB();

    const list = await db.admin().listDatabases()
    await closeConnection(db.client)

    return list;
}
async function getCollections(){
    const db = await connectDB()
    const list = await db.listCollections({}, {nameOnly: true}).toArray()
    await closeConnection(db.client)
    return list;
}

async function queryCollection(collectionName, filterObj = {}, toArray = true) {
    const db = await connectDB();

    try {
        return await db.collection(collectionName);

        // return toArray ? collection.toArray() : collection;
    } finally {
        // Close the connection after working with the collection
        await closeConnection(db.client);
    }
}

async function addEntryToCollection(collectionName, object){
    const db = await connectDB()
    const data = await db.collection(collectionName).insertOne(object)
    await closeConnection(db.client)

    return data.insertedId;
}
async function databaseQuery(callback= async (client)=>{console.warn('No function provided')}){
    const db = await connectDB();
    try{
        return await callback(db);
    } catch (e) {
        return {e}
    } finally {
        await closeConnection(db.client)
    }
}

function objectID(str_id){
    return  str_id ? new mongo.ObjectId(str_id) : str_id
}
function objectIDArray(arr){
    const temp = [];
    for(const e of arr){
        temp.push(objectID(e))
    }
    return temp;
}
function objectIDJSON(obj){
    try{
        if(Object.keys(obj).length == 0)
            return null;
        obj[Object.keys(obj)[0]] = objectID(Object.values(obj)[0]);
        return obj
    } catch (e) {
        return null;
    }
}

async function fetchDataFromDB(collectionName, filter={}, tenantID="-1", unwindField="customer"){
    return await databaseQuery(async (client) => {
        return await client.collection(collectionName).aggregate([
            {
                $match: {tenantID}
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectID',
                    foreignField: '_id',
                    as: 'project',
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerID',
                    foreignField: '_id',
                    as: 'customer',
                }
            },
            {
                $lookup: {
                    from: 'tickets',
                    localField: 'tickets',
                    foreignField: '_id',
                    as: 'tickets',
                }
            },
            {
                $unwind: {
                    path: `$${unwindField}`,
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: `$customer`,
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: filter
            }
        ]).toArray()
    })
}




module.exports = {objectIDArray, objectID, databaseQuery, fetchDataFromDB, objectIDJSON}