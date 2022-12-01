import React, {StrictMode, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {Layout, Model} from "flexlayout-react";
import {Canvas} from "@react-three/fiber";
import {suspend} from "suspend-react";

import "/node_modules/flexlayout-react/style/light.css";

/**
 * This component uses suspend from the suspend-react package. This is used internally by @react-three/fiber and @react-three/drei so hard to avoid.
 */
const TroublesomeComponent = () => {
    suspend(() => new Promise(resolve => setTimeout(() => resolve(true), 300)), [])

    return <mesh rotation={[Math.PI / 8, Math.PI / 8, Math.PI / 8]}>
        <boxGeometry attach="geometry" args={[1, 1, 1]}/>
        <meshBasicMaterial attach="material" color="red"/>
    </mesh>
}

const MODEL = {
    global: {},
    layout: {
        type: "row", id: "root", children: [{type: "tabset", children: [{type: "tab", name: "Tab 1", id: "t1"}]}]
    }
};

/**
 * Version of app that uses flexlayout-react
 */
export default function App() {
    const model = Model.fromJson(MODEL);

    const factory = () => {
        return (
            <Canvas>
                <TroublesomeComponent/>
            </Canvas>

            // Issue can be worked around by adding a nested Suspense!
            // <Suspense>
            //     <Canvas>
            //         <TroublesomeComponent/>
            //     </Canvas>
            // </Suspense>
        );
    };

    return <Layout model={model} factory={factory}/>;
}

/**
 * Version of app that doesn't use flexlayout-react
 * (doesn't exhibit the issue with or without second Suspense)
 */
// export default function App() {
//     return <Canvas>
//         <TroublesomeComponent/>
//     </Canvas>
// }

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <div style={{width: "90vw", height: "90vh"}}>
            {/*
            We have an outer Suspense in our app to handle code splitting (React.lazy and dynamic imports)

            If you remove this outer Suspense, error does not occur with or without nested Suspense
            */}
            <Suspense>
                <App/>
            </Suspense>
        </div>
    </StrictMode>
);
