/*eslint indent: [2, 4, {"SwitchCase": 1}]*/

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

    isFuture(): boolean {
        return this.toTime() > Date.now();
    }

    format(showDay = true, hideFuture = false): string {
        if (hideFuture && this.isFuture()) {
            return "present";
        }
        const day = showDay ? `${(this.day < 10 ? "0" : "") + this.day}/` : "";
        return `${day}${(this.month < 10 ? "0" : "") + this.month}/${this.year}`;
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

    yearRange(hideFuture = false): string {
        if (this.start.year == this.end.year) {
            return `${this.start.year}`;
        }
        if (hideFuture && this.end.isFuture()) {
            return `${this.start.year} - present`;
        }
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
    readonly credits: number;
    readonly semester: number;

    constructor(name: string, description: string, grade: string, credits: number, semester = 0) {
        this.name = name;
        this.description = description;
        this.grade = grade;
        this.credits = credits;
        this.semester = semester;
    }
}

export class Thesis {
    readonly level: string;
    readonly title: string;
    readonly grade: string;
    readonly badges: string[];
    readonly description: string;
    readonly link?: string;

    constructor(level: string, title: string, grade: string, badges: string[], description: string, link: string) {
        this.level = level;
        this.title = title;
        this.grade = grade;
        this.badges = badges;
        this.description = description;
        this.link = link;
    }
}

export class Grades {
    static gradeLookup = new Map<string, number>([
        ["A", 1], ["B", 1.5], ["C", 2], ["D", 2.5], ["E", 3], ["F", 4],
        ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5],
    ]);

    readonly courses: Course[];
    readonly result: string;
    readonly showGPA: boolean;
    readonly scale: string;
    readonly graduatedWithHonors: boolean;

    constructor(scale: string, graduatedWithHonors: boolean, courses: Course[], showGPA = false) {
        this.courses = courses;
        this.showGPA = showGPA;
        this.scale = scale;
        this.graduatedWithHonors = graduatedWithHonors;
        this.result = this.averageGrade();
    }

    averageGrade(): string {
        if (this.courses.length == 0) {
            return "";
        }

        const sumOfCredits = this.courses.map(c => c.credits).reduce((a, b) => a + b);
        const sumOfGrades = this.courses.map(c => (Grades.gradeLookup.get(c.grade) ?? 0) * c.credits).reduce((a, b) => a + b);
        const average = Math.round((sumOfGrades / sumOfCredits + Number.EPSILON) * 100) / 100;
        return average.toString();
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
    readonly grades: Grades;
    readonly thesis?: Thesis;

    constructor(school: string, shortcut: string, faculty: string, specialization: string, timeFrame: Interval, level: string, logoPath: string, link: string, shortDescription: string, longDescription: string, grades: Grades, thesis?: Thesis) {
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
        this.grades = grades;
        this.thesis = thesis;
    }
}

export class ProgrammingLanguage {
    readonly name: string;
    readonly icon?: string;

    constructor(name: string, icon?: string) {
        this.name = name;
        this.icon = icon;
    }
}

export class Work {
    readonly title: string;
    readonly field: string;
    readonly companyName: string;
    readonly logoPath: string;
    readonly logoLink: string;
    readonly mode: string;
    readonly programmingLanguages: ProgrammingLanguage[];
    readonly shortDescription: string;
    readonly description: string;
    readonly interval: Interval;

    constructor(title: string, field: string, companyName: string, logoPath: string, logoLink: string, mode: string, programmingLanguages: ProgrammingLanguage[], shortDescription: string, description: string, interval: Interval) {
        this.title = title;
        this.field = field;
        this.companyName = companyName;
        this.logoPath = logoPath;
        this.logoLink = logoLink;
        this.mode = mode;
        this.programmingLanguages = programmingLanguages;
        this.shortDescription = shortDescription;
        this.description = description;
        this.interval = interval;
    }
}

export class Project {
    readonly topic: string;
    readonly subtitle: string;
    readonly name: string;
    readonly relatedInstitution: string;
    readonly shortDescription: string;
    readonly longDescription: string;
    readonly githubLink: string;
    readonly programmingLanguages: ProgrammingLanguage[];
    readonly interval: Interval;

    constructor(topic: string, subtitle: string, name: string, relatedInstitution: string, shortDescription: string, longDescription: string, githubLink: string, programmingLanguages: ProgrammingLanguage[], interval: Interval) {
        this.topic = topic;
        this.subtitle = subtitle;
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
    readonly logoPath: string;
    readonly link: string;
    readonly achievement: string;
    readonly category: string;
    readonly interval: Interval;
    readonly programmingLanguage?: ProgrammingLanguage;

    constructor(name: string, shortDescription: string, longDescription: string, awardingInstitution: string, logoPath: string, link: string, achievement: string, category: string, interval: Interval, programmingLanguage?: ProgrammingLanguage) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.awardingInstitution = awardingInstitution;
        this.logoPath = logoPath;
        this.link = link;
        this.achievement = achievement;
        this.category = category;
        this.interval = interval;
        this.programmingLanguage = programmingLanguage;
    }
}

export enum PublicationCategories {
    paper, package
}


export class Publication {
    readonly title: string;
    readonly shortDescription: string;
    readonly publisher: string;
    readonly logoPath: string;
    readonly link: string;
    readonly category: PublicationCategories;
    readonly date: TimePoint;

    constructor(title: string, shortDescription: string, publisher: string, logoPath: string, link: string, category: PublicationCategories, date: TimePoint) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.publisher = publisher;
        this.logoPath = logoPath;
        this.link = link;
        this.category = category;
        this.date = date;
    }

    getCategoryString(): string {
        switch (this.category) {
            case PublicationCategories.paper:
                return "Paper";
            case PublicationCategories.package:
                return "Package";
            default:
                return "";
        }
    }
}

export class Membership {
    readonly name: string;
    readonly category: string;
    readonly shortDescription: string;
    readonly logoPath: string;
    readonly link: string;
    readonly date: TimePoint;
    readonly validity: string;

    constructor(name: string, category: string, shortDescription: string, logoPath: string, link: string, date: TimePoint, validity: string) {
        this.name = name;
        this.category = category;
        this.shortDescription = shortDescription;
        this.logoPath = logoPath;
        this.link = link;
        this.date = date;
        this.validity = validity;
    }
}

export class Section {
    readonly name: string;
    readonly icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }

    linkify(): string {
        return this.name.toLowerCase().split(" ").join("");
    }
}

export enum Sections {
    introduction, aboutme, skills, education, memberships, work, publications, projects, achievements
}

export class CoverLetter {
    name: string;
    company: string;
    paragraphs: string[];

    constructor(name: string, company: string, paragraphs: string[]) {
        this.name = name;
        this.company = company;
        this.paragraphs = paragraphs;
    }
}

export class Data {
    readonly firstName: string;
    readonly lastName: string;
    readonly degreesBeforeName: string[];
    readonly titles: string[];
    readonly aboutMe: string[];
    readonly goals: string;
    readonly dateOfBirth: DateOfBirth;
    readonly age: Age;
    readonly location: Location;
    readonly contacts: Contact[];
    readonly skills: Skill[];
    readonly educations: Education[];
    readonly works: Work[];
    readonly projects: Project[];
    readonly achievements: Achievement[];
    readonly publications: Publication[];
    readonly memberships: Membership[];
    readonly coverLetters: CoverLetter[];

    constructor(firstName: string, lastName: string, degreesBeforeName: string[], titles: string[], aboutMe: string[], goals: string, dateOfBirth: DateOfBirth, age: Age, location: Location, contacts: Contact[], skills: Skill[], educations: Education[], works: Work[], projects: Project[], achievements: Achievement[], publications: Publication[], memberships: Membership[], coverLetters: CoverLetter[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.degreesBeforeName = degreesBeforeName;
        this.titles = titles;
        this.aboutMe = aboutMe;
        this.goals = goals;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.location = location;
        this.contacts = contacts;
        this.skills = skills;
        this.educations = educations;
        this.works = works;
        this.projects = projects;
        this.achievements = achievements;
        this.publications = publications;
        this.memberships = memberships;
        this.coverLetters = coverLetters;
    }

    fullName(): string {
        const parts = [];
        if (this.degreesBeforeName.length != 0) {
            parts.push(this.degreesBeforeName.join(", "));
        }
        parts.push(this.firstName);
        parts.push(this.lastName);
        return parts.join(" ");
    }

    sections(): Map<Sections, Section> {
        const present: Map<Sections, Section> = new Map();
        present.set(Sections.introduction, new Section("Introduction", "fa-solid fa-info"));
        if (this.aboutMe.length != 0) {
            present.set(Sections.aboutme, new Section("About Me", "fa-solid fa-user"));
        }
        if (this.skills.length != 0) {
            present.set(Sections.skills, new Section("Skills", "fa-solid fa-lightbulb"));
        }
        if (this.educations.length != 0) {
            present.set(Sections.education, new Section("Education", "fa-solid fa-graduation-cap"));
        }
        if (this.memberships.length != 0) {
            present.set(Sections.memberships, new Section("Memberships", "fa-solid fa-building-columns"));
        }
        if (this.works.length != 0) {
            present.set(Sections.work, new Section("Work", "fa-solid fa-computer"));
        }
        if (this.projects.length != 0) {
            present.set(Sections.projects, new Section("Projects", "fa-code-branch"));
        }
        if (this.achievements.length != 0) {
            present.set(Sections.achievements, new Section("Achievements", "fa-solid fa-award"));
        }
        if (this.publications.length != 0) {
            present.set(Sections.publications, new Section("Publications", "fa-solid fa-paperclip"));
        }
        return present;
    }

    educationsSorted(): Education[] {
        return this.educations.sort((a, b) => TimePoint.descending(a.timeFrame.end, b.timeFrame.end));
    }

    worksSorted(): Work[] {
        return this.works.sort((a, b) => TimePoint.descending(a.interval.end, b.interval.end));
    }

    projectsSorted(): Project[] {
        return this.projects.sort((a, b) => TimePoint.descending(a.interval.end, b.interval.end));
    }

    achievementsSorted(): Achievement[] {
        return this.achievements.sort((a, b) => TimePoint.descending(a.interval.end, b.interval.end));
    }

    publicationsSorted(): Publication[] {
        return this.publications.sort((a, b) => TimePoint.descending(a.date, b.date));
    }

    membershipsSorted(): Membership[] {
        return this.memberships.sort((a, b) => TimePoint.descending(a.date, b.date));
    }

    static init(): Data {
        // Personal info
        const firstName = "Jakub";
        const lastName = "Rada";
        const degreesBeforeName = ["Bc."];
        const titles = ["AI/ML Master student", "Researcher", "Software Engineer"];
        const aboutMe = [
            "I am a Computer Science Master student specializing in Artificial Intelligence at Czech Technical University at Prague. My journey to this field started when I was very young. I started programming when I was 8 in a programming language called Baltie 3. It is a graphical programming language which was specifically designed to teach children how to code in C. Instead of writing code as a text, children drag and connect blocks which represent individual keywords and commands of the C language (and some more to make it easier) to create programs. This language was one of the things that inspired MIT professors to create the well-known language Scratch. I regularly competed at competitions on regional and national level and when I was 11 I ended up second in the national round in the Czech Republic and then placed third in the international round, which comprised the whole central Europe (mostly Czech Republic, Slovakia, Hungary and Poland).",
            "I attended one of the best general high schools in the Czech Republic and I graduated with straight A's from Math, Computer Science and the Czech language. Right after finishing high school I got accepted to the Faculty of Electrical Engineering at Czech Technical University in Prague, which is regarded as the best Computer Science faculty in the Czech Republic. I chose to specialize in Artificial Intelligence as it was the most theoretical specialization. In June 2022, I graduated from the Bachelor programme with honors. Moreover, my Bachelor thesis titled Comparing Exploration Methods in Partially Observable Stochastic Games received the dean's award for exceptional theses. Now, I study a third semester of a Master programme with the same specialization. During the first year of Master's I went to an exchange programme to the Korean Advanced Institute of Science and Technology (KAIST), which is regarded as the best technical university in South Korea. There, I studied in depth Reinforcement Learning, Quantum Computing, Grapm Machine Learning and Compiler Design. After returning to the Czech Republic, I continued my graduate studies. In February 2024, I was accepted and introduced as a member of the Honorary Society in Computer and Information Science, Upsilon Pi Epislon.",
            "During my studies I participated in an research project in the field of discrete optimization. Our two-member team participated at an international competition ROADEF 2020 consisting of more than 70 international teams and which is regularly organized by the EURO association. In a tough competition, we placed second in the junior cathegory. The paper about our solution was then published in the Journal of Heuristics on Springer. Also, I worked and work as a part-time software engineer in SWEHQ. I worked in development of complex web and mobile applications using mainly Typescript, Angular, NodeJS and most importantly Flutter.",
            "My areas of interest are Artificial Intelligence, machine learning, optimization and computer science in general. I enjoy programming in C/C++, Julia, Haskell and Python but other languages are definitely not an obstacle for me. I never want to stop learning.",
            "Outside of Artificial Intelligence and Computer Science I enjoy sports, mainly running and recently weightlifiting, reading books, travelling and learning new things. I have been running sice I was 6 years old with only short pauses caused by injuries. Now, I specialize in longer distances from 5km to Half-Marathons. As my biggest achievements in the sport I consider a time 34:42 at 10km distance and 1:18:54 at Half-Marathon. I ran the second time in South Korea during my exchange and it put me on 10th place at the International Daegu Half-Marathon only two weeks after winning a Marathon relay for two during the Seoul Marathon 2023."
        ];
        const goals =
            "I love learning new things, constantly improving my skills and abilities. I am interested in Artificial Intelligence, Machine Learning, Quantum Computing and Optimization and I want to contribute to pushing the boundaries of what is possible. I believe these fields can help us solve many important problems in this world and I want to be a part of it."
            ;
        const dateOfBirth = new DateOfBirth("Date of birth", "fa-solid fa-cake-candles", new TimePoint(2000, 2, 25));
        const age = new Age("Age", "fa-solid fa-calendar-days");
        const location = new Location("Location", "fa-solid fa-map-location-dot", "Prague", "Czechia", true);

        // contacts
        const phone = new Contact("Phone number", "fa-solid fa-mobile", "+420 604 730 409", "tel:+420604730409");
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
        const frameworks = new Skill("Application Frameworks", "fa-brands fa-app-store-ios", ["Flutter", "Vue.js", "Angular", "Django", "NodeJS"]);
        const ai = new Skill("AI/ML Tools", "fa-solid fa-brain", ["PyTorch", "NumPy", "scikit-learn", "DeepMind Control Suite", "Gurobi", "PySAT", "Jupyter"]);
        const traits = new Skill("Skills and Traits", "fa-solid fa-person", ["Adaptability", "Precision", "Quick learner", "Attention to Detail", "Clean code", "Problem solving", "Responsibility"]);
        const skills = [langauges, interests, programming, frameworks, ai, traits];

        // programming languages
        const julia = new ProgrammingLanguage("Julia");
        const typescript = new ProgrammingLanguage("Typescript");
        const c = new ProgrammingLanguage("C");
        const cpp = new ProgrammingLanguage("C++");
        const python = new ProgrammingLanguage("Python");
        const matlab = new ProgrammingLanguage("Matlab");
        const pysat = new ProgrammingLanguage("PySAT");
        const html = new ProgrammingLanguage("HTML");
        const css = new ProgrammingLanguage("CSS");
        const javascript = new ProgrammingLanguage("Javascript");
        const flutter = new ProgrammingLanguage("Flutter");
        const node = new ProgrammingLanguage("NodeJS");
        const angular = new ProgrammingLanguage("Angular");
        const vue = new ProgrammingLanguage("Vue.js");
        const dart = new ProgrammingLanguage("Dart");
        const django = new ProgrammingLanguage("Django");
        const docker = new ProgrammingLanguage("Docker");
        const android = new ProgrammingLanguage("Android");
        const ios = new ProgrammingLanguage("iOS");
        const baltie3 = new ProgrammingLanguage("Baltie 3");
        const java = new ProgrammingLanguage("Java");
        const javafx = new ProgrammingLanguage("JavaFX");
        const latex = new ProgrammingLanguage("LaTeX");
        const pytorch = new ProgrammingLanguage("PyTorch");
        const rust = new ProgrammingLanguage("Rust");

        // educations
        const alej = new Education(
            "Gymnázium, Praha 6, Nad Alejí 1952",
            "GNA",
            "",
            "General Education High School for students aiming to attend a university",
            new Interval(2011, 9, 1, 2019, 6, 14),
            "High School",
            "logo_alej.png",
            "https://www.alej.cz/about-school/",
            "One of the best High Schools in the Czech Republic providing great fundamentals in Math, Natural Sciences and Social Sciences",
            "Gymnázium, Praha 6, Nad Alejí 1952 is a prestigious High School located in Prague in the Czech Republic. It places regularly at the top places of final exam leaderboards across the whole country. Vast majority of students attending this High School get accepted to Czech Universities in both technical and social fields. I passed most of the years with straigh 1's (a Czech equivalent of A on a (1-5) scale and every year with honors (grade average below 1.5). At the end of the studies we have to pass a state exam and additional school exams. I graduated from Math, Computer Science, English and mandatory Czech language, all of them were 1's. Moreover, I presented my final Computer Science project, which was a flash-cards web app (see Projects section). During the studies I also passed the Cambridge First Certificate in English (FCE).",
            new Grades("1-5", true, []),
        );
        const feeBachelor = new Education(
            "Czech Technical University in Prague",
            "FEE CTU",
            "Faculty of Electrical Engineering",
            "Artificial Intelligence and Computer Science",
            new Interval(2019, 6, 21, 2022, 6, 14),
            "Bachelor",
            "logo_cvut.jpg",
            "https://oi.fel.cvut.cz/en/",
            "Bachelor programme consisiting of Math, Algorithms and Computer Architectures and Introduction to Optimization and Artificial Intelligence",
            "Czech Technical University in Prague is one of the best technical universities in the Czech Republic with long tradition. I studied a programme called Open Informatics with specialization named Introduction to Artificial Intelligence and Computer Science. The programme starts with Math and general Computer Science courses in the first three semesters. In the last three semesters it builds on these fundamentals and introduces more advanced topics such as Introduction to Artificial Intelligence, Pattern Recognition and Machine Learning, Languages and Automatons and many more. The studies are concluded with a Bachelor Thesis and what is called a State Exam, which summarizes all courses during the programme. Each student draws 2 questions randomly and has to answer them before a committee of professors. After these two questions, the student defends the Bachelor Thesis. I got my degree with A's from both questions and with an A from the defense. Moreover, I graduated with honors, which means that my overall grade average was below 1.5 and I got straight A's from graduation exam. Also, my thesis was awarded the Dean's award for exceptional theses.",
            new Grades("1-4", true, [
                new Course("Evolutionary Optimization Algorithms", "Local Search, Evolutionary and Genetic Algorithms", "A", 6, 5),
                new Course("Optimization and Game Theory", "Convex Optimization, Duality, Normal Form Games", "A", 4, 6),
                new Course("Linear Algebra", "Introduction to Abstract Linear Algebra", "A", 7, 1),
                new Course("Logic and Graphs", "Propositional and Predicate Logic, Resolution, Graph Theory", "B", 5, 2),
                new Course("Mathematical Analysis 1", "One-dimensional Calculus", "C", 7, 2),
                new Course("Mathematical Analysis 2", "Multi-dimensional Calculus", "A", 7, 3),
                new Course("Probability and Statistics", "Probability Theory, Statistics, Markov Chains", "A", 7, 3),
                new Course("Optimization", "Optimization with Linear Algebra, Gradient methods, Linear Programming", "B", 7, 4),
                new Course("Computer Architectures", "Modern RISC Processor Design", "A", 5, 2),
                new Course("Database Systems", "Relation Databases, SQL, Relational Algebra", "A", 6, 4),
                new Course("Julia for Optimization and Learning", "Introduction to the Julia language and multiple dispatch approaches", "A", 4, 6),
                new Course("Programmin in Java", "Introduction to Object Oriented Programming and Java", "A", 6, 2),
                new Course("Procedural Programming", "Programming in C", "A", 6, 1),
                new Course("Discrete Mathematics", "Integers, Relations, Mappings, Induction and other proofs", "A", 5, 1),
                new Course("Languages, Automats and Gramatics", "Finite and Pushdown Automata, Languages, Turing Machines", "A", 6, 5),
                new Course("Numerical Analysis", "Numerical Algorithms for Interpolation, Integration, Equation Solving, ...", "A", 6, 3),
                new Course("Algorithms", "Computational Complexity, Graph Algorithms, Sorting, Dynamic Programming, ...", "A", 6, 3),
                new Course("Solving Problems and other Games", "Introduction to Python and AI", "A", 6, 1),
                new Course("Pattern Recognition and Machine Learning", "Introduction to Pattern Recognition, Classifiers, Neural Nets, Regression, SVM, ...", "B", 6, 5),
                new Course("Operating Systems", "Processes, Threads, Kernels, Memory Management, ...", "A", 4, 3),
                new Course("Parallel and Distributed Computing", "Parallelism in C/C++, OpenMP, Parallel Algorithms, Distributed Algorithms", "A", 6, 4),
                new Course("Introduction to Artificial Intelligence", "Search, CSP, Games, Logic, Planning, Monte Carlo Tree Search, ...", "A", 6, 4),
                new Course("Computer Networks", "Introduction to Networking, Protocols and Infrastructure, Error Correction", "A", 5, 2),
                new Course("Cryptography and Information Security", "Cyphers, Hashing, Authentication, Autorization, Safe Protocols", "A", 5, 5),
                new Course("Functional Programming", "Lips, Haskell, Lambda Calculus", "A", 6, 4),
                new Course("Final Exam", "Final Exam for the Bachelor's Degree - 2 Random Topics: Calculus 1 + Numerical Methdos", "A", 0, 6),
                new Course("Bachlor Thesis", "Presentation and Defense", "A", 0, 6)
            ], true),
            new Thesis("bachelor", "Comparing Exploration Methods in Partially Observable Stochastic Games", "A", ["Game Theory", "Reinforcement Learning", "Optimization", "Linear Programming"], "Stochastic Games or Markov Games is a class of Games in Competitive Game Theory which can model many real world situations. With Partial Observability, we prevent agents to see the whole state of the game thus making the reasoning more probabilistic. These games can be solved by by methods heavily relying on Linear Programming, most notably the Heuristic Search Value Iteration. These methods suffer poor scalability, mostly caused by the size of linear programs and by poor exploration. In my thesis, I tried using many Bandit algorithms to see if they can learn which actions are better than others and if they can help steer the exploration in more promising ways.",
                "https://dspace.cvut.cz/handle/10467/101325",
            ),
        );
        const kaist = new Education(
            "Korean Advanced Insitute of Science and Technology",
            "KAIST",
            "Faculty of Electrical Engineering",
            "Exchange programme",
            new Interval(2023, 2, 25, 2023, 6, 30),
            "Master",
            "logo_kaist.gif",
            "https://www.kaist.ac.kr/en/",
            "Exchange programme in South Korea during my first year of Master's studies. Apart from the new things I learned, it gave me plenty of experience into my future life.",
            "Korean Advanced Institute of Science and Technology is a famous university in South Korea. It is regarded as the best technical university in the country and it is ranked among the best universities in the world. I attended the university during my first year of Master's studies as an exchange student. I studied four courses, which were all very interesting and challenging. I especially enjoyed Mathematical Foundations of Reinforcement Learning, where I learned a lot and would like to focus on this field more in the future. I would be able to pass the courses with better grades but I chose to travel a lot since it is a great opportunity to see the country and the culture and thus I did not have much time to study. What pleased me is that I was able to perform well even on a much higher-ranked university than my home one and that I could keep up with local full-time students.",
            new Grades("A-F", true, [
                new Course("Mathematical Foundations of Reinforcement Learning", "From Dynamic Programming to Entropy RL and Soft Actor-Critic", "B0", 3, 0),
                new Course("Basics of Quantum Information and Quantum Computing", "Quantum Theory, Circuits and Algorithms", "A+", 3, 0),
                new Course("Graph Machine Learning and Mining", "Graph Theory, Graph Neural Networks, Knowledge Graphs", "B+", 3, 0),
                new Course("Compiler Design", "Semantic Analysis, Code Generation, Optimization", "B0", 3, 0),
            ], false),
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
            "Master programme following the Bachelor programme with focus on Artificial Intelligence and Machine Learning.",
            "This programme directly follows the Bachelor programme and it deepens the knowledge in the field of Artificial Intelligence and Machine Learning, namely Statistic and Symbolic Machine Learning, Game Theory, Logical Reasoning, Robotics and many more. My studying was delayed because of an exchange programme mentioned next.",
            new Grades("1-4", true, [
                new Course("Computational Game Theory", "Algorithms to Solve Normal Form Games, Extensive Games and Cooperational Games", "A", 6, 1),
                new Course("Advanced Algorithms", "Graph Theory, Isomorphisms, Heaps and Data Structures, ...", "A", 6, 1),
                new Course("Digital Image Processing", "Image Filtering, Edge Detection, Image Segmentation, ...", "A", 6, 1),
                new Course("Scientific Programming in Julia", "In-depth Analysis of Julia Language, its Compilation, Typesystem, Multiple Dispatch and Performance", "A", 4, 1),
                new Course("Statistical Machine Learning", "Error Bounds, VC Dimension, Structured Perceptron and SVM, Neural Networks, Bayesian Learning, EM Algorithm, ...", "A", 6, 1),

                new Course("Three Dimensionsal Computer Vision", "Projective geometry, Projective Camera, Epipolar Geometry, RANSAC, Camera Gluing, Bundle Adjustment, Stereovision, Point Clouds, ...", "A", 6, 3),
                new Course("Logical Reasoning and Programming", "SAT Solving, Satisfiability Modulo Theories, First Order Logic, Resolution, Prolog, ...", "A", 6, 3),
                new Course("Statistical Data Analysis", "Linear Regression, Non-linear regression, Discriminant Analysis, Clustering, Dimensionality reduction, Robust Statistics, ...", "A", 6, 3),
                new Course("Artificial Intelligence in Robotics", "TSP, TSPN, Dubins Vehicles, Navigation, Planning, Multi-Goal and Multi-Robot Planning, ...", "A", 6, 3),
            ], true),
        );
        const educations = [alej, feeBachelor, kaist, feeMaster];

        const scalesoft = new Work(
            "Front End Web Developer",
            "Software Engineering",
            "Scalesoft",
            "logo_scalesoft.png",
            "http://in2.scalesoft.cz",
            "Part-time",
            [css, typescript, html, javascript, node],
            "Two-week internship before the first academic year, where I made both determinate and indeterminate progress indicators in pure CSS. This then translated into one semester long part-time job, where I worked on a web app.",
            "Long description",
            new Interval(2019, 8, 20, 2019, 12, 31),
        );

        const SWEHQ1 = new Work(
            "Web Software Development (Kappka)",
            "Software Engineering",
            "SWEHQ",
            "logo_swehq.png",
            "https://swehq.com/en/",
            "Part-time",
            [
                angular, typescript, html, css, javascript, node, docker
            ],
            "Development of a complex web application tool for mortgages for a big financial group. I worked on the front-end part of the application using Angular and Typescript.",
            "Long description",
            new Interval(2021, 6, 30, 2021, 11, 30)
        );

        const SWEHQ2 = new Work(
            "Cross-platform Mobile App Development (WeAllMeet.live)",
            "Software Engineering",
            "SWEHQ",
            "logo_swehq.png",
            "https://swehq.com/en/",
            "Part-time",
            [
                flutter, dart, python, django, docker, android, ios
            ],
            "Developing a cross-platform social mobile application in the Flutter framework with backend in Python and Django. We started from scratch and successfully released it to both App Store and Google Play.",
            "Long description",
            new Interval(2022, 6, 30, 2024, 9, 30)
        );

        const ciirc = new Work(
            "ROADEF Challenge 2020",
            "Researcher and Developer",
            "CIIRC CTU",
            "logo_ciirc.jpg",
            "https://www.ciirc.cvut.cz",
            "Part-time",
            [
                cpp, c, python
            ],
            "Research and development of a solution for an international competition in discrete optimization. The problems were too large to be solved exactly so we had to derive a complex Metaheuristic algorithm to find approximate solutions.",
            "Long description",
            new Interval(2020, 7, 1, 2021, 6, 29)
        );

        const works = [scalesoft, SWEHQ1, SWEHQ2, ciirc];

        const baltie = new Project(
            "Programming",
            "Graphical programming language Baltie 3 to learn C/C++",
            "Baltie 3 projects",
            "Extracurricular",
            "Small projects made in my free time during Primary School. Also, I attended competitions with some of these programs.",
            "Long description",
            "https://github.com/radajakub/baltie",
            [baltie3],
            new Interval(2008, 9, 1, 2012, 9, 1),
        );

        const doubleOracle = new Project(
            "Game Theory",
            "Semestral project in Julia programming language University course",
            "Double Oracle Algorithm for solving zero-sum normal-form games",
            "FEE CTU",
            "Package created as a final project for a class at FEE CTU. It is written using Julia features such as multiple dispatch, immutable structures and vectorized operations.",
            "Long description",
            "https://github.com/radajakub/DoubleOracle",
            [julia],
            new Interval(2023, 1, 1, 2023, 2, 15),
        );

        const flashcards = new Project(
            "Software Engineering",
            "Graduation project at High School",
            "Flashcards web app ran in Electron",
            "GNA",
            "Project made in my last year of High School. It is a web app for learning vocabulary and definitions with flashcards. It features creation of flashcards, learning mode and multiple tests, which include error tolerance using Levenshtein distance.",
            "Long Description",
            "https://github.com/radajakub/flashcards",
            [javascript, html, python, css, django],
            new Interval(2019, 2, 1, 2019, 5, 15),
        );

        const resume = new Project(
            "Software Engineering",
            "Free-time personal project",
            "Resume / Personal portfolio webpage",
            "Personal",
            "Personal webpage and generated resume to learn Vue.js framework. I also tried deploying the application to GitHub Pages with cusotm domain.",
            "Long Description",
            "https://github.com/radajakub/resume",
            [vue, typescript, html, css],
            new Interval(2023, 9, 1, 2023, 10, 30),
        );

        const chess = new Project(
            "Software Engineering",
            "Semestral project in Java",
            "Chess Game with GUI and simple artificial player",
            "FEE CTU",
            "Offline chess application with full rules (including Castling and En Passant), time options, arbitrary starting positions, simple computer player and export/import in the PGN format.",
            "Long description",
            "https://github.com/radajakub/chess-game",
            [java, javafx],
            new Interval(2020, 2, 1, 2020, 5, 20),
        );

        const pong = new Project(
            "Low-level programming",
            "Semestral project in Computer Architectures",
            "Pong game for a microcontroller",
            "FEE CTU",
            "Single and multi-player Pong game programmed for a microcontroller. In the project, I learned how to build very low-level programming in C, how fonts and graphical elements are rendered on a display and how to get input from sensors.",
            "Long description",
            "https://github.com/radajakub/apong",
            [c],
            new Interval(2020, 6, 1, 2020, 6, 15)
        );

        const warehouseAllocation = new Project(
            "Optimization",
            "Semestral project from Evolutionary Algorithms",
            "Evolutionary and Memetic Algorithms",
            "FEE CTU",
            "I implemented three algorithms, simple Local Search, Evolutionary Algorithm and Memetic Algorithm with multiple evolutionary operators and compared them on a Warehouse Allocation problem.",
            "Long description",
            "https://github.com/radajakub/warehouse-allocation",
            [cpp, python, latex],
            new Interval(2021, 9, 25, 2022, 1, 15)
        );

        const bThesis = new Project(
            "Game Theory, Reinformcent Learning",
            "Bachelor Thesis combining Game Theory and Reinforcement Learning",
            "Comparing Exploration Methods in Partially Observable Stochastic Games",
            "FEE CTU",
            "To solve Partially Observable Stochastic Games there exists a Heuristic Search Value Iteration algorithm. It can have problems with exploration, so I tried to use various Bandit algorithms to steer the algorithm in a correct direction.",
            "Long description",
            "https://github.com/radajakub/bachelor-thesis",
            [julia, latex, python],
            new Interval(2021, 9, 25, 2022, 5, 25),
        );

        const sac = new Project(
            "Reinforcement Learning",
            "Semestral project in Mathematical Foundations of Reinforcement Learning",
            "Soft Actor-Critic algorithm implementation",
            "KAIST",
            "Implementation of the Soft Actor-Critic algorithm for solving the Walker domain from Deep Mind Control Suite. I successfully learned the weights to make the Walker run.",
            "Long description",
            "https://github.com/radajakub/soft-actor-critic",
            [python, pytorch],
            new Interval(2023, 6, 5, 2023, 6, 15),
        );

        const kecc = new Project(
            "Compiler Design",
            "Semestral project in Compiler Design",
            "Implementation of KAIST Educational C Compiler in Rust",
            "KAIST",
            "During the semester we went through implementation of a complete C compiler in Rust programming language. The most important parts were the optimizations of intermediate representation.",
            "Long description",
            "https://github.com/kaist-cp/kecc-public",
            [rust],
            new Interval(2023, 2, 25, 2023, 6, 10),
        );

        const gml = new Project(
            "Dimensionality Reduction",
            "Semestral project in Graph Machine Learnign and Mining",
            "Developing a novel approach to Dimensionality Reduction using Graphs",
            "KAIST",
            "With my group of friends we tried to develop an algorithm to process and visualize high-dimensional data using graphs. Our algorithm could compete with state of the art in precision. It unrolled the Swiss Roll dataset.",
            "Long description",
            "https://github.com/radajakub/GML-dim-reduction",
            [python, pytorch],
            new Interval(2023, 5, 15, 2023, 6, 1)
        );

        const lightup = new Project(
            "LightUp",
            "Assignment in Logical Reasoning and Programming",
            "Solving a grid puzzle using SAT solving",
            "FEE CTU",
            "Instead of using traditional search methods to solve grid puzzles, we had to use SAT solving, PySAT in particular, to solve a LightUp puzzle. The details of the assignment can be seen in the repository.",
            "Long description",
            "https://github.com/radajakub/LightUp",
            [python, pysat],
            new Interval(2023, 9, 25, 2024, 1, 14),
        );

        const objectReconstruction = new Project(
            "Object Reconstruction",
            "Semestral project in 3D Computer Vision",
            "Reconstructing 3D objects from a set of 2D images",
            "FEE CTU",
            "Building a pipeline of Computer Vision methods to estimate 3D point cloud from a set of images from different angles. It focused on estimating epipolar geometries and camera gluing. Also, a great coding excercise.",
            "Long description",
            "https://github.com/radajakub/ObjectReconstruction",
            [python, matlab],
            new Interval(2023, 9, 25, 2024, 1, 14),
        );

        const projects = [baltie, doubleOracle, flashcards, resume, chess, pong, warehouseAllocation, bThesis, sac, kecc, gml, lightup, objectReconstruction];

        const baltieNational = new Achievement(
            "Baltie 2011 National Round",
            "Participation and second place in a national round of Baltie 3 competition at 11 years old. Judges evaluated the algorithmic and code quality of solutions for given tasks",
            "Long description",
            "SGP Systems",
            "logo_baltie.gif",
            "https://soutez.tib.cz/souteze/baltie/baltie-2011/narodni",
            "2nd place",
            "Programming",
            new Interval(2011, 5, 13, 2011, 5, 15),
            baltie3,
        );

        const baltieInternational = new Achievement(
            "Baltie 2011 International Round",
            "Participation and third place in an international round of Baltie 3 competition at 11 years old. Judges evaluated the algorithmic and code quality of solutions for given tasks",
            "Long description",
            "SGP Systems",
            "logo_baltie.gif",
            "https://soutez.tib.cz/souteze/baltie/baltie-2011/mezinarodni",
            "3rd place",
            "Programming",
            new Interval(2011, 6, 10, 2011, 6, 12),
            baltie3,
        );

        const bachelorThesisDeansAward = new Achievement(
            "Comparing Exploration Methods in Partially Observable Stochastic Games",
            "Applying Reinforcement Learning to Heuristic Search Value Iteration for Partially Observable Stochastic Games",
            "Long description",
            "FEE CTU",
            "logo_cvut.jpg",
            "https://dspace.cvut.cz/handle/10467/101325",
            "Dean's award for exceptional Bachelor Thesis",
            "Reasearch Thesis",
            new Interval(2022, 6, 16, 2022, 6, 16),
            julia,
        );

        const seoulMarathon = new Achievement(
            "Soul Marathon 2023 Relay",
            "Together with my runnind duo from Japan, we competed and won the two-person relay at Seoul. I ran the second part 22.2 kilometers long in time 1:24:44.",
            "Long description",
            "Seoul Marathon",
            "logo_seoul.png",
            "https://en.seoul-marathon.com",
            "1st place",
            "Running",
            new Interval(2023, 3, 19, 2023, 3, 19),
        );

        const daeguHalfmarathon = new Achievement(
            "Daegu International Half Marathon 2023",
            "Two weeks after winning the Seoul Marathon Relay, at my first solo half marathon I placed 10th overall in new personal best 1:18:54.",
            "Long description",
            "Daegu International Marathon",
            "logo_daegu.jpg",
            "https://daegurace.com",
            "10th place",
            "Running",
            new Interval(2023, 4, 2, 2023, 4, 2),
        );

        const FCE = new Achievement(
            "Cambridge First Certificate in English",
            "During High School I prepared for and passed the Cambridge First Certificate in English (FCE) which was then accepted instead of English exam for graduation.",
            "Long description",
            "Cambridge English",
            "logo_fce.png",
            "https://www.cambridgeenglish.org/exams-and-tests/first/",
            "Official B2 level certificate in English",
            "Languages",
            new Interval(2017, 6, 17, 2017, 6, 17),
        );

        const roadef = new Achievement(
            "ROADEF Challenge 2020",
            "Together with my friend we placed second at a discrete optimization competition in the junior category. Moreouver, our paper was published in the Journal of Heuristics.",
            "Long description",
            "EURO",
            "logo_roadef.png",
            "https://www.roadef.org/challenge/2020/en/",
            "2nd place in the junior category + paper published in the Journal of Heuristics",
            "Research / Project",
            new Interval(2021, 6, 14, 2021, 6, 14),
            cpp,
        );

        const achievements = [baltieNational, baltieInternational, bachelorThesisDeansAward, seoulMarathon, daeguHalfmarathon, FCE, roadef];

        const roadefPaper = new Publication(
            "The ALNS metaheuristic for the transmission maintenance scheduling",
            "Paper describing our solution that was published after final round of the ROADEF 2020 competition",
            "Journal of Metaheristics / Springer Nature",
            "logo_springer.svg",
            "https://link.springer.com/article/10.1007/s10732-023-09514-x",
            PublicationCategories.paper,
            new TimePoint(2023, 5, 27),
        );
        const publications = [roadefPaper];

        const upe = new Membership(
            "Upsilon Pi Epsilon",
            "Honorary Society",
            "International Honor Society for the Computing and Information Disciplines",
            "logo_upe.png",
            "https://upe.acm.org",
            new TimePoint(2024, 2, 13),
            "Lifetime",
        );

        const memberships = [upe];

        const deepMindLetter = new CoverLetter(
            "deepmind",
            "Google DeepMind",
            ["My dream is doing something which is meaningful and can help move knowledge, technology and humanity forward. During my studies I found that Computer Science and especially Artificial Intelligence is one of the best fields to achieve this and that I am good at it. I have been coding since I was eight years old in various programming languages. I started in Baltie 3, which is a Czech programming language and inspiration for Scratch, and I attended and succeeded at competitions at both national and international level. I have continued coding until I got into University where my fascination with Artificial Intelligence started. I got familiar with many parts of AI and I found that Reinforcement Learning is my favorite. My attention was caught by AlphaGo and I went in this direction. I chose Reinforcement Learning as one of the topics in my Bachelor thesis, where I tried to use it to solve problems in Game Theory which are untractable by standard methods. A course I took during an exchange programme at KAIST in South Korea, called Mathematical Foundations of Reinforcement Learning, deepened my knowledge about this field and introduced me to state of the art algorithms. I want to continue in this direction and I belive that DeepMind is the best place to do this. I would love to be a part of the team for an internship now and hopefully in the future as a researcher after I finish my studies."],
        );

        const appleLetter = new CoverLetter(
            "apple",
            "Apple",
            ["My dream is doing something which is meaningful and can help move knowledge, technology and humanity forward. During my studies I found that Computer Science and especially Artificial Intelligence is one of the best fields to achieve this and that I am good at it. I have been coding since I was eight years old in various programming languages. I started in Baltie 3, which is a Czech programming language and inspiration for Scratch, and I attended and succeeded at competitions at both national and international level. I have continued coding until I got into University where my fascination with Artificial Intelligence started. I got familiar with many parts of AI and Machine Learning both at my home university in Prague and at Korean Advanced Institute of Science and Technology in South Korea during an exchange programme. I always strive for quality in my projects and code and I see it in Apple and its products, which I enjoy in professional and personal life. I would love to contribute to developing high-quality products and help bring even more of Artificial Intelligence and Machine Learning to the end user and further enhance the experience.",]);

        const huggingFaceLetter = new CoverLetter("huggingFace", "Hugging Face", [
            "My dream is doing something which is meaningful and can help move knowledge, technology and humanity forward. During my life and studies I have found that Computer Science and especially Artificial Intelligence is one of the key fields of science to achieve this and that I am good at it.",
            "I have been coding in various programming languages since I was eight years old and I attended and won competitions at various levels. I have continued coding until I got into university where my fascination with Artificial Intelligence started. I got familiar with many subfields of AI and Machine Learning both at my home university in Prague and at Korean Advanced Institute of Science and Technology in South Korea during an exchange programme. During university I also gained valuable expereince in Software Development on both web and mobile platforms.",
            "I am hard-working, motivated and always eager to learn. In my studies, my code and my life in general I always strive for perfection and I am not afraid to take on new challenges. I think what Hugging Face is doing is remarkable and important and I believe that I can contribute.",
        ]);

        const coverLetters = [deepMindLetter, appleLetter, huggingFaceLetter];

        return new Data(
            firstName, lastName, degreesBeforeName, titles, aboutMe, goals, dateOfBirth, age, location, contacts, skills, educations, works, projects, achievements, publications, memberships, coverLetters,
        );
    }
}
