const express = require('express');
const router = express.Router();

const projects = require('../data/helpers/projectModel.js');
const middleware = require('../middleware')




// get the list of projects
router.get("/", (req, res) => {
    projects.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => (error));
});

// get projects by specified id
router.get('/:id', (req, res) => {
    projects.get(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'project not found'})
        }
    })
    .catch(error => {
        // log error to server 
        console.log(error);
        res.status(500).json({
            message: `Error retrieving the porject`,
        });
    });
});

// get the actions from the projects based off id
router.get('/:id/', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'project not found'});
        }
    })
    .catch(error => {
        //  log error to server 
        console.log(error);
        res.status(500).json({
            message: 'error retrieving the project',
        });
    });
});

// validated a post based off name and description 
router.post('/', middleware.validate('name'), middleware.validate('description'), (req, res, next) =>{
projects.insert(req.body)
.then(project => {
    res.status(201).json(project);
})
.catch(error => next(error));
});

// delete post based of specified id 
router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'the user has been removed'});
        } else {
            res.status(404).json({ message: 'The user could not be found'})
        }
    })
    .catch(error => {
        // log error to server 
        console.log (error);
        res.status(500).json({
            message: ' Error removing the user '
        });
    });
 });

    router.put('/:id', (req, res) => {
        projects.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(404).json({ message: 'The user could not be found'});
            }
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error updating user',
            });
        });
    });

    module.exports = router;