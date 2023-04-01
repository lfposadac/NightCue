export class CreateUserDto {
    roleId: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    cellphone?: string;
    phone?: string;
    address?: string;
    
    constructor(
        roleId: string,
        name: string,
        lastName: string,
        password: string,
        email: string,
        cellphone?: string,
        phone?: string,
        address?: string
    ) {
        this.roleId = roleId;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.cellphone = cellphone;
        this.phone = phone;
        this.address = address;
    }
}