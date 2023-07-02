import { useRequest } from '@umijs/max';
import { getAllVehiclesUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';
import { Select } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react'
import { useModel } from '@@/plugin-model';
import { VehicleState, VehicleStateWord } from '@/pages/Config/const';
import { getTempHumiDateListUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';

const SelectVehicle = memo(() => {
    const { user, terminalMobile, setTerminalMobile, setVehicleNum, setVeState, veState } = useModel('global');
    const [loading, setLoading] = useState(true)
    const res = useRequest(getAllVehiclesUsingGET, {
        manual: true,
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
        }
    });
    const onlineList = useRequest(getTempHumiDateListUsingGET, {
        manual: true,
        onSuccess: (res) => {
            console.log('%c [ res ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', res)

        }
      });
          useEffect(() => {
        if (user?.userId) {
            res.run({
                userId: user.userId
            });
        }
    }, [user?.userId]);
    const selectOption = useMemo(() => {
        return res.data?.map(({ terminalMobile, licensePlateNumber, state }, ind) => <Select.Option value={terminalMobile} key={`${terminalMobile}-${ind}`} disabled={!state}>{`${licensePlateNumber} ${VehicleStateWord[state as VehicleState]}`}</Select.Option>)
    }, [res.data])

    useEffect(() => {
        console.log(terminalMobile);
        if (terminalMobile) {
            // TODO 调用报错
            // onlineList.run({
            //     terminalMobile,
            //     startTime:'2022-01-01 00:00:00',
            //     endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            // })
        }
        
    }, [terminalMobile])
    return <>
        <Select style={{ width: '200px' }} loading={res.loading} value={loading ? undefined : terminalMobile} onChange={(terminalMobile) => {
            setTerminalMobile(terminalMobile)
            setVehicleNum(res.data?.find(ele => ele.terminalMobile === terminalMobile)?.licensePlateNumber || '')
            const vehicleState = res.data?.find(ele => ele.terminalMobile === terminalMobile)?.state || '';
            setVeState(vehicleState)
        }}>{selectOption}</Select>
    </>
})
export default SelectVehicle