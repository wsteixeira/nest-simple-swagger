import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FindAllUserDto {
  @ApiPropertyOptional()
  total: number;

  @ApiPropertyOptional()
  hasNext: boolean;

  @ApiProperty({
    type: () => [CreateUserDto],
  })
  items: Array<CreateUserDto>;
}
