import React, { useEffect } from "react";

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...user, id: prevUsers.length + 1 },
      ]);
      onAdded();
    }
  }, [user]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.email.toLowerCase().includes(keyword.toLowerCase())
  );

  // Hàm kích hoạt chế độ chỉnh sửa (Deep Copy)
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  // Hàm xử lý thay đổi dữ liệu khi chỉnh sửa
  function handleEditChange(field, value) {
    if (["street", "suite", "city"].includes(field)) {
      setEditing(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setEditing(prev => ({ ...prev, [field]: value }));
    }
  }

  // Hàm lưu sau khi chỉnh sửa
  function saveUser() {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
    setEditing(null);
  }

  // Hàm hủy chỉnh sửa
  function cancelEdit() {
    setEditing(null);
  }

  // Hàm xóa người dùng
  function removeUser(id) {
    // Giữ lại tất cả người dùng có id khác với id cần xóa
    setUsers((prev) => prev.filter((u) => u.id != id));
  }


  return (
    <>
      {/* Modal Form chỉnh sửa người dùng */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh sửa người dùng</h3>
            
            <div className="form-group">
              <label htmlFor="edit-name">Name:</label>
              <input 
                id="edit-name" 
                type="text" 
                value={editing.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-username">Username:</label>
              <input 
                id="edit-username" 
                type="text" 
                value={editing.username}
                onChange={(e) => handleEditChange("username", e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-email">Email:</label>
              <input 
                id="edit-email" 
                type="email" 
                value={editing.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-street">Street:</label>
              <input 
                id="edit-street" 
                type="text" 
                value={editing.address.street}
                onChange={(e) => handleEditChange("street", e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-suite">Suite:</label>
              <input 
                id="edit-suite" 
                type="text" 
                value={editing.address.suite}
                onChange={(e) => handleEditChange("suite", e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-city">City:</label>
              <input 
                id="edit-city" 
                type="text" 
                value={editing.address.city}
                onChange={(e) => handleEditChange("city", e.target.value)}
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-save" onClick={saveUser}>
                Lưu
              </button>
              <button className="btn-cancel" onClick={cancelEdit}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bảng hiển thị người dùng */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Street</th>
            <th>Suite</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.street}</td>
              <td>{u.address.suite}</td>
              <td>{u.address.city}</td>
              <td>
                <button className="btn-edit" onClick={() => editUser(u)}>Sửa</button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ResultTable;