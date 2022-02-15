import React, { useEffect, useState } from 'react';
import SkillAdd from "../components/skills/SkillAdd";
import SkillList from "../components/skills/SkillList";
import { Container, Col, Row } from "reactstrap"
import axios from 'axios';


export default function UserSkills() {
    // state declaration
    const [userSkills, setUserSkills] = useState([]);

    // get all user skills to list
    const getUserSkills = () => {
        axios.get("/api/v1/skills")
            .then((res) => {
                setUserSkills(res.data.data)
            })
            .catch((err) => alert(err.response.data.message))
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
                            getUserSkills={getUserSkills}
                        /></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
};
