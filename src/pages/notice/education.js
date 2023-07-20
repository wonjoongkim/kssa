import React, { useRef, useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Input, Space, Table, Image, Tooltip } from 'antd';
import { CaretRightOutlined, BlockOutlined, SearchOutlined, FileDoneOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { useNavigate } from 'react-router-dom';
import './style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Notice_Education = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('education');
    const [isMobileView, setIsMobileView] = useState(false);

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);
        navigate('/' + menuKey);
    };

    const data = [
        {
            key: '1',
            subject: '’23년 항공보안검색요원 교육(2차) 안내 (6/12~16)',
            files: '',
            indate: '2023.05.29',
            visited: '66'
        },
        {
            key: '2',
            subject: '’23년 항공경비요원 교육(2차) 안내 (6/12~16)',
            files: (
                <Tooltip title="파일명" placement="bottom">
                    <a
                        // href={`${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`}
                        href="#"
                        target="_blank"
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     window.open(
                        //         `${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`,
                        //         'PDFViewer',
                        //         `width=${window.innerWidth - 60},height=${window.innerHeight},left=20,top=20`
                        //     );
                        // }}
                        onClick={() => alert('파일 다운로드')}
                    >
                        <FileDoneOutlined style={{ fontSize: '20px' }} />
                    </a>
                </Tooltip>
            ),
            indate: '2023.05.29',
            visited: '98'
        }
    ];

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
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button> */}
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
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            dataIndex: 'key',
            key: 'key',
            width: '8%',
            align: 'center'
        },
        {
            title: '제목',
            dataIndex: 'subject',
            key: 'subject',
            ...getColumnSearchProps('subject')
        },
        {
            title: '첨부',
            dataIndex: 'files',
            key: 'files',
            width: '8%',
            align: 'center'
        },
        {
            title: '작성일',
            dataIndex: 'indate',
            key: 'files',
            width: '12%',
            align: 'center'
        },
        {
            title: '조회',
            dataIndex: 'visited',
            key: 'visited',
            width: '8%',
            align: 'center'
        }
    ];

    useEffect(() => {
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
            <Menu.Item key="notification" onClick={() => handleMenuClick('notification')}>
                공지사항 {selectedMenu === 'notification' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="education" onClick={() => handleMenuClick('education')}>
                교육안내 {selectedMenu === 'education' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="faq" onClick={() => handleMenuClick('faq')}>
                FAQ {selectedMenu === 'faq' && <CaretRightOutlined />}
            </Menu.Item>
        </>
    );

    return (
        <Layout>
            {!isMobileView && (
                <Sider width={230} theme="light">
                    <Card
                        type="inner"
                        style={{ width: '225px' }}
                        title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '30px' }}>게시판</span>}
                        headStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#599bc4' }}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[selectedMenu]}
                            style={{ borderRight: 0 }}
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
                                    title={<span style={{ fontWeight: 'bold' }}>게시판</span>}
                                >
                                    <Button
                                        onClick={() => handleMenuClick('notification')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'notification' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        공지사항 {selectedMenu === 'notification' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('education')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'education' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        교육안내 {selectedMenu === 'education' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('faq')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'faq' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        FAQ {selectedMenu === 'faq' && <CaretRightOutlined />}
                                    </Button>
                                </Card>
                            </Col>
                        )}

                        <Col
                            xs={{
                                span: 24,
                                offset: 1
                            }}
                            lg={{
                                span: 21,
                                offset: 2
                            }}
                            style={{ marginLeft: '30px' }}
                        >
                            <Title level={3}>
                                <BlockOutlined /> 교육안내
                            </Title>
                        </Col>
                        <Col
                            xs={{
                                span: 24,
                                offset: 1
                            }}
                            lg={{
                                span: 21,
                                offset: 2
                            }}
                            style={{ marginLeft: '45px' }}
                        >
                            <Table columns={columns} dataSource={data} />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
