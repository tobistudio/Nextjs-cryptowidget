import { Schema, model, models } from "mongoose";

const AlertSchema = new Schema({
    title: {
        type: String,
        required: [true, "The Alert title is required "],
        trim: true,
        maxlength: [40, "title cannot be grater than 40 characters"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "description cannot be grater than 200 characters"],
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default models.Alert || model("Alert", AlertSchema);