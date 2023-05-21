// 全局共享数据示例
import { useState } from 'react';



const useUser = () => {
  const [user, setUser] = useState({userName: '', userTel: '', userId: 0})
  const [terminalMobile, setTerminalMobile] = useState<string>(''); // TODO091930371910 终端号
  const [vehicleNum, setVehicleNum] = useState<string>(''); //车牌号
  return {
    user, setUser,
    terminalMobile,
    setTerminalMobile,
    vehicleNum,
    setVehicleNum
  };
};

export default useUser;
