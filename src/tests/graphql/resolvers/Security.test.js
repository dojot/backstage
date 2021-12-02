const axios = require('axios');
const Resolvers = require('../../../operations/security/Resolvers');

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

const certRequest = [{
  data: {
    paging: {
      previous: null,
      current: {
        number: 1,
        url: "/api/v1/certificates?page=1&limit=10"
      },
      next: null,
      totalItems: 2,
      totalPages: 1,
      limitPerPage: 10
    },
    certificates: [
      {
        issuedByDojotPki: true,
        autoRegistered: false,
        fingerprint: "63:E3:AE:0A:FF:61:A1:5E:92:FF:41:FD:7B:B3:B7:01:5F:38:3B:29:C6:FE:3B:46:13:F0:D0:62:02:48:A6:83",
        pem: "-----BEGIN CERTIFICATE----------END CERTIFICATE-----",
        belongsTo: {
          device: "XXXXXX"
        },
        subjectDN: "CN=e5d299, O=dojot IoT Platform",
        validity: {
          notBefore: "2021-11-26T12:26:00.000Z",
          notAfter: "2022-11-26T12:26:00.000Z"
        },
        tenant: "admin",
        createdAt: "2021-11-26T12:00:00.000Z",
        modifiedAt: "2021-11-26T12:00:00.000Z"
      }
    ]
  }
}];
const certResponse = [{
  pagination: {
    page: 1,
    total: 1,
    hasNext: false,
    nextPage: null,
    limitPerPage: 10,
    totalItems: 2
  },
  certificates: [
    {
      autoRegistered: false,
      issuedByDojotPki: true,
      subjectDN: "CN=e5d299, O=dojot IoT Platform",
      pem: "-----BEGIN CERTIFICATE----------END CERTIFICATE-----",
      fingerprint: "63:E3:AE:0A:FF:61:A1:5E:92:FF:41:FD:7B:B3:B7:01:5F:38:3B:29:C6:FE:3B:46:13:F0:D0:62:02:48:A6:83",
      createdAt: "2021-11-26T12:00:00.000Z",
      modifiedAt: "2021-11-26T12:00:00.000Z",
      tenant: "admin",
      belongsTo: {
        device: "XXXXXX"
      },
      validity: {
        notAfter: "2022-11-26T12:26:00.000Z",
        notBefore: "2021-11-26T12:26:00.000Z"
      }
    }
  ]
}];

it('Certificate - should return one certificate', () => {
  const root = {};
  const params = {page: {number: 0, size: 5}};
  const context = {};

  axios.get.mockImplementationOnce(() => Promise.resolve(certRequest[0]));

  return Resolvers.Query.getCertificateList(root, params, context).then((output) => {
    expect(output).toEqual(certResponse[0]);
  });
});

