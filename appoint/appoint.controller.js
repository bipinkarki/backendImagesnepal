const express = require("express");
const router = express.Router();
const appointService = require("./appoint.service");

// Routes
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.delete("/:id", cancelAppointment);

module.exports = router;

function createAppointment(req, res, next) {
  console.log("till here");
  console.log(req.body);
  appointService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function getAppointment(req, res, next) {
  appointService
    .getAll(req.params.id)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function cancelAppointment(req, res, next) {
  console.log(req.params.id);
  appointService
    .cancelById(req.params.id)
    .then(appointment =>
      appointment ? res.json(appointment) : res.sendStatus(404)
    )
    .catch(err => {
      console.log(err);
    });
}

// function _delete(req, res, next) {
//   userService
//     .delete(req.params.id)
//     .then(() => res.json({}))
//     .catch(err => next(err));
// }
