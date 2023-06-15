import { Col, Row, Typography } from "antd";
const { Text } = Typography;

type Props = {
  inputValue: string | null;
  transferResponse: TransferResponse;
  totalBalance: string;
};

const TransactionInfo = ({
  inputValue,
  transferResponse,
  totalBalance,
}: Props) => (
  <Col
    style={{
      margin: "15px 0",
      backgroundColor: "lightgrey",
      padding: "5px 5px",
      borderRadius: "5px",
    }}
  >
    <Row>
      <Text type="success">Your transaction was successful!</Text>
    </Row>
    <Row>
      <Text>{`Thanks for the donation of ${inputValue} ETH.`}</Text>
    </Row>
    <Row style={{ margin: "5px 0" }}>
      <Text>{`For your records:`}</Text>
    </Row>
    <Row>
      <Text>{`Transaction Hash: ${transferResponse.hash}`}</Text>
    </Row>
    <Row>
      <Text>{`Donated to: ${transferResponse.to}`}</Text>
    </Row>
    <Row>
      <Text>{`Total Balance: ${totalBalance} ETH`}</Text>
    </Row>
    <Row>
      <Text>{`Nonce: ${transferResponse.nonce}, Gas Price: ${transferResponse.gasPrice} ETH`}</Text>
    </Row>
  </Col>
);

export default TransactionInfo;
