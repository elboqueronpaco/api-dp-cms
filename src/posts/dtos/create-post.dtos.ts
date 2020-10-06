import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { EnumToString } from "src/common/helpers"
import { PostCategory } from "../enums"

export class CreatePostDto {
    @IsString()
    title: string

    @IsString()
    slug: string

    @IsString()
    excerpt: string

    @IsString()
    content: string

    @IsNotEmpty()
    @IsEnum(PostCategory, {
        message: `Opciòn invalida, las opciones correctas son ${EnumToString(PostCategory)}`
    })
    category: string

    @IsArray()
    @IsString({ each: true})
    tags: string[]

    @IsBoolean()
    status: boolean
}