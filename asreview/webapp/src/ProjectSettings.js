import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // DialogContentText,
  Typography,
  TextField,
} from '@material-ui/core';

import axios from 'axios'
import { api_url } from './globals.js';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  deleteButton: {
    margin: 5,
  },
  header :{
    marginBottom: 10,
  },
  inputDelete:{
    marginBottom: 10,
    marginTop: 10,
  }
});

export default function ProjectSettings(props) {

  // set the styles
  const classes = useStyles();

  // state variables
  const [deleteInput, setDeleteInput] = React.useState("")

  // useeffect
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (props.settings) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.settings]);

  const deleteProject = (evt) => {
    evt.preventDefault();

    const url = api_url + `project/${props.id}/delete`;

    if (deleteInput === props.id) {
      axios.delete(url)
        .then(function (res) {
          props.handleAppState("projects");
        })
        .catch(function (res) {
            console.log("Failed to delete project")
        });
    }
  }

  const onChange = (evt) => {
    setDeleteInput(evt.target.value)
  }

  return (
      <Dialog
        open={props.settings}
        onClose={props.toggleProjectDelete}
        scroll="paper"
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="delete-project-title"
        >
          Delete project '{props.id}'?
        </DialogTitle>
        <DialogContent dividers={true}>
            <Typography>
              Delete your project by typing the project name '{props.id}' below.
            </Typography>
            <TextField
              className={classes.inputDelete}
              fullWidth
              required
              name="project-name"
              id="project-name"
              label="Project name"
              onChange={onChange}
            />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.toggleProjectDelete}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteProject}
            disabled={deleteInput !== props.id}
          >
            Yes, Delete project
          </Button>
        </DialogActions>
      </Dialog>
  );
}
