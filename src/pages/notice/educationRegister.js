import React, { useState, useEffect, useRef } from 'react';
import { useInsertInfoMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import { useDropzone } from 'react-dropzone';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Form, Input, Radio, Space, Divider, Typography, message, Tooltip, Modal } from 'antd';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const { TextArea } = Input;
const { Text, Link } = Typography;

export const EducationRegister = (props) => {
    const { confirm } = Modal;
    const [form] = Form.useForm();
    const titleRef = useRef(null);
    const contentsRef = useRef(null);
    const [itemContainer, setItemContainer] = useState({}); // 항목 컨테이너

    const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 업로드 값
    const [selectedFiles, setSelectedFiles] = useState([]); // 파일 업로드

    // 공지사항 등록
    const [InsertInfoApi] = useInsertInfoMutation();
    const InsertInfo_ApiCall = async () => {
        let formData = new FormData();
        const params = {
            title: itemContainer.title,
            contents: itemContainer.contents,
            userName: 'Admin',
            useYn: itemContainer.useYn
        };
        formData.append('params', new Blob([JSON.stringify(params)], { type: 'application/json' }));

        Object.values(selectedFiles).forEach((Noticefiles) => {
            formData.append('files', Noticefiles);
        });

        const InsertInfoResponse = await InsertInfoApi(formData);
        InsertInfoResponse?.data?.RET_CODE === '0100'
            ? Modal.success({
                  content: '등록 완료',
                  style: { top: 320 },
                  onOk() {
                      form.resetFields();
                      props.SaveClose();
                  }
              })
            : Modal.error({
                  content: '등록 오류',
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

    const Register_Process = () => {
        itemContainer.title === undefined || itemContainer.title.trim() === ''
            ? Modal.error({
                  content: '교육안내 제목을 입력해주세요',
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
                  content: '교육안내 내용을 입력해주세요',
                  style: { top: 320 },
                  onOk() {},
                  afterClose() {
                      if (contentsRef.current) {
                          contentsRef.current.focus(); // 모달이 닫힌 후에도 포커스를 유지합니다.
                      }
                  }
              })
            : InsertInfo_ApiCall();
    };

    const ModalClose = () => {
        setItemContainer([]);
        setUploadedFiles([]);
        form.resetFields();
        props.ModalClose();
    };

    const handleChange = () => {
        const editorInstance = contentsRef.current.getInstance();
        const newContents = editorInstance.getMarkdown();
        console.log(newContents);
        setItemContainer({ ...itemContainer, contents: newContents });
    };

    return (
        <>
            <Card size="small" bordered={false} style={{ width: '100%', height: '490px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Row justify="space-between">
                                <Col>
                                    <span>교육안내 추가</span>
                                </Col>
                                <Col>
                                    <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                borderRadius: '5px',
                                                boxShadow: '2px 3px 0px 0px #dbdbdb'
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
                                                boxShadow: '2px 3px 0px 0px #dbdbdb'
                                            }}
                                            type="primary"
                                            onClick={() => Register_Process()}
                                        >
                                            추가
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
                                    initialValue={
                                        itemContainer?.useYn === undefined || itemContainer?.useYn === 'N' ? 'Y' : itemContainer?.useYn
                                    }
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
                                                                            {file.name}
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
                                    <div>
                                        <Editor
                                            ref={contentsRef}
                                            initialValue={itemContainer?.contents || ' '} // 글 수정 시 사용
                                            initialEditType="markdown" // wysiwyg & markdown
                                            previewStyle="vertical"
                                            hideModeSwitch={false}
                                            height="400px"
                                            usageStatistics={false}
                                            useCommandShortcut={true}
                                            name="contents"
                                            onChange={handleChange}
                                            // onChange={
                                            //     (e) => console.log(e.getMarkdown())
                                            //     // setItemContainer({ ...itemContainer, contents: e.target.value })
                                            // }
                                        />

                                        {/* <Editor
                                            ref={contentsRef}
                                            name="contents"
                                            // initialEditType="markdown"
                                            previewStyle="vertical"
                                            height="450px"
                                            usageStatistics={false}
                                            hooks={{
                                                addImageBlobHook: async (blob, callback) => {
                                                    const imageUrl = await handleImageUpload(blob);
                                                    callback(imageUrl, 'alt text');
                                                    return false;
                                                }
                                            }}
                                            value={itemContainer?.contents}
                                        /> */}
                                    </div>
                                    {/* <TextArea
                                        ref={contentsRef}
                                        rows={10}
                                        style={{
                                            width: '100%'
                                        }}
                                        showCount
                                        name="contents"
                                        placeholder="# 내용 입력"
                                        onChange={(e) => setItemContainer({ ...itemContainer, contents: e.target.value })}
                                        value={itemContainer?.contents}
                                    /> */}
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
                                            boxShadow: '2px 3px 0px 0px #dbdbdb'
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
                                            boxShadow: '2px 3px 0px 0px #dbdbdb'
                                        }}
                                        type="primary"
                                        onClick={() => Register_Process()}
                                    >
                                        추가
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
