import { useRequest } from '@umijs/max';
import { getAllVehiclesUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';
import {  Select } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react'
import { useModel } from '@@/plugin-model';
import { VehicleState, VehicleStateWord } from '@/pages/Config/const';

const SelectVehicle = memo(() => {
  const { user, terminalMobile, setTerminalMobile, setVehicleNum, setVeState, veState } = useModel('global');
 const [loading, setLoading] = useState(true)
    const res = useRequest(getAllVehiclesUsingGET, {
        manual:true,
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
            setLoading(false)
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
        return res.data?.map(({terminalMobile, licensePlateNumber, state}, ind) => <Select.Option value={terminalMobile} key={`${terminalMobile}-${ind}`} disabled={!state}>{`${licensePlateNumber} ${VehicleStateWord[state as VehicleState]}`}</Select.Option>)
    }, [res.data])
    return <>
        <Select style={{width: '200px'}} loading={res.loading} value={loading ? undefined : terminalMobile} onChange={(terminalMobile) => {
            setTerminalMobile(terminalMobile)
            setVehicleNum(res.data?.find(ele => ele.terminalMobile === terminalMobile)?.licensePlateNumber || '')
            const vehicleState = res.data?.find(ele => ele.terminalMobile === terminalMobile)?.state || '';
            setVeState(vehicleState)
        }}>{selectOption}</Select>
    </>
})
export default SelectVehicle