interface Props {
  title: string;
  text: string | number;
}

export const StatisticsItem = ({ title, text }: Props) => {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-600">{title}:</span>
        <span className="text-lg font-semibold text-gray-900">{text}</span>
      </div>
    </div>
  );
};