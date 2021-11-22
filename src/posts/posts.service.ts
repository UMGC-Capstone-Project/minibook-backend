import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    // constructor(
    //     @InjectRepository(PostEntity)
    //     private readonly postRepository: Repository<PostEntity>) {}

    // async getAllPosts() {
    //     this.postRepository.find()
    // }

    // async getPostsCurrentUser(id: string){
    //     this.postRepository.find({where: {relations: ['user']}})
    // }
}
