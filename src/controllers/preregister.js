import PreRegister from '../models/preregister';

export const addNewPreRegister = (req, res) => {
    const prereg = new PreRegister(req.body);
    prereg.save((err) => {
        if (err) res.status(400).json({error: err.message});
        else res.status(201).json(prereg);
    })   
}