import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    /** Para obtener todos posts */
    @Get()
    async getAll() {
        const data= await this.postsService.getAll()
        return { data}
    }

    /**
     * obtener por id
     */
    @Get(':id')
    async getOne (
        @Param('id', ParseIntPipe) id: number
    ) {
        const data = await this.postsService.getOne(id)
        return {
           data 
        }
    }
    /**
     * Crear posts
     */
    @Post()
     async CreateOne(
        @Body() dto: CreatePostDto
    ) {
        const data = await this.postsService.createOne(dto)
        return {
            message: 'Se ha creado nuevo Post',
            dto
        }
    }

    /**
     * update posts por id
     */
    @Put(':id')
    async editOne(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: EditPostDto
    ) {
        const data = await this.postsService.editOne(id, dto)
        return {
            message: 'Post ha sido actualizado',
            data
        }
    }
    /**
     * Eliminar un Post por su id
     */
    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe) id: number
    ) {
        const data = await this.postsService.deleteOne(id)
        return {
            message: 'Post Ha sido eliminado',
            data
        }
    }
}
