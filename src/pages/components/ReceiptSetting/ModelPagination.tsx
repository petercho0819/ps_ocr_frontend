// ** react
import React from "react";

// ** mui
import { Box, IconButton, Typography } from "@mui/material";

// ** component
import { IconPrev } from "@/components/Icon/IconPrev";
import { IconNext } from "@/components/Icon/IconNext";

// ** common
import { MemberDetail } from "@/common/types/member";
import { color } from "@/theme/color";
import { font } from "@/theme/font";
import { ModelPageContainer } from "./Container";

interface ModelPaginationProps {
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  itemsPerPage: number;
  data?: MemberDetail[];
  totalItems: number;
}

const ModelPagination: React.FC<ModelPaginationProps> = ({
  currentPage,
  prevPage,
  nextPage,
  itemsPerPage,
  data,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const indexOfLastItem = validCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const startItemIndex = Math.max(0, indexOfFirstItem) + 1;
  const endItemIndex = Math.min(indexOfLastItem, totalItems);

  return (
    <ModelPageContainer>
      <Typography sx={{ ...font.element6, color: color.text.black_70 }}>
        {startItemIndex}-{endItemIndex} of {totalItems}
      </Typography>

      <IconButton
        disabled={validCurrentPage === 1}
        sx={{ ":hover": { backgroundColor: "transparent " } }}
      >
        <IconPrev onClick={prevPage} sx={{ width: "40px", height: "40px" }} />
      </IconButton>

      <IconButton
        disabled={validCurrentPage === totalPages}
        sx={{ ":hover": { backgroundColor: "transparent " } }}
      >
        <IconNext onClick={nextPage} sx={{ width: "40px", height: "40px" }} />
      </IconButton>
    </ModelPageContainer>
  );
};

export default ModelPagination;
