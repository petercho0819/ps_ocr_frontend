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
  defaultValue?: string;
  label: string;
  options: string[];
  selected?: string | undefined;
  onChange: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
}

const CustomSelectSingle: React.FC<CustomSelectProps> = (
  props: CustomSelectProps
) => {
  const { defaultValue, label, options, selected = "", onChange } = props;
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        minWidth: 150,
      },
    },
  };

  const getStyles = (value: string, selectedValues: string, theme: Theme) => {
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
          overflow: "auto",
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      >
        <Select
          displayEmpty
          value={selected}
          defaultValue={defaultValue}
          onChange={onChange}
          input={<OutlinedInput />}
          renderValue={(selectedValues) => {
            if (selectedValues.length === 0) {
              return (
                <>
                  {defaultValue ? (
                    <Typography variant="element6" color={color.text.black}>
                      {defaultValue}
                    </Typography>
                  ) : (
                    <Typography variant="element6" color={color.grey[500]}>
                      {label}
                    </Typography>
                  )}
                </>
              );
            }
            return selectedValues;
          }}
          disabled={props.disabled}
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
                fontFamily: "Hyundai Sans Text Regular",
                fontSize: "14px",
                lineHeight: "20px",
              },
          }}
        >
          {options?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selected, theme)}
              sx={{
                fontFamily: "Hyundai Sans Text Regular",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelectSingle;
