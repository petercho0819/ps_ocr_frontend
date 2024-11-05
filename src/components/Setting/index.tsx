import React, { useState } from 'react';
import {
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { t } from 'i18next';
import { color } from '@/theme/color';
import { font } from '@/theme/font';
import { useQuery, useMutation } from 'react-query';
import { getEmailSetting, updateEmailSetting } from '@/queries/apis/setting';

const Setting = () => {
  const {
    data: setting,
    isLoading,
    isError,
    refetch,
  } = useQuery(['getEmailSetting'], async () => {
    const response = await getEmailSetting();
    if (!response) {
      throw new Error('Failed to fetch Member Detail');
    }
    return response.data;
  });

  // Local state for form values
  const [formValues, setFormValues] = useState({
    uploadDate: '1',
    isActive: false,
  });

  // Create array of days 1-31
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  // Update local state when setting data is loaded
  React.useEffect(() => {
    if (setting) {
      setFormValues({
        uploadDate: setting.uploadDate,
        isActive: setting.isActive,
      });
    }
  }, [setting]);

  // Update mutation
  const updateMutation = useMutation((data) => updateEmailSetting(data), {
    onSuccess: () => {
      refetch();
    },
  });

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(formValues);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleSwitchChange = (event: { target: { checked: any } }) => {
    setFormValues((prev) => ({
      ...prev,
      isActive: event.target.checked,
    }));
  };

  const handleDateChange = (event: { target: { value: any } }) => {
    setFormValues((prev) => ({
      ...prev,
      uploadDate: event.target.value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading settings</div>;

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 15,
          width: '100%',
          borderBottom: '1px solid #F8F3F2',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            contentAlign: 'center',
          }}
        >
          <Typography variant="h2" color={color.text.black}>
            {t('mypage:setting')}
          </Typography>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={updateMutation.isLoading}
            sx={{
              backgroundColor: color.primary,
              '&:hover': {
                backgroundColor: color.primary,
                opacity: 0.9,
              },
            }}
          >
            {updateMutation.isLoading ? t('common:saving') : t('common:save')}
          </Button>
        </Box>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <Table>
          <TableBody>
            <TableRow sx={{ borderTop: '1px solid #11111126' }}>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('mypage:date_of_remind_receipt')}
              </TableCell>
              <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={formValues.uploadDate}
                    onChange={handleDateChange}
                    sx={{
                      height: '40px',
                      '& .MuiSelect-select': {
                        padding: '8px 14px',
                      },
                    }}
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}&nbsp;
                        {t('common:day')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Switch
                  checked={formValues.isActive}
                  onChange={handleSwitchChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Setting;
