import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Tab, Tabs} from "react-bootstrap";
import Students from "./components/students";
import {useEffect, useState} from "react";
import Classes from "./components/classes";

const defaultTab = "students";

function App() {
    const [currentTab, setCurrentTab] = useState(defaultTab);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);

    const fetchClasses = async (query = '') => {
        let response = await fetch(`/classes?query=${query}`);
        response = await response.json();
        setClasses(response);
    };

    const fetchStudents = async (query = '') => {
        let response = await fetch(`/students?query=${query}`);
        response = await response.json();
        setStudents(response);
    }

    const onChangeTab = async (key) => {
        if (key !== currentTab) {
            if (key === 'students') {
                await fetchStudents();
            }
            if (key === 'classes') {
                await fetchClasses();
            }
            setCurrentTab(key);
        }

    };

    useEffect(async () => await fetchClasses(), []);

    return (
        <div>
              <Navbar bg={"dark"} variant={"dark"} expand={"lg"} sticky={"top"}>
                    <Container>
                        <Navbar.Brand>Digital Harbor - S4</Navbar.Brand>
                    </Container>
              </Navbar>
              <Container className={"mt-4"}>
                    <h3>Super Simple Scheduling System</h3>
                    <Tabs defaultActiveKey={defaultTab} id={"main-tab"} onSelect={onChangeTab}>
                        <Tab title={"Students"} eventKey={"students"}>
                            <Students students={students} fetchStudents={fetchStudents} />
                        </Tab>
                        <Tab title={"Classes"} eventKey={"classes"}>
                            <Classes classes={classes} fetchClasses={fetchClasses} />
                        </Tab>
                    </Tabs>
              </Container>
        </div>
    );
}

export default App;
