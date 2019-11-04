const express = require('express'); // import the express package
const db = require('./data/db');

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Server is working');
});


server.post('/api/posts', (req, res) => {
    const postInfo = req.body;

    if (!postInfo.title || !postInfo.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        db.insert(postInfo)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }

})

server.post('api/posts/:id/comments', (req, res) => {
    const postInfo = req.body;
    const id = req.params.id;

    if(!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if (!postInfo.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else {
        db.insert(postInfo)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }

})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            return res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


// watch for connections on port 5000
server.listen(5000, () =>
  console.log('\n===Server running on http://localhost:5000===\n')
);