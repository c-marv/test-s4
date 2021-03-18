import {Button, Form, ListGroup, Modal} from "react-bootstrap";

export function ClassDetailModal({selectedClass}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Class Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>
                        <b>Code: </b> {selectedClass.code}
                    </p>
                    <p>
                        <b>Title: </b> {selectedClass.title}
                    </p>
                    <p>
                        <b>Description: </b> {selectedClass.description}
                    </p>
                    <h5>Students</h5>
                    <ListGroup>
                        {
                            selectedClass.students.length > 0 ? (
                                selectedClass.students.map(student => (
                                    <ListGroup.Item>
                                        {student.firstName} {student.lastName}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>No students</ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </div>
            </Modal.Body>
        </>
    );
}

export function ClassCreateModal ({selectedClass, onChangeHandler, onSaveHandler}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Code:</Form.Label>
                        <Form.Control name={"code"} type={"text"} value={selectedClass.code} onChange={onChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control name={"title"} type={"text"} value={selectedClass.title} onChange={onChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description: </Form.Label>
                        <Form.Control name={"description"} type={"text"} value={selectedClass.description} onChange={onChangeHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={onSaveHandler}>Save Changes</Button>
            </Modal.Footer>
        </>
    );
}

export function ClassEditModal ({selectedClass, onChangeHandler, onSaveHandler}) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control name={"title"} type={"text"} value={selectedClass.title} onChange={onChangeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description: </Form.Label>
                        <Form.Control name={"description"} type={"text"} value={selectedClass.description} onChange={onChangeHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={onSaveHandler}>Save Changes</Button>
            </Modal.Footer>
        </>
    );
}