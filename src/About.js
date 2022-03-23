import React, { Component} from 'react';
import SvgLines from 'react-mt-svg-lines';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class About extends Component {
    constructor(props) {
        super(props);
      }
    
      render(){
        return (
      <>
      <div className='about personal' style={{alignItems:'center', height:'90vh', display:'flex', overflow:'hidden'}}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={130}
        variableHeight={true}
        totalSlides={3}
        infinite={true}
        style={{display:'block', width:'100%', height:'65vh', 
      overflow:'hidden',}}
      >
        <Slider>
          <Slide index={0} style={{overflowY: 'scroll'}}  ><div >
          <p> Welcome to my personal website, where I will keep an updated accounting of what I've done,
           what I'm working on, and where I'm headed next. Because  what I'm working on is always evolving and changing, this website will be a living document. Make sure to check back in for new content, projects, and features!
        </p>
        <p>
        My name is Robert Teresi and 
        I am a data-intensive research associate at the Yale School of Management, working in the Organizational Behavior group. 
          In my role, I have had the privilege of pursuing my interests in empirical research, social sciences, and data science to 
          answer new questions about human relationships and organizations on micro- and macro scales. If you click the research projects tab, I have listed some of the research I have been involved with in a significant way.
        </p>
        <p>
        I'm driven by using data to learn more about the world, and I'm always learning more about ways to drive deeper insights. Recently, I've been interested in applications for sparse/high-dimensional matrices - SVD/PCA, factorization machines, and embedding techniques more generally. 
        </p>
        <br></br> 
      </div> 
      <div style={{display: 'flex',flexDirection: 'row', width: '95%',
                   position: 'relative', justifyContent:'space-between'}}>
        <ButtonBack>About This Website</ButtonBack>
        <ButtonNext style={{ justifyContent: 'center', alignItems:'center'}}>Research Projects</ButtonNext> 
      </div>
      </Slide>
          <Slide index={1} style={{overflowY: 'scroll'}} >
            <h3>Research Projects</h3>
            <br></br>
            <p>Work team identification associated with less stress and burnout among front-line emergency department staff amid the COVID-19 pandemic (Sangal, Wrzesniewski, DiBenigno, Reid, Ulrich, Liebhardt, Bray, Yang, Eun, Venkatesh, King)
            <br></br>
          <em style={{"color":"#b8b8b8"}}> <a href="https://bmjleader.bmj.com/content/5/1/51">BMJ Leader </a> (2021) </em> and featured in <em> 
            <a href="https://insights.som.yale.edu/insights/identifying-with-team-helps-prevent-stress-and-burnout-among-healthcare-workers">Yale Insights</a></em></p>
          <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li>Built automatic survey-sending service for Yale New Haven Hospital System that updated in real time with changes in the hospital's scheduling platform. </li>
              <li>Sent surveys 15 minutes before the end of staff and faculty shifts during the peak of the first wave of the COVID pandemic to help understand and prevent sources of stress and burnout among physicians, residents, APPs, and nurses. </li>
          </ul>
          <br></br>
          <p> Detrimental Effects of Organizations’ Instrumental Diversity Rhetoric for Underrepresented Group Members’ Sense of Belonging (<a href="https://som.yale.edu/faculty/oriane-m-georgeac">Georgeac</a>)
 <br></br>
          <em style={{"color":"#b8b8b8"}}> Journal of Personality and Social Psychology: Under Second Review </em></p>
          <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
            <li>Improved performance of an existing logistic LASSO classifier algorithm, training the algorithm to learn the characteristics of 2 distinct types of rhetoric: the “fairness case” for diversity (e.g., “diversity at work is the right thing to do”) and the “business case” for diversity (e.g., “diversity at work is good for business”).</li>
            <li> Used the trained classifier to run out-of-sample predictions on whether Fortune 500 companies’ online diversity statements corresponded to a “fairness” case or a “business case”, with the goal of investigating the current prevalence of these two diversity narratives in organizations.</li>
          </ul>
          <br></br>
          <p>"Who's On Next?" How Attending Physician Speed is Slowed by the Presence of Faster Concurrently Staffed Physicians (<a href="https://medicine.yale.edu/profile/rohit_sangal/?tab=research">Sangal</a>, Teresi, <a href="https://medicine.yale.edu/profile/arjun_venkatesh/"> Venkatesh</a>,<a href="https://som.yale.edu/faculty/marissa-king">King</a>)<br></br> <em style={{"color":"#b8b8b8"}}> Under Review at Annals of Emergency Medicine</em></p>
          <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li>Created predictive model of patient care time, and derived from it a metric of relative physician speeds from Yale New Haven Hospital Emergency Department internal databases across multiple campuses.</li>
              <li>Utilizing random assignment of patients to doctor speed, we estimate a decrease in primary attending treatment speed, increase in patients treated, and decrease in scans ordered when concurrently staffed physicians are faster.</li>
          </ul>
          <br></br>
          <p> Cognitive Frames on Racism and Political Ideology: Evidence from Twitter Activity around the Black Lives Matter Movement (<a href="https://cydneydupree.com/">Dupree</a>, Teresi, <a href="https://www.linkedin.com/in/leilah-harouni"> Harouni</a>)<br></br> <em style={{"color":"#b8b8b8"}}> Draft in Progress </em></p>
          <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li>On all tweets that joined the #blacklivesmatter conversatioin (as well as those with similar hashtags), explored how the intersection of race, age, gender, and political ideology influence how people frame discussions on race on an axis of personal (e.g. biases, microgression, and community) vs. structural (elections, police reform, and structural racism).</li>
              <li>Coordinated twitter API calls across 30+ twitter API accounts within the department across as many remote virtual machines.</li>
              </ul>
          <br></br>
          <p>Entrepreneurship Among Real Estate Agents (<a href="https://som.yale.edu/faculty/tristan-l-botelho">Botelho</a>, <a href="https://www.linkedin.com/in/geoffreyborchhardt">Borchhardt</a>, Teresi) <em style={{"color":"#b8b8b8"}}> <br></br>Data analysis in progress</em></p>
            <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li>Using real estate listing data from Multiple Listing Services databases across America from 2000-2015 to uncover patterns entreprerneurship among real estate agents. </li>
              <li>Answering questions of who starts their own firms and measuring the returns on entrepreneurial endeavours.</li>
            
            </ul>
            <br></br>
            <p>Doctor-Prescriber Networks and Opioid Overprescription Defusion (<a href="https://som.yale.edu/faculty/marissa-king">King</a>, Teresi) <em style={{"color":"#b8b8b8"}}> <br></br>Data analysis in progress</em></p>
            <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li> Using a comprehensive dataset of pharmacy data across the United States, created doctor-prescriber networks within hostpital referral regions (a shared tie corresponds to two doctors who gave a prescription to at least one common patient). </li>
              <li> Exploiting geographic movements across hospital referral regions, exploring whether doctors' network prominence (eigencentrality, betweenness centrality, degree, etc.) influence whether doctors in their destination hospital referral region adopt their opioid prescription behavior. </li>
            
            </ul>
            <br></br>
            <p>Effectiveness of Mobile Text-Message Reminders in Increasing Resident Feedback (Sun, Coughlin, Della-Giustina, Goldflam, Sangal, Teresi, Bathgate, Tsyrulnik) <em style={{"color":"#b8b8b8"}}> <br></br>Data Collection in Progress</em></p>
            <ul style={{marginLeft:30,
                        color:"black",
                        fontWeight:100}}>
              <li> A study within Yale New Haven Hospitals Emergency Departments aiming to improve physician feedback on resident performance.</li>
              <li> Utilized code I wrote to send out text messages at the end of staff and faculty shifts to send out reminders to fill out feedback forms.</li>
              <li> Results from first stage of the study (text messages to residents only) doubled completion of feedback forms. </li>
            
            </ul>
            <br></br>
          <div style={{display: 'flex',flexDirection: 'row', width: '95%',
                   position: 'relative', justifyContent:'space-between'}}>
          <ButtonBack><div>About Me</div></ButtonBack>
          <ButtonNext style={{ justifyContent: 'center', alignItems:'center'}}>About This Website</ButtonNext> 
          </div>
          </Slide>
          <Slide index={2}>
            <p>This website is a single-page React app, written by me. The website is hosted with cPanel.</p>
            <p>On my contact page, you will find links to my socials and my email address.</p>
            <p>On the twitter ideology page, you can find a dashboard I created for one of my active research projects (more info in my projects page and the dashboard page itself).
               The dashboard was written with d3.js, optimizing the library for use with React by creating cross-graph reactivity and reusable, dynamic graph components.</p>
               <p>
               The backend of the dashboard delivers results from a sci-kit learn machine learning pipeline via a Python Flask app. If you enter in a public twitter user's username, they will be looked up using the Twitter API and scored by the model in real time if they are a valid account. </p>
               <br></br> 
            <div style={{display: 'flex',flexDirection: 'row', width: '95%',
                position: 'relative', justifyContent:'space-between'}}>
          <ButtonBack><div>Research Projects</div></ButtonBack>
          <ButtonNext style={{ justifyContent: 'center', alignItems:'center'}}>About Me</ButtonNext> 
          </div>
            </Slide>
        </Slider>
        
        
      </CarouselProvider>
      </div>
      <div className='about drawing' style={{
    alignItems: 'center',
    height: '80vh',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignContent: 'space-between',
    paddingTop:'30px',
    paddingBottom:'30px'
}} >
      <SvgLines animate={ true } stagger={100} duration={ 30000 } >
      <svg 
          id="svgId" 
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
            x="0"
            y="-300"
            width="100%"
            height="50vh"
            viewBox="-0 0 600 800"
            preserveAspectRatio="none"
            >
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 100 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 200 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 300 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 400 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 500 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 500 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 500 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 500 " />

     // From center out 
     <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 100 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 200 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 300 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 400 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 500 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 500 " />

        </svg>
        </SvgLines>
      </div>
      </>)
      }
    }
