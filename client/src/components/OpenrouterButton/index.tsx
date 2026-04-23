import { useState } from 'react';
import StatisticsModal from './StatisticsModal';
import { useStatistics } from './hooks/useStatistics';
import { ButtonWithIndicator } from './ButtonWithIndicator';
import { ERROR_NUMBER } from './types';

export const OpenrouterButton = () => {
  const [isOpen, toggleOpen] = useState(false);
  const { statistics, isLoading, error, fetchStatistics } = useStatistics();

  const handleClick = () => toggleOpen((prev) => !prev);

  const isNeedStatisticsModal = !(
    error?.code === ERROR_NUMBER.OPENROUTER_KEY_NOT_FOUND ||
    error?.code === ERROR_NUMBER.INVALID_API_KEY ||
    error?.code === ERROR_NUMBER.RATE_LIMIT
  );

  return (
    <>
      <ButtonWithIndicator handleClick={handleClick} error={error} />
      {isNeedStatisticsModal && (
        <StatisticsModal
          onClose={handleClick}
          isOpen={isOpen}
          statistics={statistics}
          isLoading={isLoading}
          error={error}
          fetchStatistics={fetchStatistics}
        />
      )}
    </>
  );
};
