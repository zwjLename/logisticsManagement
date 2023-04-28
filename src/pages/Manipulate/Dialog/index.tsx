import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const DialogManipulatePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer >
     <div>test</div>
    </PageContainer>
  );
};

export default DialogManipulatePage;