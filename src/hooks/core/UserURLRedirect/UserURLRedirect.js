import React from 'react';
import { useUserRole } from '../UserRole';

function useUserURLRedirect(props) {
    const [userRoleCodes] = useUserRole();
    const getPath = (roleCode) => {
        switch (roleCode) {
            //관리자 : 000
            case userRoleCodes.admin:
                return '/dashboard';
            //대표 : 001
            case userRoleCodes.director:
                return '/dashboard';
            //책임자 : 002
            case userRoleCodes.employee:
                return '/dashboard';
            //실무자 : 003
            case userRoleCodes.worker:
                return '/dashboard';
        }
        return false;
    };
    return getPath;
}
export default useUserURLRedirect;
