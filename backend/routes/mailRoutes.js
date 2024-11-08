import express from "express";
import {
  sendEmail,
  sendConfirmationemail,
} from "../controllers/mailController.js";
const router = express.Router();
router.post("/", sendEmail);
router.post("/confirmationemail", sendConfirmationemail);

export default router;