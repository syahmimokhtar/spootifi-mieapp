import React from "react";
import CardAlbum from "../card/card.component";
import TypoStyles from "../typography/typography.component";
import { SpotifyOutlined } from "@ant-design/icons";
import "./result.styles.scss";
import {
  Space,
  Tag,
  Empty,
  Flex,
  Button,
  Card,
  Input,
  Col,
  Row,
  Layout,
  Divider,
} from "antd";
// const { Meta } = Card;

const cardStyle = {
  width: "650px",
  height: "auto",
  backgroundColor: "#302E2E",
  border: "none",
  color: "#fff",
  maxWidth: "100%",
  margin: "20px",
};

const imgStyle = { height: "auto", width: "100%", padding: "12px" };

const AboutArtist = ({ items }) => {
  return (
    <Row justify="center">
      <Card hoverable style={cardStyle}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
          <Col xs={24} sm={10}>
            {items ? (
              items.images && items.images.length > 0 ? (
                <img
                  alt="avatar"
                  src={`${items.images[0]?.url}`}
                  style={imgStyle}
                />
              ) : (
                <Empty />
              )
            ) : (
              <Empty />
            )}
          </Col>

          <Col xs={24} sm={10}>
            {items!="" && (
              <>
                <TypoStyles level={3}>{items.name}</TypoStyles>
                <Button
                  style={{ backgroundColor: "#35B86B", margin: "10px -1px" }}
                  type="primary"
                  href={items.external_urls?.spotify}
                  target="_blank"
                >
                  View More
                  <SpotifyOutlined />
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default AboutArtist;
