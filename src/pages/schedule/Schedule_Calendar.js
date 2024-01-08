import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Modal, Col, Row, Button, Typography, Card, Input, Form, Divider, DatePicker, Select, Switch, Radio } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

import {
    useSelectCalendarListMutation,
    useSelectCalendarMutation,
    useInsertCalendarMutation,
    useUpdateCalendarMutation,
    useDeleteCalendarMutation
} from '../../hooks/api/ScheduleManagement/ScheduleManagement';

import { useUserStatus } from '../../hooks/core/UserStatus';
import { useUserId } from '../../hooks/core/UserId';

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// assets
import { EyeOutlined, EyeInvisibleOutlined, PoweroffOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Drawer, Layout, Space } from '../../../node_modules/antd/lib/index';

import './Style.css';
import { setConstantValue } from '../../../node_modules/typescript/lib/typescript';

export const Schedule_Calendar = (props) => {
    //form 설정
    const [form] = Form.useForm();
    const categoryRef = useRef(null); // 과정명
    const divisionRef = useRef(null); // 교육구분
    const studentCntRef = useRef(null); //교육생 수
    const applyStudentCntRef = useRef(null);
    const titleRef = useRef(null); // 제목
    const managerRef = useRef(null); // 담당자명
    const contentsRef = useRef(null); // 메모(내용)
    const deadlineYnRef = useRef(null);

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
            label: '보안검색 감독자',
            value: '3'
        },
        {
            label: '항공경비 감독자',
            value: '4'
        },
        {
            label: '항공보안 책임/감독자',
            value: '5'
        },
        {
            label: '항공사 보안책임/감독자',
            value: '6'
        },
        {
            label: '행동탐지요원',
            value: '7'
        }
    ];

    const [divisionOptions, setDivisionOptions] = useState([
        {
            label: '초기',
            value: '1'
        },
        {
            label: '정기',
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
    ]);

    const [readOnlyDivisionOptions, setReadOnlyDivisionOptions] = useState([
        {
            label: '초기',
            value: '1'
        },
        {
            label: '정기',
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
    ]);

    //dayjs 설정
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    //사용자정보
    const isLoggedIn = useUserStatus();
    const userId = useUserId();

    //페이지 이동
    const navigate = useNavigate();

    //tui-calendar
    const calendarRef = useRef();

    const calendarAttribute = [
        {
            id: '0',
            name: '신청불가',
            backgroundColor: 'inherit',
            dragBackgroundColor: 'inherit',
            borderColor: 'inherit',
            customStyle: {
                display: 'none'
            }
        },
        {
            id: '1', //calendarId와 일치해야 함
            name: '항공경비요원',
            backgroundColor: '#4868F7', //항공경비요원 인증서 색 (원색 #2C452F)
            dragBackgroundColor: '#4868F7',
            borderColor: '#FFFFFF',
            color: '#FFFFFF'
        },
        {
            id: '2', //calendarId와 일치해야 함
            name: '보안검색요원',
            backgroundColor: '#7EC486', //보안검색요원 인증서 색 (원색 #233277)
            dragBackgroundColor: '#7EC486',
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

    //메인 모달 닫기
    const [openYn, setOpenYn] = useState(true);
    //일정 달력
    const [scheduleList, setScheduleList] = useState([]); // 일정 리스트
    const [currentCalendar, setCurrentCalendar] = useState({}); // 현재 달력 정보(YYYY-MM)
    const [calendarInstance, setCalendarInstance] = useState(null);

    //일정 표출
    const [securityGuardVisibility, setSecurityGuardVisibility] = useState(true); // 경비
    const [securityCheckVisibility, setSecurityCheckVisibility] = useState(true); // 검색

    //data
    const [itemContainer, setItemContainer] = useState({});

    //우측 폼
    const [isEdit, setIsEdit] = useState(false);
    const [isView, setIsView] = useState(false);
    const [open, setOpen] = useState(false);
    const [deadlineYn, setDeadlineYn] = useState(false);

    //상세보기 모달
    const [openScheduleViewModal, setOpenScheduleViewModal] = useState(false);

    //--------------일정 전체 조회----------------
    const [SelectCalendarListApi] = useSelectCalendarListMutation(); // 일정 전체 조회

    //일정 리스트 받아오기
    const SelectCalendarList_ApiCall = async () => {
        const SelectCalendarListApiResponse = await SelectCalendarListApi({});
        setScheduleList([
            ...SelectCalendarListApiResponse?.data?.RET_DATA.map((d, i) => ({
                id: d.seqId, // 일정시퀀스
                category: 'allday',
                calendarId: d.deadlineYn === 'Y' && userId != 'kssa' && !isLoggedIn ? '0' : d.category,
                userId: d.userId, // userId
                body: d.contents, // 카테고리
                title: `${categoryOptions[d.category - 1]?.label} ${readOnlyDivisionOptions[d.division - 1]?.label} ${
                    userId === 'kssa'
                        ? d?.deadlineYn === 'N'
                            ? `신청가능 ${60 - d?.studentCnt}명 / 60명`
                            : `신청불가 ${60 - d?.studentCnt}명 / 60명`
                        : ''
                }`,
                contents: d.contents, // 내용
                attendees: [d.studentCnt],
                start: d.eduStartDate, // 시작일
                end: d.eduEndDate, // 종료일
                isAllday: true,
                isVisible: d.deadlineYn === 'Y' && !isLoggedIn ? false : userId === 'kssa' ? true : true,
                raw: {
                    seqId: d.seqId, // 일정시퀀스
                    userId: d.userId, // userId
                    category: d.category, // 교육 과정
                    division: d.division, // 교육 구분
                    studentCnt: d.studentCnt, // 신청 교육생 수
                    applyStudentCnt: d.applyStudentCnt, // 최대 신청 가능 교육생 수
                    title: d.title, // 제목
                    contents: d.contents, //내용
                    company: d.company, // 회사명
                    manager: d.manager, // 담당자
                    eduStartDate: d.eduStartDate, // 시작일
                    eduEndDate: d.eduEndDate, // 종료일
                    insertId: d.insertId, // 등록자
                    insertDate: d.insertDate, // 등록일
                    updateId: d.updateId, // 수정자
                    updateDate: d.updateDate, // 수정일
                    deadlineYn: d.deadlineYn // 일정마감여부
                }
            }))
        ]);
    };

    //일정 등록 API
    const [InsertCalendarApi] = useInsertCalendarMutation();

    /**
     * 일정 등록 API 호출
     */
    const InsertCalendar_ApiCall = async () => {
        const data = { ...itemContainer, insertId: userId, applyStudentCnt: `${60 - itemContainer.studentCnt}` };
        const InsertCalendarApiResponse = await InsertCalendarApi(data);
        InsertCalendarApiResponse?.data?.RET_CODE === '0100'
            ? Modal.success({
                  content: '등록 완료',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {
                      form.resetFields();
                      setItemContainer({});
                      SelectCalendarList_ApiCall();
                  }
              })
            : Modal.error({
                  content: '등록 오류',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {}
              });
    };

    const Register_Process = () => {
        if (itemContainer?.category === null || itemContainer?.category === '') {
            Modal.error({
                content: '교육과정을 선택해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        }
        if (itemContainer?.division === null) {
            Modal.error({
                content: '교육구분을 선택해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        }
        if (itemContainer?.eduStartDate === null) {
            Modal.error({
                content: '교육시작일을 선택해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        }
        if (itemContainer?.eduEndDate === null) {
            Modal.error({
                content: '교육종료일을 선택해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        }
        if (itemContainer?.studentCnt === null) {
            Modal.error({
                content: '수강할 교육생 수를 선택해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        } else if (itemContainer?.studentCnt < 10 && itemContainer?.applyStudentCnt < 20) {
            Modal.error({
                content: '교육생은 최소 10명 이상 신청해야합니다.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {
                    return;
                }
            });
        }
        if (itemContainer?.title === null) {
            Modal.error({
                content: '회사명을 입력해주세요.',
                style: { top: 320 },
                zIndex: 1600,
                onOk() {}
            });
        }
        InsertCalendar_ApiCall();
    };

    //일정 수정 API
    const [UpdateCalendarApi] = useUpdateCalendarMutation();

    /**
     * 일정 수정 API 호출
     */
    const UpdateCalendar_ApiCall = async () => {
        const data = { ...itemContainer, updateId: userId, applyStudentCnt: `${60 - itemContainer.studentCnt}` };
        const UpdateCalendarApiResponse = await UpdateCalendarApi(data);

        UpdateCalendarApiResponse?.data?.RET_CODE === '0100'
            ? Modal.success({
                  content: '수정 완료',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {
                      form.resetFields();
                      setItemContainer({});
                      SelectCalendarList_ApiCall();
                  }
              })
            : Modal.error({
                  content: '수정 오류',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {}
              });
    };

    //일정 삭제 API
    const [DeleteCalendarApi] = useDeleteCalendarMutation();

    /**
     * 일정 삭제 API
     */
    const DeleteCalendar_ApiCall = async (seqId) => {
        const DeleteCalendarApiResponse = await DeleteCalendarApi({
            seqIdList: [parseInt(seqId)]
        });

        DeleteCalendarApiResponse?.data?.RET_CODE === '0300'
            ? Modal.success({
                  content: '삭제 완료',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {
                      form.resetFields();
                      setItemContainer({});
                      SelectCalendarList_ApiCall();
                  }
              })
            : Modal.error({
                  content: '삭제 오류',
                  style: { top: 320 },
                  zIndex: 1600,
                  onOk() {
                      form.resetFields();
                      setItemContainer({});
                  }
              });
    };

    const popupType_Mo = () => {
        setIsView(true);
        setIsEdit(true);
        setOpen(true);
    };

    //상세보기/저장/갱신 모달 닫기
    const handleCancel = () => {
        form.resetFields();
        setItemContainer({});
        setOpenScheduleViewModal(false);
        setOpen(false);
        setIsEdit(false);
        setIsView(false);
    };

    //캘린더 초기화 및 이벤트 등록
    const initCalendar = () => {
        const instance = calendarRef.current.getInstance();
        setCalendarInstance(instance);
        setCurrentCalendar({
            currentYear: dayjs(instance.getDate()).format('YYYY'),
            currentMonth: dayjs(instance.getDate()).format('MM')
        });
        if (!instance.fire('clearListeners') === undefined) {
            instance.destroy();
        }
        instance.on('clickEvent', (event) => {
            if (Object.keys(itemContainer).length > 0) setItemContainer({});
            console.log('itemContainer-before: ', event?.event?.raw);
            setItemContainer(event?.event?.raw);
            setOpenScheduleViewModal(true);
        });
    };

    const moveToToday = () => {
        calendarInstance.today();
        setCurrentCalendar({
            currentYear: dayjs(calendarInstance.getDate()).format('YYYY'),
            currentMonth: dayjs(calendarInstance.getDate()).format('MM')
        });
    };

    const moveToPrevMonth = () => {
        calendarInstance.prev();
        setCurrentCalendar({
            currentYear: dayjs(calendarInstance.getDate()).format('YYYY'),
            currentMonth: dayjs(calendarInstance.getDate()).format('MM')
        });
    };

    const moveToNextMonth = () => {
        calendarInstance.next();
        setCurrentCalendar({
            currentYear: dayjs(calendarInstance.getDate()).format('YYYY'),
            currentMonth: dayjs(calendarInstance.getDate()).format('MM')
        });
    };

    const moveToPrevYear = () => {
        calendarInstance.move(-12);
        setCurrentCalendar({
            currentYear: dayjs(calendarInstance.getDate()).format('YYYY'),
            currentMonth: dayjs(calendarInstance.getDate()).format('MM')
        });
    };

    const moveToNextYear = () => {
        calendarInstance.move(12);
        setCurrentCalendar({
            currentYear: dayjs(calendarInstance.getDate()).format('YYYY'),
            currentMonth: dayjs(calendarInstance.getDate()).format('MM')
        });
    };

    // 경비/검색 달력 표시 여부(개별표시)
    const screenerVisibility = () => {
        if (securityCheckVisibility) {
            calendarInstance.setCalendarVisibility('1', false); // 숨김
        } else {
            calendarInstance.setCalendarVisibility('1', true); // 보임
        }
    };

    //항공경비표시여부
    const guardVisibility = () => {
        if (securityGuardVisibility) {
            calendarInstance.setCalendarVisibility('2', false); // 숨김
        } else {
            calendarInstance.setCalendarVisibility('2', true); // 보임
        }
    };

    const changeDivision = (category) => {
        const changes = [];
        switch (category) {
            case '1':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
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
                );
                break;
            case '2':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '인증평가',
                        value: '3'
                    },
                    {
                        label: '재교육',
                        value: '4'
                    }
                );
                break;
            case '3':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
                        value: '2'
                    }
                );
                break;
            case '4':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
                        value: '2'
                    }
                );
                break;
            case '5':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
                        value: '2'
                    }
                );
                break;
            case '6':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
                        value: '2'
                    }
                );
                break;
            case '7':
                changes.push(
                    {
                        label: '초기',
                        value: '1'
                    },
                    {
                        label: '정기',
                        value: '2'
                    }
                );
                break;

            default:
                break;
        }
        setDivisionOptions(changes);
    };

    //캘린더 모달 닫기
    //todo:disable-eslint
    const handleMainCancel = () => {
        setScheduleList([]);
        props.navigate === 0 ? setOpenYn(false) : navigate(props.navigate);
    };

    useEffect(() => {
        SelectCalendarList_ApiCall();
        initCalendar();
    }, []);

    return (
        <>
            <Modal
                maskClosable={false}
                open={openYn}
                closable={true}
                width={'60%'}
                style={{
                    height: 'auto',
                    margin: 0,
                    padding: 0,
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'
                }}
                className={'CalendarModals'}
                zIndex={1200}
                footer={
                    <Row gutter={(24, 24)} align={'center'}>
                        <Col xl={14}>
                            <h5 style={{ margin: '10px 0px 10px 0px', textAlign: 'center', color: 'red' }}>
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
                                justifyContent: 'flex-end',
                                alignContent: 'center',
                                margin: 0,
                                padding: 0
                            }}
                        >
                            <Button
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
                            </Button>
                            {isLoggedIn && userId === 'kssa' ? (
                                <Button
                                    onClick={() => {
                                        form.resetFields();
                                        setItemContainer({});
                                        setIsEdit(true);
                                        setOpen(true);
                                    }}
                                    style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                                    type="success"
                                    icon={<PlusOutlined />}
                                >
                                    추가
                                </Button>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                }
                onCancel={handleMainCancel}
                getContainer={() => document.body}
            >
                <Row gutter={(24, 24)} align={'center'}>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={{ span: 24 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignContent: 'center',
                            margin: 0
                        }}
                    >
                        <span style={{ fontSize: '36px', fontWeight: 'bold' }}>월간교육계획표</span>
                    </Col>
                </Row>
                <Divider style={{ margin: '10px 0' }} />
                <Row gutter={(24, 24)} align={'center'} gap="5%">
                    <Col
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={{ span: 6 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end',
                            alignContent: 'center',
                            gap: '5%',
                            margin: 0
                        }}
                    >
                        {/* <Space
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                alignContent: 'center',
                                marginBottom: '5px',
                                marginRight: '20px'
                            }}
                        ></Space> */}
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
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={{ span: 10 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            margin: 0,
                            gap: '2%'
                        }}
                    >
                        <Button
                            onClick={moveToPrevYear}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '34px' }}
                            type="success"
                        >
                            <LeftOutlined style={{ fontSize: '11px' }} />
                            <LeftOutlined style={{ fontSize: '11px' }} />
                        </Button>
                        <Button
                            onClick={moveToPrevMonth}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '34px' }}
                            type="success"
                        >
                            <LeftOutlined style={{ fontSize: '11px' }} />
                        </Button>
                        <span style={{ fontSize: '30px' }}>{`${currentCalendar?.currentYear}년 ${currentCalendar?.currentMonth}월`}</span>
                        <Button
                            onClick={moveToNextMonth}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '34px' }}
                            type="success"
                        >
                            <RightOutlined style={{ fontSize: '11px' }} />
                        </Button>
                        <Button
                            onClick={moveToNextYear}
                            style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '34px' }}
                            type="success"
                        >
                            <RightOutlined style={{ fontSize: '11px' }} />
                            <RightOutlined style={{ fontSize: '11px' }} />
                        </Button>
                    </Col>
                    <Col
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={{ span: 6 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            alignContent: 'center',
                            gap: '5%',
                            margin: 0
                        }}
                    >
                        {/* {isLoggedIn && userId === 'kssa' ? (
                            <Button
                                onClick={() => {
                                    setItemContainer({});
                                    setIsEdit(true);
                                    setOpen(true);
                                }}
                                style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                                type="success"
                                icon={<PlusOutlined />}
                            >
                                추가
                            </Button>
                        ) : (
                            ''
                        )} */}
                    </Col>
                </Row>
                <Calendar
                    ref={calendarRef}
                    height={'600px'}
                    view={'month'}
                    events={scheduleList}
                    template={template}
                    theme={theme}
                    calendars={calendarAttribute}
                ></Calendar>
            </Modal>
            <Drawer
                maskClosable={false}
                title={`${isEdit && isView && open ? '교육일정 수정' : ''}
                ${!isEdit && isView && open ? '교육일정 조회' : ''}
                ${isEdit && !isView && open ? '교육일정 등록' : ''}`}
                onClose={handleCancel}
                open={open}
                width={700}
                zIndex={1400}
                extra={
                    <>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px',
                                            boxShadow: '2px 3px 0px 0px #dbdbdb',
                                            height: '46px',
                                            lineHehgit: '46px',
                                            lineHeight: '36px'
                                        }}
                                        type="danger"
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </Button>
                                    {/* 수정 */}
                                    {isEdit && isView && open ? (
                                        <Button
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                borderRadius: '5px',
                                                boxShadow: '2px 3px 0px 0px #dbdbdb',
                                                height: '46px',
                                                lineHehgit: '46px',
                                                lineHeight: '36px'
                                            }}
                                            type="primary"
                                            onClick={() => {
                                                setItemContainer({ ...itemContainer, updateId: userId });
                                                UpdateCalendar_ApiCall();
                                                handleCancel();
                                                form.resetFields();
                                            }}
                                        >
                                            신청
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                    {/* 등록 */}
                                    {isEdit && !isView && open ? (
                                        <Button
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                borderRadius: '5px',
                                                boxShadow: '2px 3px 0px 0px #dbdbdb',
                                                height: '46px',
                                                lineHehgit: '46px',
                                                lineHeight: '36px'
                                            }}
                                            type="primary"
                                            onClick={() => {
                                                Register_Process();
                                                form.resetFields();
                                                handleCancel();
                                            }}
                                        >
                                            추가
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </Space>
                            </Col>
                        </Row>
                    </>
                }
            >
                <Card size="small" bordered={false} style={{ width: '100%', height: 'auto', overflow: 'auto' }}>
                    <Card
                        type="inner"
                        title={
                            <>
                                <Row justify="space-between" gutter={24}>
                                    <Col>
                                        <h2 style={{ margin: '10px 0px 10px 0px', textAlign: 'center', color: '#0e276c' }}>
                                            {isEdit && isView && open ? '교육일정 수정' : ''}
                                            {!isEdit && isView && open ? '교육일정 조회' : ''}
                                            {isEdit && !isView && open ? '교육일정 등록' : ''}
                                        </h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5 style={{ margin: '10px 0px 10px 0px', textAlign: 'center', color: 'red' }}>
                                            {(isEdit && isView && open) || (isEdit && !isView && open)
                                                ? '* 신청 교육생 수가 미달될 경우, 강의가 취소될 수 있습니다.'
                                                : ''}
                                        </h5>
                                    </Col>
                                </Row>
                            </>
                        }
                    >
                        <Form layout="vertical" form={form} autoComplete="off">
                            <Divider style={{ margin: '10px 0' }} />
                            <Row gutter={24}>
                                <Col xs={{ span: 12 }}>
                                    <Form.Item
                                        name="form01"
                                        label="교육과정 선택"
                                        rules={[
                                            {
                                                required: true,
                                                message: '교육과정 선택'
                                            }
                                        ]}
                                        initialValues={itemContainer?.category}
                                    >
                                        <Select
                                            ref={categoryRef}
                                            mode="default"
                                            name="category"
                                            placeholder="# 교육과정"
                                            onSelect={(e) => {
                                                changeDivision(e);
                                                setItemContainer({ ...itemContainer, category: e });
                                            }}
                                            defaultValue={{
                                                ...categoryOptions[itemContainer?.category - 1]
                                            }}
                                            value={`${itemContainer?.category - 1}`}
                                            className="registerSelectbox"
                                            options={categoryOptions}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 12 }}>
                                    <Form.Item
                                        name="form02"
                                        label="교육구분 선택"
                                        rules={[
                                            {
                                                required: true,
                                                message: '교육구분 선택'
                                            }
                                        ]}
                                        initialValues={itemContainer?.division}
                                    >
                                        {/* ref={divisionRef} */}
                                        <Select
                                            name="division"
                                            mode="default"
                                            placeholder="# 교육구분"
                                            onSelect={(e) => setItemContainer({ ...itemContainer, division: e })}
                                            defaultValue={{
                                                ...divisionOptions[itemContainer?.division - 1]
                                            }}
                                            value={`${itemContainer?.division - 1}`}
                                            className="registerSelectbox"
                                            options={divisionOptions}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col xs={{ span: 12 }}>
                                    <DatePicker
                                        name="eduStartDate"
                                        onChange={(date) => {
                                            setItemContainer({ ...itemContainer, eduStartDate: dayjs(date).format('YYYY-MM-DD') });
                                        }}
                                        placeholder="교육시작일"
                                        style={{
                                            width: '100%',
                                            zIndex: 1700
                                        }}
                                        popupClassName="edu-date-picker-popup"
                                        value={itemContainer?.eduStartDate ? dayjs(itemContainer.eduStartDate) : dayjs(new Date())}
                                    />
                                    {/* <Form.Item
                                        name="form03"
                                        label="교육시작일"
                                        rules={[
                                            {
                                                required: true,
                                                message: '교육시작일'
                                            }
                                        ]}
                                        initialValues={itemContainer?.eduStartDate}
                                    >
                                        
                                    </Form.Item> */}
                                </Col>
                                <Col xs={{ span: 12 }}>
                                    <DatePicker
                                        name="eduEndDate"
                                        onChange={(date) => {
                                            setItemContainer({ ...itemContainer, eduEndDate: dayjs(date).format('YYYY-MM-DD') });
                                        }}
                                        placeholder="교육종료일"
                                        style={{
                                            width: '100%'
                                        }}
                                        popupClassName="edu-date-picker-popup"
                                        value={itemContainer?.eduEndDate ? dayjs(itemContainer.eduEndDate) : dayjs(new Date())}
                                    />
                                    {/* <Form.Item
                                        name="form04"
                                        label="교육종료일"
                                        rules={[
                                            {
                                                required: true,
                                                message: '교육종료일'
                                            }
                                        ]}
                                        initialValues={itemContainer?.eduEndDate}
                                    >
                                        
                                    </Form.Item> */}
                                </Col>
                            </Row>
                            <Divider style={{ margin: '10px 0' }} />
                            <Row gutter={24}>
                                <Col xs={12}>
                                    <Form.Item
                                        name="form05"
                                        label="교육인원"
                                        rules={[
                                            {
                                                required: true,
                                                message: '교육 인원 선택'
                                            }
                                        ]}
                                        initialValues={itemContainer?.studentCnt}
                                    >
                                        <Input
                                            ref={studentCntRef}
                                            style={{
                                                width: '100%'
                                            }}
                                            name="studentCnt"
                                            placeholder="# 교육 인원 선택"
                                            onChange={(e) => setItemContainer({ ...itemContainer, studentCnt: e.target.value })}
                                            defaultValue={itemContainer?.studentCnt}
                                            value={itemContainer?.studentCnt}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item
                                        name="form06"
                                        label="수강 가능 최대 인원"
                                        rules={[
                                            {
                                                required: false,
                                                message: '수강 가능 최대 인원'
                                            }
                                        ]}
                                    >
                                        {isNaN(60 - itemContainer?.studentCnt) ? 60 : 60 - itemContainer?.studentCnt}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider style={{ margin: '10px 0' }} />

                            <Row gutter={24}>
                                <Col xs={12}>
                                    <Form.Item
                                        name="form07"
                                        label="회사명"
                                        rules={[
                                            {
                                                required: true,
                                                message: '회사명 입력'
                                            }
                                        ]}
                                        initialValues={itemContainer?.title}
                                    >
                                        <Input
                                            ref={titleRef}
                                            style={{
                                                width: '100%'
                                            }}
                                            name="title"
                                            placeholder="# 회사명"
                                            onChange={(e) => setItemContainer({ ...itemContainer, title: e.target.value })}
                                            defaultValue={itemContainer?.title}
                                            value={itemContainer?.title}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item
                                        name="form08"
                                        label="담당자명"
                                        rules={[
                                            {
                                                required: true,
                                                message: '담당자명 입력'
                                            }
                                        ]}
                                        initialValues={itemContainer?.manager}
                                    >
                                        <Input
                                            ref={managerRef}
                                            style={{
                                                width: '100%'
                                            }}
                                            name="manager"
                                            placeholder="# 담당자명"
                                            onChange={(e) => setItemContainer({ ...itemContainer, manager: e.target.value })}
                                            defaultValue={itemContainer?.manager}
                                            value={itemContainer?.manager}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider style={{ margin: '10px 0' }} />
                            <Form.Item
                                name="form09"
                                label="메모"
                                rules={[
                                    {
                                        required: true,
                                        message: '메모 입력'
                                    }
                                ]}
                                valuePropName={'date'}
                                initialValues={itemContainer?.contents}
                            >
                                <Row gutter={24}>
                                    <Col xs={24}>
                                        <Input
                                            ref={contentsRef}
                                            style={{
                                                width: '100%'
                                            }}
                                            name="contents"
                                            placeholder="# 메모 입력"
                                            onChange={(e) => setItemContainer({ ...itemContainer, contents: e.target.value })}
                                            value={itemContainer?.contents}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Divider style={{ margin: '10px 0' }} />
                            {userId === 'kssa' ? (
                                <Form.Item
                                    label="일정마감여부"
                                    rules={[
                                        {
                                            required: true,
                                            message: '마감여부선택'
                                        }
                                    ]}
                                    valuePropName={'date'}
                                    initialValues={itemContainer?.deadlineYn}
                                >
                                    <Row gutter={24}>
                                        <Col xs={24}>
                                            <Radio.Group
                                                ref={deadlineYnRef}
                                                onChange={(e) => setItemContainer({ ...itemContainer, deadlineYn: e.target.value })}
                                                defaultValue={`${itemContainer?.deadlineYn}`}
                                                value={`${itemContainer?.deadlineYn}`}
                                                buttonStyle="solid"
                                            >
                                                <Radio.Button value="N">신청가능</Radio.Button>
                                                <Radio.Button value="Y">마감확정</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            ) : (
                                ''
                            )}
                        </Form>
                    </Card>
                </Card>
            </Drawer>
            {/* 일정 상세 조회 모달(조회만 가능) */}
            <Modal
                open={openScheduleViewModal}
                style={{ top: 320, transform: 'translateY(-50%)' }}
                width={'50%'}
                zIndex={1500}
                className={'schedule-modal create-schedule'}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                okText={'등록'}
                cancelText={'취소'}
                onCancel={handleCancel}
                onClose={handleCancel}
                footer={
                    <Row gutter={24}>
                        <Col span={24}>
                            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        borderRadius: '5px',
                                        boxShadow: '2px 3px 0px 0px #dbdbdb',
                                        height: '46px',
                                        lineHehgit: '46px',
                                        lineHeight: '36px'
                                    }}
                                    type="danger"
                                    onClick={() => {
                                        setOpenScheduleViewModal(false);
                                    }}
                                >
                                    취소
                                </Button>
                                {itemContainer?.updateId === userId || itemContainer?.updateId === null || userId === 'kssa' ? (
                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px',
                                            boxShadow: '2px 3px 0px 0px #dbdbdb',
                                            height: '46px',
                                            lineHehgit: '46px',
                                            lineHeight: '36px'
                                        }}
                                        type="primary"
                                        onClick={() => {
                                            form.resetFields();
                                            setOpenScheduleViewModal(false);
                                            popupType_Mo();
                                        }}
                                    >
                                        신청
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {userId === 'kssa' ? (
                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px',
                                            boxShadow: '2px 3px 0px 0px #dbdbdb',
                                            height: '46px',
                                            lineHehgit: '46px',
                                            lineHeight: '36px'
                                        }}
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            Modal.confirm({
                                                content: '삭제하시겠습니까?',
                                                style: { top: 320 },
                                                zIndex: 1500,
                                                onOk() {
                                                    form.resetFields();
                                                    DeleteCalendar_ApiCall(itemContainer?.seqId);
                                                    handleCancel();
                                                },
                                                onCancel() {
                                                    return;
                                                },
                                                okText: '삭제',
                                                cancelText: '취소'
                                            });
                                        }}
                                    >
                                        삭제
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </Space>
                        </Col>
                    </Row>
                }
            >
                <Card size="small" bordered={false} style={{ width: '100%', height: 'auto', overflow: 'auto' }}>
                    <Card
                        type="inner"
                        title={
                            <>
                                <Row justify="space-between">
                                    <Col>
                                        <h2 style={{ margin: '10px 0px 10px 0px', textAlign: 'center', color: '#0e276c' }}>교육일정</h2>
                                    </Col>
                                </Row>
                            </>
                        }
                    >
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={24}>
                            <Col xs={{ span: 12 }}>{`교육과정 : ${
                                itemContainer?.category ? categoryOptions[itemContainer?.category - 1]?.label : ''
                            }`}</Col>
                            <Col xs={{ span: 12 }}>{`교육구분 : ${
                                itemContainer?.division ? readOnlyDivisionOptions[itemContainer?.division - 1]?.label : ''
                            }`}</Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={{ span: 12 }}>
                                {`교육시작일 : ${
                                    itemContainer?.eduStartDate
                                        ? dayjs(itemContainer.eduStartDate).format('YYYY-MM-DD')
                                        : dayjs(new Date()).format('YYYY-MM_DD')
                                }`}
                            </Col>
                            <Col xs={{ span: 12 }}>
                                {`교육종료일 : ${
                                    itemContainer?.eduEndDate
                                        ? dayjs(itemContainer.eduEndDate).format('YYYY-MM-DD')
                                        : dayjs(new Date()).format('YYYY-MM_DD')
                                }`}
                            </Col>
                        </Row>
                        <Divider style={{ margin: '10px 0' }} />
                        {userId === 'kssa' ? (
                            <>
                                <Row gutter={24}>
                                    {/* <Col xs={12}>{`정원 : ${itemContainer?.studentCnt ? itemContainer?.studentCnt : '알 수 없음'}`}</Col> */}
                                    <Col xs={12}>{`신청 가능 인원 : ${
                                        itemContainer?.applyStudentCnt || itemContainer?.applyStudentCnt === 0
                                            ? itemContainer?.applyStudentCnt
                                            : '알 수 없음'
                                    }`}</Col>
                                </Row>
                                <Divider style={{ margin: '10px 0' }} />
                                <Row gutter={24}>
                                    <Col xs={12}>{`회사명 : ${itemContainer?.title ? itemContainer?.title : ''}`}</Col>
                                    <Col xs={12}>{`회사명 : ${itemContainer?.manager ? itemContainer?.manager : ''}`}</Col>
                                </Row>
                                <Divider style={{ margin: '10px 0' }} />
                                <Row gutter={24}>
                                    <Col xs={24}>{`메모: ${itemContainer?.contents}`}</Col>
                                </Row>
                                <Divider style={{ margin: '10px 0' }} />
                            </>
                        ) : (
                            ''
                        )}
                    </Card>
                </Card>
            </Modal>
        </>
    );
};
