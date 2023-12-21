<div align="center">
<h1 align="center">

<br>NETWORK-MONITORING-TOOL</h1>
<h3>◦ Stay connected, stay informed.</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=flat-square&logo=chartdotjs&logoColor=white" alt="Chart.js" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat-square&logo=Python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/Flask-000000.svg?style=flat-square&logo=Flask&logoColor=white" alt="Flask" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON" />
</p>

</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running network-monitoring-tool](#-running-network-monitoring-tool)
    - [🧪 Tests](#-tests)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---


## 📍 Overview

The network-monitoring-tool repository is a project focused on providing a comprehensive solution for monitoring network traffic. It includes a backend application that captures and analyzes packets, enabling users to gain insights into their network's performance and security. With its user-friendly interface, this tool simplifies the monitoring process, enabling users to identify and address any network-related issues quickly. Whether it's optimizing network performance or identifying potential security threats, this repository offers a valuable resource for network administrators and IT professionals.

---

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The system follows a typical client-server architecture. The backend is implemented in Python using Flask, while the frontend is built with React. The data flow follows a RESTful API design pattern, with the frontend making HTTP requests to the backend for data retrieval and processing. Communication between the different components is achieved through API endpoints.|
| 📄 | **Documentation**  | The repository lacks comprehensive documentation. There are no README files or inline comments describing the code or its functionalities. Extensive documentation would greatly enhance the maintainability and ease of onboarding new contributors to the project.|
| 🔗 | **Dependencies**   | The system relies on several external libraries and frameworks. The backend uses Flask for web server functionality and scapy library for packet capture. The frontend uses React along with various JavaScript packages managed through npm. These dependencies are defined in the package.json and requirements.txt files.|
| 🧩 | **Modularity**     | The system's codebase is well-organized into separate backend and frontend directories. The backend code is organized into separate modules, such as `app.py` for handling API endpoints and `packet_capture.py` for packet capturing functionality. The frontend code follows the standard React component structure, with each component handling specific UI elements and functionality. This modular approach allows for easier maintenance and extensibility of the system.|
| 🧪 | **Testing**        | There is no evident testing strategy or framework in place in the repository. No unit tests or integration tests are included. The lack of tests can make it difficult to ensure the reliability and correctness of the system as it evolves over time. The addition of automated tests would greatly enhance the quality and stability of the codebase.       |
| ⚡️  | **Performance**    | As there are no explicit performance optimizations mentioned or observed in the codebase, the performance of the system cannot be assessed. Considerations such as efficient data processing, minimizing network latency, and optimizing database queries are essential for improving performance. Monitoring tools like profiling and load testing can help identify and address potential bottlenecks.|
| 🔐 | **Security**       | The codebase does not appear to have specific security measures implemented. It is crucial to implement best practices such as input validation, secure communication using HTTPS, and secure storage of sensitive information. Additionally, protecting against cross-site scripting (XSS) and SQL injection attacks are essential security considerations. A security assessment and implementation of security measures are recommended.|
| 🔀 | **Version Control**| The repository uses Git for version control. However, the repository lacks documentation on branching strategies, commit conventions, and release management. These practices help ensure a smooth and well-organized development process, promote collaboration, and provide a history of changes made to the codebase. The addition of clear version control guidelines would improve codebase management and collaboration.|
| 🔌 | **Integrations**   | The system does not appear to have any direct integrations with external systems or services. However, integration possibilities could include database systems for storing captured packet data, authentication systems for user management, and third-party APIs for additional functionality or data sources. The code

---


## 📂 Repository Structure

```sh
└── network-monitoring-tool/
    ├── backend/
    │   ├── app.py
    │   └── packet_capture.py
    ├── env/
    │   ├── Lib/
    │   │   └── site-packages/
    │   ├── Scripts/
    │   │   ├── activate
    │   │   ├── activate.bat
    │   │   ├── Activate.ps1
    │   │   ├── deactivate.bat
    │   │   ├── scapy-script.py
    │   └── share/
    │       └── man/
    ├── frontend/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── NetworkChart.css
    │       ├── NetworkChart.js
    │       ├── PacketLineChart.js
    │       ├── PacketPie.js
    │       ├── reportWebVitals.js
    │       ├── setupTests.js
    │       └── TrafficBarChart.js
    └── requirements.txt

```

---



## 🚀 Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

- [Node.js](https://nodejs.org/) 

- [Python](https://www.python.org/downloads/)   

- [WinPcap](https://www.winpcap.org/install/default.htm) 


### 🔧 Installation

1. Clone the network-monitoring-tool repository:
```sh
git clone https://github.com/arielya10/network-monitoring-tool
```

2. Change to the project directory:
```sh
cd network-monitoring-tool
```

3. Install the dependencies:
```sh
pip install -r requirements.txt
cd ..\frontend
npm install
```

### 🤖 Running network-monitoring-tool

1. Run the backend:
```sh
python .\backend\app.py
```
2. In another terminal Change to the front end directory:
```sh
cd .\frontend
```
3. Run the frontend:
```sh
npm start
```

### 🧪 Tests
```sh
pytest
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/arielya10/network-monitoring-tool/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/arielya10/network-monitoring-tool/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/arielya10/network-monitoring-tool/issues)**: Submit bugs found or log feature requests for ARIELYA10.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License


This project is protected under the [MIT](https://opensource.org/license/mit/) License.

---


