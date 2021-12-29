import { graphql } from 'graphql';
import { schemaBuilder } from '../../common/utils';
import { Maybe } from 'type-graphql';

// process.env.NODE_ENV = 'test';

interface Options {
  source: string;
  variables?: Maybe<{[key: string]: any}>
}
export const gCall = async ({ source, variables } : Options) => {
  return graphql({
    schema: await schemaBuilder(),
    source,
    variableValues: variables
  })
}