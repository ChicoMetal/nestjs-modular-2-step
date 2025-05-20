
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ProductCreateInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: URL;
    categoryId: string;
}

export class ProductUpdateInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    image?: Nullable<URL>;
}

export class BrandCreateInput {
    name: string;
    description: string;
    image: URL;
}

export class BrandUpdateInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<string>;
}

export class CategoryCreateInput {
    name: CategoryNameType;
    description: string;
}

export class CategoryUpdateInput {
    name?: Nullable<CategoryNameType>;
    description?: Nullable<string>;
}

export class UserCreateInput {
    email: EmailAddress;
    password: string;
    role: string;
}

export class UserUpdateInput {
    email?: Nullable<EmailAddress>;
    password?: Nullable<string>;
    role?: Nullable<string>;
}

export class LoginInput {
    userName?: Nullable<string>;
    password?: Nullable<string>;
}

export interface BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
}

export class CommonAttributes {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class BaseModelAttributes {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
}

export class Product implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    image?: Nullable<URL>;
    categoryId: string;
    category?: Nullable<Category>;
}

export class Brand implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<URL>;
}

export class Category implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    name?: Nullable<CategoryNameType>;
    description?: Nullable<string>;
    products: Product[];
}

export class User implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    email: EmailAddress;
    password: string;
    role: string;
}

export class UserResponse {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    email: EmailAddress;
    role: string;
}

export class AuthResponse {
    access_token: string;
    user: UserResponse;
}

export abstract class IQuery {
    abstract products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract brands(): Nullable<Brand>[] | Promise<Nullable<Brand>[]>;

    abstract brand(id: string): Brand | Promise<Brand>;

    abstract testList(elements: number[]): Nullable<number>[] | Promise<Nullable<number>[]>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract productsByCategory(): Product[] | Promise<Product[]>;

    abstract categoriesByProduct(): Category | Promise<Category>;
}

export abstract class IMutation {
    abstract addProduct(data: ProductCreateInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract updateProduct(id: string, data: ProductUpdateInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract deleteProduct(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addBrand(data: BrandCreateInput): Nullable<Brand> | Promise<Nullable<Brand>>;

    abstract updateBrand(id: string, data: BrandUpdateInput): Nullable<Brand> | Promise<Nullable<Brand>>;

    abstract deleteBrand(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addCategory(data: CategoryCreateInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract updateCategory(id: string, data: CategoryUpdateInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract deleteCategory(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addUser(data: UserCreateInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id: string, data: UserUpdateInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract login(loginUserInput: LoginInput): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract signUp(loginUserInput: LoginInput): Nullable<User> | Promise<Nullable<User>>;
}

export type ScalarName = any;
export type DateTime = any;
export type CategoryNameType = any;
export type AccountNumber = any;
export type BigInt = any;
export type Byte = any;
export type CountryCode = any;
export type CountryName = any;
export type Cuid = any;
export type Currency = any;
export type DateTimeISO = any;
export type DeweyDecimal = any;
export type DID = any;
export type Duration = any;
export type EmailAddress = any;
export type GeoJSON = any;
export type GUID = any;
export type Hexadecimal = any;
export type HexColorCode = any;
export type HSL = any;
export type HSLA = any;
export type IBAN = any;
export type IP = any;
export type IPCPatent = any;
export type IPv4 = any;
export type IPv6 = any;
export type ISBN = any;
export type ISO8601Duration = any;
export type JSON = any;
export type JSONObject = any;
export type JWT = any;
export type Latitude = any;
export type LCCSubclass = any;
export type LocalDate = any;
export type LocalDateTime = any;
export type Locale = any;
export type LocalEndTime = any;
export type LocalTime = any;
export type Long = any;
export type Longitude = any;
export type MAC = any;
export type NegativeFloat = any;
export type NegativeInt = any;
export type NonEmptyString = any;
export type NonNegativeFloat = any;
export type NonNegativeInt = any;
export type NonPositiveFloat = any;
export type NonPositiveInt = any;
export type ObjectID = any;
export type PhoneNumber = any;
export type Port = any;
export type PositiveFloat = any;
export type PositiveInt = any;
export type PostalCode = any;
export type RGB = any;
export type RGBA = any;
export type RoutingNumber = any;
export type SafeInt = any;
export type SemVer = any;
export type SESSN = any;
export type Time = any;
export type Timestamp = any;
export type TimeZone = any;
export type UnsignedFloat = any;
export type UnsignedInt = any;
export type URL = any;
export type USCurrency = any;
export type UtcOffset = any;
export type UUID = any;
export type Void = any;
type Nullable<T> = T | null;
