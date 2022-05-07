import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
           // avatar={<Avatar>{auth.result.userName}</Avatar>}
           title={`Hello ${auth.result.userName}`}
           description={` Welcome!`}
        />
      </Card>
    </div>
  );
};

export default ConnectNav;
