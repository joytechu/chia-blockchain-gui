import fs from 'fs';

import { dump, load } from 'js-yaml';
import { useState, useEffect } from 'react';

export default function useAddressBook(): [
  IAddressContact[] | undefined, // contacts
  (
    name: string,
    addresses: IContactAddress[],
    dids: IContactDID[],
    notes: string,
    nftid: string,
    domainnames: IContactDomainName[]
  ) => void, // addContact
  (contactid: number) => void, // removeContact
  (contactid: number) => IAddressContact | undefined, // getContactContactId
  (contact: IAddressContact, contactid: number) => void,
  (address: string) => IAddressContact | undefined // getContactByAddress
] {
  // editContact
  const [addressBook, setAddressBook] = useState<IAddressContact[]>([]);

  // hard coded because getUserDataDir() is in gui package
  const ADDRESS_BOOK_PATH = '/Users/kev/.chia/mainnet/config/addressbook.yaml';
  const contactBookYaml = dump(addressBook);
  useEffect(() => {
    if (!fs.existsSync(ADDRESS_BOOK_PATH)) {
      setAddressBook([]);
    } else {
      const yamlData = fs.readFileSync(ADDRESS_BOOK_PATH, 'utf-8');
      const addresses = load(yamlData) as IAddressContact[];
      setAddressBook([...addresses]);
    }
  }, []);

  useEffect(() => {
    if (addressBook !== undefined) {
      const yaml = dump(addressBook);
      fs.writeFileSync(ADDRESS_BOOK_PATH, yaml);
    }
  }, [contactBookYaml, addressBook]);

  function getNewContactId(): number {
    if (addressBook.length === 0 || addressBook === undefined) return 1;
    return Math.max(...addressBook.map((o) => o.contactid)) + 1;
  }

  function addContact(
    name: string,
    addresses: IContactAddress[],
    dids: IContactDID[],
    notes: string,
    nftid: string,
    domainnames: IContactDomainName[]
  ) {
    const contactid = getNewContactId();
    const newAddress: IAddressContact = {
      contactid,
      name,
      addresses: [...addresses],
      dids,
      notes,
      nftid,
      domainnames,
    };

    setAddressBook([...addressBook, newAddress]);
  }

  function removeContact(contactId: number) {
    const filteredContacts = addressBook.filter((contact) => contact.contactid !== contactId);
    const yaml = dump(filteredContacts);
    fs.writeFileSync(ADDRESS_BOOK_PATH, yaml);
    setAddressBook([...filteredContacts]);
  }

  function getContactByContactId(contactid: number) {
    const found = addressBook.find((contact) => contact.contactid === contactid);
    return found;
  }

  function editContact(contact: IAddressContact, contactid: number) {
    const found = addressBook.find((c) => c.contactid === contactid);
    return found;
  }

  function getContactByAddress(address: string) {
    const result = addressBook.find(
      (ab) => ab.addresses !== undefined && ab.addresses.some((c) => c.address === address)
    );
    return result;
  }

  return [addressBook, addContact, removeContact, getContactByContactId, editContact, getContactByAddress];
}

interface IAddressContact {
  contactid: number;
  name: string;
  addresses: IContactAddress[];
  dids: IContactDID[];
  notes: string;
  nftid: string;
  domainnames: IContactDomainName[];
}

interface IContactAddress {
  name: string;
  address: string;
}

interface IContactDID {
  did: string;
}

interface IContactDomainName {
  domainname: string;
}
