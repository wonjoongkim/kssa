/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Typography, Input, Space, Table, Tooltip, Modal } from 'antd';
import {
    CaretRightOutlined,
    BlockOutlined,
    SearchOutlined,
    FileDoneOutlined,
    FilePdfOutlined,
    PlusOutlined,
    EditFilled,
    DeleteFilled,
    ExclamationCircleFilled
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { useNavigate } from 'react-router-dom';
import '../../Style.css';

import { LawsRegister } from 'pages/reference/lawsRegister';
import { LawsModify } from 'pages/reference/lawsModify';
import { LawsView } from 'pages/reference/lawsView';

// 관련법령 리스트, 상세조회, 등록, 수정, 삭제
import {
    useSelectReferenceRoomListMutation,
    useDeleteReferenceRoomMutation
} from '../../hooks/api/ReferenceManagement/ReferenceManagement';
import { useUserStatus } from '../../hooks/core/UserStatus';

const { Title } = Typography;
const { Sider, Content } = Layout;

export const Reference_Laws = () => {
    const currentDateTime = new Date();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    const { confirm } = Modal;
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('laws');
    const [loading, setLoading] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //셀렉트 박스 option Selected 값
    const isLoggedIn = useUserStatus();
    const [seqIdValue, setSeqIdValue] = useState(null); // Notice 시퀀스 아이디
    const [ModalOpenRe, setModalOpenRe] = useState(false); // Notice 추가 Modal창
    const [ModalOpenMo, setModalOpenMo] = useState(false); // Notice 수정 Modal창
    const [ModalOpenVi, setModalOpenVi] = useState(false); // Notice 상세 Modal창

    // 관련법령 리스트
    const [SelectReferenceRoomListApi] = useSelectReferenceRoomListMutation();
    const [SelectReferenceRoomListData, setSelectReferenceRoomListData] = useState([]);
    const SelectReferenceRoomList_ApiCall = async () => {
        const SelectReferenceRoomListResponse = await SelectReferenceRoomListApi({
            path: 'laws'
        });
        setSelectReferenceRoomListData([
            ...SelectReferenceRoomListResponse?.data?.RET_DATA.map((d, i) => ({
                key: d.seqId,
                rowdata0: i + 1, // 일련번호
                rowdata1: d.seqId, // 시퀀스
                rowdata2: d.title, // 제목
                rowdata3: d.contents, // 내용
                rowdata4: d.hit, // 조회수
                rowdata5: d.insertId, // 등록자 아이디
                rowdata6: d.insertDate, // 등록일자
                rowdata7: d.updateId, // 수정자 아이디
                rowdata8: d.userName, // 등록자
                rowdata9: d.updateDate, // 수정일자
                rowdata10: d.searchTxt, // 검색내용
                rowdata11: d.attachFileId, // 등록파일 아이디
                rowdata12: d.fileList // 파일 리스트
            }))
        ]);
        setLoading(false);
    };

    // 관련법령 삭제
    const [DeleteReferenceRoomApi] = useDeleteReferenceRoomMutation();
    const [DeleteReferenceRoomData, setDeleteReferenceRoomData] = useState([]);
    const DeleteReferenceRoom_ApiCall = async () => {
        const DeleteReferenceRoomResponse = await DeleteReferenceRoomApi({
            path: 'laws',
            seqIdList: selectedRowKeys
        });
        SelectReferenceRoomList_ApiCall();
    };

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);
        navigate('/' + menuKey);
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        handleSearch('', confirm, searchedColumn);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: '8px'
                }}
                // onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined
                }}
            />
        ),
        onFilter: (value, record) => record.rowdata2.toString().toLowerCase().includes(value.toLowerCase()),
        // onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    });

    const columns = [
        {
            title: '번호',
            dataIndex: 'rowdata0',
            // width: '8%',
            align: 'center'
        },
        {
            title: '제목',
            dataIndex: 'rowdata2',
            ...getColumnSearchProps('subject'),
            render: (_, { rowdata1, rowdata2 }) => (
                <Button type="text" onClick={() => handle_View(rowdata1)} style={{ cursor: 'pointer' }}>
                    {rowdata2}
                </Button>
            )
        },
        {
            title: '첨부',
            dataIndex: 'rowdata12',
            // width: '8%',
            align: 'center',
            render: (_, { rowdata12 }) => (
                <>
                    {rowdata12?.map((f, i) => (
                        <Tooltip title={f.originalFileName} key={i}>
                            <a
                                href={`${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`}
                                target="_blank"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(
                                        `${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`,
                                        'PDFViewer',
                                        `width=${window.innerWidth - 60},height=${window.innerHeight},left=20,top=20`
                                    );
                                }}
                            >
                                <FilePdfOutlined style={{ fontSize: '25px', margin: '0 5px' }} />
                            </a>
                        </Tooltip>
                    ))}
                </>
            )
        },
        {
            title: '작성일',
            dataIndex: 'rowdata6',
            // width: '15%',
            align: 'center'
        },
        isLoggedIn === true
            ? {
                  title: '수정',
                  render: (_, { rowdata1 }) => (
                      <>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                              <Tooltip title="수정" color="#108ee9">
                                  <Button
                                      type="primary"
                                      onClick={() => handle_modify(rowdata1)}
                                      style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                                      icon={<EditFilled />}
                                  >
                                      수정
                                  </Button>
                              </Tooltip>
                          </div>
                      </>
                  ),
                  align: 'center'
              }
            : {
                  title: '조회',
                  dataIndex: 'rowdata4',
                  //   width: '8%',
                  align: 'center'
              }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
        //setSortedInfo(sorter);
    };

    //체크 박스 이벤트
    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    //체크 박스 선택
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    // 추가 Modal 이벤트처리 Start
    const handle_Register = () => {
        setSeqIdValue(null);
        setModalOpenRe(true);
    };

    const handleOk_Re = () => {
        setSeqIdValue(null);
        setModalOpenRe(false);
    };

    const handleCancel_Re = () => {
        setSeqIdValue(null);
        setModalOpenRe(false);
    };
    // 추가 Modal 이벤트처리 End

    // 수정 Modal 이벤트처리 Start
    const handle_modify = (seqId) => {
        setModalOpenMo(true);
        setSeqIdValue(seqId);
    };

    const handleOk_Mo = () => {
        setSeqIdValue(null);
        setModalOpenMo(false);
    };

    const handleCancel_Mo = () => {
        setModalOpenMo(false);
        setSeqIdValue(null);
    };
    // 수정 Modal 이벤트처리 End

    const SaveClose = () => {
        setModalOpenMo(false);
        setModalOpenRe(false);
        SelectReferenceRoomList_ApiCall();
    };

    // 상세 클릭 Start
    const handle_View = (seqId) => {
        setModalOpenVi(true);
        setSeqIdValue(seqId);
    };
    // 상세 클릭 End

    // 상세 Modal 이벤트처리 Start
    const handleOk_Vi = () => {
        setModalOpenVi(false);
    };

    const handleCancel_Vi = () => {
        setModalOpenVi(false);
    };
    // 상세 Modal 이벤트처리 End

    // 삭제
    const handleDel = () => {
        if (selectedRowKeys == '') {
            Modal.error({
                content: '삭제할 항목을 선택해주세요.',
                style: { top: 320 }
            });
        } else {
            confirm({
                title: '선택한 항목을 삭제하시겠습니까?',
                icon: <ExclamationCircleFilled />,
                okText: '예',
                okType: 'danger',
                cancelText: '아니오',
                style: { top: 320 },
                onOk() {
                    DeleteReferenceRoom_ApiCall(selectedRowKeys);
                },
                onCancel() {}
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        SelectReferenceRoomList_ApiCall();

        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuItems = (
        <>
            <Menu.Item key="news" onClick={() => handleMenuClick('news')}>
                최신뉴스 {selectedMenu === 'news' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="laws" onClick={() => handleMenuClick('laws')}>
                관련법령 {selectedMenu === 'laws' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="datum" onClick={() => handleMenuClick('datum')}>
                교육자료 {selectedMenu === 'datum' && <CaretRightOutlined />}
            </Menu.Item>
        </>
    );

    return (
        <>
            <Layout>
                {!isMobileView && (
                    <Sider width={230} theme="light">
                        <Card
                            type="inner"
                            style={{ width: '225px' }}
                            title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '50px' }}>자료실</span>}
                            headStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#215482' }}
                        >
                            <Menu
                                mode="vertical"
                                selectedKeys={[selectedMenu]}
                                style={{ borderRight: 0, fontWeight: '900' }}
                                onClick={() => setIsMobileView(false)}
                            >
                                {menuItems}
                            </Menu>
                        </Card>
                    </Sider>
                )}
                <Layout style={{ background: '#ffffff' }}>
                    <Content>
                        <Row gutter={[24, 24]}>
                            {isMobileView && (
                                <Col span={24}>
                                    <Card
                                        type="inner"
                                        style={{ width: '100%', marginBottom: '24px' }}
                                        title={<span style={{ fontWeight: 'bold' }}>자료실</span>}
                                    >
                                        <Button
                                            onClick={() => handleMenuClick('news')}
                                            style={{
                                                margin: '10px',
                                                border: 'none',
                                                background: 'none',
                                                fontWeight: 'bold',
                                                color: selectedMenu === 'news' ? '#599bc4' : 'inherit'
                                            }}
                                        >
                                            최신뉴스 {selectedMenu === 'news' && '▼'}
                                        </Button>
                                        <Button
                                            onClick={() => handleMenuClick('laws')}
                                            style={{
                                                margin: '10px',
                                                border: 'none',
                                                background: 'none',
                                                fontWeight: 'bold',
                                                color: selectedMenu === 'laws' ? '#599bc4' : 'inherit'
                                            }}
                                        >
                                            관련법령 {selectedMenu === 'laws' && '▼'}
                                        </Button>
                                        <Button
                                            onClick={() => handleMenuClick('datum')}
                                            style={{
                                                margin: '10px',
                                                border: 'none',
                                                background: 'none',
                                                fontWeight: 'bold',
                                                color: selectedMenu === 'datum' ? '#599bc4' : 'inherit'
                                            }}
                                        >
                                            교육자료 {selectedMenu === 'datum' && '▼'}
                                        </Button>
                                    </Card>
                                </Col>
                            )}

                            <Col
                                xs={{
                                    span: 20,
                                    offset: 1
                                }}
                                lg={{
                                    span: 22,
                                    offset: 2
                                }}
                                style={{ marginLeft: '30px' }}
                            >
                                <Title level={3}>
                                    <BlockOutlined /> 관련법령
                                </Title>
                            </Col>
                            <Col
                                xs={{
                                    span: 20,
                                    offset: 1
                                }}
                                lg={{
                                    span: 22,
                                    offset: 2
                                }}
                                style={{ marginLeft: '30px' }}
                            >
                                {isLoggedIn === true ? (
                                    <>
                                        <Space style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                            <Button
                                                onClick={handle_Register}
                                                style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                                                type="success"
                                                icon={<PlusOutlined />}
                                            >
                                                추가
                                            </Button>

                                            <Button
                                                type="danger"
                                                // onClick={handleDel}
                                                style={{ borderRadius: '5px', boxShadow: '2px 3px 0px 0px #dbdbdb', height: '46px' }}
                                                icon={<DeleteFilled />}
                                                onClick={handleDel}
                                            >
                                                삭제
                                            </Button>
                                        </Space>
                                        <Table
                                            columns={columns}
                                            dataSource={SelectReferenceRoomListData}
                                            rowSelection={{ ...rowSelection }}
                                            bordered={true}
                                            onChange={onChange}
                                            loading={loading}
                                        />
                                    </>
                                ) : (
                                    <Table
                                        columns={columns}
                                        dataSource={SelectReferenceRoomListData}
                                        bordered={true}
                                        onChange={onChange}
                                        loading={loading}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>

            {/* Notice 등록 모달 창 Start */}
            <Modal
                maskClosable={false}
                open={ModalOpenRe}
                onOk={handleOk_Re}
                closable={false}
                width={1080}
                style={{
                    top: 320,
                    zIndex: 9999
                }}
                footer={null}
                getContainer={() => document.body}
            >
                <LawsRegister ModalClose={handleCancel_Re} SaveClose={SaveClose} />
            </Modal>
            {/* Notice 등록 모달 창 End */}

            {/* Notice 수정 모달 창 Start */}
            <Modal
                maskClosable={false}
                open={ModalOpenMo}
                onOk={handleOk_Mo}
                closable={false}
                width={1080}
                style={{
                    top: 320,
                    zIndex: 9999
                }}
                footer={null}
                getContainer={() => document.body}
            >
                <LawsModify ModalClose={handleCancel_Mo} seqIdProps={seqIdValue} datetime={minutes + seconds} SaveClose={SaveClose} />
            </Modal>
            {/* Notice 수정 모달 창 End */}

            {/* Notice 상세정보 모달 창 Start */}
            <Modal
                maskClosable={false}
                open={ModalOpenVi}
                onOk={handleOk_Vi}
                closable={true}
                onCancel={handleCancel_Vi}
                width={780}
                style={{
                    top: 320,
                    zIndex: 9999
                }}
                footer={null}
                getContainer={() => document.body}
            >
                <LawsView ModalClose={handleCancel_Vi} datetime={minutes + seconds} seqIdValue={seqIdValue} />
            </Modal>
            {/* Notice 상세정보 모달 창 End */}
        </>
    );
};
