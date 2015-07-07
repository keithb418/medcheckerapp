##Online at http://medcheckerapp.com

##Synopsis (What)
MedChecker is developed to help users by providing information about the warnings and interactions between the drugs they, or someone they are caring for, are taking.  Our end user guide is located in “documentation/MedChecker_User_Guide.pdf”.

##Motivation (Why)
While this project is a prototype designed and developed as LongView’s entry for the GSA/18F’s Agile Delivery BPA, our team realized this solution hits closer to home for many.  Members of our team, including their families, take multiple prescription drugs and rarely look beyond the doctor’s word for safety.  The creation of this project is to ensure a simple, user-friendly solution for users to enter their medications and query the FDA’s Adverse Event Drug datasets to visually see the warnings associated. 

##Agile Approach (How)
All evidence required by GSA/18F Agile Delivery BPA from Attachment E (Full Stack) is located in “documentation/LongView_Evidence_Documentation.pdf”

Our team aligned our approach to MedChecker product development using our experience from past Agile efforts and in alignment with the US Digital Services Playbook.  To meet the original deadline of one week, our team compressed multiple sprints into a 6 day schedule.

##Play 1
To understand what people need, we held a brainstorming session, first amongst the product team (due to quick turnaround) and then amongst LongView staff not associated with the Agile Delivery BPA effort.

##Play 2
Address the whole experience, front start to finish.  On day one, we brainstormed regarding the datasets, finalized a selection on drug labels and formed a scrum team.  On day 2, we created 7 stories with acceptance criteria and sub-tasks.  On days 3 to 6, we continued to receive user input, make changes, added new stories, and close stories based on the definition of done.

##Play 3
Make MedChecker simple and intuitive.  Our goal from the beginning for the prototype was to limit amount of screens and focus on user’s entering drugs and viewing results both through text and graphically.  Additional features would go into our product backlog, such as type-ahead search functionality, social media logins and integration with NIH Pillbox.  Using design guides, such as Google’s Material Design Guidelines and color palettes, along with user focus groups honed us into the UI MedChecker uses today.

##Play 4/Play 7
Build the service using agile & iterative practices.  Bring in experience teams.  Our team was built using all roles identified by GSA in Full Stack grouping.  We established a team working with dedicated team members focused on front-end, back-end, DevOps, Security and QA/Test experience.  Our UX/UI designer, Scrum Master, Product Owner and Delivery Manager were co-located with the scrum team.  We used scrum framework with daily sprints for 6 days of development.  Started each day with stand-up by physical scrum board to identify work in progress or completed sub-tasks.  Finished each day with retrospective to identify areas of improvement and things going well.  Captured user stories with acceptance criteria and sub-tasks for back-end, front-end and QA/Test.  Completed stories on days 3-6 based on the definition of done 

##Play 6
Assign on leader and hold that person accountable.  Documented in “documentation/LongView_Evidence_Documentation.pdf”, slide 7

##Play 8
Choose a modern technology stack.  Our team leveraged several technologies for MedChecker such as Backbone, D3, Spring, MongoDB, Bootstrap, Gradle, Snap.svg, Grunt, Docker
 
##Play 9
Deploy in a flexible hosting environment.  Our team deployed MedChecker in a docker container and is hosted on Amazon Web Services.

##Play 10
Automate testing and deployments.  Beyond unit testing, our team used automated testing and continuous integration, both documented in “documentation/LongView_Evidence_Documentation.pdf”, slide 17.

##Play 11
Manage security and privacy through reusable processes.  Documented the role our security engineer played in the concept and design of MedChecker in “documentation/LongView_Evidence_Documentation.pdf”, slide 20.

##Play 12
Use data to drive decisions, using results from focus groups and internal brainstorming, our team has populated a product backlog for future versions.  While MedChecker currently does not include mechanisms to capture user analytics, we intend to include those analytics to be a part of future sprint planning sessions and product roadmap development efforts.

##Play 13
Default to open.  As outlined in our license below, our source code is open sourced.  We leveraged open data sets, such as OpenFDA’s Drug Label Data API: https://api.fda.gov/drug/label.json.  We provide our MedChecker API at http://medcheckerapp.com/MedCheckerResources/drugs/search/<search-string> and http://medcheckerapp.com/MedCheckerResources/drugs/graph.

These plays from the US Digital Services Playbook, aligned with our experienced team and past corporate performance across multiple Federal efforts led to the MedChecker prototype completed in 6 days using an Agile methodology and leveraging open standards.

##Installation
Our code is deployed in a Docker container hosted  at https://registry.hub.docker.com/u/clurect/lv-gsa-app/.  
To use it after pulling just run “docker run -d -p 8080:8080 -p 27017:27017 clurect/lv-gsa-app”.  To see the application running go to <DOCKER_ADDR>:8080/med-checker in your browser

##Original source code repos available at
Front-end - https://github.com/keithb418/lv-gsa/
Back-end - https://github.com/jhillhouse92/lv-gsa-resources - Please view the gsa-resource-release-1.0 branch.

##API Reference
openFDA is a research project to provide open APIs, raw data downloads, documentation and examples, and a developer community for an important collection of FDA public datasets. (https://github.com/FDA/openfda)  
More information on the API and datasets used for MedChecker can be found at https://open.fda.gov/.

##License
While this repository contains the work of LongView International Technology Solutions, it permanently waives all copyright and related rights in the work worldwide.  MedChecker is licensed Creative Commons 0 (CC0) 1.0.
