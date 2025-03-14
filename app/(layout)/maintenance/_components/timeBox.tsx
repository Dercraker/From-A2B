import { Divider } from "@ui/divider";

type TimeBox = {
  value: number | string;
  label: string;
};

export const TimeBox = ({ label, value }: TimeBox) => {
  return (
    <div className="flex size-24 flex-col items-center justify-center rounded-md bg-card text-white backdrop-blur-sm">
      <div className="text-3xl font-bold">{value}</div>
      <Divider />
      <div className="mt-1 text-sm">{label}</div>
    </div>
  );
};
