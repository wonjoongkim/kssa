import React, { useRef, useState, useEffect } from 'react';
import { Card, Typography, Tooltip, Button, Row, Col } from 'antd';

import { useSelectFAQMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import { Space } from '../../../node_modules/antd/lib/index';
import { FileDoneOutlined } from '@ant-design/icons';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;

export const FaqView = (props) => {
    // 공지사항 상세조회
    const [SelectFAQApi] = useSelectFAQMutation();
    const [selectFAQData, setSelectFAQData] = useState([]);
    const [viewerKey, setViewerKey] = useState(0); // Key 상태 추가

    const SelectFAQ_ApiCall = async () => {
        const SelectFAQResponse = await SelectFAQApi({
            seqId: props.seqIdValue
        });
        setSelectFAQData(SelectFAQResponse?.data?.RET_DATA);
    };

    useEffect(() => {
        SelectFAQ_ApiCall();
    }, [props.seqIdProps, props.datetime]);

    useEffect(() => {
        setViewerKey((prevKey) => prevKey + 1); // Key 업데이트
    }, [selectFAQData.contents]);

    const ModalClose = () => {
        setSelectFAQData([]);
        props.ModalClose();
    };
    return (
        <>
            <Row gutter={24}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px' }}>
                        <Button
                            type="primary"
                            onClick={ModalClose}
                            style={{
                                width: '100px',
                                marginTop: '10px',
                                borderRadius: '5px',
                                boxShadow: '2px 3px 0px 0px #dbdbdb',
                                height: '46px'
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </Col>
            </Row>
            <Card size="small" bordered={false} style={{ width: '100%', marginTop: '20px', height: '470px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Typography>
                                <h4>{selectFAQData.title}</h4>
                            </Typography>
                            <h4>
                                <Paragraph style={{ marginBottom: '-20px' }}>
                                    <Space>
                                        <blockquote style={{ marginRight: '10px', fontSize: '12px' }}>
                                            Date {selectFAQData?.insertDate}
                                        </blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>Hit {selectFAQData?.hit}</blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>
                                            File
                                            {
                                                <>
                                                    {selectFAQData?.fileList?.map((f, i) => (
                                                        <Tooltip title={f.originalFileName} key={i}>
                                                            <a
                                                                href={`${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`}
                                                                target="_blank"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.open(
                                                                        `${decodeURIComponent(`${f.filePath}/${f.saveFileName}`)}`,
                                                                        'PDFViewer',
                                                                        // 'width=1000,height=800'
                                                                        `width=${window.innerWidth - 60},height=${
                                                                            window.innerHeight
                                                                        },left=20,top=20`
                                                                    );
                                                                }}
                                                            >
                                                                <FileDoneOutlined style={{ fontSize: '18px', margin: '0 5px' }} />
                                                            </a>
                                                        </Tooltip>
                                                    ))}
                                                </>
                                            }
                                        </blockquote>
                                    </Space>
                                </Paragraph>
                            </h4>
                        </>
                    }
                >
                    <Viewer key={viewerKey} style={{ fontFamily: 'SUIT' }} initialValue={selectFAQData.contents} />
                </Card>
                <Row gutter={24}>
                    <Col span={24}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px' }}>
                            <Button
                                type="primary"
                                onClick={ModalClose}
                                style={{
                                    width: '100px',
                                    marginTop: '10px',
                                    borderRadius: '5px',
                                    boxShadow: '2px 3px 0px 0px #dbdbdb',
                                    height: '46px'
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
};
