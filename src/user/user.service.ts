import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditPostDto } from 'src/posts/dtos';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    /**
     * getAll
     * obtiene todos los usuarios
     */
    async getAll() {
        return await this.userRepository.find()
    }

    /**
     * getOne
     * Obtener un usuario
     */
    async getOne (id: number) {
        const user = await this.userRepository.findOne(id)
        if(!user) throw new NotFoundException('El usuario no existe')
        return user
    }

    /**
     * CreateOne
     * creando un nuevo usuario
     */
    
    async createOne(dto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({ email: dto.email})
        if (userExist) throw new BadRequestException('Este email ya existe')
        const userNameExist = await this.userRepository.findOne({ userName:  dto.userName})
        if (userNameExist) throw new BadRequestException('El usuario ya existe')
        const newUser = this.userRepository.create(dto)
        const user = await this.userRepository.save(newUser)
        delete user.password
        return user
    }

    /**
     * editOne
     * Actualizar un usuario por su id
     */

     async editOne(id: number, dto: EditPostDto) {
         const user = await this.getOne(id)
         const editUser = Object.assign(user, dto)
         return await this.userRepository.save(editUser)
     }

     /**
      * deleteOne
      * eliminar un usuario por id
      */
     async deleteOne (id: number) {
        const user = await this.getOne(id) 
        return await this.userRepository.remove(user)
     }
}
