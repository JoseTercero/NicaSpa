import { Router } from "express";
import { renderAbout, renderIndex } from "../controllers/index.controllers";

const router = Router();

router.get("/", renderIndex);

router.get("/about", renderAbout);
export default router;
