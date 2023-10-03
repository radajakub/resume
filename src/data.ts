export class TimePoint {
    readonly year: number;
    readonly month: number;
    readonly day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    toTime(): number {
        return (new Date(this.year, this.month, this.day)).getTime();
    }

    format(): string {
        return `${this.day < 10 ? "0" : "" + this.day}/${(this.month < 10 ? "0" : "") + this.month}/${this.year}`;
    }

    computeAge(): number {
        const dateOfBirth = new Date(this.year, this.month, this.day);
        const ageDate = new Date(Date.now() - dateOfBirth.getTime());
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    static descending(a: TimePoint, b: TimePoint) {
        return b.toTime() - a.toTime();
    }
}

export class Interval {
    readonly start: TimePoint;
    readonly end: TimePoint;

    constructor(syear: number, smonth: number, sday: number, eyear: number, emonth: number, eday: number) {
        this.start = new TimePoint(syear, smonth, sday);
        this.end = new TimePoint(eyear, emonth, eday);
    }

    computePercentage(): number {
        const wholeInterval = this.end.toTime() - this.start.toTime();
        const currInterval = Date.now() - this.start.toTime();
        return Math.min(Math.round(currInterval * 100 / wholeInterval), 100);
    }

    yearRange(): string {
        return `${this.start.year} - ${this.end.year}`;
    }
}

export class Info {
    readonly name: string;
    readonly icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}

export class DateOfBirth extends Info {
    readonly date: TimePoint;

    constructor(name: string, icon: string, date: TimePoint) {
        super(name, icon);
        this.date = date;
    }
}

export class Age extends Info {
    constructor(name: string, icon: string) {
        super(name, icon);
    }
}

export class Skill extends Info {
    readonly skills: string[];

    constructor(name: string, icon: string, skills: string[]) {
        super(name, icon);
        this.skills = skills;
    }
}

export class Location extends Info {
    readonly city: string;
    readonly country: string;
    readonly flexible: boolean;

    constructor(name: string, icon: string, city: string, country: string, flexible = false) {
        super(name, icon);
        this.city = city;
        this.country = country;
        this.flexible = flexible;
    }

    format(): string {
        return `${this.city}, ${this.country}`;
    }
}

export class Contact extends Info {
    readonly username: string;
    readonly link: string;
    readonly use: boolean;

    constructor(name: string, icon: string, username: string, link: string, use = true) {
        super(name, icon);
        this.username = username;
        this.link = link;
        this.use = use;
    }
}

export class Course {
    readonly name: string;
    readonly description: string;
    readonly grade: string;

    constructor(name: string, description: string, grade: string) {
        this.name = name;
        this.description = description;
        this.grade = grade;
    }
}

export class Thesis {
    readonly title: string;
    readonly grade: string;
    readonly badges: string[];
    readonly description: string;
    readonly awards: string[];

    constructor(title: string, grade: string, badges: string[], description: string, awards: string[]) {
        this.title = title;
        this.grade = grade;
        this.badges = badges;
        this.description = description;
        this.awards = awards;
    }
}

export class Grades {
    readonly result: string;
    readonly scale: string;
    readonly graduationGrade: string;
    readonly graduatedWithHonors: boolean;

    constructor(result: string, scale: string, graduationGrade: string, graduatedWithHonors: boolean) {
        this.result = result;
        this.scale = scale;
        this.graduationGrade = graduationGrade;
        this.graduatedWithHonors = graduatedWithHonors;
    }
}

export class Education {
    readonly school: string;
    readonly shortcut?: string;
    readonly faculty?: string;
    readonly specialization: string;
    readonly timeFrame: Interval;
    readonly level: string;
    readonly logoPath: string;
    readonly link: string;
    readonly shortDescription: string;
    readonly longDescription: string;
    readonly courses: Course[];
    readonly grades: Grades;
    readonly thesis?: Thesis;

    constructor(school: string, shortcut: string, faculty: string, specialization: string, timeFrame: Interval, level: string, logoPath: string, link: string, shortDescription: string, longDescription: string, courses: Course[], grades: Grades, thesis?: Thesis) {
        this.school = school;
        this.shortcut = shortcut == "" ? undefined : shortcut;
        this.faculty = faculty == "" ? undefined : faculty;
        this.specialization = specialization;
        this.timeFrame = timeFrame;
        this.level = level;
        this.logoPath = logoPath;
        this.link = link;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.courses = courses;
        this.grades = grades;
        this.thesis = thesis;
    }
}

export class ProgrammingLangauge {
    readonly name: string;
    readonly icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}

export class Work {
    readonly title: string;
    readonly field: string;
    readonly companyName: string;
    readonly logoPath: string;
    readonly mode: string;
    readonly programmingLanguages: ProgrammingLangauge[];
    readonly description: string;
    interval: Interval;

    constructor(title: string, field: string, companyName: string, logoPath: string, mode: string, programmingLanguages: ProgrammingLangauge[], description: string, interval: Interval) {
        this.title = title;
        this.field = field;
        this.companyName = companyName;
        this.logoPath = logoPath;
        this.mode = mode;
        this.programmingLanguages = programmingLanguages;
        this.description = description;
        this.interval = interval;
    }
}

export class Project {
    readonly topic: string;
    readonly name: string;
    readonly relatedInstitution: string;
    readonly shortDescription: string;
    readonly longDescription: string;
    readonly githubLink: string;
    readonly programmingLanguages: ProgrammingLangauge[];
    readonly interval: Interval;

    constructor(topic: string, name: string, relatedInstitution: string, shortDescription: string, longDescription: string, githubLink: string, programmingLanguages: ProgrammingLangauge[], interval: Interval) {
        this.topic = topic;
        this.name = name;
        this.relatedInstitution = relatedInstitution;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.githubLink = githubLink;
        this.programmingLanguages = programmingLanguages;
        this.interval = interval;
    }
}

export class Achievement {
    readonly name: string;
    readonly shortDescription: string;
    readonly longDescription: string;
    readonly awardingInstitution: string;
    readonly link: string;
    readonly achievement: string;
    readonly category: string;
    readonly interval: Interval;

    constructor(name: string, shortDescription: string, longDescription: string, awardingInstitution: string, link: string, achievement: string, category: string, interval: Interval) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.awardingInstitution = awardingInstitution;
        this.link = link;
        this.achievement = achievement;
        this.category = category;
        this.interval = interval;
    }
}

export class Data {
    readonly firstName: string;
    readonly lastName: string;
    readonly titles: string[];
    readonly aboutMe: string[];
    readonly dateOfBirth: DateOfBirth;
    readonly age: Age;
    readonly location: Location;
    readonly contacts: Contact[];
    readonly skills: Skill[];
    readonly educations: Education[];
    readonly works: Work[];
    readonly projects: Project[];
    readonly achievements: Achievement[];

    constructor(firstName: string, lastName: string, titles: string[], aboutMe: string[], dateOfBirth: DateOfBirth, age: Age, location: Location, contacts: Contact[], skills: Skill[], educations: Education[], works: Work[], projects: Project[], achievements: Achievement[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.titles = titles;
        this.aboutMe = aboutMe;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.location = location;
        this.contacts = contacts;
        this.skills = skills;
        this.educations = educations;
        this.works = works;
        this.projects = projects;
        this.achievements = achievements;
    }

    educationsSorted(): Education[] {
        return this.educations.sort((a, b) => TimePoint.descending(a.timeFrame.end, b.timeFrame.end));
    }

    static init(): Data {
        // Personal info
        const firstName = "Jakub";
        const lastName = "Rada";
        const titles = ["AI/ML Master student", "Researcher", "Software Engineer"];
        const aboutMe = [
            "I am a Computer Science Master student specializing in Artificial Intelligence at Czech Technical University at Prague. My journey to this field started when I was very young. I started programming when I was 8 in a programming language called Baltie 3. It is a graphical programming language which was specifically designed to teach children how to code in C. Instead of writing code as a text, children drag and connect blocks which represent individual keywords and commands of the C language (and some more to make it easier) to create programs. This language was one of the things that inspired MIT professors to create the well-known language Scratch. I regularly competed at competitions on regional and national level and when I was 11 I ended up second in the national round in the Czech Republic and then placed third in the international round, which comprised the whole central Europe (mostly Czech Republic, Slovakia, Hungary and Poland).",
            "I attended one of the best general high schools in the Czech Republic and I graduated with straight A's from Math, Computer Science and the Czech language. Right after finishing high school I got accepted to the Faculty of Electrical Engineering at Czech Technical University in Prague, which is regarded as the best Computer Science faculty in the Czech Republic. I chose to specialize in Artificial Intelligence as it was the most theoretical specialization. In June 2022, I graduated from the Bachelor programme with honors. Moreover, my Bachelor thesis titled Comparing Exploration Methods in Partially Observable Stochastic Games received the dean's award for exceptional theses. Now, I study a third semester of a Master programme with the same specialization. During the first year of Master's I went to an exchange programme to the Korean Advanced Institute of Science and Technology (KAIST), which is regarded as the best technical university in South Korea. There, I studied in depth Reinforcement Learning, Quantum Computing, Grapm Machine Learning and Compiler Design.",
            "During my studies I participated in an research project in the field of discrete optimization. Our two-member team participated at an international competition ROADEF 2020 consisting of more than 70 international teams and which is regularly organized by the EURO association. In a tough competition, we placed second in the junior cathegory. The paper about our solution was then published in the Journal of Heuristics on Springer. Also, I worked and work as a part-time software engineer in SWEHQ. I worked in development of complex web and mobile applications using mainly Typescript, Angular, NodeJS and most importantly Flutter.",
            "My areas of interest are Artificial Intelligence, machine learning, optimization and computer science in general. I enjoy programming in C/C++, Julia, Haskell and Python but other languages are definitely not an obstacle for me. I never want to stop learning.",
            "Outside of Artificial Intelligence and Computer Science I enjoy sports, mainly running and recently weightlifiting, reading books, travelling and learning new things. I have been running sice I was 6 years old with only short pauses caused by injuries. Now, I specialize in longer distances from 5km to Half-Marathons. As my biggest achievements in the sport I consider a time 34:42 at 10km distance and 1:18:54 at Half-Marathon. I ran the second time in South Korea during my exchange and it put me on 10th place at the International Daegu Half-Marathon only two weeks after winning a Marathon relay for two during the Seoul Marathon 2023."
        ];
        const dateOfBirth = new DateOfBirth("Date of birth", "fa-solid fa-cake-candles", new TimePoint(2000, 2, 25));
        const age = new Age("Age", "fa-solid fa-calendar-days");
        const location = new Location("Location", "fa-solid fa-map-location-dot", "Prague", "Czechia", true);

        // contacts
        const phone = new Contact("Phone number", "fa-solid fa-mobile", "+420 604 730 409", "tel:+420777777777");
        const email = new Contact("Email address", "fa-solid fa-envelope", "dev.jakubrada@icloud.com", "mailto:dev.jakubrada@icloud.com");
        const github = new Contact("GitHub", "fa-brands fa-github", "radajakub", "https://github.com/radajakub");
        const linkedin = new Contact("LinkedIn", "fa-brands fa-linkedin", "radajakub", "https://www.linkedin.com/in/radajakub");
        const discord = new Contact("Discord", "fa-brands fa-discord", "jakubrada", "", false);
        const leetcode = new Contact("LeetCode", "", "jakubrada", "https://leetcode.com/jakubrada", false);
        const hackerrank = new Contact("HackerRank", "fa-brands fa-hackerrank", "jakubrada", "https://www.hackerrank.com/jakubrada", false);
        const kaggle = new Contact("Kaggle", "fa-brands fa-kaggle", "radajakub", "https://www.kaggle.com/radajakub", false);
        const contacts = [phone, email, github, linkedin, discord, leetcode, hackerrank, kaggle];

        // skills
        const langauges = new Skill("Languages", "fa-solid fa-language", ["Czech", "English", "Spanish"]);
        const interests = new Skill("Interests", "fa-solid fa-heart", ["Running", "Gym", "Coding", "Reading", "Learning", "Rap music"]);
        const programming = new Skill("Programming Languages", "fa-solid fa-code", ["C/C++", "Julia", "Python", "Rust", "Haskell", "Java", "Javascript/Typescript", "Dart", "SQL", "HTML/CSS"]);
        const frameworks = new Skill("Application Frameworks", "fa-solid fa-app-store-ios", ["Flutter", "Vue.js", "Angular", "Django", "NodeJS"]);
        const ai = new Skill("AI/ML Tools", "fa-solid fa-brain", ["PyTorch", "NumPy", "scikit-learn", "DeepMind Control Suite",]);
        const traits = new Skill("Skills and Traits", "fa-solid fa-person", ["Adaptability", "Precision", "Quick learner", "Attention to Detail", "Clean code", "Problem solving", "Responsibility"]);
        const skills = [langauges, interests, programming, frameworks, ai, traits];

        // educations
        const alej = new Education(
            "Gymnazium Praha 6 Nad Aleji",
            "GNA",
            "",
            "General education",
            new Interval(2011, 9, 1, 2019, 9, 1),
            "High School",
            "logo_alej.png",
            "https://www.alej.cz/about-school/",
            "One of the best High Schools in Prague to prepare students for Universities",
            "Long description",
            [],
            new Grades("A", "1-5", "A", true)
        );
        const feeBachelor = new Education(
            "Czech Technical University in Prague",
            "FEE CTU",
            "Faculty of Electrical Engineering",
            "Artificial Intelligence and Computer Science",
            new Interval(2019, 9, 1, 2022, 9, 1),
            "Bachelor",
            "logo_cvut.jpg",
            "https://oi.fel.cvut.cz/en/",
            "Short description",
            "Long description",
            [],
            new Grades("A", "1-5", "A", true)
        );
        const kaist = new Education(
            "Korean Advanced Insitute of Science and Technology",
            "KAIST",
            "Faculty of Electrical Engineering",
            "Exchange programme",
            new Interval(2023, 9, 1, 2023, 9, 1),
            "Master",
            "logo_kaist.gif",
            "https://www.kaist.ac.kr/en/",
            "Short description",
            "Long description",
            [],
            new Grades("A", "1-5", "A", true)
        );
        const feeMaster = new Education(
            "Czech Technical University in Prague",
            "FEE CTU",
            "Faculty of Electrical Engineering",
            "Artificial Intelligence",
            new Interval(2022, 9, 1, 2025, 9, 1),
            "Master",
            "logo_cvut.jpg",
            "https://oi.fel.cvut.cz/en/",
            "Short description",
            "Long description",
            [],
            new Grades("A", "1-5", "A", true)
        );

        const educations = [alej, feeBachelor, kaist, feeMaster];

        return new Data(
            firstName, lastName, titles, aboutMe, dateOfBirth, age, location, contacts, skills, educations, [], [], [],
        );
    }
}
