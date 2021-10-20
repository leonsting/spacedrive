import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  HomeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  ViewListIcon,
  CloudIcon,
  FolderAddIcon,
  TagIcon
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { ArrowsLeftRight, HouseSimple } from 'phosphor-react';
import React from 'react';
import { useExplorerStore } from '../../store/explorer';
import { TrafficLights } from '../os/TrafficLights';
import { Button, ButtonProps, Input } from '../primative';
import { Shortcut } from '../primative/Shortcut';
import { DefaultProps } from '../primative/types';

export interface TopBarProps extends DefaultProps {}
export interface TopBarButtonProps extends ButtonProps {
  icon: any;
  group?: boolean;
  active?: boolean;
  left?: boolean;
  right?: boolean;
}

const TopBarButton: React.FC<TopBarButtonProps> = ({ icon: Icon, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'mr-[1px] py-1 px-1 text-md font-medium dark:bg-gray-550 dark:hover:bg-gray-600 dark:active:bg-gray-500 rounded-md transition-colors duration-100',
        {
          'rounded-r-none rounded-l-none': props.group && !props.left && !props.right,
          'rounded-r-none': props.group && props.left,
          'rounded-l-none': props.group && props.right,
          'dark:bg-gray-550 dark:hover:bg-gray-550 dark:active:bg-gray-550': props.active
        },
        props.className
      )}
    >
      <Icon className="m-0.5 w-5 h-5 dark:text-gray-150" />
    </button>
  );
};

export const TopBar: React.FC<TopBarProps> = (props) => {
  const [goBack] = useExplorerStore((state) => [state.goBack]);
  return (
    <>
      <div
        data-tauri-drag-region
        className="flex flex-shrink-0 h-11 -mt-0.5 max-w items-center border-b bg-gray-100 dark:bg-gray-550 border-gray-100 dark:border-gray-900 shadow-sm"
      >
        <div className="mr-32 ml-1 ">
          <TrafficLights className="p-1.5" />
        </div>

        <TopBarButton group left icon={ChevronLeftIcon} onClick={goBack} />
        <TopBarButton group right icon={ChevronRightIcon} />
        <div className="w-8"></div>
        <TopBarButton active group left icon={ViewListIcon} />
        <TopBarButton group icon={ViewBoardsIcon} />
        <TopBarButton group right icon={ViewGridIcon} />
        <div className="w-8"></div>
        <div className="relative flex h-7">
          <Input
            placeholder="Search"
            className="placeholder-gray-600 bg-gray-50 dark:bg-gray-500 dark:border-gray-500 dark:hover:!bg-gray-550 text-xs w-32 focus:w-52 transition-all"
          />
          <div className="space-x-1 absolute top-[1px] right-1">
            <Shortcut chars="⌘" />
            <Shortcut chars="S" />
          </div>
        </div>
        <div className="w-8"></div>
        <TopBarButton icon={TagIcon} />
        <TopBarButton icon={FolderAddIcon} />
        <TopBarButton icon={CloudIcon} />
        <div className="w-8"></div>
        <TopBarButton icon={ArrowsLeftRight} />
        <div className="flex-grow"></div>
        <TopBarButton className="mr-[8px]" icon={CogIcon} />
      </div>
      {/* <div className="h-[1px] flex-shrink-0 max-w bg-gray-200 dark:bg-gray-700" /> */}
    </>
  );
};
