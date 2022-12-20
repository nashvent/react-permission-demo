import React from 'react';
import {Permission} from "../Types";
import usePermission from "./usePermission";

type Props = {
    to: Permission;
    fallback?: JSX.Element | string;
    loadingComponent?: JSX.Element | string;
    children: React.ReactNode
};

const Restricted: React.FunctionComponent<Props> = ({to, fallback,loadingComponent, children}) => {

    const [loading, allowed] = usePermission(to);

    if(loading){
        return <>{loadingComponent}</>;
    }

    if(allowed){
        return <>{children}</>;
    }

    return <>{fallback}</>;
};

export default Restricted;
