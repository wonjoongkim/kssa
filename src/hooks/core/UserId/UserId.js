import React from 'react';
import { useUserToken } from '../UserToken';

function useUserId(props) {
    let userId = '';
    const [userToken] = useUserToken();
    if (userToken.isValid()) {
        userId = userToken.getUserLoginId();
    }
    return userId;
}
export default useUserId;
