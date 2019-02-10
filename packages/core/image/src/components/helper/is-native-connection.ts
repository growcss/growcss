import { isSsr } from './is-ssr';

export const isNativeConnection = !isSsr && !!window.navigator.connection;
