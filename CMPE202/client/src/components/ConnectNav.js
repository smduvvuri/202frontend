import { useSelector } from "react-redux";
import { Card} from "antd";

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
           title={`Hello ${auth.result.userName}`}
           description={` Welcome!`}
        />
      </Card>
    </div>
  );
};

export default ConnectNav;
