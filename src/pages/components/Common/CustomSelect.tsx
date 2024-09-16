import React from "react";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import { color } from "@/theme/color";

interface CustomSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = (
  props: CustomSelectProps
) => {
  const { label, options, selected, onChange } = props;
  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (value: string, selectedValues: string[], theme: Theme) => {
    return {
      fontWeight:
        selectedValues.indexOf(value) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <FormControl
        sx={{
          width: "100%",
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      >
        <Select
          displayEmpty
          value={selected}
          onChange={onChange}
          input={<OutlinedInput />}
          renderValue={(selectedValues) => {
            if (selectedValues.length === 0) {
              return (
                <Typography
                  sx={{
                    color: color.text.black_40,
                  }}
                >
                  {label}
                </Typography>
              );
            }
            return selectedValues.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
              padding: "0",
            },
            "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select":
              {
                height: "10px",
                padding: "10px",
                color: color.text.black_70,
                fontFamily: "Hyundai Sans Text Medium",
                fontSize: "14px",
                lineHeight: "20px",
              },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selected, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
