import { UserRole } from '../enumerators/user-role.enum';
import { NoPermissionToBanAnotherAdminException, NoPermissionToBanException } from '../exceptions/permission/no-permission-to-ban.exception';
import { Ban } from '../value-objects/ban.value-object';

export type UserFactoryProps = {
    role?: UserRole;
    currentBan?: Ban
}

const DEFAULT_FACTORY_PROPS: UserFactoryProps = {
    role: UserRole.Member,
    currentBan: undefined
}

export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _role: UserRole;
    private _currentBan?: Ban;

    private constructor(id: string, name: string, email: string, password: string, props?: UserFactoryProps) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;     
        this._role = props?.role ?? DEFAULT_FACTORY_PROPS.role;
        this._currentBan = props?.currentBan ?? DEFAULT_FACTORY_PROPS.currentBan;
    }

    ban(administrator: User, expiresIn?: Date) {
        if (administrator.role !== UserRole.Admin)
            throw new NoPermissionToBanException();
        if (this.role === UserRole.Admin)
            throw new NoPermissionToBanAnotherAdminException();

        this._currentBan = new Ban(administrator, this, expiresIn);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get role() {
        return this._role;
    }

    get currentBan() {
        return this._currentBan;
    }

    static create(id: string, name: string, email: string, password: string, props?: UserFactoryProps): User {
        return new User(id, name, email, password, props);
    }
}