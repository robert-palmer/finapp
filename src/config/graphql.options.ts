import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), 'generated/graphql-schema.gql'),
      buildSchemaOptions: {
        scalarsMap: [
          { type: () => GraphQLJSONObject, scalar: GraphQLJSONObject },
        ],
      },
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      // uploads: {
      //   maxFileSize: 100000000,
      //   maxFiles: 11,
      //   maxFieldSize: 1024 * 1024 * 10,
      // },
      // resolvers: { JSON: GraphQLJSON },
      debug: true,
      introspection: true,
      playground: { endpoint: 'http://localhost:4000/graphql' },
      cors: false,
    };
  }
}
