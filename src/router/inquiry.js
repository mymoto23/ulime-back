import express from 'express';
import Inquiry from '../models/inquiry';
import _ from 'lodash';

const router = express.Router();

const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;

router.post('/', (req, res) => {
    console.log('req body', req.body);
    if (!_.isEmpty(req.body)) {
        if (regex.test(req.body.email)) {
            try {
                const inquiry = new Inquiry(req.body);
                inquiry.save((err) => {
                    if (err) throw err;
                });
                res.status(201).json(inquiry);
            } catch(e) {
                res.status(400).json({error: e});
            }    
        } else {
            res.status(400).json({error: 'Email is not in proper format'});
        }
    } else {
        res.status(400). json({error: 'No request body content'});
    }
});

export default router;