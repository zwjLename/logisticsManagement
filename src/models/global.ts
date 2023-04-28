// 全局共享数据示例
import { useState } from 'react';



const useUser = () => {
  const [user, setUser] = useState({userName: '', userTel: '', userId: 0})
  return {
    user, setUser
  };
};

export default useUser;
