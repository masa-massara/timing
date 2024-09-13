import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ChakraProvider,
    Box,
    Heading,
    Button,
    Select,
    Center,
    Input
} from "@chakra-ui/react";
import { usePlayer } from "../PlayerConfig";

function FirstPage() {
    const navigate = useNavigate();
    const [playerNum, setPlayerNum, name, setName] = usePlayer();

    const handleToggleChange = (event) => {
        setPlayerNum(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const navigateToGamePage1 = () => {
        navigate("gamePage1");
    };

    const navigateToGamePage2 = () => {
        navigate("gamePage2");
    };

    return (
        <ChakraProvider>
            <Center mt="50px" flexDirection="column">
                <Heading mb="20px">ゲームのタイトル画面</Heading>
                <Box mb="20px">
                    <Button colorScheme="blue" onClick={navigateToGamePage1} mr="4">
                        ゲームページ1へ
                    </Button>
                    <Button colorScheme="green" onClick={navigateToGamePage2}>
                        ゲームページ2へ
                    </Button>
                </Box>
                <Box>
                    <label htmlFor="toggle">参加人数: </label>
                    <Select
                        id="toggle"
                        value={playerNum}
                        onChange={handleToggleChange}
                        width="auto"
                        display="inline-block"
                        ml="2"
                    >
                        {[...Array(7).keys()].map((num) => (
                            <option key={num + 2} value={num + 2}>
                                {num + 2}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <label htmlFor="name">名前を入力してください: </label>
                    <Input
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        width="auto"
                        display="inline-block"
                        ml="2"
                    />
                </Box>
            </Center>
        </ChakraProvider>
    );
}

export default FirstPage;
