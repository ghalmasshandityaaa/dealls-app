import { Expose } from 'class-transformer';
import * as joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export class RegisterBodyDto {
  @JoiSchema(joi.string().uri().required().label('profile'))
  readonly profile: string;

  @Expose({ name: 'full_name' })
  @JoiSchema(joi.string().max(50).required().label('full_name'))
  readonly fullName: string;

  @JoiSchema(joi.string().min(6).max(16).required())
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

  @Expose({ name: 'confirm_password' })
  @JoiSchema(
    joi.string().min(8).max(32).equal(joi.ref('password')).required().label('confirm_password'),
  )
  readonly confirmPassword: string;
}
