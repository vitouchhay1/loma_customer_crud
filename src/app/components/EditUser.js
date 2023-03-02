import React, { useEffect, useState } from "react";

import { useNavigate,useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";

const EditUser = () => {
  const navigate = useNavigate();
  const selectedUser = useSelector((state) => state.user.user);
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const defaultInitialValues = {
    name: '',
    address: "",
    mobile_no: "",
    email: "",
    gender: "male",
  };
  const [initialValues,setInitialValues] = useState(defaultInitialValues);
 

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    email: Yup.string().email(),
  });
  const handleUpdate = (formValue) => {
    setLoading(true);
    const picked = (({ name, address,email,mobile_no,gender }) => ({name, address,email,mobile_no,gender}))(formValue);
    if(id) {
      UserService.updateUser(id,picked).then(
          (response) => {
            console.log(response.data);
            navigate('/user');
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
    }
  }; 
  useEffect(() => {
    if(selectedUser && Object.keys(selectedUser).length) {
      console.log(selectedUser);
      setInitialValues(selectedUser);
    }
  },[selectedUser,setInitialValues])
  return (
    <>
      <div className="row">
        <div className="col-md-9 offset-1">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className={
                      "form-control" +
                      (errors.name && touched.name ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field
                    name="address"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address && touched.address ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile_no">Mobile</label>
                  <Field
                    name="mobile_no"
                    type="text"
                    className={
                      "form-control" +
                      (errors.mobile_no && touched.mobile_no ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="mobile_no"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile_no">Gender</label>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                    <Field type="radio" name="gender" value="male"/>
                    Male
                    </label>
                    <label>
                    <Field type="radio" name="gender" value="female" />
                    Femal
                    </label>
                </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="invalid-feedback"
                  />
                </div> 
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Update</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default EditUser;
