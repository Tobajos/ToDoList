# ToDo List Application
## About

This project is a web application built with Django and Angular. It integrates a Django backend with an Angular frontend to create a full-stack ToDo List application.

## Features

- User authentication and authorization
- CRUD operations for lists and items
- Responsive design

## Technologies

- **Backend:** Django, Django REST Framework
- **Frontend:** Angular
- **Database:** SQLite
- **Styling:** CSS

## Installation

### Prerequisites

- Python 3.x
- Node.js
- Angular CLI
- Django
- Postman

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/todolist.git
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```

6. Start the Django development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the Angular development server:

    ```bash
    ng serve
    ```

The application should now be running, with the backend accessible at `http://127.0.0.1:8000/` and the frontend at `http://localhost:4200/`.

## Usage

- Access the Django admin panel at `http://127.0.0.1:8000/admin/` to manage the data.
- Use the Angular frontend to interact with the application.

## API Endpoints

Here are some of the main API endpoints provided by the Django backend:

- `POST /register`: Register a new user
- `POST /login`: Login a user
- `POST /logout`: Logout a user
- `GET /lists`: List all to-do lists
- `POST /lists`: Create a new to-do list
- `GET /lists/:id`: Get details of a specific to-do list
- `DELETE /lists/:id`: Delete a to-do list
- `POST /items`: Create a new item
- `PATCH /items/:id`: Update an item


## Screenshots

### Login Page
![obraz](https://github.com/Tobajos/ToDoList/assets/92229397/914706a1-57a9-4c95-a7a5-9eb6017be489)


### Home Page
![obraz](https://github.com/Tobajos/ToDoList/assets/92229397/4074a8dd-f6dc-47e3-a8e8-e425ffabf2a8)


### List Details
![obraz](https://github.com/Tobajos/ToDoList/assets/92229397/14d9bcd8-e9b1-4875-8e5b-05889bf319dd)



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
