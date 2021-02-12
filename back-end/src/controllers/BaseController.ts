import { ForeignKeyConstraintError, ValidationError } from "sequelize";
import { Request, Response } from "express";
export interface IController {
  insert(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  list(req: Request, res: Response): void;
  getById(req: Request, res: Response): void;
}

class BaseController implements IController {
  private model: any;
  private controller: any;

  constructor(controller: string, model: any) {
    this.controller = controller;
    this.model = model;
  }

  public async insert(req: Request, res: Response) {
    try {
      //this.validateClaim(req, 'insert')

      const createdEntity = await this.model.create(req.body);

      res.status(200).json(createdEntity);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ error: e.message });
      }

      if (e instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: e.message });
      }

      return res.status(500).json({ error: "Ocorreu um erro inesperado." });
    }
  }

  public async update(req: Request, res: Response) {}

  public async list(req: Request, res: Response) {
    //this.validateClaim(req, 'readAll')
    const entities = await this.model.findAll();
    return res.status(200).json(entities);
  }

  public async getById(req: Request, res: Response) {
    const entity = await this.model.findByPk(req.params.id);
    if (entity == null) {
      return res.status(404);
    }

    return res.status(200).json(entity);
  }

  public delete(req: Request, res: Response) {}

  /* not implemented */
}

export default BaseController;