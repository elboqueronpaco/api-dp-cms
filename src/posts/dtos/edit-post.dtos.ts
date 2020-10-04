import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dtos";
import { IsString } from 'class-validator'

export class EditPostDto extends PartialType(
    OmitType(
        CreatePostDto,
        ['slug'] as const
        )
){

}