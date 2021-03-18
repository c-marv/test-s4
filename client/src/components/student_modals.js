import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export function StudentDetailModal({selectedStudent}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>
                        <b>Id: </b> {selectedStudent.id}
                    </p>
                    <p>
                        <b>First Name: </b> {selectedStudent.firstName}
                    </p>
                    <p>
                        <b>Last Name: </b> {selectedStudent.lastName}
                    </p>
                    <h5>Classes</h5>
                    <ListGroup>
                        {
                            selectedStudent.classes.length > 0 ? (
                                selectedStudent.classes.map(classItem => (
                                    <ListGroup.Item>
                                        [{classItem.code}] {classItem.title}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>No classes</ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </div>
            </Modal.Body>
        </>
    );
}

export function StudentCreateModal ({selectedStudent, onChangeHandler, onSaveHandler}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control name={"firstName"} type={"text"} value={selectedStudent.firstName} onChange={onChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name: </Form.Label>
                        <Form.Control name={"lastName"} type={"text"} value={selectedStudent.lastName} onChange={onChangeHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={onSaveHandler}>Save Changes</Button>
            </Modal.Footer>
        </>
    );
}

export function StudentEditModal ({selectedStudent, onChangeHandler, onSaveHandler}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control name={"firstName"} type={"text"} value={selectedStudent.firstName} onChange={onChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name: </Form.Label>
                        <Form.Control name={"lastName"} type={"text"} value={selectedStudent.lastName} onChange={onChangeHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={onSaveHandler}>Save Changes</Button>
            </Modal.Footer>
        </>
    );
}

export function StudentAssignModal ({selectedStudent, onAssignHandler}) {
    const [classes, setClasses] = useState([]);
    const [selectedClassCode, setSelectedClassCode] = useState(null);
    useEffect(async () => {
        let response = await fetch("/classes");
        response = await response.json();
        setClasses(response);
        if (response.length > 0) {
            setSelectedClassCode(response[0].code);
        }
    }, []);
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Assign Student to Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select the class: </Form.Label>
                        <Form.Control as={"select"} onChange={({target}) => setSelectedClassCode(target.value)}>
                            {
                                classes.map(classItem => (
                                    <option value={classItem.code}>[{classItem.code}] {classItem.title}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={() => onAssignHandler(selectedStudent.id, selectedClassCode)}>Assign</Button>
            </Modal.Footer>
        </>
    );
}