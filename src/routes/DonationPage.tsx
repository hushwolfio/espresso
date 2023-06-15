import DonationContainer from "../Components/DonationContainer";
import { Space, Layout, Typography } from "antd";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const DonationPage = () => (
  <Space
    direction="vertical"
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#001529",
      overflow: "hidden",
    }}
  >
    <Layout style={{ maxWidth: "1400px", width: "80vw", overflow: "hidden" }}>
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <Title style={{ color: "white" }}>EspressoSys FE Challenge</Title>
      </Header>
      <Content
        style={{
          height: "calc(100vh - 64px - 69px)",
        }}
      >
        <DonationContainer />
      </Content>
      <Footer style={{ display: "flex", justifyContent: "center" }}>
        Created by Austin Welborn
      </Footer>
    </Layout>
  </Space>
);

export default DonationPage;
