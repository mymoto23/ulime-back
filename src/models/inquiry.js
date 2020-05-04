import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Inquiry = new Schema({
    title: String,
    email: String,
    content: String
});

export default mongoose.model('Inquiry', Inquiry);