
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectedUsers } from "../slices/user";

const BoardUser = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const fetchUser = (search = '',gender = '') => { 
    UserService.getUserBoard(search,gender).then(
      (response) => {
        const { data = [] } = response.data;
        if (data.length) {
          setUsers(data);
        }else{
          setUsers([]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    if (currentUser) {
      fetchUser();
    }
  }, [currentUser]);
  const onCreateUser = () => {
    navigate("/user/create");
  };
  const onEdit = (user) => {
    dispatch(selectedUsers(user));
    navigate(`/user/edit/${user.id}`);
  };
  const deleteUser = (id, key) => {
    UserService.deleteUser(id).then(
      (response) => {
        fetchUser(search,gender);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onSearch = () => {
    setSearchParams({ name:search,gender:gender });
    fetchUser(search,gender);
  };
  const onChange = (e) => {
    setGender(e.target.value);
    setSearchParams({ name:search, gender:e.target.value });
    fetchUser(search,e.target.value);
  }
  const onClear = () => {
    searchParams.delete("name");
    searchParams.delete("gender");
    setSearchParams({});
    setGender('');
    setSearch('');
    fetchUser('','');
  }
  return (
    <div className="container">
      <div className="row pb-2 pt-2 justify-content-end">
        <div className="col-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onCreateUser()}
          >
            Create
          </button>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-5 d-inline-flex align-items-center">
              Filter: 
              <select value={gender} className="form-select form-control" aria-label="Default select example" onChange={(e) => onChange(e)}>
                <option defaultValue value=''>--Select--</option>
                <option value="male" >Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-7 d-inline-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search something"
                  aria-describedby="basic-addon2"
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  style={{cursor:'pointer'}}
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={() => onSearch()}
                >
                  Search
                </span>
              </div>
              <button type="button" className="btn ml-2" onClick={() => onClear()}> Clear</button>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile_no</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((r, key) => {
            return (
              <tr key={r.id}>
                <th scope="row">{key + 1}</th>
                <td>{r.name}</td>
                <td>{r.address}</td>
                <td>{r.mobile_no}</td>
                <td>{r.email}</td>
                <td>{r.gender}</td>
                <td colSpan={2}>
                  <button
                    type="button"
                    className="btn btn-sm ml-2"
                    onClick={() => onEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteUser(r.id, key)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BoardUser;
