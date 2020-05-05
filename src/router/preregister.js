import express from 'express';
import {addNewPreRegister} from '../controllers/preregister';

const router = express.Router();

const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;

const checkIfAllFieldsValid = (body) => {
    const {name, email, youtubeChannelName, subscriberCount, category, affiliation, youtubeChannelURL} = body;
    if (!name || !regex.test(email) || !youtubeChannelName || subscriberCount < 0 || category === 100 || affiliation === 100 || !youtubeChannelURL) return false;
    return true;
}

router.post('/', async (req, res) => {
    if (checkIfAllFieldsValid(req.body)) {
        addNewPreRegister(req, res);
    } else {
        res.status(400).json({error: '정보를 정확히 기입해 주세요.'});
    }
})

export default router;
