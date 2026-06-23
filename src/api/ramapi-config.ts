export const BASE_URL = 'https://rickandmortyapi.com/api';

const DEFAULT_API_CACHE_TTL = 300;
export const API_CACHE_TTL = Number(process.env.NEXT_PUBLIC_API_CACHE_TTL) || DEFAULT_API_CACHE_TTL;
