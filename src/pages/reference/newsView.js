import React, { useRef, useState, useEffect } from 'react';
import { Card, Typography, Tooltip, Button, Row, Col } from 'antd';

import { useSelectReferenceRoomMutation } from '../../hooks/api/ReferenceManagement/ReferenceManagement';
import { Space } from '../../../node_modules/antd/lib/index';
import { FileDoneOutlined } from '@ant-design/icons';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;

export const NewsView = (props) => {
    // 최신뉴스 상세조회
    const [SelectReferenceRoomApi] = useSelectReferenceRoomMutation();
    const [SelectReferenceRoomData, setSelectReferenceRoomData] = useState([]);
    const [viewerKey, setViewerKey] = useState(0); // Key 상태 추가

    const SelectReferenceRoom_ApiCall = async () => {
        const SelectReferenceRoomResponse = await SelectReferenceRoomApi({
            path: 'news',
            seqId: props.seqIdValue
        });
        setSelectReferenceRoomData(SelectReferenceRoomResponse?.data?.RET_DATA);
    };

    useEffect(() => {
        SelectReferenceRoom_ApiCall();
    }, [props.seqIdValue, props.datetime]);

    useEffect(() => {
        setViewerKey((prevKey) => prevKey + 1); // Key 업데이트
    }, [SelectReferenceRoomData.contents]);

    const ModalClose = () => {
        setSelectReferenceRoomData([]);
        props.ModalClose();
    };

    return (
        <>
            {/* <Row gutter={24}>
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
            </Row> */}
            <Card size="small" bordered={false} style={{ width: '100%', marginTop: '20px', height: '470px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Typography>
                                <h4>{SelectReferenceRoomData.title}</h4>
                            </Typography>
                            <h4>
                                <Paragraph style={{ marginBottom: '-20px' }}>
                                    <Space>
                                        <blockquote style={{ marginRight: '10px', fontSize: '12px' }}>
                                            Date {SelectReferenceRoomData?.insertDate}
                                        </blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>
                                            Hit {SelectReferenceRoomData?.hit}
                                        </blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>
                                            File
                                            {
                                                <>
                                                    {SelectReferenceRoomData?.fileList?.map((f, i) => (
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
                    <Viewer
                        key={viewerKey}
                        style={{ fontFamily: 'SUIT', textAlign: 'justify' }}
                        initialValue={SelectReferenceRoomData.contents}
                    />
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
