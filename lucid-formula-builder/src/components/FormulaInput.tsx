import { Box, TextField, List, ListItem, Paper } from '@mui/material';
import { useState } from 'react';
import type { KeyboardEvent } from 'react'
import { useFormulaStore } from '../store/formulaStore';
import { useAutocomplete, type Suggestion } from '../hooks/useAutocomplete';
import TokenChip from './TokenChips';


export default function FormulaInput() {


    const { tokens, addToken, removeToken } = useFormulaStore();
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const trimmed = inputValue.trim();
            if (!trimmed) return;

            if (!isNaN(Number(trimmed))) {
                addToken({ type: 'number', value: Number(trimmed) });
            } else if (['+', '-', '*', '/'].includes(trimmed)) {
                addToken({ type: 'operator', value: trimmed });
            } else {
                addToken({ type: 'tag', label: trimmed, value: trimmed });
            }

            setInputValue('');
            e.preventDefault();
        }

        if (e.key === 'Backspace' && inputValue === '' && tokens.length > 0) {
            removeToken(tokens[tokens.length - 1].id);
        }
    };
    const { data: suggestions = [], isLoading } = useAutocomplete(inputValue);

    const handleSelectSuggestion = (sugg: Suggestion) => {
        addToken({ type: 'tag', label: sugg.label, value: sugg.value });
        setInputValue('');
    };
    console.log(suggestions, 'suggestions')


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                border: '1.5px solid #1976d2',
                padding: '8px 12px',
                borderRadius: 2,
                minHeight: 56,
                position: 'relative',
                backgroundColor: '#f9fafb',
            }}>

            {tokens.map((token) => (
                <TokenChip key={token.id} token={token} />
            ))}

            <TextField
                variant="standard"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type formula..."
                sx={{
                    minWidth: 150,
                    flexGrow: 1,
                    '& .MuiInputBase-input': {
                        padding: '8px 6px',
                    },
                }}
            />
            {!isLoading && suggestions.length > 0 && (
                <Paper sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    mt: 0.5,
                    maxHeight: 200,
                    overflowY: 'auto',
                    borderRadius: 2,
                    boxShadow:
                        '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)',
                    bgcolor: 'background.paper',
                }}
                    elevation={3}>
                    <List dense disablePadding>
                        {suggestions.map((sugg) => (
                            <ListItem
                                key={sugg.id}
                                onClick={() => handleSelectSuggestion(sugg)}
                                sx={{
                                    cursor: 'pointer', '&:hover': {
                                        bgcolor: '#e3f2fd',
                                    },
                                }}
                            >
                                {sugg.label}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

        </Box>
    );
}
