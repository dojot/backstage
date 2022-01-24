import axios from 'axios';
import Resolvers from '../../../operations/template/Resolvers.js';
import { templateId3, templateId4, templateId5 } from '../../apiMock/template.js';
import { jest } from '@jest/globals';

jest.mock('axios');
axios.get = jest.fn();

afterEach(() => {
  axios.get = jest.fn().mockReset();
});

it('templatesHasImageFirmware', () => {
  const obj = {};
  const args = { templatesId: [3, 4, 5] };
  const ctx = {};
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: templateId3 }))
    .mockImplementationOnce(() => Promise.resolve({ data: templateId4 }))
    .mockImplementationOnce(() => Promise.resolve({ data: templateId5 }));

  return Resolvers.Query.templatesHasImageFirmware(obj, args, ctx)
    .then((output) => {
      expect((output)).toEqual(
        [
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
      );
    });
});


it('get template', () => {
  const obj = {};
  const args = { templateId: '5' };
  const ctx = {};
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: templateId5 }));

  return Resolvers.Query.getTemplateById(obj, args, ctx)
    .then((output) => {
      expect((output)).toMatchObject({
        id: 5,
        label: 'xxxxx',
        attrs: [
          {
            id: 26,
            label: 'desired_version',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
          {
            id: 21,
            label: 'sdfsdfsdf',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
          {
            id: 25,
            label: 'state',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
          {
            id: 23,
            label: 'update',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
          {
            id: 24,
            label: 'update_result',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
          {
            id: 22,
            label: 'version',
            staticValue: '',
            templateId: '5',
            type: 'dynamic',
            isDynamic: true,
            valueType: 'string',
          },
        ],
      });
    });
});
