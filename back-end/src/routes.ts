import { Router } from "express";
import RegistersController from "./controllers/RegistersControllers";

const routes = Router();

routes.post("/register/", RegistersController.create);
routes.get("/register/:id", RegistersController.show);
routes.get("/register/", RegistersController.index);
routes.patch("/register/",RegistersController.edit)
export default routes;
