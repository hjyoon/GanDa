import { createContext } from 'react';
import { ContextType } from './types';

export const StateContext = createContext<ContextType>({} as ContextType);

export {};
