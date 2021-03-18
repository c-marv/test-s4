import {useState} from "react";
import {Button, Col, Container, FormControl, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {ClassCreateModal, ClassDetailModal, ClassEditModal} from './class_modals';

const EmptyClass = {
    code: '',
    title: '',
    description: ''
}

export default function Classes ({classes, fetchClasses}) {
    const [selectedClass, setSelectedClass] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [query, setQuery] = useState("");

    const openModal = async (mode, classItem) => {
        if (mode === 'create' || mode === 'edit' || mode === 'assign') {
            setSelectedClass(classItem);
        } else {
            let response = await fetch(`/classes/${classItem.code}`);
            response = await response.json();
            console.log(response);
            setSelectedClass(response);
        }
        setModalMode(mode);
        setShowModal(true);
    };

    const onChangeHandler = ({target}) => {
        setSelectedClass({
            ...selectedClass,
            [target.name]: target.value
        });
    };

    const onSaveClassHandler = async () => {
        let response;
        if (modalMode === 'create') {
            response = await fetch("/classes", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedClass),
            });
        } else if (modalMode === 'edit') {
            response = await fetch(`/classes/${selectedClass.code}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedClass),
            });
        }

        if (response.status !== 200) {
            console.error("error to store");
        } else {
            await fetchClasses(query);
            setShowModal(false);
        }
    };

    const onDeleteClassHandler = async (classCode) => {
        let response = await fetch(`/classes/${classCode}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        if (response.status !== 200) {
            console.error("error to delete");
        } else {
            await fetchClasses(query);
            setShowModal(false);
        }
    };

    return (
        <>
            <Container className={"mt-2"} >
                <Row >
                    <Col sm={8}>
                        <InputGroup>
                            <FormControl type={"text"} value={query}
                                         onChange={({target}) => setQuery(target.value)} placeholder={"Enter the class code, title or description ..."} />
                            <InputGroup.Append>
                                <Button onClick={() => fetchClasses(query)}>Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <Button type={"button"} onClick={() => openModal('create', EmptyClass)} >New Class</Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover className={"mt-4"}>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {
                    classes.map(classItem => (
                        <tr key={classItem.code}>
                            <td>{classItem.code}</td>
                            <td>{classItem.title}</td>
                            <td>{classItem.description}</td>
                            <td>
                                <Button className={"mr-2"} variant={"success"} onClick={() => openModal('details', classItem)}>
                                    Details
                                </Button>
                                <Button className={"mr-2"} variant={"primary"} onClick={() => openModal('edit', classItem)}>
                                    Edit
                                </Button>
                                <Button className={"mr-2"} variant={"danger"} onClick={() => onDeleteClassHandler(classItem.code)}>
                                    Delete
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
                        <ClassDetailModal selectedClass={selectedClass} /> :
                    modalMode === 'create' ?
                        <ClassCreateModal selectedClass={selectedClass} onChangeHandler={onChangeHandler} onSaveHandler={onSaveClassHandler} /> :
                        <ClassEditModal selectedClass={selectedClass} onChangeHandler={onChangeHandler} onSaveHandler={onSaveClassHandler} />
                }
            </Modal>
        </>
    );
}