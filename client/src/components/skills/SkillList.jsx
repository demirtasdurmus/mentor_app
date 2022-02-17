import React, { useState } from 'react';
import axios from 'axios';
import SkillUpdate from "./SkillUpdate";
import { Table, Tag, Space, Col, Row, Button, Modal } from 'antd';
import Notification from "../helpers/Notification";


export default function SkillList(props) {
    const { userSkills, getUserSkills } = props;

    // state declaration
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [skillId, setSkillId] = useState(null);

    // open update modal
    const handleUpdateModal = (target) => {
        if (target.id) {
            setSkillId(target.id);
        } else {
            setSkillId(target.parentElement.id);
        };
        setIsModalVisible(true);
    };

    // toggle update handleUpdateModal
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // delete a skill
    const handleDeleteSkill = (target) => {
        let id;
        if (target.id) {
            id = target.id;
        } else {
            id = target.parentElement.id;
        };
        axios.delete(`/api/v1/skills/${id}`)
            .then((res) => {
                if (res.data.status === "success") {
                    getUserSkills();
                    Notification('success', "Deleted your skill successfully");
                }
            })
            .catch((err) => Notification('error', err.response.data.message))
    };

    const columns = [
        {
            title: '#Id',
            dataIndex: 'id',
            key: 'id',
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center",
        },
        {
            title: 'Tagline',
            dataIndex: 'tag_line',
            key: 'tag_line',
            align: "center"
        },
        {
            title: 'Travel Fee',
            dataIndex: 'travel_fee',
            key: 'travel_fee',
            align: "center"
        },
        {
            title: 'Location Options',
            key: 'location_options',
            dataIndex: 'location_options',
            align: "center",
            render: location_options => (
                <React.Fragment>
                    {location_options.map(option => {
                        let color = option.length > 5 ? 'geekblue' : 'green';
                        if (option === 'choose') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={option}>
                                {option.toUpperCase()}
                            </Tag>
                        );
                    })}
                </React.Fragment>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            align: "center"
        },
    ];

    const data = userSkills.map((skill, index) => {
        return {
            key: skill.id,
            id: index + 1,
            category: skill.category,
            tag_line: skill.tag_line,
            travel_fee: skill.travel_fee,
            location_options: skill.location_options.map(el => el.option),
            edit:
                <React.Fragment>
                    <Space>
                        <Button type="primary" shape="round" size="small" id={skill.id} onClick={(e) => handleUpdateModal(e.target)}>
                            Update
                        </Button>
                        <Button type="danger" shape="round" size="small" id={skill.id} onClick={(e) => handleDeleteSkill(e.target)}>
                            Delete
                        </Button>
                    </Space>
                </React.Fragment>
        }
    });

    return (
        <React.Fragment>
            <Row>
                <Col span={12} offset={6}>
                    <h3>This is the users' list</h3>
                    <Table
                        pagination={false}
                        bordered
                        columns={columns}
                        dataSource={data}
                    />
                    <Modal visible={isModalVisible} footer={null} destroyOnClose={true} onCancel={toggleModal}>
                        <SkillUpdate
                            skillId={skillId}
                            getUserSkills={getUserSkills}
                            toggleModal={toggleModal}
                        />
                    </Modal>
                </Col>
            </Row>

        </React.Fragment>
    )
};
