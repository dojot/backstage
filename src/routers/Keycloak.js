import { Router } from 'express';

import authRevoke from '../keycloak/authRevoke.js';
import getUserInfo from '../keycloak/getUserInfo.js';
import authenticate from '../keycloak/authenticate.js';

const router = Router();

router.get('/auth', authenticate);
router.get('/auth/revoke', authRevoke);
router.get('/auth/user-info', getUserInfo);

export default router;
