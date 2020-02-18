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
router.get('/:id/', middleware.validate, (req, res) => {
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
            message: `Error retrieving the project`,
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
router.post('/', middleware.validate('name'), middleware.validate('description'), (req, res, next) => {
    const { name , description} = req.body;
if (name && description){
    projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
            res.status(500).json({error: 'could not add project to database'});
    });

} else {
    res.status(400).json({error: 'required fields: name and description'})
}
});

// delete post based of specified id 
router.delete('/:id', middleware.validate('name'), middleware.validate('description'), (req, res) => {
    const { id } = req.params;
    projects.remove(id)
    .then(results => {
            res.status(200).json({ message: 'project has been removed'});
    })
    .catch(error => {
        // log error to server 
        console.log (error);
        res.status(500).json({
            message: ' Error removing this project ' });
    })
 });

    router.put('/:id', middleware.validate('name'), middleware.validate('description'), (req, res) => {
       const { id } = req.params;
       const {name, description} = req.body;

       if (name && description) {
           projects.update(id, {name, description})
           .then(project => {
               res.status(200).json(project);
           })
           .catch(error => {
               res.status(500).json({error: 'Project could not be updated'})
           });
       } else {
           res.status(400).json({error: 'required fields: Name and Description'})
       }
    });

    module.exports = router;