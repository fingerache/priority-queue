
import { getContact, getContacts } from "../controllers/crmController";

const crmRoutes = (app) => {
    app.route('/crm/contact/')
    .get(
    //     (req, res, next) => {
    //     //middleware
    //     //console.log("middleware")
    //     next();
        
    // }, 
    async (req, res, next)=>{
        const id = req.query.id
        res.send(await getContact(id))
    })

    app.route('/crm/contacts').get( async (req, res, next) => {
        res.send(await getContacts())
    })
    // app.route('/crm/contact').put((req, res) => {
    //     const body  = req.body;
    //     res.send(body["description"]);
    // })
    app.route('/crm/contact').post(async (req, res) => {
        const body  = req.body;
        
        res.send(body);
    })
    // app.route('/crm/contact').delete((req, res) => {
    //     const body  = req.body;
    //     res.send("DELETE request received");
    // })
}

export default crmRoutes