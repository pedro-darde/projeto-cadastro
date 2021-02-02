import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Register from "../models/Register";
import register_view from "../views/register_view";

export default {
  async index(request: Request, response: Response) {
    const registerRepository = getRepository(Register);

    const register = await registerRepository.find();

    return response.json(register_view.renderMany(register));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const registerRepository = getRepository(Register);

    const register = await registerRepository.findOneOrFail(id);

    return response.json(register_view.render(register));
  },

  async create(request: Request, response: Response) {
    const {
      nome,
      sobrenome,
      cpf,
      promocao,
      novidades,
      dataCadastro,
      email,
      dataNascimento,
      usuario,
      senha,
    } = request.body;

    const registerRepository = getRepository(Register);

    const register = registerRepository.create({
      nome,
      sobrenome,
      cpf,
      promocao,
      novidades,
      dataCadastro,
      email,
      dataNascimento,
      usuario,
      senha,
    });
    await registerRepository.save(register);
    return response.status(201).json({ register });
  },

  async edit(request: Request, response: Response) {
    const {
      id,
      nome,
      sobrenome,
      cpf,
      promocao,
      novidades,
      dataCadastro,
      email,
      dataNascimento,
      usuario,
      senha,
    } = request.body;

    const registerRepository = getRepository(Register);
    await registerRepository.update(id, {
      nome,
      sobrenome,
      cpf,
      promocao,
      novidades,
      dataCadastro,
      email,
      dataNascimento,
      usuario,
      senha,
    });

    response.status(200);
  },

  async editPassword(req: Request, res: Response) {
    const { email, senha } = req.body;

    const registerRepository = getRepository(Register);
    const user = await registerRepository.findOne({
      where: {
        email: email,
      },
    });
    registerRepository.update(user?.id as number, {
      senha: senha,
    });
  },
};
