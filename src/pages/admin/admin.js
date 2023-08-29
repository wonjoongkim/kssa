import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Modal, Col, Row } from 'antd';

// material-ui
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined, PoweroffOutlined } from '@ant-design/icons';

// 토큰
import { useUserToken } from '../../hooks/core/UserToken';
import { useLoginMutation } from '../../hooks/api/LoginManagement/LoginManagement';
// import { useLocalStorage } from '../../../hooks/misc/LocalStorage';
// ============================|| FIREBASE - LOGIN ||============================ //
import '../../Style.css';

export const Admin_Login = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // 로그인 토큰 정보
    const [userToken] = useUserToken();

    // 로그인 api 정보
    const [login] = useLoginMutation();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (values) => {
        const userLoginResponse = await login({
            loginId: values.id,
            loginPw: values.password
        });

        if (userLoginResponse.data.RET_CODE === '0000') {
            const jwtToken = userLoginResponse.data.RET_DATA.accessToken;
            userToken.setItem(jwtToken);
            Modal.success({
                content: '로그인 성공!',
                style: { marginTop: '250px' },
                onOk() {
                    navigate('/dashboard');
                }
            });
        } else {
            Modal.error({ title: 'Error', content: '로그인에 실패하였습니다.' });
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    id: Yup.string().max(255).required('아이디를 입력해주세요.'),
                    password: Yup.string().max(255).required('비밀번호를 입력해주세요.')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: true });
                        setSubmitting(true);
                        handleLogin(values);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Row style={{ marginTop: '60px' }}>
                            <Col
                                lg={{
                                    span: 5,
                                    offset: 10
                                }}
                            >
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="id-login">아이디</InputLabel>
                                            <OutlinedInput
                                                id="id-login"
                                                type="id"
                                                value={values.id}
                                                name="id"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Id"
                                                fullWidth
                                                error={Boolean(touched.id && errors.id)}
                                            />
                                            {touched.id && errors.id && (
                                                <FormHelperText error id="standard-weight-helper-text-id-login">
                                                    {errors.id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password-login">비밀번호</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="-password-login"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter password"
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                icon={<PoweroffOutlined />}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                style={{ height: '60px' }}
                                            >
                                                로그인
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
        </div>
    );
};
