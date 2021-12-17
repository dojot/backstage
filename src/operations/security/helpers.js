const asn1js = require('asn1js');
const {arrayBufferToString, toBase64} = require('pvutils');
const {
  CertificationRequest,
  Attribute,
  AttributeTypeAndValue,
  Extension,
  Extensions,
  GeneralName,
  GeneralNames,
  BasicConstraints,
  getAlgorithmParameters,
  getCrypto,
  setEngine,
  CryptoEngine
} = require('pkijs');
const LOG = require("../../utils/Log");
const {Crypto} = require("@peculiar/webcrypto");
const webcrypto = new Crypto();
setEngine("newEngine", webcrypto, new CryptoEngine({name: "", crypto: webcrypto, subtle: webcrypto.subtle}));

const _subjectAltNameCSR = (subjAltCSR) => {
  if (!((subjAltCSR.email && subjAltCSR.email.length > 0)
    || (subjAltCSR.dns && subjAltCSR.dns.length > 0)
    || (subjAltCSR.ip && subjAltCSR.ip.length > 0))) {
    return null;
  }

  const emailAlt = subjAltCSR.email.map((email) => new GeneralName({
    type: 1, // rfc822Name
    value: email,
  }));

  const dnsAlt = subjAltCSR.dns.map((dns) => new GeneralName({
    type: 2, // dNSName
    value: dns,
  }));

  const ipsAlt = subjAltCSR.ip.map((ip) => new GeneralName({
    type: 7, // iPAddress
    value: new asn1js.OctetString({valueHex: (new Uint8Array(ip.split('.'))).buffer}),
  }));


  return new GeneralNames({names: [...emailAlt, ...dnsAlt, ...ipsAlt]});
}

const _setExtensionsCSR = (pkcs10, subjAltCSR) => {
  const bitArray = new ArrayBuffer(1);
  const bitView = new Uint8Array(bitArray);
  // eslint-disable-next-line no-bitwise
  bitView[0] |= 0x0020; // Key usage "KeyEncipherment" flag
  // eslint-disable-next-line no-bitwise
  bitView[0] |= 0x0040; // Key usage "NonRepudiation" flag
  // eslint-disable-next-line no-bitwise
  bitView[0] |= 0x0080; // Key usage "DigitalSignature" flag

  // region "BasicConstraints" extension
  const basicConstr = new BasicConstraints({
    cA: false,
  });

  const extensions = [
    new Extension({
      extnID: '2.5.29.15', // KeyUsage
      critical: false,
      extnValue:
        (new asn1js.BitString({valueHex: bitArray})).toBER(false),
    }),
    new Extension({
      extnID: '2.5.29.19', // BasicConstraints
      critical: false,
      extnValue: basicConstr.toSchema()
        .toBER(false),
      // Parsed value for well-known extensions
      parsedValue: basicConstr,
    }),
  ];

  // Subject alternative name
  const altNames = _subjectAltNameCSR(subjAltCSR);
  if (altNames) {
    extensions.push(new Extension({
      extnID: '2.5.29.17', // subjectAltName
      critical: false,
      extnValue: altNames.toSchema()
        .toBER(false),
      parsedValue: altNames,
    }));
  }

  // set all extensions
  pkcs10.attributes.push(new Attribute({
    type: '1.2.840.113549.1.9.14', // pkcs-9-at-extensionRequest
    values: [(new Extensions({
      extensions,
    })).toSchema()],
  }));
}

const _optionalTypesAndValuesCSR = (pkcs10, typesAndValues) => {
  if (typesAndValues.country) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.6',
      value: new asn1js.PrintableString({
        value: typesAndValues.country,
      }),
    }));
  }

  if (typesAndValues.state) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.8',
      value: new asn1js.Utf8String({
        value: typesAndValues.state,
      }),
    }));
  }

  if (typesAndValues.locality) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.7',
      value: new asn1js.Utf8String({
        value: typesAndValues.locality,
      }),
    }));
  }

  if (typesAndValues.organization) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.11',
      value: new asn1js.Utf8String({
        value: typesAndValues.organization,
      }),
    }));
  }

  if (typesAndValues.organizationUnit) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.10',
      value: new asn1js.Utf8String({
        value: typesAndValues.organizationUnit,
      }),
    }));
  }
}

const _extractKeyStringKeyPar = async (crypto, key, format) => {
  try {
    const exportPrivateKey = await crypto.exportKey(format, key);
    return String.fromCharCode.apply(
      null,
      new Uint8Array(exportPrivateKey),
    );
  } catch (error) {
    LOG.error(error);
    throw error;
  }
}

const _formatPEM = (pemString, type) => {
  const publicStr = 'PUBLIC KEY'
  const privateStr = 'CERTIFICATE REQUEST'
  let resultString = '';
  if (pemString) {
    for (let i = 0, count = 0; i < pemString.length; i += 1, count += 1) {
      if (count > 63) {
        resultString = `${resultString}\r\n`;
        count = 0;
      }
      resultString = `${resultString}${pemString[i]}`;
    }
  }
  return (
    `-----BEGIN ${type === 'public' ? publicStr :  privateStr}-----\r\n` +
    resultString +
    `\r\n-----END ${type === 'public' ? publicStr :  privateStr}-----`
  );
}

const generateKeyPar = async (signAlgorithm, hashAlgorithm) => {
  const crypto = getCrypto();
  if (!crypto) {
    throw new Error('No crypto');
  }

  const algorithm = getAlgorithmParameters(signAlgorithm, 'generatekey');

  if ('hash' in algorithm.algorithm) {
    algorithm.algorithm.hash.name = hashAlgorithm;
  }

  const keyPair = await crypto.generateKey(algorithm.algorithm, true, algorithm.usages);
  const {
    publicKey,
    privateKey,
  } = keyPair;


  const privateKeyPEM = _formatPEM(toBase64(await _extractKeyStringKeyPar(crypto, privateKey, 'pkcs8')), 'private')
  const publicKeyPEM = _formatPEM(toBase64(await _extractKeyStringKeyPar(crypto, publicKey, 'spki')), 'public')

  return {privateKeyPEM, privateKeyPkcs8: privateKey, publicKeyPEM, publicKeyPkcs8: publicKey}
}

const createCSR = async (commonName, publicKeyPkcs8, privateKeyPkcs8, hashAlgorithm, typesAndValues, subjAltCSR) => {
  const pkcs10 = new CertificationRequest();
  pkcs10.attributes = [];
  pkcs10.version = 0;

  _optionalTypesAndValuesCSR(pkcs10, typesAndValues);

  if (commonName) {
    pkcs10.subject.typesAndValues.push(new AttributeTypeAndValue({
      type: '2.5.4.3',
      value: new asn1js.Utf8String({
        value: commonName,
      }),
    }));
  }

  _setExtensionsCSR(pkcs10, subjAltCSR);

  await pkcs10.subjectPublicKeyInfo.importKey(publicKeyPkcs8);
  await pkcs10.sign(privateKeyPkcs8, hashAlgorithm);
  const _csrRaw = pkcs10.toSchema().toBER(false);

  return _formatPEM(toBase64(arrayBufferToString(_csrRaw)))
}


module.exports = {generateKeyPar, createCSR}
