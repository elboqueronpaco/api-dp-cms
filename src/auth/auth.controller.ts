import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDecorator, UserDecorator } from 'src/common/decorators';
import { User } from 'src/user/entities';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@ApiTags('Auth router')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    /**
     * @Post
     * login 
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @UserDecorator() user: User
    ) {
        const data = await this.authService.login(user)
        return {
            message: 'Te logeado correctamente',
            data
        }
    }

    /**
     * @Get
     * profile
     */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    profile(
        @UserDecorator() user: User
    ) {
        return {
            message: 'Petición correcta',
            user
        }
    }
    
    @AuthDecorator()
    @ApiBearerAuth()
    @Get('refresh')
    refreshToken(
        @UserDecorator() user: User
    ) {
        const data = this.authService.login(user)
        return {
            message: 'Refresh exitoso',
            data
        }

    }

}
