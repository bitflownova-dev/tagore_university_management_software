import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ 
      where: { username, isActive: true } 
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { 
      sub: user.userId, 
      username: user.username,
      roleId: user.primaryRoleId,
      collegeId: user.collegeId,
    };

    // Update last login
    await this.usersRepository.update(user.userId, {
      lastLogin: new Date(),
    });

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.generateRefreshToken(payload),
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.primaryRoleId,
        collegeId: user.collegeId,
        avatar: user.avatar,
      },
    };
  }

  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = this.usersRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { passwordHash, ...result } = savedUser as any;
    
    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const newPayload = {
        sub: payload.sub,
        username: payload.username,
        roleId: payload.roleId,
        collegeId: payload.collegeId,
      };

      return {
        accessToken: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
    });
  }

  async updateFcmToken(userId: number, fcmToken: string) {
    await this.usersRepository.update(userId, { fcmToken });
    return { success: true };
  }
}
