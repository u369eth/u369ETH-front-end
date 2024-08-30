import { Contract, ethers } from "ethers";
import factoryAbi from "./abis/factoryAbi.json";
import swapFactoryAbi from "./abis/swapFactory.json";
import pairAbi from "./abis/pairAbi.json";
import { erc20Abi } from "viem";

export const defaultrId = 5;

const chains = [
  {
    id: 1,
    name: "Ethereum",
    networkId: 1, // This is mainnet for Ethereum
    rpc_url:
      "https://eth-mainnet.g.alchemy.com/v2/prlsv6gydi7XS-ubbSjCdT8dytnOyUOn",
    contractAddress: "0xD867B0db5f0663DFFfa490050411273ce02bAB9A",
    explorer: "https://etherscan.io",
    wEthAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    fundDistributer: "0x39994d28a843dcAA4D4B67d9E05045b122331025",
    // name: "Sepolia",
    // "https://eth-sepolia.g.alchemy.com/v2/prlsv6gydi7XS-ubbSjCdT8dytnOyUOn",
    // contractAddress: "0x18D7987fd1Eebd66E6a5741B5883C488A648c67F",
    // networkId: 11155111, // This is for Sepolia
    // explorer: "https://sepolia.etherscan.io",
    // wEthAddress: "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa",
    // factoryAddress: "0x7E0987E5b3a30e3f2828572Bb659A548460a3003",
    // fundDistributer: "0xeb88322f6d548922c983dd0e5f991a8004f5bc71",
  },
  {
    name: "BNB Smart Chain Testnet",
    rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    // contractAddress: "0xe59f7f0f2ef76540f32b1b167ac4bc981f76effe",
    contractAddress: "0x198bAa18d7777770D11C6CB56e6F4097a3F9f7bB",
    wEthAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    networkId: 97,
    explorer: "https://testnet.bscscan.com/",
    factoryAddress: "0xd4976376e041DDE2D1ff8b23483835B877F43B22",
    fundDistributer: "0x24cff4cdfd27d125d2d4f8e52007fb4d09f06001",
  },
  // Add more chains as needed...
];

// Example function to fetch details by chain name:
export const getChainDetails = (chainId) => {
  const chain = chains.find((c) => c.networkId === chainId);
  return chain ? chain : null;
};

export const getChainExplorer = (chainId) => {
  try {
    let chain = chains.find((c) => c.networkId === chainId);
    if (chain) {
      return chain;
    } else {
      return chains.find((c) => c.networkId === defaultrId);
    }
  } catch (error) {
    console.error("error while get chain explorer", error);
  }
};
export const factoryInstance = async (chainId) => {
  try {
    let chain = chains.find((c) => c.networkId === chainId);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return new Contract(chain.contractAddress, factoryAbi, signer);
  } catch (error) {
    console.error("errro while factory instance", error);
  }
};

export const remortFactoryInstnce = async (chainId) => {
  try {
    let chain = chains.find((c) => c.networkId === chainId);
    if (chain) {
      const provider = new ethers.providers.JsonRpcProvider(chain?.rpc_url);
      return new Contract(chain.contractAddress, factoryAbi, provider);
    } else {
      chain = chains.find((c) => c.networkId === defaultrId);
      const provider = new ethers.providers.JsonRpcProvider(chain?.rpc_url);
      return new Contract(chain.contractAddress, factoryAbi, provider);
    }
  } catch (error) {
    console.error("errro while remote factory instance", error);
    throw error;
  }
};

export const erc20Instance = async (tokenAddress) => {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return new Contract(tokenAddress, erc20Abi, signer);
  } catch (error) {
    console.error("error while ecr20 instance", error);
  }
};
export const pairInstance = async (pairAddress, chainId) => {
  try {
    let chain = chains.find((c) => c.networkId === chainId);
    if (chain) {
      const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
      return new Contract(pairAddress, pairAbi, provider);
    } else {
      chain = chains.find((c) => c.networkId === defaultrId);
      const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
      return new Contract(pairAddress, pairAbi, provider);
    }
  } catch (error) {
    console.error("errro while remote factory instance", error);
  }
};
export const swapFactoryInstance = async (chainId) => {
  try {
    let chain = chains.find((c) => c.networkId === chainId);
    if (chain) {
      const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
      return new Contract(chain.factoryAddress, swapFactoryAbi, provider);
    } else {
      chain = chains.find((c) => c.networkId === defaultrId);
      const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
      return new Contract(chain.factoryAddress, swapFactoryAbi, provider);
    }
  } catch (error) {
    console.error("errro while remote factory instance", error);
  }
};

export const walletBalance = async (address) => {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("error while wallet balance", error);
  }
};
