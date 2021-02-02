import { Router } from "express";
import RegistersController from "./controllers/RegistersControllers";
import SessionController from "./controllers/SessionController";
import authMiddleware from "./middlewares/auth"
const routes = Router();

routes.post("/login", SessionController.login);
routes.post("/register/", RegistersController.create);
routes.patch("/esqueceuSenha",RegistersController.editPassword)
routes.use("/auth",authMiddleware)
routes.get("/register/:id", RegistersController.show);
routes.get("/register/", RegistersController.index);
routes.patch("/register/", RegistersController.edit);

export default routes;
