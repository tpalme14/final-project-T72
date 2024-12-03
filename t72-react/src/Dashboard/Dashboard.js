function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <section className="summary">
        <h3>Recent Innovations in Clean Energy</h3>
        <p>
          In the last six months, clean energy has seen remarkable advancements in various sectors. Solar and wind power have continued to dominate the renewable energy market, with significant improvements in efficiency and storage solutions. Researchers have made strides in developing high-capacity batteries that can store energy more efficiently, addressing one of the biggest challenges in renewable energy – intermittency. In addition, hydrogen power has gained attention as an alternative clean energy source, with new green hydrogen production methods emerging that use renewable energy to extract hydrogen from water.
          Another key innovation is the growing adoption of floating solar farms. These farms, placed on bodies of water, not only help generate renewable energy but also reduce evaporation, making them a more sustainable option in water-scarce regions. Advances in wind turbine design, such as larger blades and higher turbines, have also made wind energy more cost-effective and efficient, especially in offshore installations.
          These innovations are crucial as the world accelerates its transition toward a more sustainable and environmentally-friendly energy future, reducing carbon emissions and reliance on fossil fuels.
        </p>
        <p>
          Source: <a href="https://www.energy.gov/eere/innovation" target="_blank" rel="noopener noreferrer">Department of Energy - Clean Energy Innovations</a>
        </p>
      </section>
      <section className="technical">
        <h3>Technical Aspects of This Project</h3>
        <p>
        This project uses MongoDB, Express, React, and Node.js. The frontend of the application is built with React, so the login page, dashboard, and other components like the menu are all built using React. The app also uses React Router for navigation between different pages (e.g., Login, Dashboard, Reports, etc.).
        </p>
        <p>
        The backend is built with Node.js and Express, which are used to create a RESTful API to handle various requests, such as user authentication and fetching data. For authentication, JWT (JSON Web Token) is used to securely manage user login sessions.
        </p>
        <p>
        The application uses MongoDB for data storage. For this project, MongoDB is used to manage users and data for the charts. The backend communicates with the MongoDB database through Mongoose.
        </p>
        <p>
        For user authentication, the app uses JWT tokens. When users log in with their credentials, the backend generates a JWT token, which is then stored in localStorage on the frontend. This token is used to verify that users are authenticated before accessing protected routes such as the dashboard.
        </p>
        <p>
        During development, the React frontend runs on port 3000, while the Express backend runs on port 5000. To facilitate communication between the frontend and backend, a proxy is set up in the package.json file of the React app, enabling seamless API calls. In production, both the frontend and backend will be hosted on the same server using NGINX or Apache to serve the static React files and handle API requests.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;