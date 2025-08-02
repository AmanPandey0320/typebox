# TypeBox Backend API Documentation

## Base URL

```
/api/v1
```

---

## Endpoints

### 1. Upload File

- **URL:** `/api/v1/file/upload`
- **Method:** `POST`
- **Description:** Upload one or more files to the server.
- **Request:**
  - **Headers:** `Content-Type: multipart/form-data`
  - **Body:**
    - `files`: File(s) to upload (can be multiple)
    - `baseDir` (optional): String, target directory path
- **Response:**  
  - **200 OK**
    ```json
    {
    }
    ```
  - **400 Bad Request** (if file type not allowed, etc.)

---

### 2. List Files

- **URL:** `/api/v1/file/ls/{dir}`
- **Method:** `GET`
- **Description:** List all files for the current user or in a specific directory.
- **Query Parameters:**
  - `dir` (optional): String, directory path to list
- **Response:**  
  - **200 OK**
    ```json
    {

    }
    ```

---

### 3. Get File Metadata

- **URL:** `/api/v1/file/define/{id}`
- **Method:** `GET`
- **Description:** Get metadata for a specific file.
- **Path Parameter:**  
  - `id`: File ID
- **Response:**  
  - **200 OK**
    ```json
    {
    }
    ```
  - **404 Not Found** (if file does not exist)

---

### 4. Download File

- **URL:** `/api/v1/file/download/{id}`
- **Method:** `GET`
- **Description:** Download the contents of a file.
- **Path Parameter:**  
  - `id`: File ID
- **Response:**  
  - **200 OK**  
    - Returns file as binary stream with appropriate `Content-Type`.
  - **404 Not Found**

---

### 5. Create Folder

- **URL:** `/api/v1/file/create_folder`
- **Method:** `POST`
- **Description:** Create a new folder.
- **Request:**
  - **Body:**  
    ```json
    {
      "name": "New Folder",
      "parentDir": "some_id"
    }
    ```
- **Response:**  
  - **200 OK**
    ```json
    {
     
    }
    ```
  - **400 Bad Request** (if folder exists, invalid name, etc.)

---

### 6. Delete File or Folder

- **URL:** `/api/v1/file/{id}`
- **Method:** `DELETE`
- **Description:** Delete a file or folder by ID.
- **Path Parameter:**  
  - `id`: File or folder ID
- **Response:**  
  - **200 OK**
    ```json
    {

    }
    ```
  - **404 Not Found**

---

---

## Error Handling

- **400 Bad Request:** Invalid input, unsupported file type, etc.
- **404 Not Found:** File or folder does not exist.
- **500 Internal Server Error:** Unexpected server error.

---

## Notes

- **Supported file types:** txt, jpg, png, json, etc. (as per frontend restriction)
- **Authentication:** (If implemented) endpoints may require authentication headers (e.g., JWT).
- **Pagination:** (If implemented) list endpoints may support pagination via query