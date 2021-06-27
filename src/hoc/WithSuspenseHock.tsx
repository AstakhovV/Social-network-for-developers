import React, {Suspense} from "react";
import Preloader from "../components/Common/Preloader/Preloader";


export function WithSuspenseHock<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}
