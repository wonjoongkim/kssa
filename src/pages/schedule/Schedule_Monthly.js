import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Modal, Col, Row, Button, Typography, Card, Input, Form, Divider, DatePicker, Select, Switch, Radio } from 'antd';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { useSelectMonthlyCalendarListMutation } from '../../hooks/api/ScheduleManagement/ScheduleManagement';

// assets
import { EyeOutlined, EyeInvisibleOutlined, PoweroffOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Drawer, Layout, Space } from '../../../node_modules/antd/lib/index';

import './Style.css';

/**
 * 월간계획표.pdf를 Modal에 표출함
 * @props open(default: true)
 * @since 2023.12.28
 * @author Ahn Sejun
 * @returns Component
 */
export const Schedule_Monthly = (props) => {
    const calendarRef = useRef(null);

    const navigate = useNavigate(); // 페이지 이동

    const [scheduleList, setScheduleList] = useState([]); // 달력 일정 정보
    const [currentCalendar, setCurrentCalendar] = useState({}); // 현재 달력 정보(YYYY-MM)

    //모달 닫기
    const [openYn, setOpenYn] = useState(true);

    //일정 표출
    const [securityGuardVisibility, setSecurityGuardVisibility] = useState(true); // 경비
    const [securityCheckVisibility, setSecurityCheckVisibility] = useState(true); // 검색

    const categoryOptions = [
        {
            label: '보안검색요원',
            value: '1'
        },
        {
            label: '항공경비요원',
            value: '2'
        },
        {
            label: '항공보안검색',
            value: '3'
        },
        {
            label: '항공보안경비',
            value: '4'
        },
        {
            label: '공항/항공사 보안',
            value: '5'
        },
        {
            label: '감독자/책임자',
            value: '6'
        },
        {
            label: '행동탐지요원',
            value: '7'
        }
    ];

    const divisionOptions = [
        {
            label: '초기교육',
            value: '1'
        },
        {
            label: '정기교육',
            value: '2'
        },
        {
            label: '인증평가',
            value: '3'
        },
        {
            label: '재교육',
            value: '4'
        }
    ];

    const theme = {
        common: {
            saturday: {
                color: 'rgba(0, 3, 51, 0.5)'
            },
            holiday: {
                color: 'rgba(255, 64, 64, 0.5)'
            }
        }
    };

    const calendarAttribute = [
        {
            id: '1',
            name: '항공경비예정',
            backgroundColor: '#8497ac',
            dragBackgroundColor: '#8497ac',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        {
            id: '2',
            name: '보안검색예정',
            backgroundColor: '#8497ac',
            dragBackgroundColor: '#8497ac',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        {
            id: '3',
            name: '교육확정',
            backgroundColor: '#ffab18',
            dragBackgroundColor: '#ffab18',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        {
            id: '4',
            name: '보안검색 인증평가',
            backgroundColor: '#fbff02',
            dragBackgroundColor: '#fbff02',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        {
            id: '5',
            name: '항공경비 인증평가',
            backgroundColor: '#fbff02',
            dragBackgroundColor: '#fbff02',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        }
    ];

    const template = {
        titlePlaceholder() {
            return '회사명';
        },
        popupIsAllday() {
            return '일정사용여부';
        },
        locationPlaceholder() {
            return '내용';
        }
    };

    // APIs
    const [SelectMonthlyCalendarListApi] = useSelectMonthlyCalendarListMutation();

    const SelectMonthlyCalendarList_ApiCall = async () => {
        const SelectMonthlyCalendarListApiResponse = await SelectMonthlyCalendarListApi({});
        console.log(SelectMonthlyCalendarListApiResponse);
        setScheduleList([
            ...SelectMonthlyCalendarListApiResponse?.data?.RET_DATA.map((d, i) => ({
                id: d.seqId, // 일정시퀀스
                calendarId: d.calendarColorSet,
                category: 'allday',
                title: `${categoryOptions[d.category - 1].label} ${divisionOptions[d.division - 1].label} | ${d.eduOrder}차`,
                start: d.startDate, // 시작일
                end: d.endDate, // 종료일
                isAllday: true,
                raw: {}
            }))
        ]);
    };

    //캘린더 초기화 및 이벤트 등록
    const initCalendar = () => {
        const instance = calendarRef.current.getInstance();
        setCurrentCalendar({
            currentYear: dayjs(instance.getDate()).format('YYYY'),
            currentMonth: dayjs(instance.getDate()).format('MM')
        });
        if (!instance.fire('clearListeners') === undefined) {
            instance.destroy();
        }
        instance.off('selectDateTime');
        instance.off('clickEvent');
    };

    const moveToToday = () => {
        const instance = calendarRef.current.getInstance();
        instance.today();
        setCurrentCalendar({
            currentYear: dayjs(instance.getDate()).format('YYYY'),
            currentMonth: dayjs(instance.getDate()).format('MM')
        });
    };

    const moveToPrevMonth = () => {
        const instance = calendarRef.current.getInstance();
        instance.prev();
        setCurrentCalendar({
            currentYear: dayjs(instance.getDate()).format('YYYY'),
            currentMonth: dayjs(instance.getDate()).format('MM')
        });
    };

    const moveToNextMonth = () => {
        const instance = calendarRef.current.getInstance();
        instance.next();
        setCurrentCalendar({
            currentYear: dayjs(instance.getDate()).format('YYYY'),
            currentMonth: dayjs(instance.getDate()).format('MM')
        });
    };

    // 경비/검색 달력 표시 여부(개별표시)
    // const screenerVisibility = () => {
    //     const instance = calendarRef.current.getInstance();
    //     if (securityCheckVisibility) {
    //         instance.setCalendarVisibility('2', false); // 숨김
    //     } else {
    //         instance.setCalendarVisibility('2', true); // 보임
    //     }
    // };

    // const guardVisibility = () => {
    //     const instance = calendarRef.current.getInstance();
    //     if (securityGuardVisibility) {
    //         instance.setCalendarVisibility('1', false); // 숨김
    //     } else {
    //         instance.setCalendarVisibility('1', true); // 보임
    //     }
    // };

    const handleCancel = () => {
        setScheduleList([]);
        props.navigate === 0 ? setOpenYn(false) : navigate(props.navigate);
    };

    useEffect(() => {
        if (!openYn) return;
        setOpenYn(true);
        SelectMonthlyCalendarList_ApiCall();
        initCalendar();
    }, []);

    return (
        <>
            <Modal
                centered
                maskClosable={false}
                open={openYn}
                closable={true}
                width={'60%'}
                style={{
                    height: 'auto',
                    margin: 0,
                    padding: 0
                }}
                className={'CalendarModals schedule-monthly'}
                zIndex={1200}
                footer={
                    <>
                        <Row gutter={(24, 24)} align={'center'} style={{ marginBottom: '20px' }}>
                            <Col
                                xl={6}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                <span style={{ width: '60%', height: '30%', backgroundColor: '#8497ac', display: 'inline' }}></span>
                                <span style={{ width: '60%', textAlign: 'center', color: '#000000', display: 'inline' }}>교육예정</span>
                            </Col>
                            <Col
                                xl={6}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                <span style={{ width: '60%', height: '30%', backgroundColor: '#ffab18', display: 'inline' }}></span>
                                <span style={{ width: '60%', textAlign: 'center', color: '#000000', display: 'inline' }}>교육확정</span>
                            </Col>
                            <Col
                                xl={6}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                <span style={{ width: '60%', height: '30%', backgroundColor: '#fbff02', display: 'inline' }}></span>
                                <span style={{ width: '60%', textAlign: 'center', color: '#000000', display: 'inline' }}>인증평가</span>
                            </Col>
                        </Row>
                        <Row gutter={(24, 24)} align={'center'}>
                            <Col xl={14}>
                                <h5 style={{ textAlign: 'center', color: 'red' }}>
                                    * 일정조정 및 주말포함 교육은 담당자(TEL: 02-2039-6933)에게 문의하시기 바랍니다.
                                </h5>
                            </Col>
                            <Col
                                xs={20}
                                sm={20}
                                md={20}
                                lg={20}
                                xl={{ span: 10 }}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                <h5 style={{ textAlign: 'center', color: 'red' }}>* 본 일정은 변동될 수 있습니다.</h5>
                            </Col>
                        </Row>
                    </>
                }
                onCancel={handleCancel}
                getContainer={() => document.body}
            >
                <Row gutter={(24, 24)} align={'center'}>
                    <Col
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={{ span: 8 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            alignContent: 'center',
                            gap: '5%',
                            margin: 0
                        }}
                    >
                        <Button
                            onClick={moveToPrevMonth}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                            type="success"
                            icon={<LeftOutlined />}
                        >
                            <span>이전달</span>
                        </Button>
                        <Button
                            onClick={moveToNextMonth}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                            type="success"
                        >
                            <span>다음달</span>
                            <RightOutlined />
                        </Button>
                        <Button
                            onClick={moveToToday}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                            type="success"
                        >
                            <span>Today</span>
                        </Button>
                    </Col>
                    {/* 날짜 */}
                    <Col
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={{ span: 6 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignContent: 'center',
                            margin: 0
                        }}
                    >
                        <span style={{ fontSize: '30px' }}>{`${currentCalendar?.currentYear}년 ${currentCalendar?.currentMonth}월`}</span>
                    </Col>
                    <Col
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={{ span: 8 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            alignContent: 'center',
                            gap: '5%',
                            margin: 0
                        }}
                    >
                        {/* <Button
                            onClick={(e) => {
                                setSecurityCheckVisibility((prev) => {
                                    return !prev;
                                });
                                screenerVisibility();
                                e.preventDefault();
                            }}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                            type="success"
                            icon={securityCheckVisibility ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        >
                            보안검색
                        </Button>
                        <Button
                            onClick={(e) => {
                                setSecurityGuardVisibility((prev) => {
                                    return !prev;
                                });
                                guardVisibility();
                            }}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                            type="success"
                            icon={securityGuardVisibility ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        >
                            보안경비
                        </Button> */}
                    </Col>
                </Row>
                <Calendar
                    ref={calendarRef}
                    height={'700px'}
                    view={'month'}
                    events={scheduleList}
                    template={template}
                    theme={theme}
                    calendars={calendarAttribute}
                    gridSelection={{ enableDbClick: false, enableClick: false }}
                ></Calendar>
            </Modal>
        </>
    );
};
