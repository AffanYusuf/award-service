import { AwardsResponseDto } from "@modules/award/dto";
import { AwardTypeEnum } from "@src/enums";
import { BaseResponse } from "@utils";


export const GET_AWARDS_RESPONSE: BaseResponse<AwardsResponseDto> =
	{
		data: [
			{
				name: 'Gift Card',
				type: AwardTypeEnum.VOUCHERS,
				point: 250000,
				image: 'image.jpg',
			},
		],
		message: 'Success',
		statusCode: 200,
		metadata: {
			totalPages: 1,
			itemsPerPage: 5,
			currentPage: 1,
			totalItems: 1,
		},
	};
