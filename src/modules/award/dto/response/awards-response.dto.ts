import { AwardTypeEnum } from '@enums';

export class AwardsResponseDto {
	name: string;
	type: AwardTypeEnum;
	point: number;
	image: string;
}
