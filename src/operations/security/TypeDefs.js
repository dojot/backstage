const TypeDefs = [`
  #Pagination data structure#
  type PaginationCerts {
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
    pagination: PaginationCerts
  }
  # Input to filter certificates
  input FilterCertificateInput {
    fingerprint: String
 }
`];

module.exports = TypeDefs;
