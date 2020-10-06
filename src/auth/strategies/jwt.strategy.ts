import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { JWT_SECRET } from "src/config/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        private config: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(JWT_SECRET)
        })
    }

    async validate(payload: any) {
        const { sub: id} = payload
        return await this.userService.getOne(id)
    }
}