import { mongodb } from '../../../helpers';
import Alert from '../../../models/Alert';

mongodb.connect();

export default handler;

async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const alerts = await Alert.find({})
                res.status(200).json({ success: true, data: alerts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const alert = await Alert.create(req.body)
                res.status(201).json({ success: true, data: alert })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}