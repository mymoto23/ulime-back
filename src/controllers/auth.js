import User from '../models/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import crypto from 'crypto';
import config from '../config';

export const checkIfUserAlreadyExists = async (username) => { //returns false if doesnt exist
    const user = await User.findOne({username}).exec();
    return !_.isEmpty(user); 
}

export const registerNewUser = async (user_data) => {
    if ((await checkIfUserAlreadyExists(user_data.username))) {
        throw new Error('User already exists');
    } else {
        const encrypted = crypto.createHmac('sha1', config.secret)
            .update(user_data.password)
            .digest('base64');
        const user = new User({
            ...user_data,
            password: encrypted,
        });
        return await user.save();
    }
}

export const login = async (username, password, secret) => {
    const user = await User.findOne({username}).exec();
    if (_.isEmpty(user)) {
        throw new Error('User not found');
    } else {
        const encrypted = crypto.createHmac('sha1', config.secret)
            .update(password)
            .digest('base64');
        if (user.password === encrypted) {
            const tokenPromise = new Promise((resolve, reject) => {
                jwt.sign(
                    {...user},
                    secret,
                    {
                        expiresIn: '2h',
                        issuer: 'ulime.com',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(token);
                        }
                    }
                );
            });
            return tokenPromise;
        } else {
            throw new Error('Password does not match');
        }
    }
}