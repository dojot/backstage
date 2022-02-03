const TypeDefs = [`
  type Mutation {
    deleteTemplateAttrs(templateId: String!, attrIds: [String]!): TemplateList
    createTemplateAttr(templateId: String!, attr: TemplateAttr!): TemplateList
    editTemplateAttr(templateId: String!, attrId: String!, attr: TemplateAttr!): TemplateList
  }
`];

export default TypeDefs;
