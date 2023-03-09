
import { crmContactsDao } from "../DbAccess/crmContactsDao"

const getContact = async (id="") => {
    const contact =  await crmContactsDao.getContact(id)
    return contact
}

const getContacts = async () => {
    const contacts = await crmContactsDao.getContacts();
    return contacts
}

const createContact = async(contact) => {
    const res = await crmContactsDao.insertContact(contact)
    return res
}

const updateContact = async(id, contact) => {
    const res = await crmContactsDao.updateContact(id, contact)
    return res
}

export {
    getContact, 
    getContacts,
    createContact,
    updateContact
};
