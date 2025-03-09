import { z } from 'zod';

export const FeedbackScalarFieldEnumSchema = z.enum(['id','review','message','email','userId','createdAt','updatedAt']);

export default FeedbackScalarFieldEnumSchema;
