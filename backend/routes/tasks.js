const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const validate = require("../middleware/validate");
const { createTaskSchema, updateTaskSchema } = require("../validation/taskValidation");

router.post("/", protect, validate(createTaskSchema), createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, validate(updateTaskSchema), updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
