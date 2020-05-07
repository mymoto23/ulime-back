import Channel from '../models/channel';
import { getChannelBannerAndTN } from '../api/api';
import _ from 'lodash';

export const getChannelList = (req, res) => {
    if (_.isEmpty(req.query)) {
        Channel.find((err, channels) => {
            if (err) {
                return res.status(400).json({error: err});
            }
            return res.json(channels);
        });
    } else {
        Channel.find({category: req.query.category},(err, channels) => {
            if (err) {
                return res.status(400).json({error: err});
            }
            return res.json(channels);
        });
    }
}

export const getChannelwithId = (req, res) => {
    try {
        Channel.findOne({_id: req.params.channel_id}, (err, channel) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            if (!channel) {
                res.status(404).send(new Error('Channel not found'));
                return;
            } else {
                res.json(channel);
                return;
            }
        });
    } catch (e) {
        res.status(400).json({error: e.message});
        return;
    }
}

export const addNewChannel = async (req) => {
    console.log(req.body);
    const api_res = await getChannelBannerAndTN(req.body.channelId);
    console.log('res', api_res);
    const ch = new Channel({...api_res, intro: req.body.intro, category: req.body.category, titleENG: req.body.titleENG});
    ch.save((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        return ch;
    });
}

export const updateAllChannels = async () => {
    const channels = await Channel.find((err, channels) => {
        if (err) return err;
        else return channels;
    })
    channels.map(ch => updateChannelInfo(ch._id));
}

const updateChannelInfo = async (channel_id) => {
    const channel = await Channel.findOne({_id: channel_id},(err, channel) => {
        if (err) throw new Error ('Channel Find Error');
        else return channel;
    });
    try {
        const api_res = await getChannelBannerAndTN(channel.youtubeChannelID);
        await Channel.updateOne(channel, api_res, {runValidators: true});
    } catch (e) {
        return e;
    }
}