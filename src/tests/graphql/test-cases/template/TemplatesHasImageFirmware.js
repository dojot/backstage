import axios from 'axios';
import { templateId3, templateId4, templateId5 } from '../../../apiMock/template.js';

const testTemplatesHasImageFirmware = {
  id: 'templatesHasImageFirmware',
  query: `
    query ($templatesId: [Int]!) {
      templatesHasImageFirmware(templatesId: $templatesId) {
        key
        value
      }
    }
  `,
  variables: { templatesId: [3, 4, 5] },
  context: {},
  expected: {
    data: {
      templatesHasImageFirmware: [
        {
          key: '3',
          value: 'false',
        },
        {
          key: '4',
          value: 'false',
        },
        {
          key: '5',
          value: 'true',
        },
      ],
    },
  },
  beforeTest() {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: templateId3 }))
      .mockImplementationOnce(() => Promise.resolve({ data: templateId4 }))
      .mockImplementationOnce(() => Promise.resolve({ data: templateId5 }));
  },
};

export default testTemplatesHasImageFirmware;
