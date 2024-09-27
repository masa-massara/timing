import React, { useState, useEffect } from "react";
import { usePlayer } from "./PlayerConfig";
import Unity, { UnityContext } from "react-unity-webgl";
import {
	ChakraProvider,
	Box,
	Heading,
	Button,
	Center,
	Text,
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
		if (!fsEvent && unityInstance) {
			unityInstance.SetFullscreen(1);
			setFsEvent(true);
		} else if (unityInstance) {
			unityInstance.SetFullscreen(0);
			setFsEvent(false);
		}
	}

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (
				(event.key === "f" || event.key === "F") &&
				unityContext.unityInstance
			) {
				Fullscreen();
			}
		};

		// Unityがロードされた後にのみキーボードイベントを登録
		unityContext.on("loaded", () => {
			window.addEventListener("keydown", handleKeyDown);
		});

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [fsEvent]); // fsEventの依存を追加

	return (
		<ChakraProvider>
			<Center flexDirection="column" mt="20px">
				<Text fontSize="xl" mb="10px">
					No.{id}
				</Text>
				<Heading as="h2" size="lg" mb="10px">
					{name[id - 1]}さん
				</Heading>
				<Button onClick={Fullscreen} mb="20px">
					{fsEvent ? "フルスクリーン解除" : "Fボタン:フルスクリーン"}
				</Button>
				<Box border="2px solid black" bg="gray.200" p="10px">
					<Unity
						unityContext={unityContext}
						style={{
							height: "60vh",
							width: 700,
						}}
						onProgress={(unityContext, progression) => {
							console.log(`Progression: ${progression * 100}%`);
						}}
						onError={(message) => {
							console.error("Unity Error: ", message);
						}}
					/>
				</Box>
			</Center>
		</ChakraProvider>
	);
}

export default GamePage1;
