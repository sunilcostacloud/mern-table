import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import NotificationDialog from '../notifications/NotificationDialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";

import { deleteEmployee, deleteEmployeeReset } from 'store/deleteEmployee';
import { getEmployeeTable } from 'store/getEmployeeTable';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteEmployee = (props) => {

    const dispatch = useDispatch();

    const { deleteEmployeeOpen, setDeleteEmployeeOpen, tableRowId, page, setCurrentPage } = props;


    const { employeeDeletedData, employeeDeleteDataLoading, employeeDeleteDataIsError, employeeDeleteDataError, employeeDeleteDataIsSuccess } = useSelector((state) => state.deleteEmployeeData);

    // console.log("employeeDeletedData", employeeDeletedData)

    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const handleNotificationClickOpen = () => {
        setNotificationOpen(true);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
        setSuccessMessage("")
        setFailureMessage("")
    };

    const handleDeleteEmployeeClose = () => {
        setDeleteEmployeeOpen(false)
    }

    const handleUserDelete = () => {
        dispatch(deleteEmployee({ id: tableRowId }))
    }

    useEffect(() => {

        if (employeeDeleteDataIsSuccess) {
            setSuccessMessage("User Deleted Successfully")
            setFailureMessage("")
            handleDeleteEmployeeClose()
            handleNotificationClickOpen()
            dispatch(deleteEmployeeReset())
            sessionStorage.setItem("employeePage", page)
            setCurrentPage(page)
            dispatch(getEmployeeTable({ search: "", gender: "all", status: "all", sort: "new", page }))

        } else if (employeeDeleteDataIsError) {
            setSuccessMessage("")
            setFailureMessage("Something Went Wrong")
            handleNotificationClickOpen()
            dispatch(deleteEmployeeReset())
        }

    }, [employeeDeleteDataIsSuccess, employeeDeleteDataIsError])

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={deleteEmployeeOpen}
                onClose={handleDeleteEmployeeClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div style={{ textAlign: "center" }} >
                        <h3 style={{ marginTop: "0px" }} >Are you sure to delete this user</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }} >
                        <Button variant="contained" color="primary" onClick={handleDeleteEmployeeClose} >
                            No
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleUserDelete} >
                            {employeeDeleteDataLoading ? (
                                <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                                "Yes"
                            )}
                        </Button>
                    </div>

                </DialogContent>

            </Dialog>

            <NotificationDialog notificationOpen={notificationOpen} handleNotificationClose={handleNotificationClose} successMessage={successMessage} failureMessage={failureMessage} />
        </div>
    )
}

export default DeleteEmployee