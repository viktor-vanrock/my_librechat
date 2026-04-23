import { TooltipAnchor } from '@librechat/client';
import { SettingsIcon } from 'lucide-react';
import { useModelSelectorContext } from '../Chat/Menus/Endpoints/ModelSelectorContext';

export const SettingOpenrouterKeyButton = () => {
  const { handleOpenKeyDialog, keyDialogOpen, setKeyDialogOpen } = useModelSelectorContext();

  const handleClick = () => setKeyDialogOpen(true);

  return (
    <TooltipAnchor
      description={'Изменить openRouter ключ'}
      role="button"
      tabIndex={0}
      aria-label="Статистика"
      className={`my-1 flex h-9 w-full max-w-[70vw] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border-light bg-presentation px-3 py-2 text-sm text-text-primary transition-colors hover:bg-surface-active-alt`}
    >
      <button type="button" onClick={handleClick}>
        <SettingsIcon className="size-5 shrink-0" aria-hidden="true" />
      </button>
    </TooltipAnchor>
  );
};
