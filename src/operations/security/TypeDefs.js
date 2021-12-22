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
`];

module.exports = TypeDefs;
