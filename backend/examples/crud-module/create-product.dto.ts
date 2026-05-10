import { IsString, IsNumber, IsOptional, IsPositive, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Headphones' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High-quality wireless headphones', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  categoryId: string;
}
