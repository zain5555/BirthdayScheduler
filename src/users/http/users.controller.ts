import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ParseUserPipe, ParseDeleteUserPipe, ParseEditUserPipe } from './index';
import { User, UserService } from '../domain/index'
import { UserInterface } from '../../schema/user.schema';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  addUser( @Body( new ParseUserPipe()) body: User ): Promise<UserInterface> {
   return this.usersService.addUser(body)
  }

  @Delete(':id')
  deleteUser(
    @Param('id', new ParseDeleteUserPipe()) id: string): Promise<Boolean> {
    return this.usersService.deleteUser(id)
  }

  @Put(':id')
  editUser(
    @Param('id', new ParseDeleteUserPipe()) id: string, @Body( new ParseEditUserPipe()) body: User ): Promise<Boolean> {
    return this.usersService.editUser(id, body)
  }

}