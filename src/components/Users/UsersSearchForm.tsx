import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterStateType } from "../../redux/reducers/users-reducer";
import { UserType } from "../../types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number;
    users: Array<UserType>,
    followingInProgress: Array<number>,
    onFilterChanged: (filter: FilterStateType) => void,
    onPageChanged: (pageNumber: number) => void,
    unFollowThunkCreator: (id: number) => void,
    followThunkCreator: (id: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string ) => void
  };

const UsersSearchForm: React.FC<PropsType> = (props) => {
  return (
    <Formik
      initialValues={{ term: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {       
        props.onFilterChanged(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <button type="submit" disabled={isSubmitting}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UsersSearchForm;
