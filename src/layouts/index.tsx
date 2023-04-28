import { useModel,Outlet, history } from '@umijs/max';
import ls from 'store';
import { System } from '@/constants';

export default function Page() {
  const { user, setUser } = useModel('global')
  const { userName, userId, userTel } = user || {};
  if (!userName || !userId || !userTel) {
    const cache = ls.get(`${System}-user`);
    if (!cache) {
      if (location.pathname && location.pathname !== '/login') {
        history.push('/login')
      }
    } else {
      setUser(cache);
    }

  } else {
    ls.set(`${System}-user`, user)
  }
  return (
    <div style={{ padding: 20 }}>
      <Outlet />
    </div>
  )
}