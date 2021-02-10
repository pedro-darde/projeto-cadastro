import { Router } from "express";
import SessionController from "./controllers/SessionController";
import authMiddleware from "./middlewares/auth";
import multer from "multer";
import uploadConfig from "./config/upload";
const routes = Router();
const upload = multer(uploadConfig);

routes.post("/login", SessionController.login);
// routes.post("/register/", RegistersController.create);
// routes.patch("/esqueceuSenha", RegistersController.editPassword);

// routes.post("/produtos/", upload.array("images"), ProdutosController.create);
// routes.patch("/produtos/", upload.array("images"), ProdutosController.edit);
// routes.get("/produtos/:id", upload.array("images"), ProdutosController.show);
// routes.get("/produtos/", upload.array("images"), ProdutosController.index);

routes.use("/auth", authMiddleware);

// routes.get("/register/:id", RegistersController.show);
// routes.get("/register/", RegistersController.index);
// routes.patch("/register/", RegistersController.edit);

export default routes;
