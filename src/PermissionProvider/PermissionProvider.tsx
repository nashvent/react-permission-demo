import React from 'react';
import {Permission} from "../Types";
import PermissionContext from "./PermissionContext";

type Props = {
    fetchPermission: (p: Permission) => Promise<boolean>,
    children: React.ReactNode
}

type PermissionCache = {
    [key:string]: boolean;
}

const PermissionProvider: React.FunctionComponent<Props> = ({fetchPermission, children}) => {

    const cache: PermissionCache = {};

    const isAllowedTo = async (permission: Permission): Promise<boolean> => {
        if(Object.keys(cache).includes(permission)){
            return cache[permission];
        }
        const isAllowed = await fetchPermission(permission);
        cache[permission] = isAllowed;
        return isAllowed;
    };

    return <PermissionContext.Provider value={{isAllowedTo}}>{children}</PermissionContext.Provider>;
};

export default PermissionProvider;
