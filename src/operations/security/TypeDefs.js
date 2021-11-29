const TypeDefs = [`
  #Pagination data structure#
  type PaginationCerts {
    page: Int
    total: Int
    has_next: Boolean
    next_page: Boolean
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
`];

module.exports = TypeDefs;
