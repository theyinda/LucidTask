
import React, { useState } from 'react';
import { Chip, IconButton, Menu, MenuItem, Popover, Box, TextField, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useFormulaStore } from '../store/formulaStore';
import type { Token } from '../types/formula';

interface Props {
    token: Token;
}

const getColorByType = (type: Token['type']) => {
    switch (type) {
        case 'tag':
            return 'primary';
        case 'operator':
            return 'secondary';
        case 'number':
            return 'success';
        default:
            return 'default';
    }
};


const TokenChip: React.FC<Props> = ({ token }) => {
    const { removeToken, updateToken } = useFormulaStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editAnchorEl, setEditAnchorEl] = useState<null | HTMLElement>(null);
    const [editValue, setEditValue] = useState(token.label);

    const open = Boolean(anchorEl);
    const editOpen = Boolean(editAnchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
        setEditAnchorEl(event.currentTarget);
        handleMenuClose();
    };

    const handleEditClose = () => {
        setEditAnchorEl(null);
    };

    const handleEditSave = () => {
        updateToken(token.id, { label: editValue });
        handleEditClose();
    };

    if (token.type === 'tag') {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <Chip label={token.label} />
                <IconButton size="small" onClick={handleMenuClick} sx={{ ml: -1 }}>
                    <ArrowDropDownIcon fontSize="small" />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={() => removeToken(token.id)}>Delete</MenuItem>
                </Menu>

                <Popover
                    open={editOpen}
                    anchorEl={editAnchorEl}
                    onClose={handleEditClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                        <TextField
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            size="small"
                        />
                        <Button size="small" onClick={handleEditSave}>Save</Button>
                    </Box>
                </Popover>
            </Box>
        );
    }
    return <Chip label={token.label} sx={{ mr: 1 }} color={getColorByType(token.type)} />;
};

export default TokenChip;
