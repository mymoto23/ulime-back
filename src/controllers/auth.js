import User from '../models/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import crypto from 'crypto';
import config from '../config';

export const registerNewUser = async (username, password) => {
    const user = await User.findOne({username}).exec();
        if (!_.isEmpty(user)) {
            throw new Error('User already exists');
        } else {
            const encrypted = crypto.createHmac('sha1', config.secret)
                .update(password)
                .digest('base64');
            const user = new User({
                username,
                password: encrypted
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