import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Token } from '../types/formula';

interface FormulaState {
    tokens: Token[];
    addToken: (token: Omit<Token, 'id'>) => void;
    removeToken: (id: string) => void;
    updateToken: (id: string, newToken: Partial<Token>) => void;
    clearTokens: () => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
    tokens: [],
    addToken: (token) =>
        set((state) => ({
            tokens: [...state.tokens, { ...token, id: nanoid() }],
        })),
    removeToken: (id) =>
        set((state) => ({
            tokens: state.tokens.filter((t) => t.id !== id),
        })),
    updateToken: (id, newToken) =>
        set((state) => ({
            tokens: state.tokens.map((t) =>
                t.id === id ? { ...t, ...newToken } : t
            ),
        })),
    clearTokens: () => set({ tokens: [] }),
}));
