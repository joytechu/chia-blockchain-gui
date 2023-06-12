// import { useGetNFTInfoQuery } from '@chia-network/api-react';
import { AddressBookContext, Flex, Form, TextField } from '@chia-network/core';
import { Trans } from '@lingui/macro';
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

// import { launcherIdFromNFTId } from '../../util/nfts';
// import NFTPreview from '../nfts/NFTPreview';

export default function ContactEdit() {
  const [, , , getContactContactId, editContact] = useContext(AddressBookContext);
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact = getContactContactId(Number(contactId));

  const [name, setName] = useState(contact.name);
  const [addresses, setAddresses] = useState(contact.addresses);
  const [dids, setDIDs] = useState(contact.dids);
  const [domains, setDomains] = useState(contact.domainNames);

  const methods = useForm<ContactEditData>({
    name: '',
    notes: '',
    nftid: '',
  });

  // commented out - until this stops throwing an error when not a valid nft
  // const launcherId = launcherIdFromNFTId(contact.nftid ?? '');

  // const { data: nft } = useGetNFTInfoQuery({ coinId: launcherId });

  /*
  function getImage() {
    // if (nft !== undefined) return <NFTPreview nft={nft} height={50} width={50} disableThumbnail />;
    return <img height={80} width={80} style={{ backgroundColor: 'grey', color: 'grey' }} />;
  }
  */

  function handleChange(i, type, e, stateVar, setStateVar) {
    const newList = [...stateVar];
    newList[i][type] = e.target.value;
    setStateVar(newList);
  }

  function addField(type, stateVar, setStateVar) {
    setStateVar([...stateVar, { name: '', [type]: '' }]);
  }

  function removeField(i, stateVar, setStateVar) {
    const newList = [...stateVar];
    newList.splice(i, 1);
    setStateVar(newList);
  }

  function addDefaultName(entry, i, type, stateVar, setStateVar) {
    const newList = [...stateVar];
    if (newList[i].name === '') {
      newList[i].name = newList[i][type];
    }
    setStateVar(newList);
  }

  async function handleSubmit(data: ContactEditData) {
    if (addresses.length === 0) throw new Error('At least one Address must be provided to create contact');
    if (addresses.name === 0) throw new Error('Name must be provided to create a contact');
    addresses.map((entry, index) => addDefaultName(entry, index, 'address', addresses, setAddresses));
    dids.map((entry, index) => addDefaultName(entry, index, 'did', dids, setDIDs));
    domains.map((entry, index) => addDefaultName(entry, index, 'domainname', domains, setDomains));
    editContact(contact.contactId, name, addresses, dids, data.notes, data.nftid, domains);
    navigate(`/dashboard/addressbook/`);
  }

  function handleCancel(id: number) {
    navigate(`/dashboard/addressbook/${id}`);
  }

  return (
    <div>
      <Form methods={methods} key={0} onSubmit={handleSubmit}>
        <Flex
          flexDirection="row"
          justifyContent="right"
          style={{ height: '80px', background: '#CCDDE1', borderRadius: '10px' }}
        >
          <Flex flexGrow={1}>
            <Typography
              variant="h5"
              sx={{
                position: 'absolute',
                left: 44,
                top: 48,
              }}
            >
              <Trans>Edit Contact</Trans>
            </Typography>
          </Flex>
          <Flex style={{ paddingRight: '30px' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                position: 'absolute',
                right: 44,
                top: 44,
              }}
            >
              <Trans>Save</Trans>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleCancel(Number(contact.contactId))}
              sx={{
                position: 'absolute',
                right: 122,
                top: 44,
              }}
            >
              <Trans>Cancel</Trans>
            </Button>
          </Flex>
        </Flex>

        <Flex flexDirection="column" gap={6} alignItems="center" style={{ paddingBottom: '40px' }}>
          <Flex flexDirection="column" gap={6} maxWidth="600px" style={{ width: '100%', paddingTop: '40px' }}>
            <Flex gap={2} flexDirection="column">
              <Typography variant="h6">
                <Trans>Contact Name</Trans>
              </Typography>
              <TextField
                name="name"
                variant="filled"
                color="secondary"
                fullWidth
                disabled={false}
                label={<Trans>Name</Trans>}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Flex>
            <Flex gap={2} flexDirection="column">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                  <Trans>Addresses</Trans>
                </Typography>
                <IconButton onClick={() => addField('address', addresses, setAddresses)}>
                  <Add />
                </IconButton>
              </Box>
              {addresses.map((element, index) => (
                <div>
                  <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                    <TextField
                      name="addressName"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>Name</Trans>}
                      value={element.name || ''}
                      onChange={(e) => handleChange(index, 'name', e, addresses, setAddresses)}
                    />
                    <TextField
                      name="address"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>Address</Trans>}
                      value={addresses[index].address}
                      onChange={(e) => handleChange(index, 'address', e, addresses, setAddresses)}
                    />
                    <IconButton onClick={() => removeField(index, addresses, setAddresses)}>
                      <Remove />
                    </IconButton>
                  </Box>
                </div>
              ))}
            </Flex>
            <Flex gap={2} flexDirection="column">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                  <Trans>DIDs</Trans>
                </Typography>
                <IconButton onClick={() => addField('did', dids, setDIDs)}>
                  <Add />
                </IconButton>
              </Box>
              {dids.map((element, index) => (
                <div>
                  <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                    <TextField
                      name="didName"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>Name</Trans>}
                      value={element.name || ''}
                      onChange={(e) => handleChange(index, 'name', e, dids, setDIDs)}
                    />
                    <TextField
                      name="did"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>DID</Trans>}
                      value={dids[index].did}
                      onChange={(e) => handleChange(index, 'did', e, dids, setDIDs)}
                    />
                    <IconButton onClick={() => removeField(index, dids, setDIDs)}>
                      <Remove />
                    </IconButton>
                  </Box>
                </div>
              ))}
            </Flex>
            <Flex gap={2} flexDirection="column">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                  <Trans>Domain Names</Trans>
                </Typography>
                <IconButton onClick={() => addField('domainname', domains, setDomains)}>
                  <Add />
                </IconButton>
              </Box>
              {domains.map((element, index) => (
                <div>
                  <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                    <TextField
                      name="domainName"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>Name</Trans>}
                      value={element.name || ''}
                      onChange={(e) => handleChange(index, 'name', e, domains, setDomains)}
                    />
                    <TextField
                      name="domain"
                      variant="filled"
                      color="secondary"
                      fullWidth
                      disabled={false}
                      label={<Trans>Domain</Trans>}
                      value={domains[index].domainname}
                      onChange={(e) => handleChange(index, 'domainname', e, domains, setDomains)}
                    />
                    <IconButton onClick={() => removeField(index, domains, setDomains)}>
                      <Remove />
                    </IconButton>
                  </Box>
                </div>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
}

type ContactEditData = {
  name: string;
  notes: string;
  nftid: string;
};
