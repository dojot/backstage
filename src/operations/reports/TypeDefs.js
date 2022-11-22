const TypeDefs = [`
#Necessary informations about device#
type Device {
    id: String!
    label: String!
    favorite: Boolean
    attrs: [Attr]
    created: String
    updated: String
    certificate: Certificate
    templates: [TemplatesObj]
    lastUpdate: [AttributesData]
 }
 type FavoriteDevice {
   id: String!
   label: String!
 }
 type Certificate {
    fingerprint: String
 }
 type TemplatesObj {
    id: Int
    label: String
 }
 type AttributesData {
    label: String
    value: String
    date: String
 }
 #Necessary data about and attribute of a device#
 type Attr {
    id: String!
    type: String!
    label: String!
    created: String!
    valueType: String!
    isDynamic: Boolean!
    staticValue: String
    templateId: String!
 }

#A paginated list of Devices.#
 type DeviceListPage {
    totalPages: Int!
    currentPage: Int!
    devices: [Device]
 }

 type ReportListPage {
   total: Int!,
   page: Int!,
   pageSize: Int!,
   reports: [Report]
 }

#Determines which page to show and how many items#
 input PageInput {
    #set the page number to be accessed (default 20) #
    number: Int
    #set the number of elements to be shown in a page (default 1) #
    size: Int
 }

 #Return only devices that are named accordingly (prefix or suffix match)#
 input FilterDeviceInput {
    label: String
 }
 #Parameters to query historical device data#
 input HistoryInput {
    #list of devices which attributes will be retrieved#
    devices: [HistoryDeviceInput]!
    templates: [HistoryTemplateInput]
    dateFrom: String
    dateTo: String
    #lastN will be used to obtain the values from the lastN of most current values, minutes, hours, days and months according to option operationType
    lastN: Int
 }

 input ConfigsInput {
    #operationType corresponds to 0 (the last N histories, Number of most current values), 1 (minutes, the last N minutes), 2 (hours, the last N hours), 3 (days, the last N days), 4 (months, the last N months), 7 (to get devices by template)
    operationType: Int
    #corresponds to 0 (DEVICE) and 1 (TEMPLATE)
    sourceType: Int
    #corresponds to 0 (DEFAULT), 1 (MAP) and 2 (TABLE)
    widgetType: Int
 }

 #Parameters to identify from which device and which attributes to retrieve historical data from#
 input HistoryDeviceInput{
    #device selected#
    deviceID: String!
    #attributes which readings are to be retrieved#
    dynamicAttrs: [String]
    staticAttrs: [String]
 }
 #Parameters to identify from which template and which attributes to retrieve historical data from#
 input HistoryTemplateInput{
    #template selected#
    templateID: String!
    #attributes which readings are to be retrieved#
    dynamicAttrs: [String]
    #static attributes which readings are to be retrieved#
    staticAttrs: [String]
 }
 #Historical reading from an attribute#
 type HistoryAttr {
    label: String!
    value: String!
    valueType: String!
    timestamp: String!
 }
 #Historical reading from device#
 type History{
    deviceID: String!
    label: String!
    attrs: [HistoryAttr]
 }
 #Attribute format for device creation#
 input DeviceAttributes{
    id: Int
    type: String
    label: String
    created: String
    valueType: String
    templateId: String
    staticValue: String
 }

 type DeviceCreatedList{
    id: String
    label: String
 }

 type MultipleDevicesCreated{
   devicesWithError: Boolean
 }

 type NotCreatedDeviceCSV {
   id: String!
   label: String!
   errorMessage: String!
 }

 type CreatedDevicesCSV {
   createdDevices: Int!
   notCreatedDevices: [NotCreatedDeviceCSV]
 }

 type DeviceAssociated {
   label: String!
 }

 type DevicesAssociatedResponse {
   associatedDevices: [DeviceAssociated]!
   devicesWithOtherCertificates: [DeviceAssociated]!,
   notAssociatedDevices: [DeviceAssociated]!
 }

 type AttrReportItem {
   id: String!,
   label: String!,
   type: String!,
   valueType: String!
 }

 type DeviceReportItem {
   id: String!,
   label: String!,
   attrs: [AttrReportItem]
 }

 type ReportFile {
   id: String!,
   reportId: String!,
   path: String!,
   mimeType: String!,
   filename: String!,
   fileSizeKb: Float!,
   expiresAt: String,
   createdAt: String!,
   updatedAt: String,
 }

 type ReportAttempt {
   id: String!,
   error: String,
   failedAt: String,
   canceledAt: String,
   finishedAt: String,
   createdAt: String,
   updatedAt: String,
 }

 type Report {
    id: String,
    name: String,
    format: String!,
    singleReportFile: Boolean,
    initialDate: String,
    finalDate: String,
    params: [DeviceReportItem],
    createdAt: String,
    updatedAt: String,
    file: ReportFile,
    attempts: [ReportAttempt]
 }

 input AttrReportInput {
   id: String!,
   label: String!,
   type: String!,
   valueType: String!
 }

 input DeviceReportInput {
   id: String!,
   label: String!,
   attrs: [AttrReportInput]!
 }

 type CreatedReport {
   id: String!
 }

  type Query {
    findManyReports(page: Int, pageSize: Int, name: String): ReportListPage
  }

  type Mutation {
    createReport(name: String!, format: String!, singleReportFile: Boolean!, initialDate: String, finalDate: String, devices: [DeviceReportInput]!): CreatedReport
    deleteReport(id: String!): String
    downloadReport(path: String!): String
   }
`];

export default TypeDefs;
