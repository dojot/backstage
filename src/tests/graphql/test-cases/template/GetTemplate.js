import axios from 'axios';
import { templateId5 } from '../../../apiMock/template';

const testGetTemplate = {
  id: 'testGetTemplate',
  query: `
    query ($templateId: String!) {
      getTemplateById(templateId: $templateId) {
        id
        label
        attrs {
          id
          type
          label
          valueType
          templateId
          staticValue
        }
      }
    }
  `,
  variables: { templateId: '5' },
  context: {},
  expected: {
    data: {
      getTemplateById: {
        label: 'xxxxx',
        id: '5',
        attrs: [
          {
            id: '26',
            label: 'desired_version',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
          {
            id: '21',
            label: 'sdfsdfsdf',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
          {
            id: '25',
            label: 'state',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
          {
            id: '23',
            label: 'update',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
          {
            id: '24',
            label: 'update_result',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
          {
            id: '22',
            label: 'version',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            valueType: 'string',
          },
        ],
      },
    },
  },
  beforeTest() {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: templateId5 }));
  },
};

export default testGetTemplate;
