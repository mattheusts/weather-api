import logger from '@src/logger';
import { CUSTOM_VALIDATION } from '@src/model/user';
import { Response } from 'express';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError | Error): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErros = this.handleClientErrors(error);
      res.status(clientErros.code).send({ code: clientErros.code, error: clientErros.error });
    } else {
      logger.error(error);
      res.status(500).send({ code: 500, error: 'Something wen wrong!' });
    }
  }

  private handleClientErrors(error: mongoose.Error.ValidationError): { code: number, error: string } {
    const duplicatedKindErros = Object.values(error.errors).filter(err => err.kind === CUSTOM_VALIDATION.DUPLICATED);
    if (duplicatedKindErros.length) {
      return { code: 409, error: error.message };
    } else {
      return { code: 422, error: error.message };
    }
  }
}