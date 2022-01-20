const TypeDefs = [`
  #Pagination data structure#
  type SecurityPagination {
    currentPage: Int
    totalPages: Int
    hasNextPage: Boolean
    nextPage: Int
    totalItems: Int
    limitPerPage: Int
  }
  #Certificate data structure#
  type Certificates {
    issuedByDojotPki: Boolean
    autoRegistered: Boolean
    subjectDN: String
    fingerprint: String
    pem: String
    belongsTo: CertDevice
    tenant: String
    createdAt: String
    modifiedAt: String
    validity: Validity
  }
  type Validity {
    notAfter: String
    notBefore: String
  }
  #Device association#
  type CertDevice {
    device: String
  }
  #Certificate list with pagination#
  type Certs {
    certificates: [Certificates]
    pagination: SecurityPagination
  }
  type CertKeys {
    certificatePem: String
    certificateFingerprint: String
    privateKeyPEM: String
    publicKeyPEM: String
  }
  #Input to filter certificates
  input FilterCertificateInput {
    fingerprint: String
  }
  #Input to filter certification authorities
  input FilterCertificationAuthoritiesInput {
    caFingerprint: String
  }
  type CertificationAuthority {
    allowAutoRegistration: Boolean
    caFingerprint: String
    caPem: String
    subjectDN: String
    validity: Validity
    tenant: String
    createdAt: String
    modifiedAt: String
  }
  type CertificationAuthorityList {
    certificationAuthorities: [CertificationAuthority]
    pagination: SecurityPagination
  }
  type externalCertRegistration {
    certificateFingerprint: String
  }
  type Query {
    #Returns the list of certificates in paginated form.
    getCertificateList(page: PageInput, filter: FilterCertificateInput): Certs
    getCertificateById(page: PageInput, filter: FilterCertificateInput, id: String!): Certs
    getCertificateByFingerprint(fingerprint: String!): Certificates
    getCertificationAuthorities(page: PageInput, filter: FilterCertificationAuthoritiesInput): CertificationAuthorityList
  }
  type Mutation {
    createCertificateOneClick(commonName: String): CertKeys
    createCertificateCSR(csrPEM: String): CertKeys
    registerExternalCertificate(certificateChain: String!): externalCertRegistration
    deleteCertificates(fingerprints: [String]!): String
    associateDevice(fingerprint: String!, deviceId: String!): String
    disassociateDevice(fingerprint: String!): String
    createCertificationAuthority(caPem: String!): String
    deleteCertificationAuthorities(fingerprints: [String]!): String
  }
`];

export default TypeDefs;
