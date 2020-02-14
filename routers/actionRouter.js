const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel.js');
const middleware = require('../middleware.js');

router.use(express.json());
// router.use('/api', actions);


router.get('/', (req, res, next) => {
    actions.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error => next(error));
});

router.get('/:id', (req, res) => {
    actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action not found'});
        }
    })
    .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'error retreiving the action'
        });
    });
});

router.post('/', middleware.validate('project_id'), middleware.validate('description'), middleware.validate('notes'), (req, res, next) => {
    actions.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(error => next(error));
});

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: 'The action has been removed'});
        } else {
            res.status(404).json({ message: 'the action could not be found'})
        }
    })
    .catch(error => {
        // log error to server 
        console.log(error);
        res.status(500).json({
            message: 'Error removing the action',
        });
    });
});


