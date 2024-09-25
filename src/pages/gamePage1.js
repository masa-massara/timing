// import React, { Fragment, useState, useEffect } from "react";
// import { usePlayer } from "./PlayerConfig";
// import Unity, { UnityContext } from "react-unity-webgl";

// const unityContext = new UnityContext({
//     loaderUrl: "Build/fuusenn.loader.js",
//     dataUrl: "Build/fuusenn.data",
//     frameworkUrl: "Build/fuusenn.framework.js",
//     codeUrl: "Build/fuusenn.wasm",
// });

// function GamePage1({ id }) {
//     const [fsEvent, setFsEvent] = useState(false);
//     const [, , name] = usePlayer();

//     function Fullscreen() {
//         const unityInstance = unityContext.unityInstance;
//         if (!fsEvent) {
//             unityInstance.SetFullscreen(1);
//             setFsEvent(true);
//         } else {
//             unityInstance.SetFullscreen(0);
//             setFsEvent(false);
//         }
//     }

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === "f" || event.key === "F") {
//                 Fullscreen();
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);
//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//         };
//     });

//     return (
//         <div>
//             <h2>No.{id}</h2>
//             <h3>{name[id - 1]}さん</h3>
//             <button onClick={Fullscreen}> {fsEvent ? "フルスクリーン解除" : "Fボタン:フルスクリーン"} </button>
//             <Fragment>
//                 <Unity unityContext={unityContext} style={{
//                     height: "100%",
//                     width: 500,
//                     border: "2px solid black",
//                     background: "grey",
//                 }} />
//             </Fragment>
//         </div>
//     );
// }

// export default GamePage1;

import React, { useState, useEffect } from "react";
import { usePlayer } from "./PlayerConfig";
import Unity, { UnityContext } from "react-unity-webgl";
import {
    ChakraProvider,
    Box,
    Heading,
    Button,
    Center,
    Text
} from "@chakra-ui/react";

const unityContext = new UnityContext({
    loaderUrl: "Build/fuusenn.loader.js",
    dataUrl: "Build/fuusenn.data",
    frameworkUrl: "Build/fuusenn.framework.js",
    codeUrl: "Build/fuusenn.wasm",
});

function GamePage1({ id }) {
    const [fsEvent, setFsEvent] = useState(false);
    const [, , name] = usePlayer();

    function Fullscreen() {
        const unityInstance = unityContext.unityInstance;
        if (!fsEvent) {
            unityInstance.SetFullscreen(1);
            setFsEvent(true);
        } else {
            unityInstance.SetFullscreen(0);
            setFsEvent(false);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "f" || event.key === "F") {
                Fullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <ChakraProvider>
            <Center flexDirection="column" mt="20px">
                <Text fontSize="xl" mb="10px">No.{id}</Text>
                <Heading as="h2" size="lg" mb="10px">{name[id - 1]}さん</Heading>
                <Button onClick={Fullscreen} mb="20px">
                    {fsEvent ? "フルスクリーン解除" : "Fボタン:フルスクリーン"}
                </Button>
                <Box border="2px solid black" bg="gray.200" p="10px">
                    <Unity unityContext={unityContext} style={{
                        height: "100%",
                        width: 700,
                    }} />
                </Box>
            </Center>
        </ChakraProvider>
    );
}

export default GamePage1;
