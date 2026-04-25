import { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from '@librechat/client';
import { getConfigDefaults, PermissionTypes, Permissions } from 'librechat-data-provider';
import ModelSelector from './Menus/Endpoints/ModelSelector';
import { useGetStartupConfig } from '~/data-provider';
import ExportAndShareMenu from './ExportAndShareMenu';
import { OpenSidebar, PresetsMenu } from './Menus';
import BookmarkMenu from './Menus/BookmarkMenu';
import { TemporaryChat } from './TemporaryChat';
import AddMultiConvo from './AddMultiConvo';
import { useHasAccess } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';
import { OpenrouterButton } from '../OpenrouterButton';
import { CurrentKeyProvider } from '~/Providers';

import { ModelSelectorProvider } from './Menus/Endpoints/ModelSelectorContext';
import { ModelSelectorChatProvider } from './Menus/Endpoints/ModelSelectorChatContext';
import { SettingOpenrouterKeyButton } from '../SettingOpenrouterKeyButton';

const defaultInterface = getConfigDefaults().interface;

function Header() {
  const { data: startupConfig } = useGetStartupConfig();
  const navVisible = useRecoilValue(store.sidebarExpanded);

  const interfaceConfig = useMemo(
    () => startupConfig?.interface ?? defaultInterface,
    [startupConfig],
  );

  const hasAccessToBookmarks = useHasAccess({
    permissionType: PermissionTypes.BOOKMARKS,
    permission: Permissions.USE,
  });

  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const hasAccessToTemporaryChat = useHasAccess({
    permissionType: PermissionTypes.TEMPORARY_CHAT,
    permission: Permissions.USE,
  });

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="via-presentation/70 md:from-presentation/80 md:via-presentation/50 2xl:from-presentation/0 absolute top-0 z-10 flex h-[52px] w-full items-center justify-between from-presentation to-transparent p-2 font-semibold text-text-primary 2xl:via-transparent">
      <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
        <div className="mx-1 flex items-center">
          <OpenSidebar className="md:hidden" />
          {!(navVisible && isSmallScreen) && (
            <div
              className={cn(
                'flex items-center gap-2 pl-2',
                !isSmallScreen ? 'transition-all duration-200 ease-in-out' : '',
              )}
            >
              <CurrentKeyProvider>
                <ModelSelectorChatProvider>
                  <ModelSelectorProvider startupConfig={startupConfig}>
                    <img src="assets/sberLogo.png" alt={`sber logo Icon`} className="w-20" />
                    <ModelSelector startupConfig={startupConfig} />
                    {interfaceConfig.presets === true && interfaceConfig.modelSelect && (
                      <PresetsMenu />
                    )}
                    {hasAccessToBookmarks === true && <BookmarkMenu />}
                    {hasAccessToMultiConvo === true && <AddMultiConvo />}
                    <OpenrouterButton />
                    {isSmallScreen && (
                      <>
                        <ExportAndShareMenu
                          isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
                        />
                        {hasAccessToTemporaryChat === true && <TemporaryChat />}
                      </>
                    )}
                    <SettingOpenrouterKeyButton />
                  </ModelSelectorProvider>
                </ModelSelectorChatProvider>
              </CurrentKeyProvider>
            </div>
          )}
        </div>

        {!isSmallScreen && (
          <div className="flex items-center gap-2">
            <ExportAndShareMenu
              isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
            />
            {hasAccessToTemporaryChat === true && <TemporaryChat />}
          </div>
        )}
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = 'Header';

export default MemoizedHeader;
