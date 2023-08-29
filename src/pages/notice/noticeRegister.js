import React, { useState, useEffect, useRef } from 'react';
import { useInsertNoticeMutation } from '../../hooks/api/BoardManagement/BoardManagement';
import { useDropzone } from 'react-dropzone';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Form, Input, Radio, Space, Divider, Typography, message, Tooltip, Modal } from 'antd';

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../Style.css';

const { TextArea } = Input;
const { Text, Link } = Typography;

export const NoticeRegister = (props) => {
    const { confirm } = Modal;
    const [form] = Form.useForm();
    const titleRef = useRef(null);
    const editorRef = useRef(null);
    const [itemContainer, setItemContainer] = useState({}); // 항목 컨테이너

    const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 업로드 값
    const [selectedFiles, setSelectedFiles] = useState([]); // 파일 업로드

    const customUploadAdapter = (loader) => {
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then((file) => {
                        formData.append('file', file);
                        console.log(formData);
                        axios
                            .post('http://localhost:3000/uploadImages/b0', formData)
                            .then((res) => {
                                resolve({
                                    default: res.data.data.uri
                                });
                            })
                            .catch((err) => reject(err));
                    });
                });
            }
        };
    };

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    // 공지사항 등록
    const [InsertNoticeApi] = useInsertNoticeMutation();
    const InsertNotice_ApiCall = async () => {
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

        const InsertNoticeResponse = await InsertNoticeApi(formData);
        InsertNoticeResponse?.data?.RET_CODE === '0100'
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
                  content: '공지 제목을 입력해주세요',
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
                  content: '공지 내용을 입력해주세요',
                  style: { top: 320 },
                  onOk() {},
                  afterClose() {
                      if (editorRef.current) {
                          editorRef.current.focus(); // 모달이 닫힌 후에도 포커스를 유지합니다.
                      }
                  }
              })
            : InsertNotice_ApiCall();
    };

    const ModalClose = () => {
        setItemContainer([]);
        setUploadedFiles([]);
        form.resetFields();
        props.ModalClose();
    };

    return (
        <>
            <Card size="small" bordered={false} style={{ width: '100%', height: '470px', overflow: 'auto' }}>
                <Card
                    type="inner"
                    title={
                        <>
                            <Row justify="space-between">
                                <Col>
                                    <span>공지사항 추가</span>
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
                        <Row gutter={24}>
                            <Col xs={24}>
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
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={24}>
                            <Col span={24}>
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
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={24}>
                            <Col span={24}>
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
                                            {/* <CKEditor
                                                editor={ClassicEditor}
                                                config={{
                                                    placeholder: '내용을 입력하세요.',
                                                    toolbar: {
                                                        items: [
                                                            'undo',
                                                            'redo',
                                                            '|',
                                                            'heading',
                                                            '|',
                                                            'fontfamily',
                                                            'fontSize',
                                                            'fontColor',
                                                            'fontBackgroundColor',
                                                            '|',
                                                            'bold',
                                                            'italic',
                                                            'strikethrough',
                                                            'subscript',
                                                            'superscript',
                                                            'code',
                                                            '|',
                                                            'link',
                                                            'uploadImage',
                                                            'imageInsert',
                                                            'blockQuote',
                                                            'mediaEmbed',
                                                            'codeBlock',
                                                            '|',
                                                            'alignment',
                                                            'bulletedList',
                                                            'numberedList',
                                                            'todoList',
                                                            'outdent',
                                                            'indent',
                                                            '|',
                                                            'insertTable',
                                                            'tableColumn',
                                                            'tableRow',
                                                            'mergeTableCells',
                                                            '|',
                                                            'highlight',
                                                            'selectAll',
                                                            'removeFormat'
                                                        ],
                                                        shouldNotGroupWhenFull: false
                                                    },
                                                    extraPlugins: [uploadPlugin],
                                                    heading: {
                                                        options: [
                                                            {
                                                                model: 'paragraph',
                                                                view: 'p',
                                                                title: '본문',
                                                                class: 'ck-heading_paragraph'
                                                            },
                                                            {
                                                                model: 'heading1',
                                                                view: 'h1',
                                                                title: '헤더1',
                                                                class: 'ck-heading_heading1'
                                                            },
                                                            {
                                                                model: 'heading2',
                                                                view: 'h2',
                                                                title: '헤더2',
                                                                class: 'ck-heading_heading2'
                                                            },
                                                            {
                                                                model: 'heading3',
                                                                view: 'h3',
                                                                title: '헤더3',
                                                                class: 'ck-heading_heading3'
                                                            },
                                                            {
                                                                model: 'heading4',
                                                                view: 'h4',
                                                                title: '헤더4',
                                                                class: 'ck-heading_heading4'
                                                            },
                                                            {
                                                                model: 'heading5',
                                                                view: 'h5',
                                                                title: '헤더5',
                                                                class: 'ck-heading_heading5'
                                                            }
                                                        ]
                                                    },
                                                    fontSize: {
                                                        options: [
                                                            9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                                                            29, 30
                                                        ]
                                                    },
                                                    alignment: {
                                                        options: ['justify', 'left', 'center', 'right']
                                                    },
                                                    table: {
                                                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                                                    },
                                                    image: {
                                                        resizeUnit: 'px',
                                                        toolbar: [
                                                            'imageStyle:alignLeft',
                                                            'imageStyle:full',
                                                            'imageStyle:alignRight',
                                                            '|',
                                                            'imageTextAlternative'
                                                        ],
                                                        styles: ['full', 'alignLeft', 'alignRight']
                                                    },
                                                    typing: {
                                                        transformations: {
                                                            remove: [
                                                                'enDash',
                                                                'emDash',
                                                                'oneHalf',
                                                                'oneThird',
                                                                'twoThirds',
                                                                'oneForth',
                                                                'threeQuarters'
                                                            ]
                                                        }
                                                    }
                                                }}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log({ event, editor, data });
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            /> */}
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
                            </Col>
                        </Row>

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
