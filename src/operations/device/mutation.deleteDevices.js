import * as service from '../../services/service.device.js';
import * as favoriteDeviceService from '../../services/service.favoriteDevice.js';
import * as securityService from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteDevices = async (_, { deviceIds, userName, tenant }, { token, session }) => {
  try {
    const disassociateCertificatesPromise = deviceIds.map(async (deviceId) => {
      const { data: certificateData } = await securityService
        .getAllCertificates({
          token,
          id: deviceId,
        });
      const { certificates } = certificateData;
      const disassociateLinkedCertificates = certificates.map(async (certificate) => {
        await securityService.disassociateCertificate(token, certificate.fingerprint);
      });
      await Promise.all(disassociateLinkedCertificates);
    });
    const deleteDevicesPromise = deviceIds.map(async (deviceId) => {
      await service.deleteDevice(token, deviceId);
      await favoriteDeviceService.removeFavorite(userName, tenant, deviceId);
    });
    await Promise.all(disassociateCertificatesPromise);
    await Promise.all(deleteDevicesPromise);
    return 'ok';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteDevices;
