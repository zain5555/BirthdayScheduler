import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { UserDto, UserEditDto } from './index';
import { User, UserEditInterface } from '../domain';

export class ParseUserPipe implements PipeTransform<UserDto, User> {
  transform(userDto: UserDto): User {

    let { firstname, lastname, birthday, locationTimezone } = userDto

    if(!firstname && typeof firstname != "string" && 
       !lastname && typeof lastname != "string" && 
       !birthday && typeof birthday != "string" &&
       !locationTimezone && typeof locationTimezone != "string"){
      throw new BadRequestException;
    }
    else {
      return userDto
    }

  }
}

export class ParseEditUserPipe implements PipeTransform<UserEditDto, UserEditInterface> {
  transform(userEditDto: UserEditDto): UserEditInterface {

    let { firstname, lastname, birthday, locationTimezone } = userEditDto

    if(firstname && typeof firstname != "string" || 
       lastname && typeof lastname != "string" || 
       birthday && typeof birthday != "string" ||
       locationTimezone && typeof locationTimezone != "string"){
      throw new BadRequestException;
    }
    else {
      return userEditDto
    }

  }
}

export class ParseDeleteUserPipe implements PipeTransform<any, string> {
  transform(id: any): string {

    if(!id && typeof id != "string" ){
      throw new BadRequestException;
    }
    else {
      return id
    }

  }
}

