import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column('int4', {nullable: true})
  expiry: number;

  @Column('int8', {nullable: true})
  lastDetected: number;

  @Column({ default: false})
  possyblyAvailable: boolean;

  @Column('varchar', { array: true, nullable: true })
  addresses: string[];

  @Column({nullable: true})
  nsname: string;

  @Column({nullable: true})
  hostmaster: string;

  @Column('int4', {nullable: true})
  serial: number;

  @Column('int4', {nullable: true})
  refresh: number;

  @Column('int4', {nullable: true})
  retry: number;

  @Column('int4', {nullable: true})
  minttl: number;
}
  