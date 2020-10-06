import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards";

export function AuthDecorator () {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth
    )
}