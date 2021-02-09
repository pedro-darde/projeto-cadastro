import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Produtos from "../models/Produto";
import produtos_view from "../views/produtos_view";

export default {
  async index(request: Request, response: Response) {
    const produtosRepository = getRepository(Produtos);

    const produtos = await produtosRepository.find({
      relations: ["images"],
    });

    return response.json(produtos_view.renderMany(produtos));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const registerRepository = getRepository(Produtos);

    const register = await registerRepository.findOneOrFail(id,{
      relations: ["images"],
    });

    return response.json(produtos_view.render(register));
  },

  async create(request: Request, response: Response) {
    const { nome, descricao, quantidade, preco, dataCadastro } = request.body;

    const produtosRepository = getRepository(Produtos);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const produtos = produtosRepository.create({
      nome,
      descricao,
      quantidade,
      preco,
      dataCadastro,
      images,
    });
    await produtosRepository.save(produtos);
    return response.status(201).json({ produtos });
  },
};
