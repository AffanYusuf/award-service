import {HttpStatus} from '@nestjs/common';

import {Metadata} from './base-response.dto';

export class DefaultResponse<T> {
	constructor(
		data?: T | Array<T> | null,
		message?: string,
		statusCode?: number,
		metadata?: Metadata | null,
	) {
		this.data = data || null;
		this.message = message || 'Success';
		this.statusCode = statusCode || HttpStatus.OK;
		this.metadata = metadata || null;
	}
	data: T | Array<T>;
	message: string;
	statusCode: number;
	metadata: Metadata | null;
}
