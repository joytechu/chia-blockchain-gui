// import { useGetNFTInfoQuery } from '@chia-network/api-react';
import { CopyToClipboard, Flex } from '@chia-network/core';
import { Trans } from '@lingui/macro';
import { EditOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import { launcherIdFromNFTId } from '../../util/nfts';
// import NFTPreview from '../nfts/NFTPreview';
import { AddressBookContext } from './AddressBookProvider';

export default function ContactSummary() {
  const { contactid } = useParams();
  const navigate = useNavigate();
  const [, , , getContactContactId] = useContext(AddressBookContext);
  const contact = getContactContactId(Number(contactid));

  // commented out - until this stops throwing an error when not a valid nft
  // const launcherId = launcherIdFromNFTId(contact.nftid ?? '');

  // const { data: nft } = useGetNFTInfoQuery({ coinId: launcherId ?? '' });

  if (contactid === undefined || contact === undefined) return <div />;

  function handleEditContact(id: number) {
    navigate(`/dashboard/addressbook/edit/${id}`);
  }

  /*
  function getImage() {
    // if (nft !== undefined) return <NFTPreview nft={nft} height={50} width={50} disableThumbnail />;
    return <img height={80} width={80} style={{ backgroundColor: 'grey', color: 'grey' }} />;
  }
  */

  return (
    <div>
      <Flex
        flexDirection="row"
        justifyContent="right"
        style={{ height: '80px', background: '#CCDDE1', borderRadius: '10px' }}
      >
        <Flex style={{ paddingRight: '30px' }}>
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              left: 44,
              top: 48,
            }}
          >
            <Trans>{contact.name}</Trans>
          </Typography>
          <IconButton
            onClick={() => handleEditContact(contactid)}
            sx={{
              position: 'absolute',
              right: 44,
              top: 44,
            }}
          >
            <EditOutlined />
          </IconButton>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap={2} alignItems="center" style={{ marginTop: '40px', paddingBottom: '40px' }}>
        {/*
        <Flex style={{ width: '600px' }}>{getImage()}</Flex>
        <Flex style={{ width: '600px' }}>
          <Flex alignSelf="flex-start">
            <h1>
              <Trans>{contact.name}</Trans>
            </h1>
          </Flex>
        </Flex>
        */}
        <Flex flexDirection="column" gap={6} maxWidth="600px" style={{ width: '100%' }}>
          <Flex flexDirection="column" gap={3} flexGrow={1}>
            <Typography variant="h6">Addresses</Typography>
            <Flex flexDirection="column" gap={3} flexGrow={1}>
              {contact.addresses.map((addressInfo) => (
                <TextField
                  label={addressInfo.name}
                  value={addressInfo.address}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CopyToClipboard value={addressInfo.address} />
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap={3} flexGrow={1}>
            <Typography variant="h6">DIDs</Typography>
            <Flex flexDirection="column" gap={3} flexGrow={1}>
              {contact.dids.map((didInfo) => (
                <TextField
                  label={didInfo.name}
                  value={didInfo.did}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CopyToClipboard value={didInfo.did} />
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap={3} flexGrow={1}>
            <Typography variant="h6">Domain Names</Typography>
            <Flex flexDirection="column" gap={3} flexGrow={1}>
              {contact.domainnames.map((domainInfo) => (
                <TextField
                  label={domainInfo.name}
                  value={domainInfo.domainname}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CopyToClipboard value={domainInfo.domainname} />
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
