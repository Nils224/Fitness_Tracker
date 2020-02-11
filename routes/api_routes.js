const Workout = require('../models/workoutSchema');

module.exports = function(app) {

  //last workout
  app.get('/api/workouts', async (req, res) => {
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //create workout
  app.post('/api/workouts', async (req, res) => {
    const workout = new Workout({ exercises: req.body });
    Workout.create(workout)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //add workout
  app.put('/api/workouts/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    Workout.findById(id)
      .then(dbWorkout => {
        dbWorkout.exercises.push(data);
        return dbWorkout;
      })
      .then(dbWorkout => {
        Workout.findOneAndUpdate(
          { _id: id },
          { exercises: dbWorkout.exercises },
          { new: true }
        )
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
      })
      .catch(err => {
        res.json(err);
      });
  });

  //all workouts in database
  app.get('/api/workouts/range', async (req, res) => {
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //delete workout
  app.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        res.json(err);
      });
  });

}