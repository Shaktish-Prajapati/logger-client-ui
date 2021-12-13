import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "../../css/AddProjectModal.css";
import { uploadNewProject } from "../../redux/action/ProjectAction";

const AddProjectModal = (props) => {
  const [createProject, setCreateProject] = useState({
    name: "",
    description: "",
  });
  const [chips, setchips] = useState("");
  const [modelType, setModelType] = useState([]);
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { loading, data, error } = createNewProjectReducer;
  const Dispatch = useDispatch();
  const deleteChips = (type) => {
    setModelType(
      //    modelType.filter(idx => idx !== type)
      modelType.filter((item) => {
        return item !== type;
      })
    );
  };

  const addChips = (e) => {
    console.log(e.key);
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      let inputChips = chips.trim();
      console.log(inputChips);
      if (inputChips) {
        if (!modelType.includes(inputChips.toLowerCase())) {
          setModelType([...modelType, inputChips]);
        }
        setchips("");
      }
    }
    console.log(modelType);
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorMsg("");
    if (!createProject.name.length) {
      setErrorName("Name is required Field.");
    }
    if (!modelType.length) {
      setErrorMsg("Device type is required");
    }

    if (createProject.name.length && modelType.length) {
      setErrorName("");
      setErrorMsg("");
      dispatch(
        uploadNewProject(
          createProject.name,
          modelType,
          createProject.description
        )
      );
      // props.closemodal()
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ color: "#1a83ff" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ float: "left" }}
        >
          Add New Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        {error ? <div style={{ fontSize: 12, color: "red" }}>{error}</div> : ""}
        {data ? (
          <h6 style={{ fontSize: 12, color: "green" }}>
            Porject Created Successfully...
          </h6>
        ) : (
          ""
        )}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ float: "left", color: "#212529" }}>
            Project Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Project Name"
            onChange={(e) =>
              setCreateProject({ ...createProject, name: e.target.value })
            }
            required
          />
          {errorName ? (
            <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ float: "left", color: "#212529" }}>
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="textarea"
            placeholder="Please Provide Project description"
            onChange={(e) =>
              setCreateProject({
                ...createProject,
                description: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ float: "left", color: "#212529" }}>
            Provide Device type
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Device type"
            value={chips}
            onKeyDown={(e) => {
              addChips(e);
            }}
            onChange={(e) => setchips(e.target.value)}
            required
          />
          {errorMsg ? (
            <small style={{ fontSize: 12, color: "red" }}>{errorMsg}</small>
          ) : (
            ""
          )}
        </Form.Group>

        {modelType.map((type) => (
          <div className="tag-item" key={type}>
            {type}
            <button
              type="button"
              className="button"
              onClick={() => {
                deleteChips(type);
              }}
            >
              &times;
            </button>
            {console.log(type)}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "#1a83ff" }}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProjectModal;
