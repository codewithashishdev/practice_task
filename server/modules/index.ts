import express, { Router } from "express";
const router: Router = express.Router();

import AuthRouter from "./routes/authentication";

// authentication route
router.use("/auth", AuthRouter);

export default router;
