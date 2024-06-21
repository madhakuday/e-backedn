import express from "express";

const router = express.Router();

export default router;

// order controller
require("../controllers/order/controller");

// Questionnaires controller
require("../controllers/od_questionnaires/controller");

// Step controller
require("../controllers/od_steps/controller");

// Bank controller
require("../controllers/bank/controller");