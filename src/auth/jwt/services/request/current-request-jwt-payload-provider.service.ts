import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RequestJwtPayloadService } from './request-jwt-payload.service';

export abstract class CurrentRequestJwtPayloadProvider<T = any> {
    abstract get(): T;
}

@Injectable({ scope: Scope.REQUEST })
export class DefaultCurrentRequestJwtPayloadProvider implements CurrentRequestJwtPayloadProvider {
    constructor(private readonly requestJwtPayloadService: RequestJwtPayloadService,
        @Inject(REQUEST) private readonly request: Request) { }

    get() {
        return this.requestJwtPayloadService.get(this.request);
    }
} 