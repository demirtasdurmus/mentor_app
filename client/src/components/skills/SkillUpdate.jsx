import React, { useState, useEffect } from 'react';
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


export default function SkillUpdate(props) {
    const { getUserSkills, toggleModal, skillId } = props;

    const [inputs, setInputs] = useState({
        id: null,
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

    // update a skill
    const handleUpdateSkill = () => {
        axios.put(`/api/v1/skills/${inputs.id}`, {
            category: inputs.category,
            tagLine: inputs.tagLine,
            travelFee: inputs.travelFee,
            locationOptions: inputs.locationOptions,
        })
            .then((res) => {
                if (res.data.status === "success") {
                    getUserSkills();
                    toggleModal();
                    alert("Updated your skill successfully!")
                }
            })
            .catch((err) => alert(err.response.data.message))
    };

    // get a skill by id to update
    const getSkillById = (id) => {
        axios.get(`/api/v1/skills/${id}`)
            .then((res) => {
                setInputs({
                    id: res.data.data.id,
                    category: res.data.data.category,
                    tagLine: res.data.data.tag_line,
                    travelFee: res.data.data.travel_fee,
                    locationOptions: res.data.data.location_options.map(e => e.option),
                })
            })
            .catch((err) => alert(err.response.data.message))
    };

    useEffect(() => {
        getSkillById(skillId)
    }, [skillId])

    return (
        <React.Fragment>
            <div className="mx-3 my-3">
                <h3 className="text-center">Update Skill</h3>
                <Form className="mt-5">
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <InputGroup>
                                    <Input
                                        onChange={handleInputChange}
                                        value={inputs.category}
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
                                <Input type="select" name="locationOptions" id="locationOptions2" onChange={handleLocationOptions} required multiple>
                                    <option value="choose" checked={inputs.locationOptions.indexOf("choose") > -1}>Choose</option>
                                    <option value="instructor" checked={inputs.locationOptions.indexOf("instructor") > -1}>Instructor</option>
                                    <option value="online" checked={inputs.locationOptions.indexOf("online") > -1}>Online</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <InputGroup>
                                    <Input
                                        onChange={handleInputChange}
                                        value={inputs.travelFee}
                                        type="number"
                                        name="travelFee"
                                        placeholder="travelFee"
                                        required
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Label for="tagLine" style={{ fontSize: "1.5rem" }}>Tag Line</Label><br />
                    <Input
                        onChange={handleInputChange}
                        value={inputs.tagLine}
                        type="textarea"
                        name="tagLine"
                        style={{ minHeight: "50px" }}
                    ></Input>
                    <Button
                        className="btn btn-lg mt-5"
                        onClick={handleUpdateSkill}
                    >Update Skill
                    </Button>
                </Form>
            </div>
        </React.Fragment>
    )
};
