import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';
import * as securityService from '../../services/service.security';

const deleteDevices = async (_, { deviceIds }, { token }) => {
  try {
    const promises = deviceIds.map(
      async (deviceId) => {
        const { data: certificateData } = await securityService.getAllCertificates(
          token, undefined, undefined, deviceId,
        );

        const { certificates } = certificateData;

        certificates.forEach(async (certificate) => await securityService.disassociateCertificate(token, certificate.fingerprint));

        await service.deleteDevice(token, deviceId);
      },
    );
    
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteDevices;
