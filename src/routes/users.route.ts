import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UsersController } from '@/controllers/users/users.controller';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados a usuários
 */

export class UsersRoutes {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.usersController = new UsersController();
  }

  getAllRoutes() {
    const authMiddleware = this.authMiddleware.auth.bind(this.authMiddleware);

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Cria um novo usuário
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do usuário
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               password:
     *                 type: string
     *                 description: Senha do usuário
     *             required:
     *               - name
     *               - email
     *               - password
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       description: ID do usuário
     *                     name:
     *                       type: string
     *                       description: Nome do usuário
     *                     email:
     *                       type: string
     *                       description: Email do usuário
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       description: Data de criação do usuário
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                       description: Data de última atualização do usuário
     *                 access_token:
     *                   type: string
     *                   description: Token de acesso JWT
     *       500:
     *         description: Erro interno no servidor
     */
    const insert = this.usersController.insert.bind(this.usersController);
    this.router.post('/', insert);

    /**
     * @swagger
     * /users/me:
     *   get:
     *     summary: Obtém as informações do usuário autenticado
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Informações do usuário autenticado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID do usuário
     *                 name:
     *                   type: string
     *                   description: Nome do usuário
     *                 email:
     *                   type: string
     *                   description: Email do usuário
     *                 password:
     *                   type: string
     *                   description: Hash da senha do usuário
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de criação do usuário
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de última atualização do usuário
     *                 addresses:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       country:
     *                         type: string
     *                       neighborhood:
     *                         type: string
     *                       city:
     *                         type: string
     *                       state:
     *                         type: string
     *                       zipCode:
     *                         type: string
     *                       complement:
     *                         type: string
     *                       userId:
     *                         type: string 
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *       401:
     *         description: Não autorizado
     */
    const me = this.usersController.me.bind(this.usersController);
    this.router.get('/me', authMiddleware, me);

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Atualiza as informações de um usuário pelo ID
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do usuário
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               password:
     *                 type: string
     *                 description: Senha do usuário
     *     responses:
     *       200:
     *         description: Usuário atualizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID do usuário
     *                 name:
     *                   type: string
     *                   description: Nome do usuário
     *                 email:
     *                   type: string
     *                   description: Email do usuário
     *                 password:
     *                   type: string
     *                   description: Hash da senha do usuário
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de criação do usuário
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Data de última atualização do usuário
     *       404:
     *         description: Usuário não encontrado
     */
    const update = this.usersController.update.bind(this.usersController);
    this.router.put('/:id', authMiddleware, update);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Deleta um usuário pelo ID
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do usuário
     *     responses:
     *       204:
     *         description: Usuário deletado com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    const destroy = this.usersController.destroy.bind(this.usersController);
    this.router.delete('/:id', authMiddleware, destroy);

    return this.router;
  }
}
