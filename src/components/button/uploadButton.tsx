import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const UploadButton = ({ loading }: { loading: boolean }) => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);