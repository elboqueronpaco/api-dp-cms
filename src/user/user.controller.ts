import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { EditPostDto } from 'src/posts/dtos';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    /**
     * @Get
     * getAll
     * obtener todos usuarios
     */
    @Get()
    async getAll() {
        const data = await this.userService.getAll()
        return { data }
    }

    /**
     * @Get(':id)
     * @Param('id', ParseIntPipe) id: number parsea id numero
     * obtener usuario
     * 
     */
    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        const data = await this.userService.getOne(id)
        return { data }
    }

    /**
     * @Post
     * createOne crear un nuevo usuario
     * @Body dto: CreateUserDto
     */
    @Post()
    async createOne(
        @Body() dto: CreateUserDto
    ) {
        const data = await this.userService.createOne(dto)
        return {
            message: 'El usuario ha sido creado con exito',
            data
        }
    }

    /**
     * @Put(':id)
     * @Param('id', ParseIntPipe) id: number parsea id numero
     * @Body dto: EditUserDto
     * actualizar un usuario por su id
     * 
     */
    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: EditPostDto
    ) {
        const data = await this.userService.editOne(id, dto)
        return {
            message: 'el Usuario ha sido actualizado con exito',
            data
        }
    }

    /**
     * @Get(':id)
     * @Param('id', ParseIntPipe) id: number parsea id numero
     * obtener usuario
     * 
     *//**
     * @Delete(':id)
     * @Param('id', ParseIntPipe) id: number parsea id numero
     * eliminar un usuario
     * 
     */
    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        const data = await this.userService.deleteOne(id)
        return {
            message: 'El Usuario ha sido eliminado correctamente',
            data
        }
    }
}
