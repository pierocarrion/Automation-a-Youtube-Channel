import { Schema } from 'mongoose';
import { connectDB } from '../databases/mongo';

const RedditVideoSchema = new Schema(
    {
        videoUrl: { type: String },
        processed: { type: Boolean },
    },
    { timestamps: true }
);
const RedditVideoModel = connectDB.model('RedditVideo', RedditVideoSchema);

export default RedditVideoModel;
