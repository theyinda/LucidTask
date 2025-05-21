export type TokenType = 'tag' | 'number' | 'operator';

export interface TokenBase {
    id: string;
    type: TokenType;
}

export interface TagToken extends TokenBase {
    type: 'tag';
    label: string;
    value: string;
}

export interface NumberToken extends TokenBase {
    type: 'number';
    value: number;
}

export interface OperatorToken extends TokenBase {
    type: 'operator';
    value: string;
}

export type Token = TagToken | NumberToken | OperatorToken;
