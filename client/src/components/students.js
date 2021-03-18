import {Button, Col, Container, FormControl, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {StudentAssignModal, StudentCreateModal, StudentDetailModal, StudentEditModal} from "./student_modals";

const EmptyStudent = {
    firstName: '',
    lastName: ''
};

export default function Students ({students, fetchStudents}) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [query, setQuery] = useState("");

    const openModal = async (mode, student) => {
        if (mode === 'create' || mode === 'edit' || mode === 'assign') {
            setSelectedStudent(student);
        } else {
            let response = await fetch(`/students/${student.id}`);
            response = await response.json();
            setSelectedStudent(response);
        }
        setModalMode(mode);
        setShowModal(true);
    };

    const onChangeHandler = ({target}) => {
        setSelectedStudent({
            ...selectedStudent,
            [target.name]: target.value
        });
    };

    const onSaveStudentHandler = async () => {
        let response;
        if (modalMode === 'create') {
             response = await fetch("/students", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedStudent),
            });
        } else if (modalMode === 'edit') {
            response = await fetch(`/students/${selectedStudent.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedStudent),
            });
        }

        if (response.status !== 200) {
            console.error("error to store");
        } else {
            await fetchStudents(query);
            setShowModal(false);
        }
    };

    const onDeleteStudentHandler = async (studentId) => {
        let response = await fetch(`/students/${studentId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status !== 200) {
            console.error("error to delete");
        } else {
            await fetchStudents(query);
            setShowModal(false);
        }
    };

    const onAssignHandler = async (studentId, classCode) => {
        let response = await fetch(`/students/${studentId}/assign-to-class/${classCode}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (response.status !== 200) {
            console.error("error to assign");
        } else {
            setShowModal(false);
        }
    }

    useEffect(async () => await fetchStudents(), []);

    return (
        <>
            <Container className={"mt-2"} >
                <Row >
                    <Col sm={8}>
                        <InputGroup>
                            <FormControl type={"text"} value={query}
                                         onChange={({target}) => setQuery(target.value)} placeholder={"Enter the student first name or last name ..."} />
                            <InputGroup.Append>
                                <Button onClick={() => fetchStudents(query)}>Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <Button type={"button"} onClick={() => openModal('create', EmptyStudent)} >New Student</Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover className={"mt-4"}>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map(student => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>
                                <Button className={"mr-2"} variant={"success"} onClick={() => openModal('details', student)}>
                                    Details
                                </Button>
                                <Button className={"mr-2"} variant={"primary"} onClick={() => openModal('edit', student)}>
                                    Edit
                                </Button>
                                <Button className={"mr-2"} variant={"danger"} onClick={() => onDeleteStudentHandler(student.id)}>
                                    Delete
                                </Button>
                                <Button onClick={() => openModal('assign', student)}>
                                    Assign
                                </Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                {
                    modalMode === 'details' ?
                        <StudentDetailModal selectedStudent={selectedStudent} /> :
                    modalMode === 'create' ?
                        <StudentCreateModal selectedStudent={selectedStudent} onChangeHandler={onChangeHandler} onSaveHandler={onSaveStudentHandler} /> :
                    modalMode === 'edit' ?
                        <StudentEditModal selectedStudent={selectedStudent} onChangeHandler={onChangeHandler} onSaveHandler={onSaveStudentHandler} /> :
                        <StudentAssignModal selectedStudent={selectedStudent} onAssignHandler={onAssignHandler} />
                }
            </Modal>
        </>
    );
}