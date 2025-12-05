import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn({ name: 'college_id' })
  collegeId: number;

  @Column({ name: 'college_code', length: 20, unique: true })
  collegeCode: string;

  @Column({ name: 'college_name', length: 200 })
  collegeName: string;

  @Column({ name: 'short_name', length: 50, nullable: true })
  shortName: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  @Column({ name: 'city', length: 100 })
  city: string;

  @Column({ name: 'state', length: 100 })
  state: string;

  @Column({ name: 'pincode', length: 10, nullable: true })
  pincode: string;

  @Column({ name: 'phone', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'email', length: 100, nullable: true })
  email: string;

  @Column({ name: 'website', length: 200, nullable: true })
  website: string;

  @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ name: 'established_year', type: 'int', nullable: true })
  establishedYear: number;

  @Column({ name: 'total_capacity', type: 'int', nullable: true })
  totalCapacity: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
