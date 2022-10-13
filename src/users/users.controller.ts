import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create resource' })
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Find all resources' })
  @ApiResponse({ status: 200, type: FindAllUserDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'order', required: false })
  @Get()
  findAll(@Query() query): Promise<FindAllUserDto> {
    return this.usersService.findAll(query);
  }

  @ApiOperation({ summary: 'Find one resource' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateUserDto> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update resource' })
  @ApiResponse({ status: 201, type: UpdateUserDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsertDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(+id, updateUsertDto);
  }

  @ApiOperation({ summary: 'Delete resource' })
  @ApiResponse({ status: 204 })
  @Delete([':id', ''])
  remove(@Body() body, @Param('id') id: string): Promise<void> {
    return this.usersService.remove(body, +id);
  }
}
