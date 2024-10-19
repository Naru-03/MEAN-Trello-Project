import { Schema, model } from "mongoose";
import { BoardDocument } from "../types/boards.interface";

const boardSchema = new Schema<BoardDocument>({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId is required']
    }

})

export default model<BoardDocument>("Board", boardSchema);