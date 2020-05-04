const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    title: String,
    bannerURL: String,
    thumbnail: {width: Number, height: Number, url: String},
    channelURL: String,
    subNum: Number,
    youtubeChannelID: String,
    intro: String,
    category: Number,
    titleENG: String,
});

module.exports = mongoose.model('channel', channelSchema);