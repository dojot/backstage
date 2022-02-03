const TypeDefs= [`
    #JSON that defines a dashboard's configuration retrieved from database and parsed as string
    type Config {
        config: String!
    }

    #A stringified JSON that defines a dashboard's configuration
    input ConfigInput{
        config: String!
    }

  type Query {
    #Retrieves dashboard configuration by user. Returns the information if successful or error message if it occurs.
    getConfig(user:String, tenant:String!): String
  }

  type Mutation {
    #Updates existing information on database, or creates an entry if it doesn't exist. Returns success message if it works or error message if fails.
    updateConfig(user:String, tenant:String!, config: String!): String
  }
`];

export default TypeDefs;
