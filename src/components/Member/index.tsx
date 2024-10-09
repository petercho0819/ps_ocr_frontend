// ** react
import React, { useEffect, useState } from 'react';

// ** mui
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// ** theme
import { t } from 'i18next';
import { color } from '@/theme/color';
import { font } from '@/theme/font';
import InputBox from '../Box/InputBox';
import { convertDateFormat } from '@/utils/common';
import { useQuery } from 'react-query';
import { deleteMember, getMemberListByAdmin } from '@/queries/apis/member';
import useAuthStore from '@/store/auth.store';
import IconPrev from '../Icon/IconPrev';
import IconNext from '../Icon/IconNext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import OutlineButton from '../Button/OutlineButton';
import GenericButton from '../Button/GenericButton';
import FilterSearch from '../Common/FilterSearch';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import CantDeleteModal from './CantDeleteModal';
const Member = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userRoleType, setUserRoleType] = React.useState<string>('');

  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  //selectAll
  const [selectAll, setSelectAll] = useState(false);
  //searchKeyword
  const [searchKeyword, setSearchKeyword] = useState('');

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers
    ? filteredMembers.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalItems = filteredMembers ? filteredMembers.length : 0;

  const user = useAuthStore.getState().user;
  const {
    data: memberList,
    isLoading,
    isError,
    refetch,
  } = useQuery(['getMemberListByAdmin'], async () => {
    const response = await getMemberListByAdmin();
    if (!response) {
      throw new Error('Failed to fetch Member Detail');
    }
    return response.data;
  });

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const startItemIndex = indexOfFirstItem + 1;
  const endItemIndex = Math.min(indexOfLastItem, totalItems);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const updatedMembers = memberList.map((member: any) => ({
        ...member,
        selected: true,
      }));
      setSelectedMembers(updatedMembers);
    } else {
      setSelectedMembers([]);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    member: any,
  ) => {
    event.stopPropagation();
    const isMemberChecked = event.target.checked;
    let updatedSelectedMembers = [...selectedMembers];
    if (isMemberChecked) {
      updatedSelectedMembers.push(member);
    } else {
      updatedSelectedMembers = updatedSelectedMembers.filter(
        (selectedMember) => selectedMember.email !== member.email,
      );
    }
    setSelectedMembers(updatedSelectedMembers);

    // someone not select
    const anyMemberNotSelected = memberList.some(
      (m: any) =>
        !updatedSelectedMembers.some(
          (selectedMember) => selectedMember.email === m.email,
        ),
    );

    // cancel SelectAll
    setSelectAll(!anyMemberNotSelected);
  };

  const filterMembers = (
    memberList: any,
    searchKeyword: string,
    userRoleType: string,
    setFilteredMembers: (members: any) => void,
  ) => {
    const filterFunction = (member: any) => {
      return Object.values(member).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    };

    if (userRoleType.length > 0 && !userRoleType.includes('All')) {
      const filtered = memberList?.filter(
        (member: any) =>
          userRoleType.includes(member.role || '') && filterFunction(member),
      );
      setFilteredMembers(filtered || []);
    } else {
      const filtered = memberList ? memberList.filter(filterFunction) : [];
      setFilteredMembers(filtered);
    }
  };
  const handleUploadExcel = () => {};

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSearchKeyword: (value: string) => void,
  ) => {
    setSearchKeyword(event.target.value);
  };

  const handleDeleteButtonClick = () => {
    if (selectedMembers.length === 1 && selectedMembers[0].role === 'ADMIN') {
      setIsCloseModalOpen(true);
    } else if (selectedMembers.some((member) => member.role === 'ADMIN')) {
      setIsCloseModalOpen(true);
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsCloseModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedMembers.length > 0) {
      const nscEmailToDelete = selectedMembers.map((member) => member.email);
      try {
        await deleteMember(nscEmailToDelete);
        setIsConfirmModalOpen(false);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting dealerships:', error);
      }
    }
  };

  useEffect(() => {
    filterMembers(memberList, searchKeyword, userRoleType, setFilteredMembers);
  }, [memberList, searchKeyword]);
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
            {t('member:member')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => handleUploadExcel()}>
            <FileUploadIcon color="primary" />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
        }}
      >
        <FilterSearch
          label="User role"
          selectedValue={userRoleType}
          // handleSelectChange={(event: any) =>
          //   handleUserRoleChange(
          //     event,
          //     setUserRoleType,
          //     setFilteredMembers,
          //     memberList,
          //   )
          // }
          handleSearchInputChange={(event) =>
            handleSearchInputChange(event, setSearchKeyword)
          }
        />
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {/* <OutlineButton
            type="button"
            text="DOWNLOAD"
            onClick={handleDownload}
          /> */}

          <GenericButton
            type="button"
            text="DELETE"
            disabled={
              selectedMembers.length === 0 ||
              (selectedMembers.length === 1 &&
                selectedMembers[0].role === 'manager')
            }
            onClick={handleDeleteButtonClick}
          />

          {/* <GenericButton
            type="button"
            text="ADD"
            onClick={handleAddButtonClick}
          /> */}
        </Box>
      </Box>
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box
          sx={{
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" color={color.text.black}>
            {t('member:fetch_error')}
          </Typography>
        </Box>
      ) : memberList ? (
        <Box sx={{ padding: '0px 20px 20px' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f6f3f2' }}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                      sx={{ padding: '0' }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      ...font.label3,
                      color: color.text.black,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('member:email')}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...font.label3,
                      color: color.text.black,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('member:name')}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...font.label3,
                      color: color.text.black,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('member:role')}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...font.label3,
                      color: color.text.black,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('member:created')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((member: any, index: number) => (
                  <TableRow
                    key={`${member.nscCode}-${index}`}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedMembers.some(
                          (m) => m.email === member.email,
                        )}
                        onChange={(event) =>
                          handleCheckboxChange(event, member)
                        }
                        sx={{ padding: '0' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ ...font.element6, color: color.text.black_70 }}
                    >
                      {member.email}
                    </TableCell>
                    <TableCell
                      sx={{ ...font.element6, color: color.text.black_70 }}
                    >
                      {member.name}
                    </TableCell>
                    <TableCell
                      sx={{ ...font.element6, color: color.text.black_70 }}
                    >
                      {member.role}
                    </TableCell>
                    <TableCell
                      sx={{ ...font.element6, color: color.text.black_70 }}
                    >
                      {convertDateFormat(member.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '26px',
            }}
          >
            <Typography sx={{ ...font.element6, color: color.text.black_70 }}>
              {startItemIndex}-{endItemIndex} of {totalItems}
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <IconButton
                disabled={currentPage === 1}
                sx={{ ':hover': { backgroundColor: 'transparent ' } }}
              >
                <IconPrev
                  onClick={prevPage}
                  sx={{ width: '40px', height: '40px' }}
                />
              </IconButton>
              <IconButton
                disabled={currentItems.length < itemsPerPage}
                sx={{ ':hover': { backgroundColor: 'transparent ' } }}
              >
                <IconNext
                  onClick={nextPage}
                  sx={{ width: '40px', height: '40px' }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" color={color.text.black}>
            {t('member:no_member')}
          </Typography>
        </Box>
      )}
      <CantDeleteModal
        isOpen={isCloseModalOpen}
        handleClose={handleCloseModal}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        handleClose={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default Member;
