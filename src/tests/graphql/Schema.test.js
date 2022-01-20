import { graphql } from 'graphql';
import axios from 'axios';
import { jest } from '@jest/globals';
import executableSchema from '../../Schema.js';
import testGetTemplate from './test-cases/template/GetTemplate.js';
import testTemplatesHasImageFirmware from './test-cases/template/TemplatesHasImageFirmware.js';

jest.mock('axios');
axios.get = jest.fn();

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
