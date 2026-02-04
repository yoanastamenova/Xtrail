import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //1. Find all users and display them as a list, ordered by ID
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  //2. Get user by its ID
  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with this ID does not exist.');
    }

    return user;
  }

  //3. Get user by its Email
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    return user;
  }

  //4. Update user
  async updateUser(id: number, updateUser: UpdateUser) {
    await this.findById(id);
    return this.userRepository.update(id, updateUser);
  }

  //5. Delte user by Id
  async deleteUser(id: number) {
    await this.findById(id);
    return this.userRepository.delete(id);
  }
}
