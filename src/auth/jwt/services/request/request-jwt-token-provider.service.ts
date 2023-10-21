import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export abstract class RequestJwtTokenProvider {
    abstract get(request: Request): string | undefined;
}

@Injectable()
export class DefaultRequestJwtTokenProvider implements RequestJwtTokenProvider {
    get(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}