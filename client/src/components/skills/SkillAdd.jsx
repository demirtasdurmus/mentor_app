import React, { useState } from 'react';
import {
    Button,
    Input,
    Label,
    Form,
    Row,
    Col,
    FormGroup,
    InputGroup,
} from 'reactstrap';
import axios from 'axios';


export default function SkillAdd(props) {
    const { getUserSkills } = props;

    const [inputs, setInputs] = useState({
        category: "",
        locationOptions: [],
        tagLine: "",
        travelFee: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleLocationOptions = (event) => {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setInputs({ ...inputs, locationOptions: value });
    };

    // create skill
    const handleAddSkill = (e) => {
        e.preventDefault();
        axios.post("/api/v1/skills", {
            category: inputs.category,
            tagLine: inputs.tagLine,
            travelFee: inputs.travelFee,
            locationOptions: inputs.locationOptions,
        })
            .then((res) => {
                if (res.data.status === "success") {
                    getUserSkills();
                    alert("Saved your skill successfully!")
                }
            })
            .catch((err) => alert(err.response.data.message))
    };

    return (
        <React.Fragment>
            <h3>Add Skill</h3>
            <Form className="mt-5">
                <Row>
                    <Col xs="12">
                        <FormGroup>
                            <InputGroup>
                                <Input
                                    onChange={handleInputChange}
                                    type="text"
                                    name="category"
                                    placeholder="category"
                                    required
                                ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label for="locationOptions" style={{ fontSize: "1.2rem" }}>Location Options(use ctrl&cmd for mutiple select)</Label>
                            <Input type="select" name="locationOptions" id="locationOptions" onChange={handleLocationOptions} required multiple>
                                <option value="choose">Choose</option>
                                <option value="instructor">Instructor</option>
                                <option value="online">Online</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <InputGroup>
                                <Input
                                    onChange={handleInputChange}
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    name="travelFee"
                                    placeholder="travelFee"
                                ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Label for="tagLine" style={{ fontSize: "1.5rem" }}>Tag Line</Label><br />
                <Input
                    onChange={handleInputChange}
                    type="textarea"
                    name="tagLine"
                    style={{ minHeight: "50px" }}
                ></Input>
                <Button
                    className="btn btn-lg mt-5"
                    onClick={handleAddSkill}
                >Add Skill
                </Button>
            </Form>
        </React.Fragment>
    )
};
