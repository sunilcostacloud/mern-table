import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";

import { getEmployeeProfile } from "store/getEmployeeProfile";

const EmployeesProfile = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();


    const { employeeProfileData, employeeProfileIsLoading, employeeProfileIsError, employeeProfileError, employeeProfileIsSuccess } = useSelector((state) => state.employeeProfile);

    // console.log("checkGetEmployeeProfile", employeeProfileData, employeeProfileIsLoading, employeeProfileIsError, employeeProfileError, employeeProfileIsSuccess)

    useEffect(() => {
        dispatch(getEmployeeProfile({ id }))
    }, [dispatch, id]);

    return employeeProfileIsLoading ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <CircularProgress />
        </div>
    ) : employeeProfileIsError ? (
        <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
            <h1>{employeeProfileError}</h1>
        </div>
    ) : employeeProfileIsSuccess ? (
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "max-content", margin: "auto" }}>
                    <Card variant="outlined" style={{ marginTop: "20px" }}>
                        <CardContent>
                            <div>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3>{employeeProfileData?.fname + " " + employeeProfileData?.lname}</h3>
                                <h4>Email: {employeeProfileData?.email}</h4>
                                <h5>Phone Number: {employeeProfileData?.mobile}</h5>
                                <h4>Gender: {employeeProfileData?.gender}</h4>
                                <h4>Location: {employeeProfileData?.location}</h4>
                                <h4>Status: {employeeProfileData?.status}</h4>
                                <h5>
                                    Date Created:-
                                    {moment(employeeProfileData?.datecreated).format("DD-MM-YYYY")}
                                </h5>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    ) : ""
}

export default EmployeesProfile