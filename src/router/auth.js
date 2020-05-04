import express from 'express';
import {registerNewUser, login} from '../controllers/auth';
import {authMiddleware} from '../middlewares/auth';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send("Test");
})

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const newUser = await registerNewUser(username, password);
        res.json(newUser);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    const secret_key = req.app.get('jwt-secret');
    try {
        const token = await login(username, password, secret_key);
        console.log('token', token);
        res.json({
            success: true,
            token
        });
    } catch (e) {
        res.send(e.message);
    }
});

router.use('/verifyToken', authMiddleware);
router.get('/verifyToken', async (req, res) => {
    res.json({
        verifed: true,
        info: req.decoded
    })
});

export default router;