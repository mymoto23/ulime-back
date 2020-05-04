import express from 'express';
import AuthRouter from './auth';
import ChannelRouter from './channel';
import InquiryRouter from './inquiry';
import PreRegisterRouter from './preregister';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('root');
});

router.use('/auth', AuthRouter);
router.use('/api', ChannelRouter);
router.use('/inquiry', InquiryRouter);
router.use('/preregister', PreRegisterRouter);

module.exports = router;