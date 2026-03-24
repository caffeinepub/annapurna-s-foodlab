import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    description: string;
    imageUrl: string;
    category: MenuCategory;
    priceInr: bigint;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Review {
    name: string;
    comment: string;
    timestamp: Time;
    rating: bigint;
}
export enum MenuCategory {
    momos = "momos",
    coldDrinks = "coldDrinks",
    burgers = "burgers",
    pizza = "pizza",
    rolls = "rolls"
}
export interface backendInterface {
    addReview(name: string, rating: bigint, comment: string): Promise<void>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getMenuItemsByCategory(category: MenuCategory): Promise<Array<MenuItem>>;
    getReviews(): Promise<Array<Review>>;
    initializeMenuItems(): Promise<void>;
    submitContactForm(name: string, phone: string, message: string): Promise<void>;
}
