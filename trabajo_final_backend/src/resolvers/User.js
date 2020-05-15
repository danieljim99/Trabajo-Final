import "babel-polyfill";
import { ObjectID } from "mongodb";

const User = {
    notes: async (parent, args, context, info) => {
        const {client} = context;
        const db = client.db("trabajoFinal");
        const collection = db.collection("notes");

        let result = []; 

        parent.notes.forEach(_id => {
            result.push(collection.findOne({_id}));
        });

        return result;
    }
}

export {User as default};