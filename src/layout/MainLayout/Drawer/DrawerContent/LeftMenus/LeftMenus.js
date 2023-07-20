import React, { useState } from 'react';
import cookies from 'react-cookies';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import {
    AppstoreOutlined,
    AppstoreAddOutlined,
    UngroupOutlined,
    BlockOutlined,
    EllipsisOutlined,
    LoginOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { styled } from '@mui/system';
const menutype = styled(`
    width: 80px;
`);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}
const items = [
    getItem('대분류 메뉴 1', 'sub1', <AppstoreAddOutlined />, [
        getItem(
            '그룹 메뉴 1',
            'g1',
            <UngroupOutlined />,
            [
                getItem(<Link to="/menu1">중분류 메뉴 1</Link>, '1', <BlockOutlined />),
                getItem(<Link to="/menu2">중분류 메뉴 2</Link>, '2', <BlockOutlined />)
            ],
            'group'
        ),
        getItem(
            '그룹 메뉴 2',
            'g2',
            <UngroupOutlined />,
            [getItem('중분류 메뉴 3', '3', <BlockOutlined />), getItem('중분류 메뉴 4', '4', <BlockOutlined />)],
            'group'
        )
    ]),
    getItem('대분류 메뉴 2', 'sub2', <AppstoreAddOutlined />, [
        getItem('중분류 메뉴 5', '5', <BlockOutlined />),
        getItem('중분류 메뉴 6', '6', <BlockOutlined />),
        getItem('중분류 메뉴', 'sub3', <BlockOutlined />, [
            getItem('소분류 메뉴 1', '7', <EllipsisOutlined />),
            getItem('소분류 메뉴 1', '8', <EllipsisOutlined />)
        ])
    ]),
    getItem('대분류 메뉴 3', 'sub4', <AppstoreAddOutlined />, [
        getItem('중분류 메뉴 9', '9', <BlockOutlined />),
        getItem('중분류 메뉴 10', '10', <BlockOutlined />),
        getItem('중분류 메뉴 11', '11', <BlockOutlined />),
        getItem('중분류 메뉴 12', '12', <BlockOutlined />)
    ])
];

const LeftMenus = () => {
    const [defaultSelectedKeys] = useState(cookies.load('DefaultSelectedKey') && '');
    const [defaultOpenKeys] = useState(cookies.load('DefaultOpenKey') && '');

    const onClick = (e) => {
        const expires = new Date();
        expires.setMinutes(expires.getDay() + 1);
        const CookiesOptions = {
            path: '/',
            expires
        };
        cookies.save('defaultSelectedKey', e.keyPath[0], { ...CookiesOptions });
        cookies.save('defaultOpenKey', e.keyPath[1], { ...CookiesOptions });
    };

    return (
        <Menu
            className={menutype}
            onClick={onClick}
            defaultSelectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={[defaultOpenKeys]}
            mode="inline"
            inlineCollapsed={!open}
            items={items}
        />
    );
};
export default LeftMenus;
