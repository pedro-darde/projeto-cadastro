import { Router } from "express";
import RegistersController from "./controllers/RegistersControllers";
import SessionController from "./controllers/SessionController";
import authMiddleware from "./middlewares/auth";
import multer from "multer";
import uploadConfig from "./config/upload";
import ProdutosController from "./controllers/ProdutosController";
const routes = Router();
const upload = multer(uploadConfig);

routes.post("/login", SessionController.login);
routes.post("/register/", RegistersController.create);
routes.patch("/esqueceuSenha", RegistersController.editPassword);

routes.post("/produtos/", upload.array("images"), ProdutosController.create);
routes.get("/produtos/:id", ProdutosController.show)
routes.get("/produtos/", upload.array("images"),ProdutosController.index)

routes.use("/auth", authMiddleware);
routes.get("/register/:id", RegistersController.show);
routes.get("/register/", RegistersController.index);
routes.patch("/register/", RegistersController.edit);


export default routes;
