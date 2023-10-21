import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export abstract class RequestJwtPayloadService<T = any> {
    abstract save(request: Request, payload: T): void;
    abstract get(request: Request): T;
}

@Injectable()
export class DefaultRequestJwtPayloadService implements RequestJwtPayloadService {
    save(request: Request, payload: any): void {
        request['user'] = payload;
    }

    get(request: Request): any {
        return request['user'];
    }
}