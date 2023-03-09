
import { getCollectionAsync } from "../../mongodb";

const crmContactsDao = {
    getContacts:  async () => {
        const coll = await getCollectionAsync('test', 'contacts')
        const contacts = await coll.find({})

        return await contacts.toArray()
        
    },
    getContact: async (id) => {
        const coll =  await getCollectionAsync('test', 'contacts')
        let crmContact;
        if(id==""){
            crmContact =  await coll.findOne()
        }else{
            crmContact = await coll.findOne({"user_id.$oid": id})
        }

        return crmContact;
    },
    insertContact: async( contact ) => {
        const res = await getCollectionAsync('test', 'contacts').insertOne(contact)
        return res
    },
    updateContact: async( id, contact ) => {
        const res = await getCollectionAsync('test', 'contacts').update(
            {"_id.$oid": id},
            {
                "$set": {
                    contact
                }
            }
        )
        return res
    }
}

export {crmContactsDao}