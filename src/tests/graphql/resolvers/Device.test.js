const axios = require('axios');
const Resolvers = require('../../../operations/device/Resolvers');

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

const deviceData = {
  0: {
    data: {
      attrs: {
        0: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 3,
          is_static_overridden: false,
          label: "temperature",
          static_value: "",
          template_id: "0",
          type: "dynamic",
          value_type: "integer",
        }]
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '0998',
      label: 'temperature sensor',
      templates: [0]
    },
  },
  1: {
    data: {
      attrs: {
        1: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 1,
          is_static_overridden: false,
          label: "hue",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "string",
        }],
        2: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 2,
          is_static_overridden: false,
          label: "intensity",
          static_value: "",
          template_id: "2",
          type: "dynamic",
          value_type: "integer",
        }]
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '8aa0f9',
      label: 'colors sensor',
      templates: [1, 2]
    },
  },
  2: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca C',
      templates: [3]
    },
  },
  3: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca A',
      templates: [3]
    },
  },
  4: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca B',
      templates: [3]
    },
  },
};
const devicesFromTemplateData = {
  data: {
    devices: [
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '44h7ff',
        label: 'GPS - Marca C',
        templates: [3]
      },
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '90bc2a',
        label: 'GPS - Marca A',
        templates: [3]
      },
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: 'ca19f8',
        label: 'GPS - Marca B',
        templates: [3]
      }
    ]
  },
  config: {
    url: "/device/template/3"
  }
};
const historyData = {
  0: {
    data: [{
      device_id: '0998',
      ts: '2020-07-20T16:47:07.050000Z',
      value: 10.6,
      attr: 'temperature',
    },
      {
        device_id: '0998',
        ts: '2020-07-20T15:46:42.455000Z',
        value: 15.6,
        attr: 'temperature',
      },
      {
        device_id: '0998',
        ts: '2020-07-20T15:46:21.535000Z',
        value: 36.5,
        attr: 'temperature',
      }],
  },
  1: {
    data: [{
      attr: 'hue',
      value: '#4785FF',
      device_id: '8aa0f9',
      ts: '2020-07-20T16:47:07.408000Z',
      metadata: {},
    },
      {
        attr: 'hue',
        value: '#4785FF',
        device_id: '8aa0f9',
        ts: '2020-07-20T16:25:13.366000Z',
        metadata: {},
      },
      {
        attr: 'hue',
        value: '#414DE8',
        device_id: '8aa0f9',
        ts: '2020-07-20T13:25:06.697000Z',
        metadata: {},
      }],
  },
  2: [{
    attr: 'intensity',
    value: 5,
    device_id: '8aa0f9',
    ts: '2020-07-20T16:48:50.408000Z',
    metadata: {},
  }],
  3: {
    data: [{
      attr: 'coordinate',
      value: '-22.902639983447763,-47.059749301405674',
      device_id: '44h7ff',
      ts: '2020-07-20T16:48:50.408000Z',
      metadata: {},
    }]
  },
};

it('Device - should return a device', () => {
  const root = {};
  const params = {deviceId: '10cf'};
  const context = {};

  axios.get.mockResolvedValue('default value')
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        attrs: {
          18: [
            {
              created: "2021-08-24T18:00:58.619459+00:00",
              id: 66,
              is_static_overridden: true,
              label: "coordenada",
              static_value: "-22.814257, -47.070032",
              template_id: "18",
              type: "static",
              value_type: "geo:point"
            }
          ],
          19: [
            {
              created: "2021-08-24T18:00:58.619461+00:00",
              id: 67,
              is_static_overridden: false,
              label: "timestamp",
              static_value: "",
              template_id: "19",
              type: "dynamic",
              value_type: "string"
            }
          ]
        },
        created: "2021-08-24T18:00:58.595191+00:00",
        id: "e5d299",
        label: "CS Teste",
        templates: [
          18,
          19
        ]
      },
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        "attrs": [
          {
            "created": "2021-08-24T18:00:58.619459+00:00",
            "id": 66,
            "label": "coordenada",
            "static_value": "49.8397, 24.0287",
            "template_id": "18",
            "type": "static",
            "value_type": "geo:point"
          }
        ],
        "config_attrs": [],
        "created": "2021-08-24T18:00:58.599570+00:00",
        "data_attrs": [
          {
            "created": "2021-08-24T18:00:58.619459+00:00",
            "id": 66,
            "label": "coordenada",
            "static_value": "49.8397, 24.0287",
            "template_id": "18",
            "type": "static",
            "value_type": "geo:point"
          }
        ],
        "id": 18,
        "label": "Static Locale"
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        "attrs": [
          {
            "created": "2021-08-24T18:00:58.619461+00:00",
            "id": 67,
            "label": "timestamp",
            "static_value": "",
            "template_id": "19",
            "type": "dynamic",
            "value_type": "string"
          }
        ],
        "config_attrs": [],
        "created": "2021-08-24T18:00:58.599573+00:00",
        "data_attrs": [
          {
            "created": "2021-08-24T18:00:58.619461+00:00",
            "id": 67,
            "label": "timestamp",
            "static_value": "",
            "template_id": "19",
            "type": "dynamic",
            "value_type": "string"
          }
        ],
        "id": 19,
        "label": "timestamp"
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        "coordenada": [],
        "timestamp": []
      }
    }))

  return Resolvers.Query.getDeviceById(root, params, context).then((output) => {
    expect(output).toEqual({
      "attrs": [
        {
          "id": 66,
          "label": "coordenada",
          "staticValue": "-22.814257, -47.070032",
          "type": "static",
          "valueType": "GEO"
        },
        {
          "id": 67,
          "label": "timestamp",
          "staticValue": "",
          "type": "dynamic",
          "valueType": "STRING"
        }
      ],
      "certificate": {},
      "created": "2021-08-24T18:00:58.595191+00:00",
      "id": "e5d299",
      "label": "CS Teste",
      "lastUpdate": [
        {
          "date": null,
          "label": "coordenada",
          "value": null
        },
        {
          "date": null,
          "label": "timestamp",
          "value": null
        }
      ],
      "templates": [
        {
          "id": 18,
          "label": "Static Locale"
        },
        {
          "id": 19,
          "label": "timestamp"
        }
      ],
      "updated": ""
    });
  });
});

it('Device - should get a list of devices', () => {
  axios.get.mockResolvedValue({
    data: {
      devices: [
        {
          attrs: {
            2: [
              {
                created: '2020-05-14T18:15:47.307374+00:00',
                id: 6,
                is_static_overridden: false,
                label: 'dina2',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'float',
              },
              {
                created: '2020-05-14T18:15:47.306332+00:00',
                id: 5,
                is_static_overridden: false,
                label: 'static',
                static_value: 'true',
                template_id: '2',
                type: 'static',
                value_type: 'bool',
              },
              {
                created: '2020-05-14T18:15:47.305416+00:00',
                id: 4,
                is_static_overridden: false,
                label: 'dinbool',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T18:18:34.401142+00:00',
          id: '1b32ee',
          label: 'device2',
          templates: [
            2,
          ],
        },
        {
          attrs: {
            1: [
              {
                created: '2020-05-14T17:25:25.437877+00:00',
                id: 1,
                is_static_overridden: false,
                label: 'din',
                static_value: '',
                template_id: '1',
                type: 'dynamic',
                value_type: 'string',
              },
              {
                created: '2020-05-14T17:25:25.439239+00:00',
                id: 2,
                is_static_overridden: false,
                label: 'static',
                static_value: '20',
                template_id: '1',
                type: 'static',
                value_type: 'float',
              },
              {
                created: '2020-05-14T17:25:25.439943+00:00',
                id: 3,
                is_static_overridden: false,
                label: 'actuate',
                static_value: '',
                template_id: '1',
                type: 'actuator',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T17:25:38.646423+00:00',
          id: '457be',
          label: 'deviceMock',
          templates: [
            1,
          ],
        },
        {
          attrs: {
            2: [
              {
                created: '2020-05-14T18:15:47.307374+00:00',
                id: 6,
                is_static_overridden: false,
                label: 'dina2',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'float',
              },
              {
                created: '2020-05-14T18:15:47.306332+00:00',
                id: 5,
                is_static_overridden: false,
                label: 'static',
                static_value: 'true',
                template_id: '2',
                type: 'static',
                value_type: 'bool',
              },
              {
                created: '2020-05-14T18:15:47.305416+00:00',
                id: 4,
                is_static_overridden: false,
                label: 'dinbool',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T18:18:07.802635+00:00',
          id: 'd16fe3',
          label: 'device2Mock',
          templates: [
            2,
          ],
        },
      ],
      pagination: {
        has_next: false,
        next_page: null,
        page: 1,
        total: 1,
      },
    },
  });
  const root = {};
  const params = {page: {number: 1, size: 4}, filter: {label: 'd'}};

  return Resolvers.Query.getDevices(root, params, {}).then((output) => {
    expect(output).toEqual(
      {
        currentPage: 1,
        devices: [
          {
            attrs: [
              {
                id: 6,
                isDynamic: true,
                label: 'dina2',
                valueType: 'NUMBER',
                staticValue: "",
              },
              {
                id: 4,
                isDynamic: true,
                label: 'dinbool',
                valueType: 'BOOLEAN',
                staticValue: "",
              },
            ],
            certificate: {},
            created: "2020-05-14T18:18:34.401142+00:00",
            id: '1b32ee',
            label: 'device2',
            updated: "",
          },
          {
            attrs: [
              {
                id: 1,
                isDynamic: true,
                label: 'din',
                valueType: 'STRING',
                staticValue: "",
              },
            ],
            certificate: {},
            created: "2020-05-14T17:25:38.646423+00:00",
            id: '457be',
            label: 'deviceMock',
            updated: "",
          },
          {
            attrs: [
              {
                id: 6,
                isDynamic: true,
                label: 'dina2',
                valueType: 'NUMBER',
                staticValue: "",
              },
              {
                id: 4,
                isDynamic: true,
                label: 'dinbool',
                valueType: 'BOOLEAN',
                staticValue: "",
              },
            ],
            certificate: {},
            created: "2020-05-14T18:18:07.802635+00:00",
            id: 'd16fe3',
            label: 'device2Mock',
            updated: "",
          },
        ],
        totalPages: 1,
      },
    );
  });
});

it('Device - Consult the history for the last 3 records (dashboard)', async () => {
  jest.mock('axios');
  const deviceData = {
    0: {
      data: {
        attrs: {
          0: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "temperature",
            static_value: "",
            template_id: "0",
            type: "dynamic",
            value_type: "integer",
          }]
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '0998',
        label: 'temperature sensor',
        templates: [0]
      },
    },
    1: {
      data: {
        attrs: {
          1: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "hue",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "string",
          }],
          2: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "intensity",
            static_value: "",
            template_id: "2",
            type: "dynamic",
            value_type: "integer",
          }]
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '8aa0f9',
        label: 'colors sensor',
        templates: [1, 2]
      },
    },
  };
  const historyData = {
    0: {
      data: [{
        device_id: '0998',
        ts: '2018-03-22T13:47:07.050000Z',
        value: 10.6,
        attr: 'temperature',
      },
        {
          device_id: '0998',
          ts: '2018-03-22T13:46:42.455000Z',
          value: 15.6,
          attr: 'temperature',
        },
        {
          device_id: '0998',
          ts: '2018-03-22T13:46:21.535000Z',
          value: 36.5,
          attr: 'temperature',
        }],
    },
    1: {
      data: [{
        attr: 'hue',
        value: '#4785FF',
        device_id: '8aa0f9',
        ts: '2018-03-22T13:47:07.408000Z',
        metadata: {},
      },
        {
          attr: 'hue',
          value: '#4785FF',
          device_id: '8aa0f9',
          ts: '2020-05-06T16:25:13.366000Z',
          metadata: {},
        },
        {
          attr: 'hue',
          value: '#414DE8',
          device_id: '8aa0f9',
          ts: '2020-05-06T16:25:06.697000Z',
          metadata: {},
        }],
    },
    2: [{
      attr: 'intensity',
      value: 5,
      device_id: '8aa0f9',
      ts: '2020-05-06T16:48:50.408000Z',
      metadata: {},
    }],
  };

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[0])
    .mockResolvedValueOnce(deviceData[1])
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{deviceID: '0998', dynamicAttrs: ['temperature']}, {deviceID: '8aa0f9', dynamicAttrs: ['hue']}],
      templates: [],
      lastN: 3
    },
    configs: {sourceType: 0, operationType: 0}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"0998temperature":36.5,"deviceLabel":"temperature sensor","timestamp":"2018-03-22T13:46:21Z"},{"0998temperature":15.6,"deviceLabel":"temperature sensor","timestamp":"2018-03-22T13:46:42Z"},{"0998temperature":10.6,"deviceLabel":"colors sensor","timestamp":"2018-03-22T13:47:07Z","8aa0f9hue":"#4785FF"},{"8aa0f9hue":"#414DE8","deviceLabel":"colors sensor","timestamp":"2020-05-06T16:25:06Z"},{"8aa0f9hue":"#4785FF","deviceLabel":"colors sensor","timestamp":"2020-05-06T16:25:13Z"}]')
});

it('Device - Consult the history by time period (dashboard)', async () => {
  jest.mock('axios');

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[0])
    .mockResolvedValueOnce(deviceData[1])
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{deviceID: '0998', dynamicAttrs: ['temperature']}, {deviceID: '8aa0f9', dynamicAttrs: ['hue']}],
      dateFrom: "2020-07-20T15:00:00.000z",
      dateTo: "2020-07-20T17:00:00.000z",
    },
    configs: {sourceType: 0, operationType: 0}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"8aa0f9hue":"#414DE8","deviceLabel":"colors sensor","timestamp":"2020-07-20T13:25:06Z"},{"0998temperature":36.5,"deviceLabel":"temperature sensor","timestamp":"2020-07-20T15:46:21Z"},{"0998temperature":15.6,"deviceLabel":"temperature sensor","timestamp":"2020-07-20T15:46:42Z"},{"8aa0f9hue":"#4785FF","deviceLabel":"colors sensor","timestamp":"2020-07-20T16:25:13Z"},{"0998temperature":10.6,"deviceLabel":"colors sensor","timestamp":"2020-07-20T16:47:07Z","8aa0f9hue":"#4785FF"}]')
});

it('Device - should obtain a static coordinate point for the map', async () => {
  jest.mock('axios');

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])

  const params = {
    filter: {
      devices: [{deviceID: '44h7ff', dynamicAttrs: [], staticAttrs: ['location']}],
      lastN: 1
    },
    configs: {sourceType: 0, operationType: 0, widgetType: 8}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C"}}')
});

it('Device - should obtain a static and dynamic coordinates points for the map', async () => {
  jest.mock('axios');

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])
    .mockResolvedValueOnce(historyData[3])

  const params = {
    filter: {
      devices: [{deviceID: '44h7ff', dynamicAttrs: ['coordinate'], staticAttrs: ['location']}],
      lastN: 1
    },
    configs: {sourceType: 0, operationType: 0, widgetType: 8}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7ffcoordinate":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-07-20T16:48:50.408Z","deviceLabel":"GPS - Marca C"},"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C"}}')
});

it('Device - should obtain a empty responde', async () => {
  jest.mock('axios');

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])

  const params = {
    filter: {
      devices: [{deviceID: '44h7ff', dynamicAttrs: [], staticAttrs: ['location']}],
      lastN: 1
    },
    configs: {sourceType: 99, operationType: 0}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {token: ''});
  expect(result).toEqual('[]')
});

it('Template - should get the coordinates from three devices', async () => {
  jest.mock('axios');

  axios.get.mockResolvedValue('default value')
    .mockResolvedValueOnce(devicesFromTemplateData)

  const params = {
    filter: {
      templates: [{templateID: '3', dynamicAttrs: [], staticAttrs: ['location']}],
      devices: [],
      lastN: 1
    },
    configs: {sourceType: 1, operationType: 0, widgetType: 8}
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C","templateKey":"3location"},"90bc2alocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca A","templateKey":"3location"},"ca19f8location":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca B","templateKey":"3location"}}')
});

it('Device - should edit a device', async () => {
  jest.mock('axios');

  const fakeDevice = {
    id: 'abc123',
    label: 'OLD DEVICE NAME',
    templates: [{ id: 'template123' }]
  }

  const newFakeDevice = {
    ...fakeDevice,
    label: 'THE NEW NAME',
  }

  axios.put.mockResolvedValue('default value')
    .mockResolvedValueOnce({ data: { device: newFakeDevice } })

  const result = await Resolvers.Mutation.editDevice(
    {}, 
    newFakeDevice.id, 
    newFakeDevice, 
    { token: '' }
  );

  expect(result).toEqual(newFakeDevice)
})
