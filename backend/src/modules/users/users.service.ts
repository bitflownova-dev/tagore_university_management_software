import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(userId: number) {
    return this.usersRepository.findOne({ where: { userId } });
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(userId: number, updateData: Partial<User>) {
    await this.usersRepository.update(userId, updateData);
    return this.findOne(userId);
  }

  async remove(userId: number) {
    await this.usersRepository.delete(userId);
    return { success: true };
  }
}
