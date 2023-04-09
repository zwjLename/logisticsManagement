// 全局共享数据示例
import { useState } from 'react';



const useUser = () => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [userTel, setUserTel] = useState('');
  return {
    userName,
    setUserName,
    userId,
    setUserId,
    userTel,
    setUserTel
  };
};

export default useUser;
