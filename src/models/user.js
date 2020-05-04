const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
})

// const userObj = mongoose.model('User', User);

// User.statics.create = (username, password) => {
//     const user = new this({
//         username,
//         password
//     });
//     return user.save();
// }

// User.statics.findOneByUsername = (username) => {
//     return this.findOne({
//         username: username
//     }, (err, user) => {
//         if (err) {
//             return err;
//         } else {
//             return user;
//         }
//     }); //can call findOne() method without specifying callback function
// }


module.exports = mongoose.model('User', User);