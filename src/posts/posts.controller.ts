import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos';

@Controller('posts')
export class PostsController {
    /** Para obtener todos posts */
    @Get()
    getAll() {
        return 'OK'
    }

    /**
     * obtener por id
     */
    @Get(':id')
    getOne (
        @Param('id', ParseIntPipe) id: number
    ) {
        //console.info(typeof id)
        return {
            message: 'getOneById'
        }
    }
    /**
     * Crear posts
     */
    @Post()
    CreateOne(
        @Body() dto: CreatePostDto
    ) {
        return {
            message: 'Has creado un post',
            dto
        }
    }

    /**
     * update posts por id
     */
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPostDto
    ) {
        return {
            message: 'Se ha actualizado el post',
            dto
        }
    }
    /**
     * Eliminar un Post por su id
     */
    @Delete(':id')
    deleteOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        return {
            message: 'Post ha sido eliminado'
        }
    }
}
