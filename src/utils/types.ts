import React from 'react';
import { RouteProps } from 'react-router-dom';

export type TLocationState = {
  background?: {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  }
  tokenSent?: boolean;
  comeback?: string;
  redirect?: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  image: string;
  type: string;
  price: number;
  image_large: string;
  image_mobile: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

export type TCountedIngredient = TIngredient & { quantity: number };

export type TIngredientsIds = {
  ingredients: Array<string>;
}

export type TOrder = TIngredientsIds & {
  _id: string;
  name: string;
  createdAt: string;
  number: string;
}

export type TModalProps = {
  children: React.ReactNode;
  title?: string;
  close: Function;
}

export interface IProtectedProps extends RouteProps {
  auth: boolean;
  redirect: string;
  comeback?: boolean;
}

export type TModalOverlayProps = {
  children: React.ReactNode;
  clickHandler: (evt: React.MouseEvent) => void;
}

export type TUser = {
  username: string;
  email: string;
  password: string;
}

export type TLogin = Omit<TUser, 'username'>

export type TReset = {
  password: string;
  token: string;
}

export type TFeedElementProps = TFeedOrder & { auth?: boolean }

export type TFeedOrder = TOrder & { status: ('done' | 'pending' | 'created') }

export type TConstructorIngredient = TIngredient & { uid: string };

export type TCounter = Record<string, number>;
