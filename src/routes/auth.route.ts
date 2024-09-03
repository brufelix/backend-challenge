import { Router } from 'express';
import { AuthController } from '@/controllers/auth/auth.controller';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints relacionados à autenticação
 */

export class AuthRoutes {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
  }

  getAllRoutes() {
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Autentica o usuário e retorna um token de acesso
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               password:
     *                 type: string
     *                 description: Senha do usuário
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: Login bem-sucedido
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
     *       400:
     *         description: Credenciais inválidas
     *       500:
     *         description: Erro interno no servidor
     */
    const login = this.authController.login.bind(this.authController);
    this.router.post('/login', login);

    return this.router;
  }
}
