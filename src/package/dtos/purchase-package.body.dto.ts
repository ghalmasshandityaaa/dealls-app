import * as joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import { Package } from '../../common/interfaces';

export class PurchasePackageBodyDto {
  @JoiSchema(joi.string().valid(Package.VERIFIED, Package.NO_QUOTA).required())
  readonly package: Package;
}
