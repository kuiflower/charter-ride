import type { ProductCategoryId } from "./categories";

export type Product = {
  id: string;
  category: ProductCategoryId;
  name: string;
  summary: string;
  description: string;
  price: number;
  priceUnit: string;
  showPrice: boolean;
  capacity: number;
  vehicleType: string;
  imageUrl: string;
  detailImages: string[];
  features: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  category: ProductCategoryId;
  name: string;
  summary: string;
  description: string;
  price: number;
  priceUnit: string;
  showPrice: boolean;
  capacity: number;
  vehicleType: string;
  imageUrl: string;
  detailImages: string[];
  features: string[];
  published: boolean;
};

export type MessageType = "general" | "product";

export type InquiryMessage = {
  id: string;
  type: MessageType;
  productId: string | null;
  productName: string | null;
  passportName: string;
  email: string;
  messagingId: string;
  partySize: number;
  arrivalDate: string;
  question: string;
  createdAt: string;
};

export type InquiryMessageInput = {
  type: MessageType;
  productId?: string | null;
  passportName: string;
  email: string;
  messagingId: string;
  partySize: number;
  arrivalDate: string;
  question: string;
};
