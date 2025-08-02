# TypeBox

## Backend Setup Instruction
- add correct path in `application.yml` in `src/main/resources` folder against `app.uploadPath`
- edit the following properties in `application.properties`
  - `spring.datasource.url`: add your database url here
  - `spring.datasource.username`: add your database user
  - `spring.datasource.password`: add your db user's password
  **Note**: The user must create rhe above mentioned database and db user with required permissions.

## Frontend Setup Instrution
- create a `.env` file in `frontend` directory
- add following to it
    ```
    NEXT_PUBLIC_API_BASE_URL=<your_backend_base_url>/api/v1
    ```
    here is a sample
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
    ```
Now, 
- Start the backend, makesure it is running on same host and port as mention in `.env` of frontend.
- Start the frontend and hit `localhost:3000` if on local machine, else the url if hosted on a service/platform.

Thanks,
Aman Kr Pandey