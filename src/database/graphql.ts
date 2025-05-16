
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ProductCreateInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    stock?: Nullable<number>;
    image?: Nullable<string>;
}

export class BrandCreateInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<string>;
}

export class CategoryCreateInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
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
    image?: Nullable<string>;
}

export class Brand implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<string>;
}

export class Category implements BaseModel {
    id: string;
    createAt: DateTime;
    updateAt?: Nullable<DateTime>;
    deleteAt?: Nullable<DateTime>;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export abstract class IMutation {
    abstract createProduct(data?: Nullable<ProductCreateInput>): Product | Promise<Product>;

    abstract createBrand(data?: Nullable<BrandCreateInput>): Brand | Promise<Brand>;

    abstract createCategory(data?: Nullable<CategoryCreateInput>): Category | Promise<Category>;
}

export abstract class IQuery {
    abstract helloWord(): Nullable<string> | Promise<Nullable<string>>;

    abstract products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract brands(): Nullable<Brand>[] | Promise<Nullable<Brand>[]>;

    abstract brand(id: string): Nullable<Brand> | Promise<Nullable<Brand>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
