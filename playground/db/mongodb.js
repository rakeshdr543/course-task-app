const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = "mongodb+srv://root:root@cluster0.oxvs2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const databaseName = "task-manager"

const client = new MongoClient(connectionURL)

async function main() {
    await client.connect()
    console.log('Connected successfully to server');
    const db = await client.db(databaseName)

    // Update
    // await db.collection('tasks').updateMany({ completed: true }, { $set: { completed: false } })

    //Delete
    // await db.collection('users').deleteOne({ age: { $gte: 29 } })

    return 'Done'
}

main().then(console.log).catch(console.error).finally(() => client.close())