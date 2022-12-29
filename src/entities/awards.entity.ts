import { AwardTypeEnum } from '@src/enums/award-type.enum';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('awards')
export class AwardsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({
        type: "enum",
        enum: AwardTypeEnum,
        default: AwardTypeEnum.VOUCHERS,
    })
	type: AwardTypeEnum;

	@Column()
	point: number;

	@Column()
	image: string;
}
