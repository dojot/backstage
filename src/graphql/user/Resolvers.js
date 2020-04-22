const axios = require('axios');
const UTIL = require('../utils/AxiosUtils');
const LOG = require('../../utils/Log');
const connection = require('../../db');

const Resolvers = {
    Query: {
        async getConfig(root, params){
            console.log("Into getConfig");
            const query = {
                text: "SELECT config FROM user_config WHERE username=$1 AND tenant=$2;",
                values: [params.user, params.tenant]
            };

            const client = await connection.connect();
            const result = client.query(query);
            console.log(`Resultado: ${result}`);
        }
        
    },

    Mutation: {
        async updateConfig(root, params) {
            console.log("Into update configs");
            try {
                const client = await connection.connect();
                let query = {
                    text: "SELECT config FROM user_config WHERE username=$1 AND tenant=$2;",
                    values: [params.user, params.tenant]
                };
                let result = await client.query(query, (err) => {
                    if (err) {
                        LOG.warn(error);
                    }
                });
                if (result) {
                    query = {
                        text: "UPDATE user_config(config) SET config=$3 WHERE username=$1 AND tenant=$2;",
                        values: [params.user, params.tenant, params.config]
                    };
                    client.query(query, (err, res) => {
                        if (err)
                            LOG.warn(err);
                        else
                            LOG.info("Update successful!");
                    });
                } else {
                    query = {
                        text: "INSERT INTO user_config(user, tenant, config) VALUES ($1,$2,$3);",
                        values: [params.user, params.tenant, params.config]
                    };
                    client.query(query, (err, res) => {
                        if (err)
                            LOG.warn(err);
                        else
                            LOG.info("Successfully saved the dashboard configurations!");
                    });
                }
            } catch (error) {
                LOG.warn(error);
            }
        },
    }
};