import React, { useState } from "react";
import "./searchbar.styles.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      onSearch(searchValue);
      setSearchValue("");
    }
  };

  return (
    <Form name="search-form" onSubmitCapture={handleSearch}>
      <Space.Compact
        style={{
          width: "100%",
          marginRight: "50px",
          padding: "4px",
        }}
      >
        <Input
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#201E1E",
            border: "1px solid white",
          }}
          onChange={handleChange}
          value={searchValue}
          placeholder="Search artist/song here..."
        />
        <Button
          size="large"
          type="primary"
          onClick={handleSearch}
          style={{ backgroundColor: "#35B86B" }}
          htmlType="submit"
          icon={<SearchOutlined />}
        />
      </Space.Compact>
    </Form>
  );
};

export default SearchBar;