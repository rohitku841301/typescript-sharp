import { Router } from "express";
const router = Router();
import {todoGet, todoPost, todoDelete, todoEdit} from "../controllers/todo";

router.get('/', todoGet);
router.post("/", todoPost)
router.delete("/:id", todoDelete);
router.put("/:id", todoEdit)

export default router;
