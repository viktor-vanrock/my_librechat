interface Props {
  title: string;
  text: string | number;
}

export const StatisticsItem = ({ title, text }: Props) => {
  return (
    <div className="rounded-lg bg-blue-100 p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-text-primary">{title}:</span>
        <span className="text-lg font-semibold text-black">{text}</span>
      </div>
    </div>
  );
};
