import React, { useState, useEffect, useRef } from 'react';
import { useSelectReferenceRoomMutation, useUpdateReferenceRoomMutation } from '../../hooks/api/ReferenceManagement/ReferenceManagement';
import { useDropzone } from 'react-dropzone';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Form, Input, Radio, Space, Divider, Typography, message, Tooltip, Modal, DatePicker } from 'antd';

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

import '../../Style.css';

const { TextArea } = Input;
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;

export const NewsModify = (props) => {
    const { confirm } = Modal;
    const [form] = Form.useForm();
    const titleRef = useRef(null);
    const editorRef = useRef(null);

    dayjs.extend(weekday);
    dayjs.extend(localeData);

    const [itemContainer, setItemContainer] = useState({}); // 항목 컨테이너
    const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 업로드 값
    const [selectedFiles, setSelectedFiles] = useState([]); // 파일 업로드

    // 최신뉴스 상세조회
    const [SelectReferenceRoomApi] = useSelectReferenceRoomMutation();
    const SelectReferenceRoom_ApiCall = async () => {
        const SelectReferenceRoomResponse = await SelectReferenceRoomApi({
            path: 'news',
            seqId: props.seqIdProps
        });
        editorRef.current?.getInstance().setMarkdown(SelectReferenceRoomResponse?.data?.RET_DATA.contents);
        setItemContainer(SelectReferenceRoomResponse?.data?.RET_DATA);
        setUploadedFiles(SelectReferenceRoomResponse?.data?.RET_DATA.fileList);
    };

    // 최신뉴스 수정
    const [UpdateReferenceRoomApi] = useUpdateReferenceRoomMutation();
    const UpdateReferenceRoom_ApiCall = async () => {
        let formData = new FormData();

        const params = {
            path: 'news',
            seqId: props.seqIdProps,
            title: itemContainer.title,
            contents: itemContainer.contents,
            userName: 'Admin',
            useYn: itemContainer.useYn,
            insertDate: itemContainer.insertDate
        };
        formData.append('params', new Blob([JSON.stringify(params)], { type: 'application/json' }));

        Object.values(selectedFiles).forEach((Noticefiles) => {
            formData.append('files', Noticefiles);
        });
        const UpdateReferenceRoomResponse = await UpdateReferenceRoomApi(formData);
        UpdateReferenceRoomResponse?.data?.RET_CODE === '0100'
            ? Modal.success({
                  content: '수정 완료',
                  style: { top: 320 },
                  onOk() {
                      form.resetFields();
                      props.SaveClose();
                  }
              })
            : Modal.error({
                  content: '수정 오류',
                  style: { top: 320 },
                  onOk() {}
              });
    };

    const handleDrop = (acceptedFiles) => {
        const remainingSlots = 5 - uploadedFiles.length;
        const filesToUpload = acceptedFiles.slice(0, remainingSlots);
        filesToUpload.forEach((file) => {
            // PDF 파일 유효성 검사 및 처리
            // const isPdf = file.type === 'application/pdf';
            // if (!isPdf) {
            //     message.error('You can only upload PDF file!');
            //     return;
            // }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Files must be smaller than 2MB!');
                return;
            }

            // 파일 정보 및 base64 변환
            const reader = new FileReader();
            reader.onload = () => {
                const base64Pdf = reader.result;
                const uploadedPdf = {
                    name: file.name,
                    base64Pdf: base64Pdf
                };
                // 업로드된 PDF 파일 추가
                setUploadedFiles((prevFiles) => [...prevFiles, uploadedPdf]);
            };
            reader.readAsDataURL(file);
        });
        setSelectedFiles(filesToUpload);
        setCommand('true');
    };

    const {
        getRootProps: getRootProps,
        getInputProps: getInputProps,
        isDragActive: isDragActive
    } = useDropzone({
        onDrop: handleDrop
        // accept: 'application/pdf' // 허용할 파일 유형을 PDF로 지정
    });

    // 업로드 된 파일 삭제
    const handleFileDelete = (index) => {
        setUploadedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const Modify_Process = () => {
        itemContainer.title === undefined || itemContainer.title.trim() === ''
            ? Modal.error({
                  content: '최신뉴스 제목을 입력해주세요',
                  style: { top: 320 },
                  onOk() {},
                  afterClose() {
                      if (titleRef.current) {
                          titleRef.current.focus(); // 모달이 닫힌 후에도 포커스를 유지합니다.
                      }
                  }
              })
            : itemContainer.contents === undefined || itemContainer.contents.trim() === ''
            ? Modal.error({
                  content: '최신뉴스 내용을 입력해주세요',
                  style: { top: 320 },
                  onOk() {},
                  afterClose() {
                      if (editorRef.current) {
                          editorRef.current.focus(); // 모달이 닫힌 후에도 포커스를 유지합니다.
                      }
                  }
              })
            : UpdateReferenceRoom_ApiCall();
    };

    const ModalClose = () => {
        setItemContainer([]);
        setUploadedFiles([]);
        form.resetFields();
        props.ModalClose();
    };

    useEffect(() => {
        SelectReferenceRoom_ApiCall();
    }, [props.seqIdProps, props.datetime]);

    return (
        <>
            <Card size="small" bordered={false} style={{ width: '100%', height: '470px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Row justify="space-between">
                                <Col>
                                    <span>최신뉴스 수정</span>
                                </Col>
                                <Col>
                                    <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                borderRadius: '5px',
                                                boxShadow: '2px 3px 0px 0px #dbdbdb',
                                                height: '38px',
                                                padding: '4px 20px'
                                            }}
                                            type="danger"
                                            onClick={ModalClose}
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                borderRadius: '5px',
                                                boxShadow: '2px 3px 0px 0px #dbdbdb',
                                                height: '38px',
                                                padding: '4px 20px'
                                            }}
                                            type="primary"
                                            onClick={() => Modify_Process()}
                                        >
                                            수정
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </>
                    }
                >
                    <Form layout="vertical" form={form} autoComplete="off">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="form01"
                                    label="사용여부"
                                    rules={[
                                        {
                                            required: true,
                                            message: '사용여부'
                                        }
                                    ]}
                                    initialValue={itemContainer?.useYn}
                                >
                                    <Radio.Group
                                        name="useYn"
                                        onChange={(e) => setItemContainer({ ...itemContainer, useYn: e.target.value })}
                                        buttonStyle="solid"
                                        value={itemContainer?.useYn}
                                    >
                                        <Radio.Button value="Y">
                                            <span style={{ padding: '0 15px' }}>사용</span>
                                        </Radio.Button>
                                        <span style={{ padding: '0 10px' }}></span>
                                        <Radio.Button value="N">
                                            <span style={{ padding: '0 15px' }}>미사용</span>
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={24}>
                            <Col xs={24}>
                                <Form.Item
                                    name="form02"
                                    label="등록일"
                                    rules={[
                                        {
                                            required: true,
                                            message: '등록일'
                                        }
                                    ]}
                                >
                                    <Row>
                                        <Col>
                                            <DatePicker
                                                name="insertDate"
                                                onChange={(date) => {
                                                    setItemContainer({ ...itemContainer, insertDate: date });
                                                }}
                                                placeholder="등록일"
                                                style={{
                                                    width: '945px'
                                                }}
                                                value={itemContainer?.insertDate ? dayjs(itemContainer.insertDate) : dayjs(new Date())}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '10px 0' }} />
                        <Form.Item
                            name="form02"
                            label="제목"
                            rules={[
                                {
                                    required: true,
                                    message: '제목 입력'
                                }
                            ]}
                        >
                            <Row gutter={24}>
                                <Col xs={24}>
                                    <Input
                                        ref={titleRef}
                                        style={{
                                            width: '100%'
                                        }}
                                        name="title"
                                        placeholder="# 제목 입력"
                                        onChange={(e) => setItemContainer({ ...itemContainer, title: e.target.value })}
                                        value={itemContainer?.title}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Divider style={{ margin: '10px 0' }} />

                        <Form.Item
                            name="form03"
                            label="파일 업로드"
                            rules={[
                                {
                                    required: true,
                                    message: '파일'
                                }
                            ]}
                        >
                            <Row gutter={24}>
                                <Col span={24}>
                                    {uploadedFiles?.length === 0 ? (
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Button
                                                {...getRootProps()}
                                                className={`dropzone ${isDragActive ? 'active' : ''}`}
                                                style={{ width: '100%', height: '90px', fontSize: '13px' }}
                                                size="large"
                                                disabled={uploadedFiles?.length >= 5}
                                            >
                                                <p>
                                                    <UploadOutlined />
                                                </p>
                                                <input {...getInputProps()} />
                                                {isDragActive ? (
                                                    <>
                                                        <div style={{ width: '100%' }}> 파일을 여기에 놓아주세요...</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div style={{ width: '100%' }}>파일을 드래그하거나 클릭하여 업로드하세요.</div>
                                                    </>
                                                )}
                                            </Button>
                                        </Space>
                                    ) : (
                                        <>
                                            <Card>
                                                <Space style={{ textAlign: 'center' }}>
                                                    <Row gutter={24}>
                                                        {uploadedFiles?.map((file, index) => (
                                                            <>
                                                                <Col key={index} span={23} style={{ display: 'flex', height: '50px' }}>
                                                                    <Tooltip title="삭제" placement="right" color="#ff4d4f">
                                                                        <Button
                                                                            type="danger"
                                                                            icon={<DeleteOutlined />}
                                                                            onClick={() => handleFileDelete(index)}
                                                                        >
                                                                            {file.originalFileName === undefined
                                                                                ? file.name
                                                                                : file.originalFileName}
                                                                        </Button>
                                                                    </Tooltip>
                                                                </Col>
                                                            </>
                                                        ))}
                                                    </Row>
                                                </Space>
                                            </Card>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form.Item>
                        <Divider style={{ margin: '10px 0' }} />
                        <Form.Item
                            name="form04"
                            label="내용"
                            rules={[
                                {
                                    required: true,
                                    message: '내용 입력'
                                }
                            ]}
                        >
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Editor
                                        ref={editorRef}
                                        initialValue={' '} // 글 수정 시 사용
                                        initialEditType="wysiwyg" // wysiwyg & markdown
                                        // previewStyle="vertical"
                                        hideModeSwitch={false}
                                        height="400px"
                                        usageStatistics={false}
                                        useCommandShortcut={true}
                                        name="contents"
                                        // onChange={handleChange}
                                        onChange={() =>
                                            setItemContainer({
                                                ...itemContainer,
                                                contents: editorRef.current?.getInstance().getHTML()
                                            })
                                        }
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px',
                                            boxShadow: '2px 3px 0px 0px #dbdbdb',
                                            height: '38px',
                                            padding: '4px 20px'
                                        }}
                                        type="danger"
                                        onClick={ModalClose}
                                    >
                                        취소
                                    </Button>

                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            borderRadius: '5px',
                                            boxShadow: '2px 3px 0px 0px #dbdbdb',
                                            height: '38px',
                                            padding: '4px 20px'
                                        }}
                                        type="primary"
                                        onClick={() => Modify_Process()}
                                    >
                                        수정
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Card>
        </>
    );
};