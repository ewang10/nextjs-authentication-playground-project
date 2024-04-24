import { MongoClient } from 'mongodb';

export async function connectToDB() {
    const client = await MongoClient.connect('mongodb+srv://ericwang:yulWpggdd7cTDZFa@cluster0.vr7lvbq.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0');

    return client;
}
