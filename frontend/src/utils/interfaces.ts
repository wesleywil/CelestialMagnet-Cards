export interface User {
  id?: number;
  picture?: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  is_staff: boolean;
  date_joined: Date;
}

export interface Card {
  id?: number;
  owner?: User | number;
  name: string;
  tier: Tier | null;
  card_type: CardType | number;
  description: string;
  base_image: string;
  frame_image?: string;
}

export interface CardType {
  id?: number;
  title: string;
  description: string;
  type_image?: string;
}

export interface Transaction {
  user?: User | number;
  card: Card | number;
  transaction_type: TransactionType;
  price: number;
  timestamp?: Date;
}

export enum Tier {
  Bronze = "bronze",
  Silver = "silver",
  Golden = "golden",
  BlackDiamond = "black_diamond",
}

export enum TransactionType {
  Purchase = "purchase",
  Trade = "trade",
}
