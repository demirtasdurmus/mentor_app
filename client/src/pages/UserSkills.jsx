import React, { useEffect, useState } from 'react';
import SkillAdd from "../components/SkillAdd";
import SkillList from "../components/SkillList";
import SkillUpdate from "../components/SkillUpdate";
import { Container, Col, Row, Modal } from "reactstrap"
import axios from 'axios';


export default function UserSkills() {
    // state declaration
    const [modal, setModal] = useState(false);
    const [userSkills, setUserSkills] = useState([]);
    const [skillId, setSkillId] = useState(null);

    // get all user skills to list
    const getUserSkills = () => {
        axios.get("/api/v1/skills")
            .then((res) => {
                setUserSkills(res.data.data)
            })
            .catch((err) => alert(err.response.data.message))
    };

    // open update modal
    const handleUpdateModal = (id) => {
        setSkillId(id);
        setModal(true);
    };

    // toggle update handleUpdateModal
    const toggleModal = () => {
        setModal(!modal);
    };

    //  lifecycle
    useEffect(() => {
        getUserSkills();
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col sm="12" lg="6">
                        <SkillAdd
                            getUserSkills={getUserSkills}
                        />
                    </Col>
                    <Col sm="12" lg="6">
                        <SkillList
                            userSkills={userSkills}
                            handleUpdateModal={handleUpdateModal}
                            getUserSkills={getUserSkills}
                        /></Col>
                </Row>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <div className="mx-2">
                        <SkillUpdate
                            skillId={skillId}
                            getUserSkills={getUserSkills}
                            toggleModal={toggleModal}
                        />
                    </div>
                </Modal>
            </Container>
        </React.Fragment>
    )
};
