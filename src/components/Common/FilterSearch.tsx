//mui
import { Box, FormControl, SelectChangeEvent } from '@mui/material';

//component
import InputBox from '@/components/Box/InputBox';

interface FilterProps {
  label: string;
  selectedValue: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterSearch: React.FC<FilterProps> = ({
  label,
  selectedValue,
  handleSearchInputChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {/* <FormControl sx={{ minWidth: 150 }}>
        <CustomSelectSingle
          label={label}
          options={options}
          selected={selectedValue}
          onChange={handleSelectChange}
        />
      </FormControl> */}
      <Box sx={{ width: '320px' }}>
        <InputBox type="search" onChange={handleSearchInputChange} />
      </Box>
    </Box>
  );
};

export default FilterSearch;
