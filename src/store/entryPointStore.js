import { entryPointReducer } from '../reducers/entryPointReducer';
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({ reducer : entryPointReducer });