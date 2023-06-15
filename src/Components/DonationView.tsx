import { Row, Col, Button, InputNumber, Typography } from "antd";
const { Title, Text } = Typography;
import TransactionInfo from "./TransactionInfo";

type Props = {
  requestEthereumAccounts: () => void;
  donateAmount: () => void;
  onInputChange: (value: string | null) => void;
  account: string;
  currentBalance: string;
  totalBalance: string;
  inputError: string;
  inputValue: string | null;
  transferSuccess: boolean;
  transferResponse: TransferResponse | null;
};

const DonationView = ({
  requestEthereumAccounts,
  donateAmount,
  onInputChange,
  account,
  currentBalance,
  totalBalance,
  inputError,
  inputValue,
  transferSuccess,
  transferResponse,
}: Props) => (
  <Row
    justify="center"
    align="middle"
    style={{
      backgroundColor: "white",
      height: "100%",
    }}
  >
    {!account ? (
      <Button onClick={requestEthereumAccounts}>Connect to MetaMask?</Button>
    ) : (
      <Col>
        <Row>
          <Title level={3} style={{ borderBottom: "1px solid black" }}>
            Donate to EspressoSys's Donation Box
          </Title>
        </Row>
        <Col>
          <Row style={{ margin: "15px 0" }}>
            <Text strong>
              Metamask Current ETH Balance:{" "}
              {parseFloat(currentBalance).toFixed(4)} ETH
            </Text>
          </Row>
          <Row>
            {" "}
            <Text>Amount to donate:</Text>
          </Row>
          <Row justify="space-between">
            <InputNumber<string>
              style={{
                width: 200,
              }}
              defaultValue="0.01"
              step="0.01"
              onChange={onInputChange}
              status={inputError.length ? "error" : ""}
              value={inputValue}
            />
            <Button
              style={{ marginLeft: "20px" }}
              onClick={donateAmount}
              disabled={
                Number(inputValue) <= 0 ||
                Number(inputValue) >= Number(currentBalance)
              }
            >
              Donate
            </Button>
          </Row>
          <Row>
            {inputError ? <Text type="danger">{inputError}</Text> : null}
          </Row>
        </Col>
        <Row>
          {transferSuccess && transferResponse ? (
            <TransactionInfo
              inputValue={inputValue}
              transferResponse={transferResponse}
              totalBalance={totalBalance}
            />
          ) : null}
        </Row>
      </Col>
    )}
  </Row>
);

export default DonationView;
