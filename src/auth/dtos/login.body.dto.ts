import * as joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export class LoginBodyDto {
  @JoiSchema(joi.string().required())
  readonly username: string;

  @JoiSchema(
    joi
      .string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/)
      .required(),
  )
  readonly password: string;
}
