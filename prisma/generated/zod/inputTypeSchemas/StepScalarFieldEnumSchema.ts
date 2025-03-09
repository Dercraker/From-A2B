import { z } from 'zod';

export const StepScalarFieldEnumSchema = z.enum(['id','slug','tripId','rank','name','startDate','endDate','description','latitude','longitude','placeId','TransportMode','schedulingNotes','roadId']);

export default StepScalarFieldEnumSchema;
