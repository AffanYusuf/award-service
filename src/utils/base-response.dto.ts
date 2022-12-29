import {Type} from 'class-transformer';

export class Metadata {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	totalPages: number;
	from?: number;
	to?: number;
}

export class BaseResponse<T> {
	data: T | Array<T>;
	message: string;
	statusCode: number;
	@Type(() => Metadata)
	metadata: Metadata | null;
}
