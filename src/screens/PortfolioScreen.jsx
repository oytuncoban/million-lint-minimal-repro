import { Input, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import QUERY_KEY from '../constants/queryKeys';
import usePortfolioInit from '../hooks/usePortfolioInit';
import useSearchParamState from '../hooks/useSearchParamState';
import { Container, Header, Search } from './PortfolioScreen.styles';

const LIST_TYPES = Object.freeze({ Magazine: 'magazine', List: 'list' });

const PortfolioScreen = () => {
  const theme = useMantineTheme();

  // ! Adder and Breadcrumb init
  const [openAddModal, setOpenAddModal] = useState(false);
  function handleLeftTreeEvent(message, data) {
    if (message === 'LeftTree' && data.scope === 'portfolio' && data.event === 'click') {
      setFolderId(data.id);
    }
  }
  usePortfolioInit(setOpenAddModal, handleLeftTreeEvent);

  // ! List Display Type
  const [listType, setListType] = useState(LIST_TYPES.List);

  // ! Query params
  const [countPerPage, setCountPerPage] = useState(25);
  const [pageParam, setPageParam] = useSearchParamState('page', 1);
  const [sortBy, setSortBy] = useSearchParamState('sortBy', null);
  const [sortOrder, setSortOrder] = useSearchParamState('sortOrder', null);

  // ! Current Case ID
  const [caseId] = useSearchParamState('id');
  // ! Current Folder ID
  const [folderId, setFolderId] = useSearchParamState('folderId', null, { deleteOnValue: caseId, replaceState: false });

  // ! Data Fetcher for Folder
  const {
    data: currentPortfolioFolder,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.content],
    queryFn: async () => {
      try {
        return [];
      } catch (error) {
        console.error('Error fetching data', error);
        openInfoModal({ title: 'Error', children: 'Error fetching data', type: 'danger' });
        return error;
      }
    },
  });

  const itemClickHandler = (item) => {
    if (item.isFolder) {
      setFolderId(item.id);

      return;
    }

    //TODO:  Handle DocViewer
  };

  return (
    <Container>
      <Header>
        <Search>
          <div className="search-input">
            <Input
              styles={{
                wrapper: {
                  flexGrow: '1',
                },
                input: {
                  borderRadius: '0px',
                  fontSize: '12px',
                },
              }}
              placeholder="Davanın tüm içeriğinde ara"
            ></Input>
          </div>
        </Search>
      </Header>

      <LoadingOverlay visible={isLoading} />
    </Container>
  );
};

export default PortfolioScreen;
