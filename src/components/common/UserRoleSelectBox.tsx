import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import type { User } from '@/types/UserType';
import type { RoleName, TeamRoleName } from '@/types/RoleType';
import { PROJECT_ROLES, TEAM_ROLES } from '@/constants/role';

type CheckTeamRole<T> = T extends TeamRoleName ? 'MATE' : 'ASSIGNEE';
type UserRoleSelectBoxProps<T extends RoleName> = {
  userId: User['userId'];
  nickname: User['nickname'];
  defaultValue: CheckTeamRole<T>;
  roles: typeof TEAM_ROLES | typeof PROJECT_ROLES;
  onRoleChange: (userId: number, roleName: T) => void;
  onRemoveUser: (userId: number) => void;
};

export default function UserRoleSelectBox<T extends RoleName>({
  userId,
  nickname,
  defaultValue,
  roles,
  onRoleChange,
  onRemoveUser,
}: UserRoleSelectBoxProps<T>) {
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(userId, event.target.value as T);
  };

  return (
    <div className="ml-4 mt-4 flex items-center text-sm">
      <select
        onChange={handleRoleChange}
        className="mr-2 appearance-none rounded-l-lg border-none bg-gray-200 py-2 pl-4 pr-2"
        defaultValue={defaultValue}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-between rounded-r-lg bg-gray-200 p-2">
        <span>{nickname}</span>
        <button type="button" className="ml-2" onClick={() => onRemoveUser(userId)} aria-label="유저 제거">
          <IoMdCloseCircle className="size-10 cursor-pointer text-close hover:text-[#DF0000]" />
        </button>
      </div>
    </div>
  );
}