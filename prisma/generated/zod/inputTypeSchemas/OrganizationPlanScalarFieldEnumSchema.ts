import { z } from 'zod';

export const OrganizationPlanScalarFieldEnumSchema = z.enum(['id','name','maximumMembers','createdAt','updatedAt']);

export default OrganizationPlanScalarFieldEnumSchema;
