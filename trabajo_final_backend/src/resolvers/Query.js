import "babel-polyfill";
import { ObjectID, ObjectId } from "mongodb";

const Query = {
    users: async (parent, args, context, info) => {
        const {client} = context;
        const db = client.db("trabajoFinal");
        const collection = db.collection("users");

        const result = await collection.find({}).toArray();

        return result;
    },

    notes: async (parent, args, context, info) => {
        const {username, token} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const usersCollection = db.collection("users");
        const notesCollection = db.collection("notes");

        const user = await usersCollection.findOne({username, token});

        if(!user) {
            throw new Error(`User not logged in or not found.`);
        }

        let result = [];

        user.notes.forEach(_id => {
            result.push(notesCollection.findOne({_id}));
        });

        return result;
    }
}

export {Query as default};