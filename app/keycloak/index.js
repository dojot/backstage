const {
  ConfigManager: { getConfig },
  Logger,
} = require('@dojot/microservice-sdk');
const { default: axios } = require('axios');
const https = require('https');
const Requests = require('./Requests.js');
const { buildUrlLogin, buildUrlLogout } = require('./Utils.js');
const { replaceTLSFlattenConfigs } = require('../Utils');

const {
  keycloak: configKeycloak,
} = getConfig('BS');

const logger = new Logger('backstage:Keycloak');

/**
 * Wrapper for Keycloak
 */
class Keycloak {
  /**
   *
   * @param {an instance of @dojot/microservice-sdk.ServiceStateManager
   *          with register service 'keycloak'} serviceState
   *          Manages the services' states, providing health check and shutdown utilities.
   *
   */
  constructor(serviceState) {
    this.serviceName = 'keycloak';
    this.clientId = configKeycloak['public.client.id'];
    this.externalKeycloakUrl = configKeycloak['url.external'];
    this.internalKeycloakUrl = configKeycloak['url.api.gateway'];
    this.healthCheckMs = configKeycloak['healthcheck.ms'];
    this.createHealthChecker(serviceState);


    this.axiosKeycloak = axios.create({
      baseURL: this.internalKeycloakUrl,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });

    if (configKeycloak.secure) {
      const configReplaced = replaceTLSFlattenConfigs(configKeycloak);

      this.axiosKeycloak.httpsAgent = new https.Agent(
        { ...configReplaced.ssl },
      );
    }

    this.requests = new Requests(
      this.clientId,
      this.axiosKeycloak,
    );
  }


  /**
   * Returns a Requests instance
   * @returns {Requests}
   */
  getRequestsInstance() {
    return this.requests;
  }

  /**
   * Built external URL for browser login
   *
   * @param {string} realm
   * @param {string} state
   * @param {string} codeChallenge
   * @returns
   */
  buildUrlLogin(realm, state, codeChallenge, urlReturn) {
    return buildUrlLogin({
      baseUrl: this.externalKeycloakUrl,
      clientId: this.clientId,
      realm,
      state,
      codeChallenge,
      codeChallengeMethod: configKeycloak['code.challenge.method'],
      urlReturn,
    });
  }

  /**
   * Built external URL for browser logout
   *
   * @param {string} realm
   * @returns
   */
  buildUrlLogout(realm, redirectUri) {
    return buildUrlLogout({
      baseUrl: this.externalKeycloakUrl,
      redirectUri,
      realm,
    });
  }

  /**
   * Create a 'healthCheck' for Keycloak
   *
   * @private
   *
   * @param {an instance of @dojot/microservice-sdk.ServiceStateManager
   *          with register service 'Keycloak'} serviceState
   *          Manages the services' states, providing health check and shutdown utilities.
   */
  createHealthChecker(serviceState) {
    const healthChecker = async (signalReady, signalNotReady) => {
      const connected = await this.requests.getStatus();
      if (connected) {
        logger.debug('createHealthChecker: Keycloak is healthy');
        signalReady();
      } else {
        logger.warn('createHealthChecker: Keycloak is not healthy');
        signalNotReady();
      }
    };
    serviceState.addHealthChecker(this.serviceName,
      healthChecker, this.healthCheckMs);
  }
}

module.exports = Keycloak;
