import { DomainException } from '../domain.exception';

export class NoPermissionToBanException extends DomainException {
    constructor() {
        super(`You dont't have permission to ban another user`);
    }
}

export class NoPermissionToBanAnotherAdminException extends DomainException {
    constructor() {
        super(`You don't have permission to ban another administrator`);
    }
}