import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { from } from 'rxjs';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService

        ) {}
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail({ email })
        const comparePassword = await compare(pass, user.password)
        console.log(user)
        if (user && comparePassword) {
            const { password, ...rest } = user
            return rest
        }
        return null
    }

    login(user: User) {
        const { id, ...rest } = user
        const payload = { sub: id }
        return {
            ...rest,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
