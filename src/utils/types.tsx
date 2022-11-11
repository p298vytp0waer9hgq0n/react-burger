import PropTypes from 'prop-types';
import React from 'react';
import { RouteProps } from 'react-router-dom';

export const ingredientType = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export const orderType = {
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

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
};

export type TIngCounter = Record<string, number>;

export type TCountedIngredient = TIngredient & { quantity: number };

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  createdAt: string;
  number: string;
}

export type TFeedIconProps = {
  ingredients: string[];
}

export type TModalProps = {
  children: any;
  title?: string;
  close: Function;
}

export interface IProtectedProps extends RouteProps {
  auth: boolean;
  redirect: string;
  comeback?: boolean;
}

export type TModalOverlayProps = {
  children: any;
  clickHandler: (evt: React.MouseEvent) => void;
}

export type TFeedElementProps = TFeedOrder & { auth?: boolean }

export type TFeedOrder = TOrder & { status: ('done' | 'pending' | 'created') }

export type TConstructorIngredient = TIngredient & { uid: string };

export type TCounter = Record<string, number>;

export type TTab = ('bun' | 'main' | 'sauce');
