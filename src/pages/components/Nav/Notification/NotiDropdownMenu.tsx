import React, { useState, MouseEvent } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NotiDropdownMenuContainer } from "../Container";
import { color } from "@/theme/color";

interface NotiDropdownMenuProps {
  items: string[];
  defaultItem: string;
  onItemSelected: (item: string) => void;
}

const NotiDropdownMenu: React.FC<NotiDropdownMenuProps> = ({
  items,
  defaultItem,
  onItemSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    onItemSelected(item);
    handleClose();
  };

  return (
    <NotiDropdownMenuContainer>
      <Button
        aria-controls={open ? "simple-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          color: color.primary.blue,
          fontWeight: "bold",
        }}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {selectedItem}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => (
          <MenuItem key={item} onClick={() => handleMenuItemClick(item)}>
            <Typography variant="element6" color={color.grey[900]}>
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </NotiDropdownMenuContainer>
  );
};

export default NotiDropdownMenu;
