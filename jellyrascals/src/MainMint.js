import {useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import JellyRascalsNFT from "./JellyRascalsNFT.json";

const JellyRascalsNFTAddress = "0x83e2A1D8a4f25aC866b498De4bA8616c4baEb695"; //contract address

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                JellyRascalsNFTAddress,
                JellyRascalsNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">
                        JellyRascals
                    </Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    > 
                        It's 2078 HAHAHAH 
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                             backgroundColor="#D6517D"
                             borderRadius="5PX"
                             boxShadow="0px 2px 2px 1px #0F0F0F"
                             color="white"
                             cursor="pointer"
                             fontFamily="inherity"
                             padding="15px"
                             marginTop="10px"
                             onClick={handleDecrement}
                             >
                                -
                            </Button>
                            <Input 
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value={mintAmount} 
                            />
                            <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5PX"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherity"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5PX"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherity"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleMint}
                        >
                            Mint now
                        </Button>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                    > 
                        You must be connected to Mint. 
                    </Text>
                )}
            </Box>
        </Flex>
    );
};


export default MainMint;