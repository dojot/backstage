const TypeDefs = [`
  type Metadata {
     #Metadata ID
     id: Int
     #Metadata Label
     label: String
     #Meta Value
     static_value: String
     #Can be define by user. Like a unit
     type: String
     #Can be String, Integer, Float, Geo, etc.
     value_type: String
     #Timestamp of create date
     created: String
     #Timestamp of update date
     updated: String
  }

  type Attributes {
    #Attribute ID
    id: Int
    #Attribute Label
    label: String
    #List of Metadatas associate to Attribute
    metadata: [Metadata]
    #Value when type is Static
    static_value: String
    #Primary key of a template
    template_id: String
    #Can be static, dynamic, etc.
    type: String
    #Can be String, Integer, Float, Geo, etc.
    value_type: String
    #Timestamp of create date
    created: String
  }

  type Template {
    #Template ID
    id: Int,
    #Template Label
    label: String!
    #List of Attributes
    attrs: [Attributes]
    #List of Configuration Attributes
    config_attrs: [Attributes]
    #List of Data Attributes
    data_attrs: [Attributes]
    #List of Image Attributes (Firmware)
    img_attrs: [Attributes]
    #Timestamp of create date
    created: String
  }

   type TemplatesListPage {
    totalPages: Int!
    currentPage: Int!
    templates: [TemplateList]
  }

  type TemplateList {
    id: String!
    label: String!
    attrs: [Attr]
  }

  type MapStringToString {
    #key
    key: String
    #value
    value: String
    }

  # Return only templates that are named accordingly (prefix or suffix match)#
  input FilterTemplateInput {
    label: String
  }

  # Attribute format for template creation#
  input TemplateAttr {
    type: String!
    label: String!
    valueType: String!
    staticValue: String
  }

  type Query {
    #Get a template by Id
    getTemplateById(templateId: String!): TemplateList
    #Checks if templates has Image Firmware and return a array with objects key-value, where key is a id template and value is a boolean.
    #The value is true if the template has image firmware.
    templatesHasImageFirmware(templatesId: [Int]!): [MapStringToString]
    #Returns a list of templates
    getTemplates(page: PageInput, filter: FilterTemplateInput): TemplatesListPage
  }

  type Mutation {
    deleteTemplates(templateIds: [String]!): String
    duplicateTemplate(templateId: String!): TemplateList
    createTemplate(label: String!, attrs: [TemplateAttr]!): TemplateList
    editTemplate(id: String!, label: String!, attrs: [TemplateAttr]!): TemplateList
  }
`];

export default TypeDefs;
