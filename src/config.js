import { Contract, ethers } from "ethers";
import factoryAbi from "./abis/factoryAbi.json";
import swapFactoryAbi from "./abis/swapFactory.json";
import pairAbi from "./abis/pairAbi.json";
import { erc20Abi } from "viem";

export const defaultrId = 5;

export const chains = [
  {
    id: 1,
    name: "Ethereum",
    networkId: 1, // This is mainnet for Ethereum
    rpc_url:
      "https://eth-mainnet.g.alchemy.com/v2/prlsv6gydi7XS-ubbSjCdT8dytnOyUOn",
    explorer: "https://etherscan.io",
    contractAddress: "0xD867B0db5f0663DFFfa490050411273ce02bAB9A",
    wEthAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    fundDistributer: "0x39994d28a843dcAA4D4B67d9E05045b122331025",
    statelessPoolAddress: "0x7856bF058D5aE98096E812d238aB65830e0Bc42f",
  },
  {
    id: 2,
    name: "Sepolia",
    rpc_url:
      "https://eth-sepolia.g.alchemy.com/v2/prlsv6gydi7XS-ubbSjCdT8dytnOyUOn",
    // contractAddress: "0x0031776c5e2aC1E64B1CFb91e724cfbC08A95710",
    contractAddress: "0xC150CBE8982F11E550BECE86381E1E5375431aB9",
    networkId: 11155111,
    explorer: "https://sepolia.etherscan.io",
    wEthAddress: "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa",
    factoryAddress: "0x7E0987E5b3a30e3f2828572Bb659A548460a3003",
    fundDistributer: "0xd5B504242B7eE737AA265339f4FbeCb948d9406D",
    statelessPoolAddress: "0xfb34831b967FC1d8667bf49A81Fc7509529DE128",
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
