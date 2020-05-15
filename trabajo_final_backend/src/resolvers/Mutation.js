import "babel-polyfill";
import uuid from "uuid";
import { ObjectID, ObjectId } from "mongodb";

const Mutation = {
    register: async (parent, args, context, info) => {
        const {username, password} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const collection = db.collection("users");

        if(await collection.findOne({username})){
            throw new Error(`The username ${username} is already in use.`);
        }

        const user = {
            username,
            password,
            token: undefined,
            notes: [],
        };

        return (await collection.insertOne(user)).ops[0];
    },

    login: async (parent, args, context, info) => {
        const {username, password} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const collection = db.collection("users");

        const token = uuid.v4();

        const user = await collection.findOneAndUpdate({username, password}, {$set: {token}}, {returnOriginal: false});

        if(!user.value){
            throw new Error(`username/password combination not found.`);
        }

        return user.value;
    },

    addNote: async (parent, args, context, info) => {
        const {username, token, title, body} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const usersCollection = db.collection("users");
        const notesCollection = db.collection("notes");

        const user = await usersCollection.findOne({username, token});

        if(!user){
            throw new Error(`User not logged in or not found.`);
        }

        const note = {
            title,
            body,
            color: {
                r: 0xFF,
                g: 0xFF,
                b: 0xFF
            }
        };

        const result = (await notesCollection.insertOne(note)).ops[0];

        user.notes.push(result._id);
        const notes = user.notes;

        await usersCollection.findOneAndUpdate({username, token}, {$set: {notes}});

        return result;
    },

    editNote: async (parent, args, context, info) => {
        const {username, token, _id, title, body, r, g, b} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const usersCollection = db.collection("users");
        const notesCollection = db.collection("notes");

        const user = await usersCollection.findOne({username, token});

        if(!user){
            throw new Error(`User not logged in or not found.`);
        }

        let noteFound = user.notes.some(note => note == _id);

        if(!noteFound) {
            throw new Error(`Note not found.`);
        }

        if(r < 0x00) {
            r = 0x00;
        } else if(r > 0xFF) {
            r = 0xFF;
        }

        if(g < 0x00) {
            g = 0x00;
        } else if(g > 0xFF) {
            g = 0xFF;
        }

        if(b < 0x00) {
            b = 0x00;
        } else if(b > 0xFF) {
            b = 0xFF;
        }

        const color = {r, g, b};

        const result = await notesCollection.findOneAndUpdate({_id: ObjectID(_id)}, {$set: {title, body, color}}, {returnOriginal: false});

        return result.value;
    },

    removeNote: async (parents, args, context, info) => {
        const {username, token, _id} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const usersCollection = db.collection("users");
        const notesCollection = db.collection("notes");

        let indexToRemove;

        const user = await usersCollection.findOne({username, token});

        if(!user){
            throw new Error(`User not logged in or not found.`);
        }

        let noteFound = user.notes.some((note, index) => {
            if(note == _id) {
                indexToRemove = index;
                return note;
            }
        });

        if(!noteFound) {
            throw new Error(`Note not found.`);
        }

        user.notes.splice(indexToRemove, 1);

        let notes = user.notes;

        await usersCollection.findOneAndUpdate({username, token}, {$set: {notes}});

        const result = await notesCollection.findOneAndDelete({_id: ObjectID(_id)});

        return result.value;
    },

    logout: async (parent, args, context, info) => {
        const {username, token} = args;

        const {client} = context;
        const db = client.db("trabajoFinal");
        const collection = db.collection("users");

        const user = await collection.findOneAndUpdate({username, token}, {$set: {token: undefined}}, {returnOriginal: false});

        if(!user.value){
            throw new Error(`User not logged in.`);
        }

        return user.value;
    },
}

export {Mutation as default};