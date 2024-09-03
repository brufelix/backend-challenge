import { z } from 'zod';
import { Response } from 'express';
import { ConflictError } from '@/helpers/errors/conflict-error';
import { NotFoundError } from '@/helpers/errors/not-found-error';
import { BadRequestError } from '@/helpers/errors/bad-request-error';
import { UnauthorizedError } from '@/helpers/errors/unauthorized-error';

export abstract class ErrorHandler {
  protected sendErrorResponse(res: Response, error: Error | z.ZodError) {
    console.error(error);

    if (error instanceof BadRequestError) {
      res
        .status(400)
        .send({
          code: 400,
          message: error.message,
        })
        .end();

      return;
    }

    if (error instanceof UnauthorizedError) {
      res
        .status(401)
        .send({
          code: 401,
          message: error.message,
        })
        .end();

      return;
    }

    if (error instanceof NotFoundError) {
      res
        .status(404)
        .send({
          code: 404,
          message: error.message,
        })
        .end();

      return;
    }

    if (error instanceof ConflictError) {
      res
        .status(409)
        .send({
          code: 409,
          message: error.message,
        })
        .end();

      return;
    }

    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, issue) => {
        issue.path.forEach((field) => {
          acc = { ...acc, [field]: issue.message };
        });

        return acc;
      }, {});

      res
        .status(400)
        .send({
          code: 400,
          errors: errors,
          message: 'Bad Request.',
        })
        .end();

      return;
    }

    res
      .status(500)
      .send({
        code: 500,
        message: 'Internal server error.',
      })
      .end();
  }
}
