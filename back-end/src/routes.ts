import { Router } from "express";
import RegistersController from "./controllers/RegistersControllers";
import SessionController from "./controllers/SessionController";

const routes = Router();

routes.post("/login", SessionController.login);
const authMiddleware = require("./middlewares/auth")
routes.use(authMiddleware)
routes.post("/register/", RegistersController.create);
routes.get("/register/:id", RegistersController.show);
routes.get("/register/", RegistersController.index);
routes.patch("/register/", RegistersController.edit);

export default routes;
