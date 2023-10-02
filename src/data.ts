export class TimePoint {
    year: number;
    month: number;
    day: number;

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
}

export class Interval {
    start: TimePoint;
    end: TimePoint;

    constructor(syear: number, smonth: number, sday: number, eyear: number, emonth: number, eday: number) {
        this.start = new TimePoint(syear, smonth, sday);
        this.end = new TimePoint(eyear, emonth, eday);
    }

    computePercentage(): number {
        const wholeInterval = this.end.toTime() - this.start.toTime();
        const currInterval = Date.now() - this.start.toTime();
        return Math.min(Math.round(currInterval * 100 / wholeInterval), 100);
    }
}

export class Info {
    name: string;
    icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}

export class DateOfBirth extends Info {
    date: TimePoint;

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
    skills: string[];

    constructor(name: string, icon: string, skills: string[]) {
        super(name, icon);
        this.skills = skills;
    }
}

export class Location extends Info {
    city: string;
    country: string;
    flexible: boolean;

    constructor(name: string, icon: string, city: string, country: string, flexible = false) {
        super(name, icon);
        this.city = city;
        this.country = country;
        this.flexible = flexible;
    }
}

export class Contact extends Info {
    username: string;
    link: string;
    use: boolean;

    constructor(name: string, icon: string, username: string, link: string, use = true) {
        super(name, icon);
        this.username = username;
        this.link = link;
        this.use = use;
    }
}

export class Course {
    name: string;
    description: string;
    grade: string;

    constructor(name: string, description: string, grade: string) {
        this.name = name;
        this.description = description;
        this.grade = grade;
    }
}

export class Grades {
    result: string;
    scale: string;
    graduationGrade: string;
    graduatedWithHonors: boolean;

    constructor(result: string, scale: string, graduationGrade: string, graduatedWithHonors: boolean) {
        this.result = result;
        this.scale = scale;
        this.graduationGrade = graduationGrade;
        this.graduatedWithHonors = graduatedWithHonors;
    }
}

export class Education {
    school: string;
    faculty?: string;
    specialization: string;
    timeFrame: Interval;
    level: string;
    logoPath: string;
    link: string;
    shortDescription: string;
    longDescription: string;
    courses: Course[];
    grades: Grades;

    constructor(school: string, faculty: string, specialization: string, timeFrame: Interval, level: string, logoPath: string, link: string, shortDescription: string, longDescription: string, courses: Course[], grades: Grades) {
        this.school = school;
        this.faculty = faculty;
        this.specialization = specialization;
        this.timeFrame = timeFrame;
        this.level = level;
        this.logoPath = logoPath;
        this.link = link;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.courses = courses;
        this.grades = grades;
    }
}

export class ProgrammingLangauge {
    name: string;
    icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}

export class Work {
    title: string;
    field: string;
    companyName: string;
    logoPath: string;
    mode: string;
    programmingLanguages: ProgrammingLangauge[];
    description: string;
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
    topic: string;
    name: string;
    relatedInstitution: string;
    shortDescription: string;
    longDescription: string;
    githubLink: string;
    programmingLanguages: ProgrammingLangauge[];
    interval: Interval;

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
    name: string;
    shortDescription: string;
    longDescription: string;
    awardingInstitution: string;
    link: string;
    achievement: string;
    category: string;
    interval: Interval;

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
    firstName: string;
    lastName: string;
    titles: string[];
    aboutMe: string[];
    dateOfBirth: DateOfBirth;
    age: Age;
    location: Location;
    contacts: Contact[];
    skills: Skill[];
    educations: Education[];
    works: Work[];
    projects: Project[];
    achievements: Achievement[];

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

    static getJSON(): string { return JSON.stringify(this); }
}
