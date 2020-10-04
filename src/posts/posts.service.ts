import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, EditPostDto } from './dtos';
import { Post } from './entities';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRespository: Repository<Post>){

    }
    async getAll(){
        return await this.postsRespository.find()
    }

    async getOne(id: number) {
        const post = await this.postsRespository.findOne(id)
        if(!post) throw new NotFoundException('El Post no existe')
        return post
    }

    async createOne(dto: CreatePostDto) {
        const newPost = this.postsRespository.create(dto)
        return await this.postsRespository.save(newPost)
    }

    async editOne(id: number, dto: EditPostDto) {
        const post = await this.postsRespository.findOne(id)
        if(!post) throw new NotFoundException('El Post no existe')
        const editPost = Object.assign(post, dto)
        return await this.postsRespository.save(editPost)
    }

    async deleteOne(id: number) {
        return await this.postsRespository.delete(id)
    }
}
