import { useState, useEffect } from "react";
import DonationView from "./DonationView";
import { notification } from "antd";
import { ethers } from "ethers";
import { DONATION_ADDRESS, DONATION_BOX_ABI } from "@/constants";

const DonationContainer = () => {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [nonce, setNonce] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<ethers.BigNumber>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [contractSigner, setContractSigner] = useState<ethers.BaseContract>();
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const [totalBalance, setTotalBalance] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string | null>("0.01");
  const [transferResponse, setTransferResponse] =
    useState<TransferResponse | null>(null);
  const [transferSuccess, setTransferSucces] = useState(false);

  /**
   * sets up the connection, contract, signer between MetaMask and the DonationBox
   */
  const getMetaMaskInformation = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const signer = await provider.getSigner();
    const nonce = await provider.getTransactionCount(DONATION_ADDRESS);
    setNonce(nonce);
    const gasPrice = await provider.getGasPrice();
    setGasPrice(gasPrice);
    setNonce(nonce);
    const contract = await new ethers.Contract(
      DONATION_ADDRESS,
      DONATION_BOX_ABI,
      provider,
    );
    setContract(contract);
    const contractSigner = contract.connect(signer);
    setContractSigner(contractSigner);
    const initialBalance = await provider.getBalance(account);
    setCurrentBalance(ethers.utils.formatEther(initialBalance));
  };

  /**
   * Updates the current balance whenever we create a donation to the donation box
   */
  const handleDonationTransferred = async () => {
    if (provider && contract) {
      // Fetch the updated account balance
      const newCurrentBalance = ethers.utils.formatEther(
        await provider.getBalance(account),
      );
      const totalBalance = ethers.utils.formatEther(
        await contract.geTotalDonations(),
      );

      if (newCurrentBalance !== currentBalance) {
        setCurrentBalance(newCurrentBalance);
      }
      setTotalBalance(totalBalance);
    }
  };

  /** on page load, sets up the connection */
  useEffect(() => {
    if (account) {
      getMetaMaskInformation();
    }
  }, [account]);

  /** listener for any donation transferred events then updates the current balance */
  useEffect(() => {
    if (contract) {
      contract.on("DonationTransferred", handleDonationTransferred);
    }
  }, []);

  const handleAccountsChanged = (accounts: any) => {
    if (!accounts.length) {
      notification.error({
        message: "Error",
        description: "Your MetaMask has no accounts, please set up one!",
      });
    } else {
      // assuming user has one account on MetaMask
      setAccount(accounts[0]);
    }
  };

  /**
   * fires on connect to Metamask button, allows user to connect the metamask and select an account,
   * if refresh, still occurs to confirm account is connected without connecting to metamask if its already connected
   */
  const requestEthereumAccounts = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(handleAccountsChanged)
        // typecasting err as any since it might vary here
        .catch((err: any) => {
          if (err.code === 4001) {
            notification.error({
              message: "Error",
              description: "Please try again and reconnect to MetaMask.",
            });
          }
        });
    } else {
      notification.open({
        message: "Missing MetaMask Extension!",
        description: (
          <div>
            Oops! I think you forgot the extension! Check this out!{" "}
            <a
              style={{ color: "blue" }}
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
            >
              MetaMask Extension
            </a>
          </div>
        ),
      });
    }
  };

  /**
   * function to handle input changes and provides an error if we go to 0 or below, or go above the max
   * @param value // current value in the input
   */
  const onInputChange = (value: string | null) => {
    setInputError("");
    if (Number(value) >= Number(currentBalance)) {
      setInputError(
        `You won't have enough funds to donate and pay for the gas to donate this! Choose an lower amount or mine for more ETH!`,
      );
      setInputValue(value);
    } else if (Number(value) <= 0) {
      setInputError(`Please choose an amount greater than 0.`);
      setInputValue(value);
    } else {
      setInputValue(value);
    }
  };

  /**
   * function to donate the amount to the donation box
   */
  const donateAmount = async () => {
    setTransferSucces(false);
    if (inputValue) {
      const stringifiedValue = String(inputValue);
      const modifedDonationAmount = ethers.utils.parseEther(stringifiedValue);
      const donateObj = {
        gasPrice: 2 * Number(gasPrice),
        gasLimit: 10 * 21000,
        value: modifedDonationAmount,
        nonce,
      };
      if (contractSigner) {
        await contractSigner
          // @ts-ignore
          // ts is not liking donate functionality even though it exists...
          .donate(donateObj)
          .then((response: any) => {
            const transferResponse = {
              hash: response.hash,
              to: response.to,
              nonce,
              gasPrice: response.gasPrice,
            };
            setTransferResponse(transferResponse);
          })
          .catch((err: any) => {
            if (err.code === 4001) {
              notification.open({
                message: "Error",
                description:
                  "You rejected the donation via MetaMask, please try again.",
              });
            }
            setTransferSucces(false);
          })
          .finally(() => {
            setTransferSucces(true);
            setInputValue("0.01");
          });
      }
    }
  };

  return (
    <DonationView
      requestEthereumAccounts={requestEthereumAccounts}
      donateAmount={donateAmount}
      account={account}
      currentBalance={currentBalance}
      totalBalance={totalBalance}
      inputError={inputError}
      onInputChange={onInputChange}
      inputValue={inputValue}
      transferSuccess={transferSuccess}
      transferResponse={transferResponse}
    />
  );
};

export default DonationContainer;
