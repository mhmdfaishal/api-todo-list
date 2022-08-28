var express = require('express');
var router = express.Router();

const todocontroller = require('../controllers/todo');
const activitycontroller = require('../controllers/activity');

router.get('/', function(req, res, next) {
    res.send('Welcome to API Todo List');
});
/* activities */
router.get('/activity-groups', activitycontroller.getAll);
router.get('/activity-groups/:id', activitycontroller.getOne);
router.post('/activity-groups', activitycontroller.create);
router.delete('/activity-groups/:id', activitycontroller.delete);
router.patch('/activity-groups/:id', activitycontroller.update);

/* todos */
router.get('/todo-items', todocontroller.getAll);
router.get('/todo-items/:id', todocontroller.getOne);
router.post('/todo-items', todocontroller.create);
router.delete('/todo-items/:id', todocontroller.delete);
router.patch('/todo-items/:id', todocontroller.update);

module.exports = router;
