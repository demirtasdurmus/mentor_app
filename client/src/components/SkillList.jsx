import React from 'react';
import { Table } from "reactstrap";
import axios from 'axios';


export default function SkillList(props) {
    const { userSkills, handleUpdateModal, getUserSkills } = props;

    // delete a skill
    const handleDeleteSkill = (id) => {
        axios.delete(`/api/v1/skills/${id}`)
            .then((res) => {
                if (res.data.status === "success") {
                    getUserSkills();
                    alert("Deleted your skill successfully!")
                }
            })
            .catch((err) => alert(err.response.data.message))
    };

    return (
        <React.Fragment>
            <h3>This is the users' list</h3>
            <Table striped>
                <thead key="thead">
                    <tr key="tr_titles">
                        <th key="id">Id</th>
                        <th key="category">category</th>
                        <th key="travel_fee">travel fee </th>
                        <th key="tag_line">tag line</th>
                        <th key="location_options">location options</th>
                        <th key="edit">Edit</th>
                    </tr>
                </thead>
                <tbody key="tbody">
                    {userSkills?.map((i, index) => {
                        return (
                            <tr key={index}>
                                <th>{i.id}</th>
                                <td>{i.category}</td>
                                <td>{i.travel_fee}</td>
                                <td>{i.tag_line}</td>
                                <td>{JSON.stringify(i.location_options.map(j => j.option))}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        id={i.id}
                                        onClick={(e) => handleUpdateModal(e.target.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        id={i.id}
                                        onClick={(e) => handleDeleteSkill(e.target.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
