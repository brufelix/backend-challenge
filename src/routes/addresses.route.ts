import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AddressesController } from '@/controllers/addresses/addresses.controller';

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Endpoints relacionados a endereços
 */

export class AddressesRoutes {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private addressesController: AddressesController;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.addressesController = new AddressesController();
  }

  getAllRoutes() {
    const authMiddleware = this.authMiddleware.auth.bind(this.authMiddleware);

    /**
     * @swagger
     * /addresses:
     *   post:
     *     summary: Cria um novo endereço
     *     tags: [Addresses]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               country:
     *                 type: string
     *                 description: País do endereço
     *               neighborhood:
     *                 type: string
     *                 description: Bairro do endereço
     *               city:
     *                 type: string
     *                 description: Cidade do endereço
     *               state:
     *                 type: string
     *                 description: Estado do endereço
     *               zipCode:
     *                 type: string
     *                 description: Código postal do endereço
     *               complement:
     *                 type: string
     *                 description: Complemento do endereço (opcional)
     *             required:
     *               - country
     *               - neighborhood
     *               - city
     *               - state
     *               - zipCode
     *     responses:
     *       201:
     *         description: Endereço criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID do endereço
     *                 country:
     *                   type: string
     *                   description: País do endereço
     *                 neighborhood:
     *                   type: string
     *                   description: Bairro do endereço
     *                 city:
     *                   type: string
     *                   description: Cidade do endereço
     *                 state:
     *                   type: string
     *                   description: Estado do endereço
     *                 zipCode:
     *                   type: string
     *                   description: Código postal do endereço
     *                 complement:
     *                   type: string
     *                   description: Complemento do endereço (opcional)
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de criação do endereço
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de última atualização do endereço
     *       400:
     *         description: Requisição inválida
     */
    const insert = this.addressesController.insert.bind(
      this.addressesController
    );
    this.router.post('/', authMiddleware, insert);

    /**
     * @swagger
     * /addresses:
     *   get:
     *     summary: Lista todos os endereços
     *     tags: [Addresses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: country
     *         schema:
     *           type: string
     *         required: false
     *         description: Filtro opcional para listar endereços por país
     *       - in: query
     *         name: state
     *         schema:
     *           type: string
     *         required: false
     *         description: Filtro opcional para listar endereços por estado
     *     responses:
     *       200:
     *         description: Lista de endereços
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     description: ID do endereço
     *                   country:
     *                     type: string
     *                     description: País do endereço
     *                   neighborhood:
     *                     type: string
     *                     description: Bairro do endereço
     *                   city:
     *                     type: string
     *                     description: Cidade do endereço
     *                   state:
     *                     type: string
     *                     description: Estado do endereço
     *                   zipCode:
     *                     type: string
     *                     description: Código postal do endereço
     *                   complement:
     *                     type: string
     *                     description: Complemento do endereço (opcional)
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                     description: Data de criação do endereço
     *                   updatedAt:
     *                     type: string
     *                     format: date-time
     *                     description: Data de última atualização do endereço
     *                   user:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       name:
     *                         type: string
     *                       email:
     *                         type: string
     *                       password:
     *                         type: string
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     */
    const list = this.addressesController.list.bind(this.addressesController);
    this.router.get('/', authMiddleware, list);

    /**
     * @swagger
     * /addresses/{id}:
     *   get:
     *     summary: Obtém um endereço pelo ID
     *     tags: [Addresses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do endereço
     *     responses:
     *       200:
     *         description: Dados do endereço
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID do endereço
     *                 country:
     *                   type: string
     *                   description: País do endereço
     *                 neighborhood:
     *                   type: string
     *                   description: Bairro do endereço
     *                 city:
     *                   type: string
     *                   description: Cidade do endereço
     *                 state:
     *                   type: string
     *                   description: Estado do endereço
     *                 zipCode:
     *                   type: string
     *                   description: Código postal do endereço
     *                 complement:
     *                   type: string
     *                   description: Complemento do endereço (opcional)
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de criação do endereço
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de última atualização do endereço
     *                 user:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: string
     *                      name:
     *                        type: string
     *                      email:
     *                        type: string
     *                      password:
     *                        type: string
     *                      createdAt:
     *                        type: string
     *                        format: date-time
     *                      updatedAt:
     *                        type: string
     *                        format: date-time
     *       404:
     *         description: Endereço não encontrado
     */
    const findById = this.addressesController.findById.bind(
      this.addressesController
    );
    this.router.get('/:id', authMiddleware, findById);

    /**
     * @swagger
     * /addresses/{id}:
     *   put:
     *     summary: Atualiza as informações de um endereço pelo ID
     *     tags: [Addresses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do endereço
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               country:
     *                 type: string
     *                 description: País do endereço
     *               neighborhood:
     *                 type: string
     *                 description: Bairro do endereço
     *               city:
     *                 type: string
     *                 description: Cidade do endereço
     *               state:
     *                 type: string
     *                 description: Estado do endereço
     *               zipCode:
     *                 type: string
     *                 description: Código postal do endereço
     *               complement:
     *                 type: string
     *                 description: Complemento do endereço (opcional)
     *     responses:
     *       200:
     *         description: Endereço atualizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID do endereço
     *                 country:
     *                   type: string
     *                   description: País do endereço
     *                 neighborhood:
     *                   type: string
     *                   description: Bairro do endereço
     *                 city:
     *                   type: string
     *                   description: Cidade do endereço
     *                 state:
     *                   type: string
     *                   description: Estado do endereço
     *                 zipCode:
     *                   type: string
     *                   description: Código postal do endereço
     *                 complement:
     *                   type: string
     *                   description: Complemento do endereço (opcional)
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de criação do endereço
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de última atualização do endereço
     *       404:
     *         description: Endereço não encontrado
     *       500:
     *         description: Erro interno no servidor
     */
    const update = this.addressesController.update.bind(
      this.addressesController
    );
    this.router.put('/:id', authMiddleware, update);

    /**
     * @swagger
     * /addresses/{id}:
     *   delete:
     *     summary: Deleta um endereço pelo ID
     *     tags: [Addresses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do endereço
     *     responses:
     *       204:
     *         description: Endereço deletado com sucesso
     *       404:
     *         description: Endereço não encontrado
     */
    const destroy = this.addressesController.destroy.bind(
      this.addressesController
    );
    this.router.delete('/:id', authMiddleware, destroy);

    return this.router;
  }
}
