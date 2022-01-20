import { graphql } from 'graphql';
import axios from 'axios';
import executableSchema from '../../Schema';
import testGetTemplate from './test-cases/template/GetTemplate';
import testTemplatesHasImageFirmware from './test-cases/template/TemplatesHasImageFirmware';

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

describe('Schema', () => {
  // Array of case types
  const cases = [testGetTemplate, testTemplatesHasImageFirmware];

  cases.forEach(async (obj) => {
    const {
      id, query, variables, context, expected,
    } = obj;

    test(`query: ${id}`, async () => {
      await obj.beforeTest();
      const result = await graphql(executableSchema, query, null, context, variables);
      return expect(result).toEqual(expected);
    });
  });
});
