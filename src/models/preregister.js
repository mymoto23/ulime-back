import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PreRegister = new Schema({
    name: String,
    email: String,
    youtubeChannelName: String,
    subscriberCount: Number,
    category: Number,
    affiliation: Number,
    youtubeChannelURL: String
});

export default mongoose.model('PreRegister', PreRegister);