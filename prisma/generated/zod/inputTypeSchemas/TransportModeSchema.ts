import { z } from 'zod';

export const TransportModeSchema = z.enum(['Walk','Bike','Car','Boat','Plane']);

export type TransportModeType = `${z.infer<typeof TransportModeSchema>}`

export default TransportModeSchema;
