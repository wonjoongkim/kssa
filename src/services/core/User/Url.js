import { RoleService } from './';

export const HOME_PAGE_ADMIN_PATH = '/dashboard/system-administrator';
export const HOME_PAGE_DIRECTOR_PATH = '/dashboard/director';
export const HOME_PAGE_EMPLOYEE_PATH = '/dashboard/employee';

export const getHomePagePath = (roleCode) => {
    switch (roleCode) {
        case RoleService.ROLE_CODE_ADMIN:
            return HOME_PAGE_ADMIN_PATH;

        case RoleService.ROLE_CODE_DIRECTOR:
            return HOME_PAGE_DIRECTOR_PATH;

        case RoleService.ROLE_CODE_EMPLOYEE:
            return HOME_PAGE_EMPLOYEE_PATH;
    }

    return false;
};
