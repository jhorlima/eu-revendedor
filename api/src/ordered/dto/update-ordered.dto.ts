import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderedDto } from './create-ordered.dto';

export class UpdateOrderedDto extends PartialType(CreateOrderedDto) {}
