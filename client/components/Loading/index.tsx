import { Spin } from 'antd';
import clsx from 'clsx';

const styles: any = {
  zIndex: 999,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba($color:#000000, $alpha: .1)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div
      style={styles}
      className={clsx(
        "overlay"
      )}> <Spin spinning={loading} size="large" /></div>
  )
}

export default Loading