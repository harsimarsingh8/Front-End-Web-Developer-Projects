//bio object

var bio = {
    "name": "Harsimar Singh",
    "role": "web-developer-ninja",
    "contacts": {
        "mobile": ": +9781493897",

        "email": ": harsimar.singh08@gmail.com",

        "github": ": harsimarsingh8",

        "twitter": ": harsimar08",


        "location": ": Chandigarh-Tri-city"
    },
    "biopic": "images/6.jpg",
    "welcomeMessage": "MILES TO GO BEFORE I SLEEP.",
    "skills": ["Html", "Css", "Javascript", "Bootstrap", "Photoshop"]
};

//display bio
bio.display = function() {
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
    $("#topContacts, #footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts, #footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts, #footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts, #footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    $("#topContacts, #footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    $("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var formattedSkills = HTMLskills.replace("%data%", bio.skills[i]);
            $("#skills").append(formattedSkills);
        }
    }
};


//work object
var work = {
    "jobs": [{
        "employer": "Chitkara University",
        "title": "Web Designer",
        "dates": "2015 - 2019",
        "location": "Chitkara university, Punjab(rajpura)",
        "description": "I am pursuing my Btech in computer science"
    }]
};
//display work
work.display = function() {
    $("#workExperience").append(HTMLworkStart);
    for (var i = 0; i < work.jobs.length; i++) {
        $(".work-entry").append(HTMLworkEmployer.replace("%data%", work.jobs[i].employer) + HTMLworkTitle.replace("%data%", work.jobs[i].title));
        $(".work-entry").append(HTMLworkDates.replace("%data%", work.jobs[i].dates));
        $(".work-entry").append(HTMLworkLocation.replace("%data%", work.jobs[i].location));
        $(".work-entry").append(HTMLworkDescription.replace("%data%", work.jobs[i].description));

    }
};
//project object
var projects = {
    "projects": [{
            "title": "Vogue Magazine-Edited-Page",
            "dates": "1/12/2015-16/12/2015",
            "description": "Find the latest news, trends & tips from India's premier beauty & fashion magazine",
            "images": ["images/1.jpg"]
        },
        {
            "title": "Mustang-limited-edition",
            "dates": "1/1/2016-5/1/2016",
            "description": "Wood Group Mustang has designed more topsides for Gulf of Mexico semi-submersibles than any other company in the world.",
            "images": ["images/5.jpg"]
        },
        {
            "title": "Massimo Dutti uk",
            "dates": "8/2/2016-12/2/2016",
            "description": "Massimo Dutti is a clothes manufacturing company that is part of the Inditex group &founded in 1985",
            "images": ["images/2.jpg"]
        },
        {
            "title": "Adobe photoshopped web page",
            "dates": "1/5/2016-2/5/2016",
            "description": "Create and enhance your photos, images, 3D artwork, and more with Adobe Photoshop CC",
            "images": ["images/4.jpg"]
        }
    ]
};

//display project
projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    for (i = 0; i < projects.projects.length; i++) {
        $(".project-entry").append(HTMLprojectTitle.replace("%data%", projects.projects[i].title));
        $(".project-entry").append(HTMLprojectDates.replace("%data%", projects.projects[i].dates));
        $(".project-entry").append(HTMLprojectDescription.replace("%data%", projects.projects[i].description));
        for (j = 0; j < projects.projects[i].images.length; j++) {
            $(".project-entry").append(HTMLprojectImage.replace("%data%", projects.projects[i].images[j]));
        }
    }
};
//project education
var education = {
    "schools": [{
            "name": "DAV public school",
            "location": "Amritsar,punjab,India",
            "degree": "High School",
            "majors": ["PCM"],
            "dates": "2015",


        },
        {
            "name": "Chitkara University",
            "location": "Rajpura(patiala),Punjab(140401)",
            "degree": "Btech",
            "majors": ["CSE"],
            "dates": "2015-2019"

        }
    ],
    "onlinecourses": [{
            "title": "Front -end-web-development Nanodegree",
            "school": "Udacity",
            "dates": "2017",
            "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        },
        {
            "title": "Intro to HTML and Css",
            "school": "Udacity",
            "dates": "2016",
            "url": "https:www.udacity.com/course/intro-to-html-and-css--ud304"
        },
        {
            "title": "Intro to Git and Github",
            "school": "Udacity",
            "dates": "2016",
            "url": "https:www.udacity.com/course/how-to-use-git-and-github--ud775"
        }
    ]
};
//display education
education.display = function() {
    $("#education").append(HTMLschoolStart);
    for (var i = 0; i < education.schools.length; i++) {
        $(".education-entry").append(HTMLschoolName.replace("%data%", education.schools[i].name) + HTMLschoolDegree.replace("%data%", education.schools[i].degree));
        $(".education-entry").append(HTMLschoolDates.replace("%data%", education.schools[i].dates));
        for (var j = 0; j < education.schools[i].majors.length; j++) {
            $(".education-entry").append(HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]));
        }
        $(".education-entry").append(HTMLschoolLocation.replace("%data%", education.schools[i].location));
    }

    $(".education-entry").append(HTMLonlineClasses);

    for (var k = 0; k < education.onlinecourses.length; k++) {
        $(".education-entry").append(HTMLonlineTitle.replace("%data%", education.onlinecourses[k].title) + HTMLonlineSchool.replace("%data%", education.onlinecourses[k].school));
        $(".education-entry").append(HTMLonlineDates.replace("%data%", education.onlinecourses[k].dates));
        $(".education-entry").append(HTMLonlineURL.replace("%data%", education.onlinecourses[k].url));
    }
};
//calling all the functions
bio.display();
education.display();
work.display();
projects.display();
//adding map to resume
$("#mapDiv").append(googleMap);
