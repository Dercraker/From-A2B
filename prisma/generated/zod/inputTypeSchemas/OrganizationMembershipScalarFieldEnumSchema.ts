import { z } from 'zod';

export const OrganizationMembershipScalarFieldEnumSchema = z.enum(['id','roles','userId','organizationId','createdAt','updatedAt']);

export default OrganizationMembershipScalarFieldEnumSchema;
