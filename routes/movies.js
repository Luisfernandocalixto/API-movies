const mongojs = require('mongojs');
const db = mongojs('DatabaseMovies', [
    'movies'
])

module.exports = app => {
    app.get('/movies', async (req, res) => {
        db.movies.find((err, movies) => {
            res.json({
                movies
            })

        })

    })


    app.post('/movies', async (req, res) => {

        let newMovie = req.body;

        db.movies.insert(newMovie, (err, movie) => {
            res.json({
                movie
            })

        })


    })

    app.put('/movies/:id', async (req, res) => {

        let updatedMovie = req.body;

        db.movies.findAndModify({
            query: { _id: mongojs.ObjectId(req.params.id) },
            update: { $set: updatedMovie },  // Update using $set
            new: true  // Back document updated
        }, (err, movie) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ movie });
        });
    });

    app.delete('/movies/:id', async (req, res) => {


        db.movies.remove(
            {
                _id: mongojs.ObjectId(req.params.id)
            }, (err, response) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json(response);
            });
    });

}