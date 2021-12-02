const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const templateTypeDefs = require('./operations/template/TypeDefs');
const templateResolvers = require('./operations/template/Resolvers');
const deviceTypeDefs = require('./operations/device/TypeDefs');
const deviceResolvers = require('./operations/device/Resolvers');
const userResolvers = require('./operations/configuration/Resolvers');
const userTypeDefs = require('./operations/configuration/TypeDefs');
const securityResolvers = require('./operations/security/Resolvers');
const securityTypeDefs = require('./operations/security/TypeDefs');


const query = [`
  type Query {
    #Get a template by Id
    template(id: Int!): Template
    #Checks if templates has Image Firmware and return a array with objects key-value, where key is a id template and value is a boolean.
    #The value is true if the template has image firmware.
    templatesHasImageFirmware(templatesId: [Int]!): [MapStringToString]
    #Returns a list of templates
    getTemplates(page: PageInput): TemplatesListPage
    #Returns a list of devices that can be divided in pages, and the information about how many pages there are in total, along with which page is being shown.
    #@param sortBy: set sortBy to sort list (default 'label')
    getDevices(page: PageInput, filter: FilterDeviceInput, sortBy: String): DeviceListPage
    #Finds device information by id
    getDeviceById(deviceId: String!): Device
    #Returns historical data in the format used by the Dashboard
    getDeviceHistoryForDashboard(filter: HistoryInput!, configs: ConfigsInput): String
    #Retrieves dashboard configuration by user. Returns the information if successful or error message if it occurs.
    getConfig(user:String, tenant:String!): String
    #Returns the list of certificates in paginated form.
    getCertificateList(page: PageInput!): Certs
  }
  type Mutation {
    #Updates existing information on database, or creates an entry if it doesn't exist. Returns success message if it works or error message if fails.
    updateConfig(user:String, tenant:String!, config: String!): String
    createDevice(label: String!, templates: [Int]!, attrs: [DeviceAttributes], certificate: String): [DeviceCreatedList]
    deleteDevices(deviceIds: [String]!): String
  }
`];

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const typeDefs = [...query, ...templateTypeDefs, ...deviceTypeDefs, ...userTypeDefs, ...securityTypeDefs];
const resolvers = merge(templateResolvers, deviceResolvers, userResolvers, securityResolvers);

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = executableSchema;
module.exports.typeDefs = typeDefs;
