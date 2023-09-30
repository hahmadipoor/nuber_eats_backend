import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Userr } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(type => String)
  code: string;

  @OneToOne(type => Userr, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Userr;

  @BeforeInsert()
  createCode(): void {
    this.code = Math.random().toString(10).substring(12);
  }
}
