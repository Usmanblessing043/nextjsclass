import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge'

import { usertypeDefs } from './userTypedef';
import { userresolvers } from './userResolver';
import { posttypeDefs } from './postTypedef';
import { postresolvers } from './postResolver';




export const typeDefs = mergeTypeDefs([
    usertypeDefs, posttypeDefs
])




export const resolvers =  mergeResolvers([
    userresolvers,postresolvers
])