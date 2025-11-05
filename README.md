# Quản Lý Người Dùng - React Application

## Thông tin sinh viên
- Tên: Nguyen Khanh Nam
- MSSV: 20225749

## Tính năng đã hoàn thành

### ✅ BƯỚC 6: SỬA NGƯỜI DÙNG (EDIT)
- **State quản lý**: `const [editing, setEditing] = React.useState(null)`
- **Deep Copy**: Sử dụng spread operator để sao chép đối tượng user và address
  ```javascript
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }
  ```
- **Cập nhật dữ liệu**: Hàm `handleEditChange()` xử lý thay đổi cho từng trường
- **Lưu dữ liệu**: Sử dụng `Array.map()` để tìm và thay thế user theo ID
  ```javascript
  function saveUser() {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
    setEditing(null);
  }
  ```
- **UI**: Form chỉnh sửa hiển thị dạng Modal với các trường: Name, Username, Email, City

### ✅ BƯỚC 7: XÓA NGƯỜI DÙNG (DELETE)
- **Logic xóa**: Sử dụng `Array.filter()` để loại bỏ user có ID tương ứng
  ```javascript
  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id != id));
  }
  ```
- **Không cần xác nhận**: Xóa trực tiếp khi click nút "Xóa"
- **State immutability**: Tạo mảng mới thay vì chỉnh sửa trực tiếp state

### ✅ BƯỚC 8: GIAO DIỆN (CSS) VÀ MODAL FORM
- **Modal Overlay**: 
  - Position: fixed, full screen
  - Background: rgba(0, 0, 0, 0.4)
  - Flex center alignment
  - Z-index: 999

- **Modal Content**:
  - Width: 400px (max-width: 90%)
  - Padding: 30px
  - Border-radius: 6px
  - Box-shadow cho hiệu ứng nổi

- **Bảng dữ liệu**:
  - Border-collapse cho viền đẹp
  - Hover effect trên rows
  - Header màu xanh (#007bff)
  - Alternating row colors

- **Form styling**:
  - Label và input rõ ràng
  - Focus state với border màu xanh
  - Button với màu sắc theo chức năng:
    - Thêm/Lưu: Xanh lá (#28a745)
    - Sửa: Vàng (#ffc107)
    - Xóa: Đỏ (#dc3545)
    - Hủy: Xám (#6c757d)

## Cấu trúc thư mục

```
src/
├── components/
│   ├── App.jsx              # Component chính
│   ├── SearchForm.jsx       # Form tìm kiếm
│   ├── AddUser.jsx          # Form thêm user (Modal)
│   └── ResultTable.jsx      # Bảng hiển thị + Form sửa (Modal)
├── styles.css               # CSS toàn cục
└── index.js                 # Entry point
```

## Hướng dẫn chạy dự án

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Chạy development server**:
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt**:
   - URL: http://localhost:5173/ hoặc http://localhost:5174/

## Các kỹ thuật React đã sử dụng

1. **useState Hook**: Quản lý state cho users, editing, adding, keyword
2. **useEffect Hook**: Fetch dữ liệu từ API và xử lý side effects
3. **Deep Copy**: Spread operator (...) để sao chép objects
4. **Array Methods**:
   - `map()`: Render danh sách và cập nhật user
   - `filter()`: Tìm kiếm và xóa user
   - `includes()`: Kiểm tra điều kiện
5. **Conditional Rendering**: Hiển thị Modal khi cần
6. **Event Handling**: onChange, onClick events
7. **Props**: Truyền dữ liệu giữa components
8. **Controlled Components**: Input được controlled bởi state

## Lưu ý kỹ thuật

- **Immutability**: Không bao giờ mutate state trực tiếp
- **Deep Copy**: Phải copy cả nested objects (address)
- **Callback trong setState**: Dùng `prev =>` để đảm bảo state mới nhất
- **Key prop**: Dùng `id` làm key khi render list
- **Modal**: Click overlay có thể thêm close modal (optional)

## API sử dụng

- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/users
  - Mock API miễn phí cho testing
  - Trả về 10 users với đầy đủ thông tin
