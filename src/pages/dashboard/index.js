// material-ui
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Card, Row, Col } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import { useSelectMainNoticeListMutation, useSelectMainInfoListMutation } from '../../hooks/api/MainManagement/MainManagement';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    // 메인-공지사항 5개항목
    const [SelectMainNoticeListApi] = useSelectMainNoticeListMutation();
    const [selectMainNoticeListData, setSelectMainNoticeListData] = useState([]);
    const SelectMainNoticeList_ApiCall = async () => {
        const SelectMainNoticeListResponse = await SelectMainNoticeListApi({});
        setSelectMainNoticeListData(SelectMainNoticeListResponse?.data?.RET_DATA);
    };

    // 메인-교육안내 5개항목
    const [SelectMainInfoListApi] = useSelectMainInfoListMutation();
    const [selectMainInfoListData, setSelectMainInfoListData] = useState([]);
    const SelectMainInfoList_ApiCall = async () => {
        const SelectMainInfoListResponse = await SelectMainInfoListApi({});
        setSelectMainInfoListData(SelectMainInfoListResponse?.data?.RET_DATA);
    };

    useEffect(() => {
        SelectMainNoticeList_ApiCall();
        SelectMainInfoList_ApiCall();
    }, []);
    return (
        <MainCard>
            <Row justify="space-around" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card
                        type="inner"
                        title={
                            <span style={{ color: '#00b0f0', fontWeight: 'bold' }}>
                                <NotificationOutlined /> 교육안내
                            </span>
                        }
                        style={{ height: '300px' }}
                        extra={<Link to="/education">More</Link>}
                    >
                        {selectMainInfoListData.map((Idata, i) => (
                            <Row key={i} gutter={24} style={{ margin: '20px 0px' }}>
                                <Col span={16}>· {Idata.title}</Col>
                                <Col span={8}>{Idata.insertDate}</Col>
                            </Row>
                        ))}
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card
                        type="inner"
                        title={
                            <span style={{ color: '#00b0f0', fontWeight: 'bold' }}>
                                <NotificationOutlined /> 공지사항
                            </span>
                        }
                        style={{ height: '300px' }}
                        extra={<Link to="/notification">More</Link>}
                    >
                        {selectMainNoticeListData.map((Ndata, i) => (
                            <Row key={i} gutter={24} style={{ margin: '20px 0px' }}>
                                <Col span={16}>· {Ndata.title}</Col>
                                <Col span={68}>{Ndata.insertDate}</Col>
                            </Row>
                        ))}
                    </Card>
                </Col>
            </Row>
        </MainCard>
    );
};

export default DashboardDefault;
