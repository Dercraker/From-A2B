import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','resendContactId','passwordHash','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
