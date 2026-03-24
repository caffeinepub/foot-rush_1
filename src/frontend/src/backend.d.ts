import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderItem {
    size: string;
    productId: bigint;
    quantity: bigint;
    price: number;
}
export interface Order {
    id: bigint;
    status: string;
    total: number;
    customerPrincipal: Principal;
    createdAt: bigint;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Product {
    id: bigint;
    name: string;
    isActive: boolean;
    sizes: Array<string>;
    category: string;
    badge?: string;
    brand: string;
    rating: number;
    image: string;
    price: number;
    reviewCount: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(productData: {
        name: string;
        sizes: Array<string>;
        category: string;
        badge?: string;
        brand: string;
        rating: number;
        image: string;
        price: number;
        reviewCount: bigint;
    }): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getMyWishlist(): Promise<Array<bigint>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getSubscribers(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(items: Array<OrderItem>): Promise<bigint>;
    removeProduct(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedProducts(productList: Array<{
        name: string;
        sizes: Array<string>;
        category: string;
        badge?: string;
        brand: string;
        rating: number;
        image: string;
        price: number;
        reviewCount: bigint;
    }>): Promise<void>;
    subscribeNewsletter(email: string): Promise<boolean>;
    toggleWishlist(productId: bigint): Promise<void>;
    updateOrderStatus(orderId: bigint, status: string): Promise<void>;
    updateProduct(id: bigint, productData: {
        name: string;
        sizes: Array<string>;
        category: string;
        badge?: string;
        brand: string;
        rating: number;
        image: string;
        price: number;
        reviewCount: bigint;
    }): Promise<void>;
}
