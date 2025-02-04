import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectInputProps {
    value: string[];
    onChange: (event: SelectChangeEvent<string[]>) => void;
    items: string[];
    placeholder: string;
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({ value, onChange, items, placeholder }) => {
    return (
        <Select
            labelId="status-filter-label"
            id="status-filter"
            multiple
            displayEmpty
            value={value}
            onChange={onChange}
            renderValue={(selected) =>
                selected.length === 0 ? (
                    <span className="!text-textSecondary">{placeholder}</span>
                ) : (
                    <Box className="flex justify-start items-center gap-1">
                        {selected.map((status) => (
                            <Chip
                                key={status}
                                label={status}
                                className="!p-0 !bg-primary !text-textPrimary uppercase !rounded-md"
                            />
                        ))}
                    </Box>
                )
            }
            className="w-[450px] h-10 !rounded-lg bg-background border border-border"
            sx={{
                color: "#E2E8F0",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                ".MuiSvgIcon-root": { color: "#E2E8F0" },
            }}
            MenuProps={{
                PaperProps: {
                    style: {
                        marginTop: 8,
                        backgroundColor: "#0F172A",
                        borderRadius: "8px",
                        border: "solid 1px #334155",
                        boxShadow: "none",
                    },
                },
            }}
        >
            {items.map((status) => (
                <MenuItem
                    key={status}
                    value={status}
                    className={`
                        !bg-background !text-[14px] hover:!text-secondary capitalize ease-in-out duration-300 
                        ${value.includes(status) ? '!text-secondary' : '!text-textPrimary'}
                    `}
                >
                    {status}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelectInput;