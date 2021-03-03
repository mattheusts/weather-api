import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/model/user';
import { BaseController } from '.';
import AuthService from '@src/services/auth';
import ApiError from '@src/util/erros/api-error';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return this.sendErrorResponse(res, ApiError.format({ code: 401, message: 'Password does not match!' }));
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      return this.sendErrorResponse(res, ApiError.format({ code: 401, message: 'Password does not match!' }));
    }

    const token = AuthService.generateToken(user.toJSON());
    return res.status(200).send({ token: token });
  }

  @Get('me')
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response): Promise<Response> {
    const email = req.decoded ? req.decoded?.email : undefined;
    const user = await User.findOne({ email });

    if (!user) {
      return this.sendErrorResponse(res, { code: 404, message: 'User not found!' });
    }

    return res.send({ user });
  }
}