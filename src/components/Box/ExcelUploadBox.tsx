//react
import React, { useRef, useState } from 'react';

//mui
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { t } from 'i18next';
import GenericButton from '../Button/GenericButton';
import { font } from '@/theme/font';

const ExcelUploadBox = ({
  handleUploadExcel,
  handleSetError,
  setSelectedFile,
  setErrorMag,
}: {
  handleUploadExcel: (file: File) => void;
  handleSetError: (boolean: boolean) => void;
  setSelectedFile: (file: File | null) => void;
  setErrorMag: (value: string) => void;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      const allowedExtensions = ['xls', 'xlsx'];

      if (!allowedExtensions.includes(fileExtension)) {
        handleSetError(true);
        setFileName('');
      } else {
        setSelectedFile(file);
        setFileName(file.name);
        handleSetError(false);
        handleUploadExcel(file);
      }
    }
  };

  const handleClick = () => {
    setErrorMag('');
    setSelectedFile(null);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '416px' }}>
      <TextField
        placeholder="No file selected"
        value={fileName}
        variant="outlined"
        sx={{
          width: '100%',
          '& .MuiInputBase-root.MuiOutlinedInput-root': {
            borderRadius: '8px',
            padding: '0',
            ...font.label1,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={hiddenInputRef}
              />
              <IconButton sx={{ ':hover': { backgroundColor: 'transparent' } }}>
                <GenericButton
                  type="button"
                  text={t('member:upload')}
                  size="small"
                  onClick={handleClick}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ExcelUploadBox;
