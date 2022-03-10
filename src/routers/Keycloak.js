import { Router } from 'express';

import authRevoke from '../keycloak/routes/authRevoke.js';
import authReturn from '../keycloak/routes/authReturn.js';
import getUserInfo from '../keycloak/routes/getUserInfo.js';
import authenticate from '../keycloak/routes/authenticate.js';

const router = Router();

router.get('/backstage/v1/auth', authenticate);
router.get('/backstage/v1/auth/return', authReturn);
router.get('/backstage/v1/auth/revoke', authRevoke);
router.get('/backstage/v1/auth/user-info', getUserInfo);

export default router;
