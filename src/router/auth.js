import express from 'express';
import {registerNewUser, login, checkIfUserAlreadyExists} from '../controllers/auth';
import {authMiddleware} from '../middlewares/auth';


const router = express.Router();

router.get('/test', (req, res) => {
    res.send("Test");
})

router.post('/register', async (req, res) => {
    const user_data = req.body;
    try {
        const newUser = await registerNewUser(user_data);
        res.json(newUser);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/check_availability', async (req, res) => {
    console.log('test', !checkIfUserAlreadyExists(req.body.username), req.body.username);
    res.json({available: !(await checkIfUserAlreadyExists(req.body.username))});
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
        res.status(400).send(e.message);
    }
});

router.use('/verifyToken', authMiddleware);
router.get('/verifyToken', async (req, res) => {
    res.json({
        verified: true,
        info: req.decoded
    })
});

export default router;