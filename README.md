<div id="top"> </div> 

<!---- PROJECT LOGO ----> 
<div align="center">
  <h2 align="center"> 
    Liber Discord Bot  
  </h2>
  
  <p align="center">
    A discord bot for Liber company, developed with Node.js <br/> 
    Explore <a href="https://nodejs.org/en/docs/">Node.js</a> docs &#187; <br/> <br/>
    <a href="https://github.com/vihugoos/discord-bot/issues"> Report Bug </a> &nbsp;•&nbsp;
    <a href="https://github.com/vihugoos/discord-bot/issues"> Request Feature </a>
  </p>
</div>


<!---- TABLE OF CONTENTS ----> 
<details>
  <summary> Table of Contents </summary>
  <ol>
    <li>
      <a href="#about-the-project"> About The Project </a>
      <ul>
        <li><a href="#built-with"> Built With </a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started"> Getting Started </a>
      <ul>
        <li><a href="#prerequisites"> Prerequisites </a></li>
        <li><a href="#installation"> Installation </a></li>
        <li><a href="#usage"> Usage </a></li>
      </ul>
    </li>
    <li><a href="#contributing"> Contributing </a></li>
    <li><a href="#contact"> Contact </a></li>
  </ol>
</details>


<!---- THE PROJECT ---->
## About The Project 

<img src="" align="center" alt="Project Home Page">
An API for creating and delivering orders. The customer registers a new order, later a deliveryman takes over the delivery, after the completion, the deliveryman closes the order. 


### Built With 

<div style="display: inline_block">
    <!-- Icon JavaScript --> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"> 
      <img align="center" alt="Icon-JS" height="33" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"> 
    </a> &nbsp;
    <!-- Icon Discord.js --> 
    <a href="https://discord.js.org/"> 
      <img align="center" alt="Icon-Discord.js" height="50" src="https://user-images.githubusercontent.com/44311634/226442580-bc1ea892-bec6-4e8e-926c-3e15ff8a6201.png"> 
    </a> &nbsp;
    <!-- Icon ChatGPT --> 
    <a href="https://openai.com/blog/chatgpt"> 
      <img align="center" alt="Icon-ChatGPT" height="35" src="https://user-images.githubusercontent.com/44311634/226442655-d6692d41-8e92-4e59-a20d-be4df02cbab6.png"> 
    </a> &nbsp; 
    <!-- Icon Prisma -->
    <a href="https://www.prisma.io/"> 
      <img align="center" alt="Icon-Prisma" height="30" src="https://user-images.githubusercontent.com/44311634/178335052-08bb4b29-c4da-4100-ae71-8b65cf6cd581.png"> 
    </a> &nbsp;
     <!-- Icon PostgreSQL --> 
    <a href="https://www.postgresql.org/"> 
      <img align="center" alt="Icon-PostgreSQL" height="35" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg"> 
    </a> &nbsp;
    <!-- Icon Docker -->
    <a href="https://www.docker.com/"> 
      <img align="center" alt="Icon-Docker" height="53" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"> 
    </a> 
</div>

<br/>
<br/>


<!---- GETTING STARTED ----> 
## Getting Started

To get started, you need to have <strong>Node.js 19+</strong> installed on your machine, for more information visit <a href="https://nodejs.org/en/download/"> Node.js Downloads</a>. You will also need to have <strong>Docker</strong> installed, for more information visit <a href="https://docs.docker.com/engine/install/">Docker Engine Install</a>. 

<strong>Obs:</strong> This guide will only serve to run the project locally (development environment), initially based on linux systems.


### Prerequisites 

Other than Node.js and Docker installed, no prerequisites are needed to install the application.


### Installation 

1. Clone the repo 
   ```bash
   git clone https://github.com/vihugoos/delivery-server.git 
   ```
2. Inside the project root directory install all project dependencies 
   ```cmd
   npm install
   ```
3. Create an `.env` file with environment variables 
   ```bash
   cat > .env << EOF
   TOKEN=yourBotToken

   CLIENT_ID=yourClientID

   GUILD_ID=yourGuildID

   OPENAI_API_KEY=yourOpenAiKey

   DATABASE_URL="postgresql://postgres:docker@localhost:5432/liber?schema=public"
   EOF
   ```
4. Create a postgres container docker
   ```cmd
   docker run --name liber -e POSTGRES_DB=liber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres 
   ```
4. Run the migrate
   ```cmd
   npx prisma migrate dev
   ```


<!---- USAGE EXAMPLES ----> 
## Usage

With the installation complete, we can start the project.

* Starting the project 
   ```bash
   npm run dev  
   ```

<br/> <br/> 


<!---- CONTRIBUTING ---->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<br/> 


<!---- CONTACT ---->
## Contact

Developer @vihugoos - victorhugoos@live.com  

<p align="right"><a href="#top"> &#129045; back to top </a></p> 
