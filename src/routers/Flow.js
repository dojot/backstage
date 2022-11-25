import { Router } from 'express';

import locale from '../Flow/locales.js'
import nodes from '../Flow/nodes.js'

const router = Router();

router.get('/backstage/flow/nodes', nodes);
router.get('/backstage/i18n/locales/:localeLabel', locale);

export default router;
