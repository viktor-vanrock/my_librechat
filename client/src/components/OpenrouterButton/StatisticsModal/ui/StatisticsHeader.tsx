interface Props {
  onClose: () => void;
}

export const StatisticsHeader = ({ onClose }: Props) => (
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-text-primary">Статистика</h2>
    <button
      onClick={onClose}
      className="text-text-primary transition-colors hover:text-text-secondary"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
