const api = require('express').Router();
const notedb = './db/db.json';
const fs = require('fs');
const uuid = require('../helpers/uuid');

api.get('/notes', (req, res) =>
    fs.readFile(notedb, 'utf8', (err, data) => res.json(JSON.parse(data))));

api.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            review_id: uuid(),
        };

        fs.readFile(notedb, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const currentdb = JSON.parse(data);
                currentdb.push(newNote);

                fs.writeFile(notedb,
                    JSON.stringify(currentdb, null, 4),
                    (writeErr) => writeErr
                        ? console.error(writeErr)
                        : console.info("Success")
                )
                const response = {
                    status: 'success',
                    body: newNote,
                };
                res.json(response);
            }
        });

    }
});

api.delete('/notes/:id', (req, res) =>
    console.log("Working on it.")
);

module.exports = api;