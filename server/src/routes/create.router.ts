import { Router } from "express";
import { postNew } from "../controllers/create.controller";

const CreateRouter = Router();
CreateRouter.post("/",postNew)

export default CreateRouter;
