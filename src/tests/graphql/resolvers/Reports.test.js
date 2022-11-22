import axios from 'axios';
import { expect, jest } from '@jest/globals';
import Resolvers from '../../../operations/reports/Resolvers.js';

jest.mock('axios');
axios.get = jest.fn();
axios.post = jest.fn();
axios.delete = jest.fn();

afterEach(() => {
  axios.get.mockReset();
});

it('Reports - should get a list of reports', () => {
  const root = {};
  const params = { page: 1, pageSize: 10 };
  const context = {};

  const reportResponse = {
    reports: [
      {
        id: '123456',
        name: 'fake report',
      },
    ],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 1,
    },
  };

  axios.get.mockImplementationOnce(() => Promise.resolve({ data: reportResponse }));

  return Resolvers.Query.findManyReports(root, params, context).then(
    (output) => {
      expect(output).toEqual({
        total: reportResponse.pagination.total,
        page: reportResponse.pagination.page,
        pageSize: reportResponse.pagination.pageSize,
        reports: reportResponse.reports,
      });
    },
  );
});

it('Reports - should create a new report', () => {
  const root = {};
  const params = {
    name: 'fake report 1',
    format: 'csv',
    singleReportFile: true,
    initialDate: '',
    finalDate: '',
    devices: [
      { id: '123456', label: 'fake Device', attrs: [{ id: 1, label: 'attr1' }] },
    ],
  };
  const context = {};

  const reportResponse = {
    id: 'eef1aa04-daba-411a-b266-23e618938dd2',
  };

  axios.post.mockImplementationOnce(() => Promise.resolve({ data: reportResponse }));

  return Resolvers.Mutation.createReport(root, params, context).then((output) => {
    expect(output).toEqual(reportResponse);
  });
});

it('Reports - should delete a report', () => {
  const root = {};
  const params = {
    id: 'eef1aa04-daba-411a-b266-23e618938dd2',
  };
  const context = {};

  const reportResponse = {
    id: 'eef1aa04-daba-411a-b266-23e618938dd2',
    typeId: 'ed323e6b-c21c-4f1d-856e-7a2807a6970f',
    format: 'csv',
    name: 'Report Name',
    initialDate: '2022-09-01T00:00:00Z',
    finalDate: '2022-09-10T00:00:00Z',
    params: [
      {
        id: 'a1b2c3',
        label: 'Device 1',
        attrs: [
          {
            id: 1,
            label: 'Attr_1',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
    ],
    createdAt: '2022-09-10T00:00:00Z',
    updatedAt: '2022-09-10T00:00:00Z',
    file: {
      id: '0462c0f6-6af0-416e-bade-3b51cfa0d9e2',
      reportId: 'eef1aa04-daba-411a-b266-23e618938dd2',
      path: '/reports/eef1aa04-daba-411a-b266-23e618938dd2.csv',
      mimeType: 'application/octet-stream',
      filename: 'eef1aa04-daba-411a-b266-23e618938dd2.csv',
      fileSizeKb: 0.1884765625,
      expiresAt: null,
      createdAt: '2022-09-01T00:00:00Z',
      updatedAt: '2022-09-01T00:00:00Z',
    },
    type: {
      id: 'ed323e6b-c21c-4f1d-856e-7a2807a6970f',
      identifier: 'DEVICES',
      name: 'Devices',
      createdAt: '2022-09-01T00:00:00Z',
      updatedAt: '2022-09-01T00:00:00Z',
    },
    attempts: [
      {
        id: '2bc29232-190a-45a9-8d64-49c1928bc4dd',
        reportId: 'eef1aa04-daba-411a-b266-23e618938dd2',
        error: null,
        failedAt: null,
        canceledAt: null,
        finishedAt: '2022-10-05T15:18:01.556Z',
        createdAt: '2022-10-05T15:18:01.458Z',
        updatedAt: '2022-10-05T15:18:01.560Z',
      },
    ],
  };

  axios.delete.mockImplementationOnce(() => Promise.resolve({ data: reportResponse }));

  return Resolvers.Mutation.deleteReport(root, params, context).then((output) => {
    expect(typeof output).toBe('string');
  });
});

it('Reports - should return a base64 string for download', () => {
  const root = {};
  const params = {
    path: 'eef1aa04-daba-411a-b266-23e618938dd2.csv',
  };
  const context = {};
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  axios.get.mockImplementationOnce(() => Promise.resolve({ data: 'test' }));

  return Resolvers.Mutation.downloadReport(root, params, context).then((output) => {
    expect(base64regex.test(output)).toBe(true);
  });
});
