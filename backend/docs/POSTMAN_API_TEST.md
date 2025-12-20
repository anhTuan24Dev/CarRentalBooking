# Tài liệu Test API - Postman

## Base URL
```
http://localhost:3000
```

---

## 1. Đăng ký người dùng mới

**Method:** `POST`  
**Endpoint:** `/api/users/register`  
**Auth:** Không cần

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "12345678"
}
```

**Response thành công (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi (400):**
```json
{
  "message": "Email đã được sử dụng",
  "success": false
}
```

---

## 2. Đăng nhập

**Method:** `POST`  
**Endpoint:** `/api/users/login`  
**Auth:** Không cần

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

**Response thành công (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi (401/404):**
```json
{
  "message": "Thông tin đăng nhập không chính xác",
  "success": false
}
```

---

## 3. Lấy thông tin người dùng hiện tại

**Method:** `GET`  
**Endpoint:** `/api/users/data`  
**Auth:** Cần token

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Response thành công (200):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user",
    "image": "",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Response lỗi (401):**
```json
{
  "message": "Không có token xác thực",
  "success": false
}
```

---

## 4. Thay đổi vai trò thành chủ xe (Owner)

**Method:** `POST`  
**Endpoint:** `/api/owner/changeRole`  
**Auth:** Cần token

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Body:** Không cần

**Response thành công (200):**
```json
{
  "message": "Đã thay đổi vai trò thành chủ xe thành công",
  "success": true
}
```

**Response lỗi (401):**
```json
{
  "message": "Không có token xác thực",
  "success": false
}
```

---

## Hướng dẫn sử dụng trong Postman

### Bước 1: Đăng ký hoặc đăng nhập
1. Gọi API `/api/users/register` hoặc `/api/users/login`
2. Copy token từ response

### Bước 2: Test các API cần xác thực
1. Vào tab **Authorization**
2. Chọn type: **Bearer Token**
3. Dán token vào ô **Token**
4. Hoặc thêm vào **Headers**:
   ```
   Authorization: Bearer <token>
   ```

### Lưu ý
- Token có hiệu lực trong 30 ngày
- Mật khẩu tối thiểu 8 ký tự
- Email phải là duy nhất trong hệ thống
- Vai trò mặc định là "user", có thể đổi thành "owner" qua API `/api/owner/changeRole`

