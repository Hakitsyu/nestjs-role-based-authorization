import { User } from '../entities/user.entity';

export class Ban {
    private _at: Date;
    private _administrator: User;
    private _user: User;
    private _expiresIn?: Date;

    public constructor(administrator: User, user: User, expiresIn?: Date) {
        this._at = new Date();
        this._administrator = administrator;
        this._user = user;
        this._expiresIn = expiresIn;
    }

    get at() {
        return this._at;
    }

    get administrator() {
        return this._administrator;
    }

    get user() {
        return this._user;
    }

    get expiresIn(): Date {
        return this._expiresIn;
    }

    expired(): boolean {
        return this._expiresIn !== undefined && this._expiresIn < new Date();
    }
}