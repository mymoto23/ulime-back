import _ from 'lodash';
import express from 'express';
import {getChannelList, getChannelwithId, addNewChannel} from '../controllers/channel';

const router = express.Router();

router.get('/', (req,res) => {
    res.send('test');
})

router.get('/channels', getChannelList);

// router.get('/channels/:channel_id', async (req, res) => {
//     try {
//         const channel = await getChannelwithId(req.params.channel_id);
//         res.json(channel);
//     } catch (e) {
//         res.status(400).send(e.message);
//     }
// });

router.get('/channels/:channel_id', (req, res) => {
    getChannelwithId(req, res)
});

router.post('/channels', async (req, res) => {
    try {
        console.log('hit');
        const channel = await addNewChannel(req);
        res.status(201).json(channel);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})

export default router;

// module.exports = function(app, Channel) {
//     app.get('/api/channels', (req, res) => {
//         if (_.isEmpty(req.query)) {
//             Channel.find((err, channels) => {
//                 if (err) {
//                     return res.status(400).json({error: err});
//                 }
//                 res.json(channels);
//                 return;
//             });
//         } else {
//             Channel.find({category: req.query.category},(err, channels) => {
//                 console.log('params', req.query);
//                 if (err) {
//                     return res.status(400).json({error: err});
//                 }
//                 res.json(channels);
//             });
//         }
//     });

//     app.get('/api/channels/:channel_id', (req, res) => {
//         Channel.findOne({_id: req.params.channel_id}, (err, channel) => {
//             if (err) {
//                 return res.status(400).json({error: err});
//             }
//             if (!channel) {
//                 return res.status(404).json({error: 'Channel not found'});
//             }
//             res.json(channel);
//         })
//     })

//     app.post('/api/channels', async (req, res) => {
//         const api_info = await getChannelBannerAndTN(req.body.channelId);
//         const ch = new Channel({...api_info, intro: req.body.intro, category: req.body.category, titleENG: req.body.titleENG});
//         ch.save((err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(400).json({error: err});
//                 return;
//             }
//             res.status(201).json(ch);
//         });
//     })
// }