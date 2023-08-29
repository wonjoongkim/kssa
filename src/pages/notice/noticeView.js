import React, { useRef, useState, useEffect } from 'react';
import { Card, Typography, Tooltip } from 'antd';

import { useSelectNoticeMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import { Space } from '../../../node_modules/antd/lib/index';
import { FileDoneOutlined } from '@ant-design/icons';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;

export const NoticeView = (props) => {
    // 공지사항 상세조회
    const [SelectNoticeApi] = useSelectNoticeMutation();
    const [selectNoticeData, setSelectNoticeData] = useState([]);
    const [viewerKey, setViewerKey] = useState(0); // Key 상태 추가

    const SelectNotice_ApiCall = async () => {
        const SelectNoticeResponse = await SelectNoticeApi({
            seqId: props.seqIdValue
        });
        setSelectNoticeData(SelectNoticeResponse?.data?.RET_DATA);
    };

    useEffect(() => {
        SelectNotice_ApiCall();
    }, [props.seqIdValue]);

    useEffect(() => {
        setViewerKey((prevKey) => prevKey + 1); // Key 업데이트
    }, [selectNoticeData.contents]);

    return (
        <>
            <Card size="small" bordered={false} style={{ width: '100%', marginTop: '20px', height: '470px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Typography>
                                <h4>{selectNoticeData.title}</h4>
                            </Typography>
                            <h4>
                                <Paragraph style={{ marginBottom: '-20px' }}>
                                    <Space>
                                        <blockquote style={{ marginRight: '10px', fontSize: '12px' }}>
                                            Date {selectNoticeData?.insertDate}
                                        </blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>
                                            Hit {selectNoticeData?.hit}
                                        </blockquote>
                                        <blockquote style={{ marginLeft: '10px', fontSize: '12px' }}>
                                            File
                                            {
                                                <>
                                                    {selectNoticeData?.fileList?.map((f, i) => (
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
                    <Viewer key={viewerKey} style={{ fontFamily: 'SUIT' }} initialValue={selectNoticeData.contents} />
                </Card>
            </Card>
        </>
    );
};
