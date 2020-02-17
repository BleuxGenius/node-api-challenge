const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel')
const middleware = require('../middleware.js');


// router.get('/', (req, res, next) => {
//     actions.get()
//     .then(action => {
//         res.status(200).json(action);
//     })
//     .catch(error => next(error));
// });

router.get('/', (req, res) => {
   actions.get()
   .then(action => {
       res.status(200).json(action);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({ error: 'the actions information could not be found'})
   });
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

// taken out 
// middleware.validate('notes'), =>

router.post('/', middleware.validate('project_id'), middleware.validate('description'), (req, res, next) => {
    actions.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(error => next(error));
});

router.post('/', (req, res)=> {
    // const body = req.body;
    const id = req.params.id;
    const newAction = {...body, project_id: id};

    actions.insert("actions")
    .then(newAction => {
        res.status(200).json(newAction)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: `there was an error while saving the action ${err}`
        });
    });
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

// router.put('/:id', (req, res) => {
//     actions.insert(req.params.id)
//     .then(newAction => {
//         res.status(200).json(newAction)
//     })
//     .catch(err => {
//         res.status(200).json({errorMessage : `there was an error adddng the action ${err}`
//     });
// })
// })

module.exports = router;