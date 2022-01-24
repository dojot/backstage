import { Router } from 'express';
import * as templateService from '../services/TemplatesService.js';

const router = Router();

router.get('/checkconflicts', (req, res) => {
  templateService.checkConflicts(req.query.ids, req.user.service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

export default router;
