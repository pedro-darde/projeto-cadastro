import { Router } from "express";
import SessionController from "./controllers/SessionController";
import authMiddleware from "./middlewares/auth";
import multer from "multer";
import uploadConfig from "./config/upload";
import RegisterController from "./controllers/RegistersControllers";
import ProdutosController from "./controllers/ProdutosController";
const routes = Router();
const upload = multer(uploadConfig);

const registerController = new RegisterController();
const produtosController = new ProdutosController();

routes.post("/login", SessionController.login);
// routes.post("/register/", RegistersController.create);
// routes.patch("/esqueceuSenha", RegistersController.editPassword);
routes.post("/create-register", (req, res) =>
  registerController.insert(req, res)
);
routes.post("/produtos", (req, res) => produtosController.insert(req, res));
// routes.post("/produtos/", upload.array("images"), ProdutosController.create);
// routes.patch("/produtos/", upload.array("images"), ProdutosController.edit);
// routes.get("/produtos/:id", upload.array("images"), ProdutosController.show);
// routes.get("/produtos/", upload.array("images"), ProdutosController.index);

//routes.use("/auth", authMiddleware);

// routes.get("/register/:id", RegistersController.show);
routes.get("/register/",registerController.list);
// routes.patch("/register/", RegistersController.edit);

export default routes;
